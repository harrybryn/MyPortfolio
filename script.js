document.addEventListener('DOMContentLoaded', () => {
    // ── 1. 3-Option Theme Controller with Bryl Lim Circular Wipe Animation ──
    const KEY = 'portfolio-theme';
    const root = document.documentElement;
    const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animT;

    function getPref() {
        try {
            const v = localStorage.getItem(KEY);
            return (v === 'dark' || v === 'light' || v === 'system') ? v : 'system';
        } catch (e) {
            return 'system';
        }
    }

    function isDarkTheme(p) {
        return p === 'dark' || (p === 'system' && !!mq && mq.matches);
    }

    function syncThemeUI(p) {
        const dark = isDarkTheme(p);
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        document.querySelectorAll('[data-theme-opt]').forEach(el => {
            el.classList.toggle('is-active', el.getAttribute('data-theme-opt') === p);
        });
        if (window.lucide) lucide.createIcons();
    }

    function crossfadeTheme(p) {
        root.classList.add('theme-anim');
        syncThemeUI(p);
        clearTimeout(animT);
        animT = setTimeout(() => {
            root.classList.remove('theme-anim');
        }, 520);
    }

    function revealTheme(p, x, y) {
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const vt = document.startViewTransition(() => {
            syncThemeUI(p);
        });
        vt.ready.then(() => {
            root.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${r}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 540,
                    easing: 'cubic-bezier(.32,.08,.24,1)',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        }).catch(() => {});
    }

    window.setPortfolioTheme = function (p, ev) {
        try { localStorage.setItem(KEY, p); } catch (e) {}
        const wasDark = root.getAttribute('data-theme') === 'dark';
        const willBeDark = isDarkTheme(p);

        if (wasDark === willBeDark) {
            syncThemeUI(p);
            return;
        }

        if (reduce || !document.startViewTransition) {
            crossfadeTheme(p);
            return;
        }

        let x = window.innerWidth / 2;
        let y = 0;
        if (ev && typeof ev.clientX === 'number' && ev.clientX > 0) {
            x = ev.clientX;
            y = ev.clientY;
        } else if (ev && ev.currentTarget) {
            const rect = ev.currentTarget.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        revealTheme(p, x, y);
    };

    // Attach listeners to all 3-option buttons
    document.querySelectorAll('[data-theme-opt]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const opt = btn.getAttribute('data-theme-opt');
            window.setPortfolioTheme(opt, ev);
        });
    });

    // Also support single toggle button fallback if present
    const legacyToggle = document.getElementById('theme-toggle');
    if (legacyToggle) {
        legacyToggle.addEventListener('click', (ev) => {
            const current = root.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            window.setPortfolioTheme(next, ev);
        });
    }

    // Initial sync
    syncThemeUI(getPref());

    // Listen to system OS preference changes
    if (mq) {
        mq.addEventListener('change', () => {
            if (getPref() === 'system') {
                crossfadeTheme('system');
            }
        });
    }

    // Keep tabs in sync if user toggles in another tab
    window.addEventListener('storage', (e) => {
        if (e.key === KEY) {
            syncThemeUI(getPref());
        }
    });

    // ── 1b. Mobile Navigation Menu Toggle ────────────────────────────────
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const isOpen = navMenu.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            if (window.lucide) lucide.createIcons();
        }

        function closeMenu() {
            if (navMenu.classList.contains('is-open')) {
                navMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) lucide.createIcons();
            }
        }

        menuToggle.addEventListener('click', toggleMenu);

        // Close dropdown when clicking any navigation link or CTA button inside
        navMenu.querySelectorAll('.nav-item, .nav-menu-cta-btn').forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    // ── 2. Live Manila Time Indicator ───────────────────────────────────
    const liveTimeEl = document.getElementById('liveTimeText');
    function updateLiveTime() {
        if (!liveTimeEl) return;
        const now = new Date();
        const options = {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat([], options);
        liveTimeEl.textContent = `${formatter.format(now)} UTC+8`;
    }
    updateLiveTime();
    setInterval(updateLiveTime, 10000);

    // ── 2b. Hero Bio Expand / Collapse (Merged About Me) ─────────────────
    const heroBioToggle = document.getElementById('heroBioToggle');
    const heroBioExpanded = document.getElementById('heroBioExpanded');
    const heroBioToggleText = document.getElementById('heroBioToggleText');

    if (heroBioToggle && heroBioExpanded) {
        heroBioToggle.addEventListener('click', () => {
            const isExpanded = heroBioToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                heroBioExpanded.hidden = true;
                heroBioToggle.setAttribute('aria-expanded', 'false');
                if (heroBioToggleText) heroBioToggleText.textContent = 'See more about me';
            } else {
                heroBioExpanded.hidden = false;
                heroBioToggle.setAttribute('aria-expanded', 'true');
                if (heroBioToggleText) heroBioToggleText.textContent = 'See less';
            }
            if (window.lucide) lucide.createIcons();
        });
    }

    // ── 3. Ethereal 3D Cover Flow Carousel Engine ────────────────────────
    const coverflowStage = document.getElementById('coverflowStage');
    const cfCards = document.querySelectorAll('.cf-card');
    const cfPrevBtn = document.getElementById('cfPrevBtn');
    const cfNextBtn = document.getElementById('cfNextBtn');
    const cfCurrent = document.getElementById('cfCurrent');
    const cfDots = document.querySelectorAll('.cf-dot');
    const cfTitle = document.getElementById('cfTitle');
    const cfBadge = document.getElementById('cfBadge');
    const cfYear = document.getElementById('cfYear');
    const cfDesc = document.getElementById('cfDesc');
    const cfTags = document.getElementById('cfTags');
    const cfHeartBtn = document.getElementById('cfHeartBtn');
    const cfDetailToggle = document.getElementById('cfDetailToggle');
    const cfDetailPanel = document.getElementById('cfDetailPanel');
    const cfDeliverables = document.getElementById('cfDeliverables');
    const cfArchitecture = document.getElementById('cfArchitecture');
    const cfInfoLogo = document.getElementById('cfInfoLogo');

    const projectsData = [
        {
            title: 'ANI-GROW: AI-Powered Poultry & Livestock Farming Guide',
            badge: 'Poultry & Livestock Analytics',
            year: '2026',
            logo: 'assets/anigrow_logo.png',
            desc: 'A mobile application that helps farm animal caretakers manage poultry and livestock operations using AI guidance and data analytics. Supports and integrates with custom IoT machines for weight-based segregation and automated feeding of farm animals.',
            tags: ['React Native', 'IoT Integration', 'AI Analytics', 'Agricultural Tech'],
            deliverables: [
                'Real-time animal weight telemetry and automatic sorting gates',
                'Automated scheduling and dosage controls for feeding dispensers',
                'Offline-first mobile data sync for farm field workers'
            ],
            architecture: 'Built with a cross-platform React Native frontend communicating with sensor hubs via REST & MQTT protocols. Backend processes real-time feed analytics and stores event logs in a normalized schema.'
        },
        {
            title: 'TOURGO: Collaborative Group Travel Platform',
            badge: 'Group Travel & Itinerary Platform',
            year: '2026',
            logo: 'assets/TourGoAppLogo.png',
            desc: 'A cross-platform mobile application for group trip planning featuring join-code enrollment, collaborative itineraries, real-time chat, polls, and shared expense splitting. Integrates Google Gemini AI for personalized day-plan generation and Expo push notifications.',
            tags: ['React Native', 'Google Gemini AI', 'Expo Push', 'Real-Time Chat', 'Travel Tech'],
            deliverables: [
                '6-digit join-code trip onboarding with real-time room chat and polls',
                'Automated group expense split calculator with multi-currency balance tracking',
                'AI itinerary generator powered by Google Gemini 1.5 Flash'
            ],
            architecture: 'Engineered with React Native / Expo utilizing client-side optimistic UI updates for real-time messaging, paired with cloud functions orchestrating Gemini AI prompts.'
        },
        {
            title: 'BINHI CONCEPT: Lights and Sounds Booking Management System',
            badge: 'Event Production Suite',
            year: '2026',
            logo: 'assets/BINHI Concept Logo.webp',
            desc: 'A complete website for lights and sound booking and management, with separate portals for admins, crew, customers/clients, and affiliates. Includes automated booking pipeline, interactive price builder, customer Wishlist, and SMS OTP verification.',
            tags: ['React', 'React Native', 'Backend Architecture', 'Price Builder', 'OTP Verification'],
            deliverables: [
                'Four dedicated portals: Admin, Field Crew, Client, and Affiliate dashboards',
                'Interactive live package quotation & custom equipment price builder',
                'Automated booking reservation timeline with SMS OTP verification'
            ],
            architecture: 'Modular React web architecture paired with RESTful backend endpoints, SMS gateway webhooks, and transactional booking status management.'
        },
        {
            title: 'COLM Pulilan: Employee Management & Institutional Records Portal',
            badge: 'Institutional Client · Deployment Phase',
            year: '2026',
            logo: 'assets/COLM_Pulilan_logo.png',
            desc: 'A comprehensive staff records and personnel management web system commissioned for College of Our Lady of Mercy (Pulilan, Bulacan). Currently in final preparations for official production deployment, managing faculty profiles, department taxonomies, digital leave filing, and multi-level administrative approvals.',
            tags: ['React', 'PHP', 'MySQL', 'Institutional Client', 'HR & Records', 'Live Deployment'],
            deliverables: [
                'Centralized institutional employee personnel database with department taxonomy',
                'Digital leave request workflow with multi-level administrative authorization',
                'Comprehensive audit logging for employee record updates and administrative actions'
            ],
            architecture: 'Engineered with React frontend architecture paired with PHP backend services and normalized MySQL relational schema using PDO prepared transactions to ensure strict integrity for institutional records.'
        }
    ];

    if (cfCards.length) {
        let currentIndex = 0;
        const total = cfCards.length;

        function updateCoverflow(newIndex) {
            currentIndex = (newIndex + total) % total;

            // Update card states
            cfCards.forEach((card, idx) => {
                card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-left', 'is-hidden-right');
                
                // Calculate modular circular distance
                let diff = idx - currentIndex;
                while (diff > total / 2) diff -= total;
                while (diff < -total / 2) diff += total;

                if (diff === 0) {
                    card.classList.add('is-active');
                } else if (diff === -1) {
                    card.classList.add('is-prev');
                } else if (diff === 1) {
                    card.classList.add('is-next');
                } else if (diff < -1) {
                    card.classList.add('is-hidden-left');
                } else {
                    card.classList.add('is-hidden-right');
                }
            });

            // Update Slide Counter (e.g., "01")
            if (cfCurrent) {
                cfCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
            }

            // Update Indicator Dots
            cfDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });

            // Update Project Meta Dossier
            const curData = projectsData[currentIndex];
            if (curData) {
                if (cfInfoLogo && curData.logo) {
                    cfInfoLogo.src = curData.logo;
                    cfInfoLogo.alt = curData.title;
                }
                if (cfTitle) cfTitle.textContent = curData.title;
                if (cfBadge) cfBadge.textContent = curData.badge;
                if (cfYear) cfYear.textContent = curData.year;
                if (cfDesc) cfDesc.textContent = curData.desc;
                if (cfTags) {
                    cfTags.innerHTML = curData.tags.map(t => `<span class="tag">${t}</span>`).join('');
                }
                if (cfDeliverables && curData.deliverables) {
                    cfDeliverables.innerHTML = curData.deliverables.map(item => `<li>${item}</li>`).join('');
                }
                if (cfArchitecture && curData.architecture) {
                    cfArchitecture.textContent = curData.architecture;
                }
            }
        }

        // Click on Cards (clicking prev or next card activates it)
        cfCards.forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(idx) && idx !== currentIndex) {
                    updateCoverflow(idx);
                }
            });
        });

        // Nav Buttons
        if (cfPrevBtn) cfPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCoverflow(currentIndex - 1);
        });

        if (cfNextBtn) cfNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCoverflow(currentIndex + 1);
        });

        // Dots Click
        cfDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(idx)) updateCoverflow(idx);
            });
        });

        // Touch Swipe
        let touchStartX = 0;
        if (coverflowStage) {
            coverflowStage.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].clientX;
            }, { passive: true });

            coverflowStage.addEventListener('touchend', (e) => {
                const deltaX = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(deltaX) > 40) {
                    updateCoverflow(currentIndex + (deltaX > 0 ? 1 : -1));
                }
            });

            // Keyboard navigation
            window.addEventListener('keydown', (e) => {
                const rect = coverflowStage.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInView) {
                    if (e.key === 'ArrowLeft') updateCoverflow(currentIndex - 1);
                    if (e.key === 'ArrowRight') updateCoverflow(currentIndex + 1);
                }
            });
        }

        // Expandable Project Detail Toggle
        if (cfDetailToggle && cfDetailPanel) {
            cfDetailToggle.addEventListener('click', () => {
                const isExpanded = cfDetailToggle.getAttribute('aria-expanded') === 'true';
                cfDetailToggle.setAttribute('aria-expanded', !isExpanded);
                cfDetailPanel.hidden = isExpanded;
                const toggleText = cfDetailToggle.querySelector('.cf-toggle-text');
                if (toggleText) {
                    toggleText.textContent = isExpanded 
                        ? 'Show System Architecture & Deliverables' 
                        : 'Hide Technical Details';
                }
                if (window.lucide) lucide.createIcons();
            });
        }

        // Heart like toggle
        if (cfHeartBtn) {
            cfHeartBtn.addEventListener('click', () => {
                cfHeartBtn.classList.toggle('is-liked');
            });
        }

        // Initial setup
        updateCoverflow(0);
    }

    // ── 4. Contact Modal Controller ─────────────────────────────────────
    const contactModal = document.getElementById('contactModal');
    const contactModalClose = document.getElementById('contactModalClose');
    const contactModalBackdrop = document.getElementById('contactModalBackdrop');
    const modalTriggers = document.querySelectorAll('.open-contact-modal');

    function openContactModal() {
        if (!contactModal) return;
        contactModal.classList.add('is-open');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const nameInput = document.getElementById('name');
        if (nameInput) setTimeout(() => nameInput.focus(), 150);
        if (window.lucide) lucide.createIcons();
    }

    function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('is-open');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    });

    if (contactModalClose) {
        contactModalClose.addEventListener('click', closeContactModal);
    }

    if (contactModalBackdrop) {
        contactModalBackdrop.addEventListener('click', closeContactModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('is-open')) {
            closeContactModal();
        }
    });

    // ── 5. Contact Form AJAX Submission ─────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('send-btn');
            const btnText = document.getElementById('send-btn-text');
            const status = document.getElementById('form-status');

            btn.disabled = true;
            btnText.textContent = 'Sending...';
            status.textContent = '';
            status.className = 'form-status';

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
                    status.textContent = 'Message sent successfully. I will get back to you soon.';
                    status.className = 'form-status form-status--success';
                    contactForm.reset();
                } else {
                    status.textContent = data.message || 'Something went wrong. Please try again.';
                    status.className = 'form-status form-status--error';
                }
            } catch (err) {
                status.textContent = 'Message could not be sent. Please email directly at Harrysevilla567@gmail.com.';
                status.className = 'form-status form-status--error';
            } finally {
                btn.disabled = false;
                btnText.textContent = 'send message →';
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // Refresh icons
    if (window.lucide) lucide.createIcons();

    // ==========================================================================
    // 5. Isometric Hatched Cube Tessellation with Subtle Shimmering Glowing Engine
    // ==========================================================================
    (() => {
        let canvas = document.getElementById('bgInteractiveCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.className = 'bg-interactive-canvas';
            canvas.id = 'bgInteractiveCanvas';
            document.body.prepend(canvas);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Isometric Cube Geometry
        const R = 44; // Outer radius of isometric cube
        const dx = R * 0.8660254; // R * cos(30 deg)
        const dy = R * 0.5;       // R * sin(30 deg)
        const stepX = dx * 2;     // Column spacing
        const stepY = R * 1.5;    // Row spacing
        const LINE_SPACING = 4.2; // Fine "dikit dikit" line spacing inside each face

        let cols = 0;
        let rows = 0;
        let cubes = [];

        // Interactive tracking
        let mouseX = -9999;
        let mouseY = -9999;
        let targetMouseX = -9999;
        let targetMouseY = -9999;
        let isHovering = false;
        let isVisible = true;

        // Ambient Shimmering Cubes (Obsidian "glimpses of glowing shining everywhere")
        const AMBIENT_SHIMMER_COUNT = 52; // More frequent (mas madalas) ambient glistening
        const ambientShimmers = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cols = Math.ceil(width / stepX) + 3;
            rows = Math.ceil(height / stepY) + 3;

            initGrid();
            initAmbientShimmers();
        }

        function initGrid() {
            cubes = [];
            for (let r = -2; r < rows; r++) {
                const isOdd = (Math.abs(r) % 2 === 1);
                const xOffset = isOdd ? dx : 0;
                for (let c = -2; c < cols; c++) {
                    const cx = c * stepX + xOffset;
                    const cy = r * stepY;
                    cubes.push({
                        cx,
                        cy,
                        r,
                        c,
                        glow: 0,
                        elevation: 0,
                        lastHovered: 0
                    });
                }
            }
        }

        function createShimmer(now) {
            const index = Math.floor(Math.random() * (cubes.length || 100));
            // Restrained peak alpha so it stays tasteful and never overpowers content
            const peakAlpha = 0.07 + Math.random() * 0.15;
            // Shorter duration between 1.4s and 2.8s so shimmers cycle rapidly and frequently
            const duration = 1400 + Math.random() * 1400;
            const startTime = now !== undefined ? now + Math.random() * 800 : performance.now() + Math.random() * 1200;
            return {
                index,
                peakAlpha,
                birth: startTime,
                duration
            };
        }

        function initAmbientShimmers() {
            ambientShimmers.length = 0;
            const now = performance.now();
            for (let i = 0; i < AMBIENT_SHIMMER_COUNT; i++) {
                ambientShimmers.push(createShimmer(now - Math.random() * 2000));
            }
        }

        // Pointer listeners
        window.addEventListener('pointermove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
            if (!isHovering) {
                mouseX = targetMouseX;
                mouseY = targetMouseY;
                isHovering = true;
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            isHovering = false;
        });

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible) {
                lastTime = performance.now();
                requestAnimationFrame(render);
            }
        });

        window.addEventListener('resize', resize, { passive: true });
        resize();

        // Helper: Draw single face with hatched lines
        function drawFace(p1, p2, p3, p4, angle, lineSpacing, strokeColor, borderColor, fillColor, hatchWidth = 0.65, borderWidth = 0.8) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();

            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }

            // Clip strictly to polygon boundary
            ctx.clip();

            // Draw parallel hatch lines inside face
            ctx.beginPath();
            ctx.lineWidth = hatchWidth;
            ctx.strokeStyle = strokeColor;

            const minX = Math.min(p1.x, p2.x, p3.x, p4.x) - 4;
            const maxX = Math.max(p1.x, p2.x, p3.x, p4.x) + 4;
            const minY = Math.min(p1.y, p2.y, p3.y, p4.y) - 4;
            const maxY = Math.max(p1.y, p2.y, p3.y, p4.y) + 4;

            if (angle === Math.PI / 2) {
                // Vertical lines (Left face, matches user reference image)
                for (let x = minX; x <= maxX; x += lineSpacing) {
                    ctx.moveTo(x, minY);
                    ctx.lineTo(x, maxY);
                }
            } else {
                // Angled lines (Top and Right faces, matches user reference image)
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const normX = -sinA;
                const normY = cosA;

                const pts = [p1, p2, p3, p4];
                let minD = Infinity;
                let maxD = -Infinity;
                for (let i = 0; i < 4; i++) {
                    const d = pts[i].x * normX + pts[i].y * normY;
                    if (d < minD) minD = d;
                    if (d > maxD) maxD = d;
                }

                const lineLen = Math.hypot(maxX - minX, maxY - minY) * 1.5;
                for (let d = minD - lineSpacing; d <= maxD + lineSpacing; d += lineSpacing) {
                    const px = d * normX;
                    const py = d * normY;
                    ctx.moveTo(px - lineLen * cosA, py - lineLen * sinA);
                    ctx.lineTo(px + lineLen * cosA, py + lineLen * sinA);
                }
            }
            ctx.stroke();
            ctx.restore();

            // Clean crisp face border
            if (borderColor) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.lineTo(p4.x, p4.y);
                ctx.closePath();
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = borderWidth;
                ctx.stroke();
            }
        }

        let lastTime = performance.now();

        function render(now) {
            if (!isVisible) return;
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

            // Smooth cursor interpolation
            if (isHovering) {
                mouseX += (targetMouseX - mouseX) * 0.14;
                mouseY += (targetMouseY - mouseY) * 0.14;
            } else {
                mouseX += (-9999 - mouseX) * 0.05;
                mouseY += (-9999 - mouseY) * 0.05;
            }

            // Update ambient shimmers
            const activeShimmerAlphas = new Map();
            for (let i = 0; i < ambientShimmers.length; i++) {
                const s = ambientShimmers[i];
                const age = now - s.birth;
                if (age > s.duration) {
                    ambientShimmers[i] = createShimmer(now);
                    continue;
                }
                if (age < 0) continue;

                const progress = age / s.duration;
                const alphaFactor = Math.sin(progress * Math.PI);
                const alpha = s.peakAlpha * Math.pow(alphaFactor, 1.4);
                if (alpha > 0.005) {
                    activeShimmerAlphas.set(s.index, alpha);
                }
            }

            const HOVER_RADIUS = 210;

            // Render all isometric cubes
            for (let i = 0; i < cubes.length; i++) {
                const cube = cubes[i];

                // Fast bounds culling
                if (cube.cx < -R * 2 || cube.cx > width + R * 2 || cube.cy < -R * 2 || cube.cy > height + R * 2) {
                    continue;
                }

                // Mouse proximity & Hover interaction
                const dist = Math.hypot(mouseX - cube.cx, mouseY - cube.cy);

                if (dist < HOVER_RADIUS) {
                    const factor = 1 - dist / HOVER_RADIUS;
                    const smooth = factor * factor * (3 - 2 * factor);
                    const targetIntensity = smooth;

                    if (targetIntensity > cube.glow) {
                        cube.glow = targetIntensity;
                        cube.elevation = targetIntensity * 7;
                        cube.lastHovered = now;
                    }
                }

                // Lingering delay after mouse hovers over it ("effects will last after mouse hovers it")
                const HOLD_DELAY = 450; // Milliseconds to hold peak effect before beginning fade
                const timeSinceHover = now - (cube.lastHovered || 0);

                if (timeSinceHover > HOLD_DELAY && cube.glow > 0.001) {
                    // Smooth, luxurious decay over ~1.6 seconds
                    cube.glow = Math.max(0, cube.glow - dt * 0.6);
                    cube.elevation = cube.glow * 7;
                }

                // Add ambient shimmer
                const ambientAlpha = activeShimmerAlphas.get(i) || 0;

                // Combined visual intensity (hover glow + ambient shimmer)
                const totalGlow = Math.min(cube.glow + ambientAlpha * 2.2, 1);

                // Vertices
                const cx = cube.cx;
                const cy = cube.cy - cube.elevation;
                const C = { x: cx, y: cy };
                const V_top = { x: cx, y: cy - R };
                const V_tr = { x: cx + dx, y: cy - dy };
                const V_br = { x: cx + dx, y: cy + dy };
                const V_bot = { x: cx, y: cy + R };
                const V_bl = { x: cx - dx, y: cy + dy };
                const V_tl = { x: cx - dx, y: cy - dy };

                // Ultra-calm styling so it NEVER overpowers content:
                let strokeColor, borderColor, fillColor;
                const hlw = 0.55 + totalGlow * 0.35;
                const blw = 0.7 + totalGlow * 0.4;

                if (isDark) {
                    // Resting state: whisper faint (0.026 hatch, 0.045 border)
                    const baseHatchAlpha = 0.026;
                    const baseBorderAlpha = 0.045;

                    if (totalGlow > 0.01) {
                        const hA = (baseHatchAlpha + totalGlow * 0.22).toFixed(3);
                        const bA = (baseBorderAlpha + totalGlow * 0.28).toFixed(3);
                        strokeColor = `rgba(255, 255, 255, ${hA})`;
                        borderColor = `rgba(255, 255, 255, ${bA})`;
                        fillColor = `rgba(255, 255, 255, ${(totalGlow * 0.08).toFixed(3)})`;
                    } else {
                        strokeColor = `rgba(255, 255, 255, ${baseHatchAlpha})`;
                        borderColor = `rgba(255, 255, 255, ${baseBorderAlpha})`;
                        fillColor = null;
                    }
                } else {
                    const baseHatchAlpha = 0.03;
                    const baseBorderAlpha = 0.05;

                    if (totalGlow > 0.01) {
                        const hA = (baseHatchAlpha + totalGlow * 0.2).toFixed(3);
                        const bA = (baseBorderAlpha + totalGlow * 0.25).toFixed(3);
                        strokeColor = `rgba(0, 0, 0, ${hA})`;
                        borderColor = `rgba(0, 0, 0, ${bA})`;
                        fillColor = `rgba(0, 0, 0, ${(totalGlow * 0.045).toFixed(3)})`;
                    } else {
                        strokeColor = `rgba(0, 0, 0, ${baseHatchAlpha})`;
                        borderColor = `rgba(0, 0, 0, ${baseBorderAlpha})`;
                        fillColor = null;
                    }
                }

                // 1. TOP FACE [C, V_tr, V_top, V_tl] - angled lines (-30 deg)
                drawFace(C, V_tr, V_top, V_tl, -Math.PI / 6, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);

                // 2. LEFT FACE [C, V_tl, V_bl, V_bot] - vertical lines (90 deg)
                drawFace(C, V_tl, V_bl, V_bot, Math.PI / 2, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);

                // 3. RIGHT FACE [C, V_bot, V_br, V_tr] - angled lines (+30 deg)
                drawFace(C, V_bot, V_br, V_tr, Math.PI / 6, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    })();
});
