document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    }

    mobileBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in and fade-in-up classes
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Trigger initial scroll to set active state and navbar style if loaded scrolled down
    window.dispatchEvent(new Event('scroll'));

    // ── Carousel Initialization ──────────────────────────────────────────
    function initCarousel(carouselEl) {
        const track = carouselEl.querySelector('.carousel-track');
        const slides = carouselEl.querySelectorAll('.carousel-slide');
        const prevBtn = carouselEl.querySelector('.carousel-prev');
        const nextBtn = carouselEl.querySelector('.carousel-next');
        const dotsContainer = carouselEl.querySelector('.carousel-dots');

        if (!slides.length) return;

        let current = 0;
        let autoplayTimer = null;

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
        nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

        // Keyboard support when focused
        carouselEl.setAttribute('tabindex', '0');
        carouselEl.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { goTo(current - 1); resetAutoplay(); }
            if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoplay(); }
        });

        // Touch / swipe support
        let touchStartX = 0;
        carouselEl.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        carouselEl.addEventListener('touchend', (e) => {
            const delta = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) { goTo(current + (delta > 0 ? 1 : -1)); resetAutoplay(); }
        });

        // Auto-play every 3s, pause on hover
        function startAutoplay() {
            autoplayTimer = setInterval(() => goTo(current + 1), 3000);
        }
        function stopAutoplay() { clearInterval(autoplayTimer); }
        function resetAutoplay() { stopAutoplay(); startAutoplay(); }

        carouselEl.addEventListener('mouseenter', stopAutoplay);
        carouselEl.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    document.querySelectorAll('.carousel').forEach(initCarousel);
    // Reinitialize Lucide icons after DOM updates
    if (window.lucide) lucide.createIcons();

    // ── Contact Form AJAX Submission ──────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn      = document.getElementById('send-btn');
            const btnText  = document.getElementById('send-btn-text');
            const status   = document.getElementById('form-status');

            // Loading state
            btn.disabled   = true;
            btnText.textContent = 'Sending...';
            status.textContent  = '';
            status.className    = 'form-status';

            try {
                const formData = new FormData(contactForm);
                const body = Object.fromEntries(formData.entries());
                const res = await fetch('/api/send-mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                const data = await res.json();

                if (data.success) {
                    status.textContent = '✓ ' + data.message;
                    status.className   = 'form-status form-status--success';
                    contactForm.reset();
                } else {
                    status.textContent = '✗ ' + data.message;
                    status.className   = 'form-status form-status--error';
                }
            } catch (err) {
                status.textContent = '✗ Something went wrong. Please try again.';
                status.className   = 'form-status form-status--error';
            } finally {
                btn.disabled        = false;
                btnText.textContent = 'Send Message';
                if (window.lucide) lucide.createIcons();
            }
        });
    }
});
