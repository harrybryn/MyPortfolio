const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }

    // Parse JSON body (Vercel parses this automatically)
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL,
            replyTo: email,
            subject: `New message from ${name}`,
            text: `Name:    ${name}\nEmail:   ${email}\nMessage:\n${message}`,
        });

        return res.status(200).json({ success: true, message: "Message sent! I'll get back to you soon." });
    } catch (err) {
        console.error('Mailer error:', err);
        return res.status(500).json({ success: false, message: 'Could not send message. Please email me directly at Harrysevilla567@gmail.com' });
    }
};
