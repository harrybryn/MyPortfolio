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
    // 5. Obsidian Official Platform Background Grid Engine (1:1 Replica)
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

        // Official Obsidian Configuration
        const n = 48;       // 48px tile size
        const k = 0.24;     // 24% ambient density
        const K = 1100;     // 1100ms hover burst lifetime
        const V = 1600;     // 1600ms drag burst lifetime
        const W = 450;      // 450ms hover cooldown
        const J = 220;      // 220ms drag cooldown
        const B = 60;       // max active burst count
        const Q = 2000;     // purge interval

        // Content exclusion bounds (protects text & readability)
        const isUnderText = (x, y, w, h) => {
            const bound = w < 768 ? { w: 1, h: 0.55 } : { w: 0.6, h: 1 };
            return x < bound.w * w && y < bound.h * h;
        };

        let ambientTiles = [];
        let bursts = [];
        const cooldownMap = new Map();
        let isDragging = false;
        let isVisible = true;
        let pendingFrame = false;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            initAmbientTiles();
        }

        function initAmbientTiles() {
            const cols = Math.ceil(width / n);
            const rows = Math.ceil(height / n);
            ambientTiles = [];

            if (cols === 0 || rows === 0) return;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * n;
                    const y = r * n;
                    const underText = isUnderText(x, y, width, height);
                    const prob = underText ? k * 0.2 : k;

                    if (Math.random() < prob) {
                        ambientTiles.push({
                            x,
                            y,
                            gradIdx: Math.floor(Math.random() * 4), // 0: Top, 1: Right, 2: Bottom, 3: Left
                            maxOpacity: underText ? 0.06 + Math.random() * 0.12 : 0.15 + Math.random() * 0.3,
                            delay: Math.random() * 6,
                            duration: 2 + Math.random() * 4
                        });
                    }
                }
            }
        }

        // Spawn interactive burst tiles
        function spawnBurst(clientX, clientY, isDrag) {
            const G = isDrag ? 1 + Math.floor(Math.random() * 3) : 1;
            const S = isDrag ? n * 2.5 : n * 1.4;
            const cooldown = isDrag ? J : W;
            const lifetime = isDrag ? V : K;
            const now = performance.now();
            const newBursts = [];

            for (let i = 0; i < G; i++) {
                const offX = (Math.random() - 0.5) * S;
                const offY = (Math.random() - 0.5) * S;
                const tileX = Math.floor((clientX + offX) / n) * n;
                const tileY = Math.floor((clientY + offY) / n) * n;

                if (tileX < 0 || tileY < 0 || tileX + n > width || tileY + n > height) continue;

                const key = `${tileX},${tileY}`;
                const lastTime = cooldownMap.get(key);
                if (lastTime && now - lastTime < cooldown) continue;

                cooldownMap.set(key, now);
                newBursts.push({
                    x: tileX,
                    y: tileY,
                    gradIdx: Math.floor(Math.random() * 4),
                    maxOpacity: isDrag ? 0.3 + Math.random() * 0.25 : 0.15 + Math.random() * 0.2,
                    birth: now,
                    lifetime,
                    expiresAt: now + lifetime
                });
            }

            if (newBursts.length > 0) {
                bursts.push(...newBursts);
                if (bursts.length > B) {
                    bursts.splice(0, bursts.length - B);
                }
            }
        }

        // Pointer listeners
        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                isDragging = true;
                spawnBurst(e.clientX, e.clientY, true);
            }
        }, { passive: true });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            if (!pendingFrame) {
                pendingFrame = true;
                requestAnimationFrame(() => {
                    pendingFrame = false;
                    spawnBurst(e.clientX, e.clientY, isDragging);
                });
            }
        }, { passive: true });

        window.addEventListener('blur', () => {
            isDragging = false;
        });

        // Periodic cleanup of cooldown map
        setInterval(() => {
            const now = performance.now();
            cooldownMap.forEach((time, key) => {
                if (now - time > Q) cooldownMap.delete(key);
            });
        }, 500);

        // Visibility optimization
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible) requestAnimationFrame(render);
        });

        window.addEventListener('resize', resize, { passive: true });
        resize();

        // Directional Gradient Drawer (matches Obsidian's 4 rotated linear gradients)
        function drawTileGradient(x, y, gradIdx, opacity, isDark) {
            ctx.save();
            ctx.globalAlpha = opacity;

            let grad;
            if (gradIdx === 0) {
                // 0 deg: Top to Bottom
                grad = ctx.createLinearGradient(x, y, x, y + n);
            } else if (gradIdx === 1) {
                // 90 deg: Left to Right
                grad = ctx.createLinearGradient(x, y, x + n, y);
            } else if (gradIdx === 2) {
                // 180 deg: Bottom to Top
                grad = ctx.createLinearGradient(x, y + n, x, y);
            } else {
                // 270 deg: Right to Left
                grad = ctx.createLinearGradient(x + n, y, x, y);
            }

            const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
            const baseStrength = isDark ? 0.45 : 0.3;

            grad.addColorStop(0, `rgba(${baseColor}, ${baseStrength})`);
            grad.addColorStop(1, `rgba(${baseColor}, 0)`);

            ctx.fillStyle = grad;
            ctx.fillRect(x, y, n, n);
            ctx.restore();
        }

        function render(now) {
            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

            // 1. Draw base square grid pattern (Obsidian M 48 0 L 0 0 0 48)
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

            for (let x = 0; x <= width + n; x += n) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, height);
            }
            for (let y = 0; y <= height + n; y += n) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(width, y + 0.5);
            }
            ctx.stroke();

            const sec = now / 1000;

            // 2. Render Ambient Strobe Tiles (Obsidian hero-grid-strobe animation)
            for (let i = 0; i < ambientTiles.length; i++) {
                const t = ambientTiles[i];
                const cycleTime = (sec - t.delay) % t.duration;
                if (cycleTime < 0) continue;

                const progress = cycleTime / t.duration;
                let opacity = 0;

                // Obsidian @keyframes hero-grid-strobe:
                // 0%, 100% { opacity: 0; }
                // 40%, 60% { opacity: var(--strobe-max); }
                if (progress < 0.4) {
                    opacity = (progress / 0.4) * t.maxOpacity;
                } else if (progress <= 0.6) {
                    opacity = t.maxOpacity;
                } else {
                    opacity = ((1 - progress) / 0.4) * t.maxOpacity;
                }

                if (opacity > 0.005) {
                    drawTileGradient(t.x, t.y, t.gradIdx, opacity, isDark);
                }
            }

            // 3. Render Interactive Burst Tiles (Obsidian hero-grid-burst animation)
            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i];
                const elapsed = now - b.birth;

                if (elapsed >= b.lifetime) {
                    bursts.splice(i, 1);
                    continue;
                }

                const progress = elapsed / b.lifetime;
                let opacity = 0;

                // Obsidian @keyframes hero-grid-burst:
                // 0% { opacity: 0; }
                // 15% { opacity: var(--burst-max); }
                // 100% { opacity: 0; }
                if (progress < 0.15) {
                    opacity = (progress / 0.15) * b.maxOpacity;
                } else {
                    opacity = ((1 - progress) / 0.85) * b.maxOpacity;
                }

                if (opacity > 0.005) {
                    drawTileGradient(b.x, b.y, b.gradIdx, opacity, isDark);
                }
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    })();
});
