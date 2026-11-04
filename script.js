document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 0. Minimalist Programmer Typing & Monogram Splash Screen (Exact 8.0s)
    // Tactile Mechanical Keyboard Typing -> Seamless Morph into < HS /> Monogram
    // 100% Automatic Sound with Zero Tap UI & Zero Highlight Artifacts
    // ==========================================================================
    (() => {
        const splash = document.getElementById('splashScreen');
        if (!splash) return;

        const container = document.getElementById('splashLetterContainer');
        const splashAudio = document.getElementById('splashAudio') || new Audio('assets/ta-dum.wav');

        // Preload Mechanical Keyboard Switch Audio Files
        const mechAudios = {
            keys: [
                new Audio('assets/mech-key1.wav'),
                new Audio('assets/mech-key2.wav'),
                new Audio('assets/mech-key3.wav')
            ],
            space: new Audio('assets/mech-space.wav')
        };
        mechAudios.keys.forEach(a => { a.preload = 'auto'; a.volume = 0.85; });
        mechAudios.space.preload = 'auto';
        mechAudios.space.volume = 0.9;

        const FULL_NAME = "Harry Sevilla";
        // 'H' is at index 0, 'S' is at index 6
        const INITIAL_INDICES = [0, 6];

        let timeouts = [];
        let typingTimeout = null;
        let isComplete = false;
        let soundHasPlayed = false;
        let mechKeyCounter = 0;

        function clearScheduledTimeouts() {
            timeouts.forEach(t => clearTimeout(t));
            timeouts = [];
            if (typingTimeout) {
                clearTimeout(typingTimeout);
                typingTimeout = null;
            }
        }

        // Web Audio API Context
        let audioCtx = null;
        function getAudioContext() {
            if (!audioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    audioCtx = new AudioCtxClass();
                }
            }
            return audioCtx;
        }

        // Preload Web Audio Buffers for Zero-Latency Mechanical Clicks
        let keyBuffers = [];
        let spaceBuffer = null;
        async function preloadMechAudioBuffers() {
            const ctx = getAudioContext();
            if (!ctx) return;
            const loadBuf = async (url) => {
                try {
                    const res = await fetch(url);
                    const arr = await res.arrayBuffer();
                    return await ctx.decodeAudioData(arr);
                } catch (e) {
                    return null;
                }
            };
            try {
                const [b1, b2, b3, bs] = await Promise.all([
                    loadBuf('assets/mech-key1.wav'),
                    loadBuf('assets/mech-key2.wav'),
                    loadBuf('assets/mech-key3.wav'),
                    loadBuf('assets/mech-space.wav')
                ]);
                if (b1) keyBuffers.push(b1);
                if (b2) keyBuffers.push(b2);
                if (b3) keyBuffers.push(b3);
                if (bs) spaceBuffer = bs;
            } catch (e) {}
        }
        preloadMechAudioBuffers();

        // Play authentic mechanical keyboard click (dual-engine: audio buffer + synthesized snap)
        function playMechanicalKeyClick(isSpace) {
            // 1. Play real mechanical audio sample via Web Audio Buffer (if unlocked)
            const ctx = getAudioContext();
            if (ctx && ctx.state === 'running') {
                try {
                    const buf = isSpace ? spaceBuffer : (keyBuffers.length ? keyBuffers[mechKeyCounter % keyBuffers.length] : null);
                    if (buf) {
                        const src = ctx.createBufferSource();
                        const gain = ctx.createGain();
                        src.buffer = buf;
                        // Subtle natural pitch variance (0.96x - 1.04x)
                        src.playbackRate.value = 0.96 + Math.random() * 0.08;
                        gain.gain.value = isSpace ? 0.95 : 0.85;
                        src.connect(gain);
                        gain.connect(ctx.destination);
                        src.start(0);
                    } else {
                        synthesizeTactileSwitch(ctx, isSpace);
                    }
                } catch (e) {
                    synthesizeTactileSwitch(ctx, isSpace);
                }
            }

            // 2. Play HTML5 Audio as companion/fallback
            try {
                const audioEl = isSpace ? mechAudios.space : mechAudios.keys[mechKeyCounter % mechAudios.keys.length];
                if (audioEl) {
                    const clone = audioEl.cloneNode();
                    clone.volume = isSpace ? 0.9 : 0.82;
                    clone.play().catch(() => {});
                }
            } catch (e) {}

            mechKeyCounter++;
        }

        // High-precision synthesized switch fallback
        function synthesizeTactileSwitch(ctx, isSpace) {
            try {
                const t = ctx.currentTime;
                const snap = ctx.createOscillator();
                const snapG = ctx.createGain();
                const freq = isSpace ? 1150 : (2100 + (Math.random() * 300 - 150));
                snap.type = isSpace ? 'sine' : 'triangle';
                snap.frequency.setValueAtTime(freq, t);
                snap.frequency.exponentialRampToValueAtTime(320, t + 0.015);
                snapG.gain.setValueAtTime(isSpace ? 0.25 : 0.22, t);
                snapG.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
                snap.connect(snapG);
                snapG.connect(ctx.destination);
                snap.start(t);
                snap.stop(t + 0.02);

                const thock = ctx.createOscillator();
                const thockG = ctx.createGain();
                const thockFreq = isSpace ? 140 : (240 + (Math.random() * 40 - 20));
                thock.type = 'sine';
                thock.frequency.setValueAtTime(thockFreq, t);
                thock.frequency.exponentialRampToValueAtTime(65, t + 0.03);
                thockG.gain.setValueAtTime(isSpace ? 0.35 : 0.25, t);
                thockG.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
                thock.connect(thockG);
                thockG.connect(ctx.destination);
                thock.start(t);
                thock.stop(t + 0.038);
            } catch (e) {}
        }

        // Studio "Ta-Dum" Audio
        function synthesizeWebAudio(ctx) {
            const now = ctx.currentTime;
            const master = ctx.createGain();
            master.gain.setValueAtTime(0.95, now);
            master.connect(ctx.destination);

            try {
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(82, now);
                osc1.frequency.exponentialRampToValueAtTime(42, now + 0.16);
                gain1.gain.setValueAtTime(0.55, now);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc1.connect(gain1);
                gain1.connect(master);
                osc1.start(now);
                osc1.stop(now + 0.22);
            } catch (e) {}

            const tDum = now + 0.24;
            try {
                const sub = ctx.createOscillator();
                const subG = ctx.createGain();
                sub.type = 'sine';
                sub.frequency.setValueAtTime(62, tDum);
                sub.frequency.exponentialRampToValueAtTime(36, tDum + 0.55);
                subG.gain.setValueAtTime(0, tDum);
                subG.gain.linearRampToValueAtTime(0.98, tDum + 0.02);
                subG.gain.exponentialRampToValueAtTime(0.4, tDum + 0.45);
                subG.gain.exponentialRampToValueAtTime(0.0001, tDum + 2.5);
                sub.connect(subG);
                subG.connect(master);
                sub.start(tDum);
                sub.stop(tDum + 2.6);

                const mid = ctx.createOscillator();
                const midG = ctx.createGain();
                mid.type = 'sawtooth';
                mid.frequency.setValueAtTime(160, tDum);
                mid.frequency.exponentialRampToValueAtTime(65, tDum + 0.28);
                const lpf = ctx.createBiquadFilter();
                lpf.type = 'lowpass';
                lpf.frequency.setValueAtTime(750, tDum);
                lpf.frequency.exponentialRampToValueAtTime(140, tDum + 0.35);
                midG.gain.setValueAtTime(0.7, tDum);
                midG.gain.exponentialRampToValueAtTime(0.001, tDum + 0.36);
                mid.connect(lpf);
                lpf.connect(midG);
                midG.connect(master);
                mid.start(tDum);
                mid.stop(tDum + 0.38);
            } catch (e) {}

            [146.83, 220, 293.66, 349.23, 440, 523.25, 659.25].forEach((freq, idx) => {
                try {
                    const osc = ctx.createOscillator();
                    const g = ctx.createGain();
                    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                    osc.frequency.setValueAtTime(freq, tDum + 0.04);
                    g.gain.setValueAtTime(0.0001, tDum);
                    g.gain.linearRampToValueAtTime(0.08 / (1 + idx * 0.15), tDum + 0.22);
                    g.gain.setValueAtTime(0.07 / (1 + idx * 0.15), tDum + 1.15);
                    g.gain.exponentialRampToValueAtTime(0.0001, tDum + 2.85);
                    osc.connect(g);
                    g.connect(master);
                    osc.start(tDum + 0.02);
                    osc.stop(tDum + 2.95);
                } catch (e) {}
            });
        }

        function playTaDumSound() {
            if (soundHasPlayed) return;
            soundHasPlayed = true;

            // 1. Play native studio WAV
            if (splashAudio) {
                try {
                    splashAudio.currentTime = 0;
                    splashAudio.volume = 1.0;
                    splashAudio.play().catch(() => {});
                } catch (e) {}
            }

            // 2. Play Web Audio layer
            try {
                const ctx = getAudioContext();
                if (ctx) {
                    if (ctx.state === 'running') {
                        synthesizeWebAudio(ctx);
                    } else {
                        ctx.resume().then(() => {
                            if (ctx.state === 'running') synthesizeWebAudio(ctx);
                        }).catch(() => {});
                    }
                }
            } catch (e) {}
        }

        // Invisible Automatic Audio Unlock:
        // Silently activates AudioContext on any natural mouse movement, scroll, or touch
        const unlockAudioSilently = () => {
            const ctx = getAudioContext();
            if (ctx && ctx.state === 'suspended') {
                ctx.resume().catch(() => {});
            }
        };

        ['pointermove', 'mousemove', 'wheel', 'scroll', 'touchstart', 'pointerdown', 'keydown', 'focus'].forEach(evt => {
            window.addEventListener(evt, unlockAudioSilently, { passive: true, once: false });
        });

        // Attempt immediate initialization
        try {
            const ctx = getAudioContext();
            if (ctx && ctx.state === 'suspended') {
                ctx.resume().catch(() => {});
            }
        } catch (e) {}

        // Organic Typing Animation of "Harry Sevilla"
        function startTypingSequence(onComplete) {
            if (!container) return;
            container.innerHTML = '';

            let charIndex = 0;
            const chars = FULL_NAME.split('');

            function typeNext() {
                if (isComplete) return;
                if (charIndex < chars.length) {
                    const char = chars[charIndex];
                    const isInitial = INITIAL_INDICES.includes(charIndex);
                    const isSpace = char === ' ';

                    const span = document.createElement('span');
                    span.className = 'xrd-char' + (isInitial ? ' is-initial' : '') + (isSpace ? ' is-space' : '');
                    span.textContent = isSpace ? '\u00a0' : char;
                    container.appendChild(span);

                    // Mechanical switch sound on every keystroke
                    playMechanicalKeyClick(isSpace);

                    charIndex++;
                    // Natural human typing speed (~190ms - 240ms)
                    const jitter = isSpace ? 250 : Math.floor(190 + Math.random() * 50);
                    typingTimeout = setTimeout(typeNext, jitter);
                } else {
                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }
            }

            typeNext();
        }

        function runSequence() {
            clearScheduledTimeouts();
            isComplete = false;
            soundHasPlayed = false;

            document.body.classList.add('splash-locked', 'splash-pending-reveal');
            document.body.classList.remove('splash-revealed');
            splash.classList.remove('is-hidden', 'step-reveal', 'step-impact', 'step-collapsed', 'step-bloom', 'step-fadeout');
            splash.style.display = 'flex';

            if (container) container.innerHTML = '';

            // Timeline: Exactly 8.0 Seconds
            // 0ms - 200ms: Obsidian stillness
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-reveal');
                }
            }, 200));

            // 800ms: Start automatic typing of "Harry Sevilla"
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    startTypingSequence();
                }
            }, 800));

            // 5200ms: Smooth collapse from < Harry Sevilla /> -> < HS />
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-collapsed');
                }
            }, 5200));

            // 5400ms: Brandmark Lock + Compile Flash + Signature Ta-Dum Sound!
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-impact');
                    playTaDumSound();
                }
            }, 5400));

            // 6400ms: Monogram Radiance Bloom
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-bloom');
                }
            }, 6400));

            // 7200ms: Smooth 800ms Fade-out into Portfolio Homepage
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-fadeout');
                    document.body.classList.add('splash-revealed');
                }
            }, 7200));

            // 8000ms: Complete and Unlock
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    isComplete = true;
                    splash.classList.add('is-hidden');
                    document.body.classList.remove('splash-locked', 'splash-pending-reveal');
                }
            }, 8000));
        }

        // Always run on refresh / reload / direct URL visit.
        // Bypassed ONLY if specifically coming from internal subpages with skip token.
        const urlParams = new URLSearchParams(window.location.search);
        const forceReplay = urlParams.get('replay') === '1' || urlParams.get('splash') === '1';
        const isFromSubpage = document.referrer && (
            document.referrer.includes('project-detail') ||
            document.referrer.includes('projects.html') ||
            document.referrer.includes('about.html') ||
            document.referrer.includes('certifications.html') ||
            document.referrer.includes('experience.html')
        );

        if (!forceReplay && isFromSubpage && sessionStorage.getItem('subpage_return_skip')) {
            splash.classList.add('is-hidden');
            splash.style.display = 'none';
            document.body.classList.remove('splash-locked', 'splash-pending-reveal');
            document.body.classList.add('splash-revealed');
            return;
        }

        runSequence();
    })();

    // ── 1. 3-Option Theme Controller with Bryl Lim Circular Wipe Animation ──
    const KEY = 'portfolio-theme';
    const root = document.documentElement;
    const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animT;

    function getPref() {
        try {
            const v = localStorage.getItem(KEY);
            return (v === 'dark' || v === 'light' || v === 'system') ? v : 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    function isDarkTheme(p) {
        if (p === 'light') return false;
        if (p === 'dark') return true;
        return !(mq && !mq.matches);
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

    // UI Screen Showcase & Lightbox Elements
    const cfActiveScreenImg = document.getElementById('cfActiveScreenImg');
    const cfActiveUrlText = document.getElementById('cfActiveUrlText');
    const cfLiveLink = document.getElementById('cfLiveLink');
    const cfExpandBtn = document.getElementById('cfExpandBtn');
    const cfShowcaseViewport = document.getElementById('cfShowcaseViewport');
    const cfBadgeStatus = document.getElementById('cfBadgeStatus');

    // Lightbox modal elements
    const cfLightboxModal = document.getElementById('cfLightboxModal');
    const cfLightboxBackdrop = document.getElementById('cfLightboxBackdrop');
    const cfLightboxClose = document.getElementById('cfLightboxClose');
    const cfLightboxImg = document.getElementById('cfLightboxImg');
    const cfLightboxTitle = document.getElementById('cfLightboxTitle');
    const cfLightboxSub = document.getElementById('cfLightboxSub');
    const cfLightboxLogo = document.getElementById('cfLightboxLogo');
    const cfLightboxUrl = document.getElementById('cfLightboxUrl');
    const cfLightboxLive = document.getElementById('cfLightboxLive');

    const projectsData = [
        {
            title: 'ANI-GROW: AI-Powered Poultry & Livestock Farming Guide',
            badge: 'Poultry & Livestock Analytics',
            year: '2026',
            logo: 'assets/anigrow_logo.png',
            screen: 'assets/anigrow_screen_1.png',
            url: 'https://anigrow.vercel.app',
            statusText: 'Live Web & Mobile · IoT Connected',
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
            screen: 'assets/screen_tourgo.png',
            url: 'https://tourgo.internal',
            statusText: 'Mobile Prototype · Gemini AI Integrated',
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
            screen: 'assets/screen_binhi.png',
            url: 'https://traviscruz.vercel.app/project/binhiconcept',
            statusText: 'Production Client System · 4 Portals',
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
            screen: 'assets/screen_colm.png',
            url: 'https://colm-pulilan.internal/portal',
            statusText: 'Client System · Deployment Phase',
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

            // Update Project Meta Dossier & Showcase Screen
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

                // Update UI Screen Showcase
                if (cfActiveScreenImg && curData.screen) {
                    cfActiveScreenImg.style.opacity = '0.35';
                    cfActiveScreenImg.style.transform = 'scale(0.985)';
                    const tempImg = new Image();
                    tempImg.src = curData.screen;
                    tempImg.onload = () => {
                        cfActiveScreenImg.src = curData.screen;
                        cfActiveScreenImg.alt = curData.title + ' UI Screen';
                        cfActiveScreenImg.style.opacity = '1';
                        cfActiveScreenImg.style.transform = 'scale(1)';
                    };
                }
                if (cfActiveUrlText && curData.url) {
                    cfActiveUrlText.textContent = curData.url;
                }
                if (cfLiveLink && curData.url) {
                    cfLiveLink.href = curData.url;
                    cfLiveLink.style.display = curData.url.startsWith('http') ? 'inline-flex' : 'none';
                }
                if (cfBadgeStatus && curData.statusText) {
                    cfBadgeStatus.textContent = curData.statusText;
                }
            }

            if (window.lucide) {
                lucide.createIcons();
            }
        }

        // Lightbox Handler
        function openProjectLightbox(idx) {
            const data = projectsData[idx !== undefined ? idx : currentIndex];
            if (!data || !cfLightboxModal) return;
            if (cfLightboxImg) {
                cfLightboxImg.src = data.screen;
                cfLightboxImg.alt = data.title;
            }
            if (cfLightboxTitle) cfLightboxTitle.textContent = data.title;
            if (cfLightboxSub) cfLightboxSub.textContent = data.badge;
            if (cfLightboxLogo) cfLightboxLogo.src = data.logo;
            if (cfLightboxUrl) cfLightboxUrl.textContent = data.url;
            if (cfLightboxLive) {
                cfLightboxLive.href = data.url;
                cfLightboxLive.style.display = data.url.startsWith('http') ? 'inline-flex' : 'none';
            }
            cfLightboxModal.classList.add('is-open');
            cfLightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (window.lucide) lucide.createIcons();
        }

        function closeProjectLightbox() {
            if (!cfLightboxModal) return;
            cfLightboxModal.classList.remove('is-open');
            cfLightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (cfShowcaseViewport) {
            cfShowcaseViewport.addEventListener('click', () => openProjectLightbox(currentIndex));
            cfShowcaseViewport.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectLightbox(currentIndex);
                }
            });
        }

        if (cfExpandBtn) {
            cfExpandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectLightbox(currentIndex);
            });
        }

        if (cfLightboxClose) {
            cfLightboxClose.addEventListener('click', closeProjectLightbox);
        }
        if (cfLightboxBackdrop) {
            cfLightboxBackdrop.addEventListener('click', closeProjectLightbox);
        }
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cfLightboxModal && cfLightboxModal.classList.contains('is-open')) {
                closeProjectLightbox();
            }
        });

        // Click on Cards (clicking prev or next card activates it; clicking active card or any active CTA navigates)
        cfCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (isNaN(idx)) return;

                const ctaLink = card.querySelector('a.cf-card-cta');

                // If user directly clicked the "View Project" button on any card
                if (e.target.closest('a.cf-card-cta')) {
                    return; // Let browser navigate naturally to the project dossier
                }

                if (idx !== currentIndex) {
                    e.preventDefault();
                    updateCoverflow(idx);
                } else {
                    if (ctaLink) {
                        window.location.href = ctaLink.href;
                    }
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
    // 4.5. Hero Name Typewriter Animation
    // ==========================================================================
    (() => {
        const typewriterEl = document.getElementById('heroNameTypewriter');
        if (!typewriterEl) return;

        const phrases = [
            "Harry Sevilla",
            "Full-Stack Developer",
            "Software Engineer",
            "Harry Sevilla",
            "Creative Builder"
        ];

        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = false;
        let timer = null;

        const TYPE_SPEED = 100;     // Forward typing speed
        const DELETE_SPEED = 45;    // Backspacing speed
        const PAUSE_EMPTY = 350;    // Pause before typing next phrase

        // Ensure initial text in DOM exactly matches first phrase without stray whitespace
        typewriterEl.textContent = phrases[0];

        function tick() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
                typewriterEl.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex <= 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    timer = setTimeout(tick, PAUSE_EMPTY);
                    return;
                }
                timer = setTimeout(tick, DELETE_SPEED);
            } else {
                charIndex++;
                typewriterEl.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex >= currentPhrase.length) {
                    isDeleting = true;
                    // Hold "Harry Sevilla" longer than secondary titles
                    const holdTime = currentPhrase === "Harry Sevilla" ? 4000 : 2500;
                    timer = setTimeout(tick, holdTime);
                    return;
                }
                const speed = TYPE_SPEED + (Math.random() * 25 - 12);
                timer = setTimeout(tick, speed);
            }
        }

        // Start first cycle after an initial 3.2s pause on full name
        timer = setTimeout(() => {
            isDeleting = true;
            tick();
        }, 3200);
    })();    // ==========================================================================
    // 5. Signature 3D Isometric Hatched Cube Engine with Obsidian-Grade Lighting
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

        // Isometric Cube Geometry (Bespoke 3D Tessellation)
        const R = 44; // Outer radius of isometric cube
        const dx = R * 0.8660254; // R * cos(30 deg)
        const dy = R * 0.5;       // R * sin(30 deg)
        const stepX = dx * 2;     // Column spacing
        const stepY = R * 1.5;    // Row spacing
        const LINE_SPACING = 4.2; // Fine "dikit dikit" line spacing inside each face

        let cols = 0;
        let rows = 0;
        let cubes = [];

        // Interactive tracking & Afterglow
        let mouseX = -9999;
        let mouseY = -9999;
        let targetMouseX = -9999;
        let targetMouseY = -9999;
        let isHovering = false;
        let isVisible = true;

        // Content exclusion bounds (Protects text & photo readability like Obsidian)
        const isUnderText = (x, y, w, h) => {
            const bound = w < 768 ? { w: 1, h: 0.55 } : { w: 0.6, h: 1 };
            return x < bound.w * w && y < bound.h * h;
        };

        // Ambient Strobe Shimmers ("glimpses of glowing shining everywhere")
        const AMBIENT_SHIMMER_COUNT = 48; // High frequency (mas madalas)
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
                        lastHovered: 0,
                        triggerTime: 0
                    });
                }
            }
        }

        function createShimmer(now) {
            const index = Math.floor(Math.random() * (cubes.length || 100));
            const cube = cubes[index] || { cx: 0, cy: 0 };
            const underText = isUnderText(cube.cx, cube.cy, width, height);

            // Opacity governed by content exclusion: whisper soft under text, vivid in open space
            const peakAlpha = underText ? 0.05 + Math.random() * 0.09 : 0.12 + Math.random() * 0.18;
            // Rapid cycles between 1.5s and 3.0s for lively, frequent glistening
            const duration = 1500 + Math.random() * 1500;
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

        // Helper: Draw single face with directional hatching & gradient fill
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

            // Clip strictly to polygon boundary for crisp hatching
            ctx.clip();

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

            // Update ambient shimmers with Obsidian strobe easing
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
                let opacity = 0;
                // Obsidian @keyframes hero-grid-strobe (0% -> 40%..60% -> 100%)
                if (progress < 0.4) {
                    opacity = (progress / 0.4) * s.peakAlpha;
                } else if (progress <= 0.6) {
                    opacity = s.peakAlpha;
                } else {
                    opacity = ((1 - progress) / 0.4) * s.peakAlpha;
                }

                if (opacity > 0.005) {
                    activeShimmerAlphas.set(s.index, opacity);
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

                // Mouse proximity & Hover interaction with Onset Trigger Delay
                const dist = Math.hypot(mouseX - cube.cx, mouseY - cube.cy);

                if (dist < HOVER_RADIUS) {
                    const factor = 1 - dist / HOVER_RADIUS;
                    const smooth = factor * factor * (3 - 2 * factor);
                    const targetIntensity = smooth;

                    // Onset delay: schedule ignition with smooth wave latency
                    if (!cube.triggerTime) {
                        const onsetDelay = 120 + (dist / HOVER_RADIUS) * 90; // 120ms - 210ms trigger onset delay
                        cube.triggerTime = now + onsetDelay;
                    }

                    // Once trigger onset delay elapsed, smoothly ramp up
                    if (now >= cube.triggerTime) {
                        cube.glow += (targetIntensity - cube.glow) * 0.18;
                        cube.elevation = cube.glow * 7;
                        cube.lastHovered = now;
                    }
                } else {
                    if (cube.glow <= 0.01) {
                        cube.triggerTime = 0;
                    }
                }

                // Lingering delay after mouse hovers ("effects will last after mouse hovers it")
                const HOLD_DELAY = 450; // Milliseconds to hold peak effect before beginning fade
                const timeSinceHover = now - (cube.lastHovered || 0);

                if (timeSinceHover > HOLD_DELAY && cube.glow > 0.001) {
                    // Smooth, luxurious decay over ~1.6 seconds
                    cube.glow = Math.max(0, cube.glow - dt * 0.6);
                    cube.elevation = cube.glow * 7;
                    if (cube.glow <= 0.01) {
                        cube.triggerTime = 0;
                    }
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
                    // Resting state: whisper faint (0.025 hatch, 0.045 border)
                    const baseHatchAlpha = 0.025;
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
