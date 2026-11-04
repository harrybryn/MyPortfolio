document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 0. Bespoke 3D Isometric Boxes Splash Screen Controller (Exact 4.0s)
    // Dynamic Cube Matrix Shockwave, Elevating 3D Pedestal, & Guaranteed Ta-Dum Audio
    // ==========================================================================
    (() => {
        const splash = document.getElementById('splashScreen');
        if (!splash) return;

        const container = document.getElementById('splashLetterContainer');
        const canvas = document.getElementById('splashCanvas');
        const soundHint = document.getElementById('splashSoundHint');
        const splashAudio = document.getElementById('splashAudio') || new Audio('assets/ta-dum.wav');

        const NAME = "HARRY SEVILLA";
        const INITIALS = [0, 6]; // 'H' at 0, 'S' at 6

        let timeouts = [];
        let isComplete = false;
        let soundHasPlayed = false;
        let animFrameId = null;

        function clearScheduledTimeouts() {
            timeouts.forEach(t => clearTimeout(t));
            timeouts = [];
        }

        function renderLetters() {
            if (!container) return;
            container.innerHTML = '';
            NAME.split('').forEach((char, i) => {
                const isInitial = INITIALS.includes(i);
                const isSpace = char === ' ';
                const span = document.createElement('span');
                span.className = 'xrd-char' + (isInitial ? ' is-initial' : '') + (isSpace ? ' is-space' : '');
                span.textContent = isSpace ? '\u00a0' : char;
                container.appendChild(span);
            });
        }

        // ── 3D Isometric Boxes Canvas Engine (Bespoke to Harry Sevilla Background) ──
        let sCtx = null;
        let cWidth = 0;
        let cHeight = 0;
        let cDpr = Math.min(window.devicePixelRatio || 1, 2);

        // Exact isometric cube geometry from bgInteractiveCanvas
        const R = 44; // Outer radius of isometric cube
        const dx = R * 0.8660254; // R * cos(30 deg)
        const dy = R * 0.5;       // R * sin(30 deg)
        const stepX = dx * 2;     // Column spacing
        const stepY = R * 1.5;    // Row spacing
        const LINE_SPACING = 4.2; // Fine hatched spacing inside each face

        let splashCubes = [];
        let splashParticles = [];
        let shockwaveRadius = 0;
        let shockwaveActive = false;
        let shockwaveStartTime = 0;
        let isImpact = false;
        let isCollapsed = false;
        let isBloom = false;

        function initSplashCanvas() {
            if (!canvas) return;
            sCtx = canvas.getContext('2d');
            if (!sCtx) return;

            cWidth = window.innerWidth;
            cHeight = window.innerHeight;
            canvas.width = Math.floor(cWidth * cDpr);
            canvas.height = Math.floor(cHeight * cDpr);
            canvas.style.width = cWidth + 'px';
            canvas.style.height = cHeight + 'px';
            sCtx.setTransform(cDpr, 0, 0, cDpr, 0, 0);

            const cols = Math.ceil(cWidth / stepX) + 3;
            const rows = Math.ceil(cHeight / stepY) + 3;

            splashCubes = [];
            splashParticles = [];
            shockwaveActive = false;
            shockwaveRadius = 0;
            isImpact = false;
            isCollapsed = false;
            isBloom = false;

            const midX = cWidth / 2;
            const midY = cHeight / 2;

            for (let r = -2; r < rows; r++) {
                const isOdd = (Math.abs(r) % 2 === 1);
                const xOffset = isOdd ? dx : 0;
                for (let c = -2; c < cols; c++) {
                    const cx = c * stepX + xOffset;
                    const cy = r * stepY;
                    const distFromCenter = Math.hypot(cx - midX, cy - midY);
                    splashCubes.push({
                        cx,
                        cy,
                        r,
                        c,
                        distFromCenter,
                        glow: 0,
                        elevation: 0,
                        targetElevation: 0,
                        targetGlow: 0,
                        baseElevation: 0
                    });
                }
            }
        }

        // Draw individual face with fine directional hatching & borders
        function drawSplashFace(p1, p2, p3, p4, angle, lineSpacing, strokeColor, borderColor, fillColor, hatchWidth = 0.7, borderWidth = 0.9) {
            sCtx.save();
            sCtx.beginPath();
            sCtx.moveTo(p1.x, p1.y);
            sCtx.lineTo(p2.x, p2.y);
            sCtx.lineTo(p3.x, p3.y);
            sCtx.lineTo(p4.x, p4.y);
            sCtx.closePath();

            if (fillColor) {
                sCtx.fillStyle = fillColor;
                sCtx.fill();
            }

            sCtx.clip();

            sCtx.beginPath();
            sCtx.lineWidth = hatchWidth;
            sCtx.strokeStyle = strokeColor;

            const minX = Math.min(p1.x, p2.x, p3.x, p4.x) - 4;
            const maxX = Math.max(p1.x, p2.x, p3.x, p4.x) + 4;
            const minY = Math.min(p1.y, p2.y, p3.y, p4.y) - 4;
            const maxY = Math.max(p1.y, p2.y, p3.y, p4.y) + 4;

            if (angle === Math.PI / 2) {
                // Vertical lines (Left face)
                for (let x = minX; x <= maxX; x += lineSpacing) {
                    sCtx.moveTo(x, minY);
                    sCtx.lineTo(x, maxY);
                }
            } else {
                // Angled lines (Top and Right faces)
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
                    sCtx.moveTo(px - lineLen * cosA, py - lineLen * sinA);
                    sCtx.lineTo(px + lineLen * cosA, py + lineLen * sinA);
                }
            }
            sCtx.stroke();
            sCtx.restore();

            if (borderColor) {
                sCtx.beginPath();
                sCtx.moveTo(p1.x, p1.y);
                sCtx.lineTo(p2.x, p2.y);
                sCtx.lineTo(p3.x, p3.y);
                sCtx.lineTo(p4.x, p4.y);
                sCtx.closePath();
                sCtx.strokeStyle = borderColor;
                sCtx.lineWidth = borderWidth;
                sCtx.stroke();
            }
        }

        function triggerCubeShockwave() {
            shockwaveActive = true;
            isImpact = true;
            shockwaveStartTime = performance.now();

            // Burst floating 3D voxel particles / cube sparkles outward from center
            for (let i = 0; i < 40; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 320 + 90;
                splashParticles.push({
                    x: cWidth / 2,
                    y: cHeight / 2,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd - 40,
                    size: Math.random() * 6 + 3,
                    alpha: 1,
                    life: Math.random() * 0.8 + 0.6,
                    age: 0,
                    color: Math.random() > 0.4 ? '#10b981' : '#ffffff'
                });
            }
        }

        let lastFrameTime = performance.now();
        function renderSplashCanvas(now) {
            if (isComplete) return;
            const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
            lastFrameTime = now;

            if (sCtx) {
                // Clear with deep obsidian tint
                sCtx.fillStyle = 'rgba(9, 9, 9, 0.38)';
                sCtx.fillRect(0, 0, cWidth, cHeight);

                // Central ambient emerald glow
                const centerGlow = sCtx.createRadialGradient(
                    cWidth / 2, cHeight / 2, 0,
                    cWidth / 2, cHeight / 2, cWidth * 0.6
                );
                centerGlow.addColorStop(0, isImpact ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.06)');
                centerGlow.addColorStop(0.55, 'rgba(16, 185, 129, 0.03)');
                centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                sCtx.fillStyle = centerGlow;
                sCtx.fillRect(0, 0, cWidth, cHeight);

                // Shockwave radius expands across the grid
                if (shockwaveActive) {
                    const elapsed = (now - shockwaveStartTime) / 1000;
                    shockwaveRadius = elapsed * 1100;
                    if (shockwaveRadius > Math.max(cWidth, cHeight) * 1.2) {
                        shockwaveActive = false;
                    }
                }

                // Render each 3D Isometric Cube
                const maxDim = Math.max(cWidth, cHeight) * 0.85;

                for (let i = 0; i < splashCubes.length; i++) {
                    const cube = splashCubes[i];
                    const dist = cube.distFromCenter;

                    // Wave calculation: Kinetic elevation wave
                    if (shockwaveActive) {
                        const waveDist = Math.abs(dist - shockwaveRadius);
                        if (waveDist < 80) {
                            const waveFactor = 1 - waveDist / 80;
                            const peakElevation = waveFactor * 24 * Math.max(0.2, 1 - dist / maxDim);
                            cube.elevation = Math.max(cube.elevation, peakElevation);
                            cube.glow = Math.max(cube.glow, waveFactor * 0.95);
                        }
                    }

                    // HS Monogram Pedestal: Cubes directly under monogram stay elevated
                    if (isCollapsed) {
                        if (dist < 135) {
                            cube.elevation += (16 - cube.elevation) * 0.12;
                            cube.glow += (0.82 - cube.glow) * 0.12;
                        }
                    }

                    // Bloom: Harmonic breathing wave
                    if (isBloom && dist < 280) {
                        cube.glow += 0.08 * Math.sin(now * 0.006 + dist * 0.02);
                    }

                    // Smooth return decay
                    if (!isCollapsed || dist >= 135) {
                        cube.elevation = Math.max(0, cube.elevation - dt * 28);
                        cube.glow = Math.max(0, cube.glow - dt * 0.75);
                    }

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

                    // Colors & Hatches based on Elevation / Glow
                    const g = Math.min(1, Math.max(0, cube.glow));
                    let strokeColor, borderColor, fillColor;
                    const hlw = 0.55 + g * 0.45;
                    const blw = 0.75 + g * 0.65;

                    if (g > 0.02) {
                        // High-tech emerald & obsidian glow
                        strokeColor = `rgba(255, 255, 255, ${(0.08 + g * 0.55).toFixed(3)})`;
                        borderColor = `rgba(16, 185, 129, ${(0.15 + g * 0.75).toFixed(3)})`;
                        fillColor = `rgba(16, 185, 129, ${(g * 0.16).toFixed(3)})`;
                    } else {
                        // Calm obsidian rest state
                        strokeColor = 'rgba(255, 255, 255, 0.028)';
                        borderColor = 'rgba(255, 255, 255, 0.05)';
                        fillColor = null;
                    }

                    // Draw 3 Isometric Faces
                    // 1. Top Face
                    drawSplashFace(C, V_tl, V_top, V_tr, Math.PI / 6, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);
                    // 2. Left Face (Vertical hatching)
                    drawSplashFace(C, V_bl, V_bot, V_tl, Math.PI / 2, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);
                    // 3. Right Face (Angled hatching)
                    drawSplashFace(C, V_bot, V_br, V_tr, -Math.PI / 6, LINE_SPACING, strokeColor, borderColor, fillColor, hlw, blw);
                }

                // Render Floating 3D Voxel Sparks
                for (let i = splashParticles.length - 1; i >= 0; i--) {
                    const p = splashParticles[i];
                    p.age += dt;
                    if (p.age >= p.life) {
                        splashParticles.splice(i, 1);
                        continue;
                    }
                    p.x += p.vx * dt;
                    p.y += p.vy * dt;
                    p.vy += 45 * dt; // gravity
                    const progress = p.age / p.life;
                    const a = (1 - progress) * p.alpha;

                    sCtx.save();
                    sCtx.fillStyle = p.color;
                    sCtx.globalAlpha = a;
                    sCtx.shadowColor = p.color;
                    sCtx.shadowBlur = 10;
                    // Draw micro isometric diamond
                    const sz = p.size * (1 - progress * 0.4);
                    sCtx.beginPath();
                    sCtx.moveTo(p.x, p.y - sz);
                    sCtx.lineTo(p.x + sz * 0.86, p.y);
                    sCtx.lineTo(p.x, p.y + sz);
                    sCtx.lineTo(p.x - sz * 0.86, p.y);
                    sCtx.closePath();
                    sCtx.fill();
                    sCtx.restore();
                }
            }

            animFrameId = requestAnimationFrame(renderSplashCanvas);
        }

        // ── Guaranteed Dual-Engine Audio: Native WAV + Web Audio ──
        let audioCtx = null;

        function getAudioContext() {
            if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            return audioCtx;
        }

        function showSoundHint() {
            if (soundHint && !soundHasPlayed && !isComplete) {
                soundHint.classList.remove('is-hidden');
                soundHint.classList.add('is-visible');
            }
        }

        function hideSoundHint() {
            if (soundHint) {
                soundHint.classList.remove('is-visible');
                soundHint.classList.add('is-hidden');
            }
        }

        // Web Audio Synthesizer Layer
        function synthesizeWebAudio(ctx) {
            const t0 = ctx.currentTime + 0.015;
            const master = ctx.createGain();
            master.gain.setValueAtTime(0.95, t0);
            master.connect(ctx.destination);

            // Strike 1: "Ta" (t0 + 0.08)
            const tTa = t0 + 0.08;
            try {
                const taOsc = ctx.createOscillator();
                const taGain = ctx.createGain();
                taOsc.type = 'triangle';
                taOsc.frequency.setValueAtTime(460, tTa);
                taOsc.frequency.exponentialRampToValueAtTime(140, tTa + 0.07);
                taGain.gain.setValueAtTime(0.5, tTa);
                taGain.gain.exponentialRampToValueAtTime(0.001, tTa + 0.075);
                taOsc.connect(taGain);
                taGain.connect(master);
                taOsc.start(tTa);
                taOsc.stop(tTa + 0.08);
            } catch (e) {}

            // Strike 2: "DUMMMM" (t0 + 0.32)
            const tDum = t0 + 0.32;
            try {
                // Sub-bass
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

                // Mid-body punch for laptop speakers
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

            // Blossom Shimmer Chord (0.34s - 3.2s)
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

            // 1. Play Studio WAV file
            if (splashAudio) {
                try {
                    splashAudio.currentTime = 0;
                    splashAudio.volume = 1.0;
                    const playPromise = splashAudio.play();
                    if (playPromise && playPromise.then) {
                        playPromise.then(() => {
                            hideSoundHint();
                        }).catch(() => {
                            showSoundHint();
                        });
                    }
                } catch (e) {
                    showSoundHint();
                }
            }

            // 2. Play Web Audio Synthesizer layer if running
            try {
                const ctx = getAudioContext();
                if (ctx) {
                    if (ctx.state === 'running') {
                        synthesizeWebAudio(ctx);
                        hideSoundHint();
                    } else {
                        ctx.resume().then(() => {
                            if (ctx.state === 'running') {
                                synthesizeWebAudio(ctx);
                                hideSoundHint();
                            }
                        }).catch(() => {});
                    }
                }
            } catch (e) {}
        }

        // Guaranteed unlock on ANY user gesture
        const handleUserGesture = () => {
            const ctx = getAudioContext();
            if (ctx && ctx.state === 'suspended') {
                ctx.resume().catch(() => {});
            }
            if (!soundHasPlayed && !isComplete) {
                playTaDumSound();
            } else if (splashAudio && splashAudio.paused && !isComplete) {
                splashAudio.play().then(() => hideSoundHint()).catch(() => {});
            }
        };

        ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(evt => {
            window.addEventListener(evt, handleUserGesture, { passive: true });
        });

        if (soundHint) {
            soundHint.addEventListener('click', (e) => {
                e.stopPropagation();
                handleUserGesture();
            });
        }

        function runSequence() {
            clearScheduledTimeouts();
            isComplete = false;
            soundHasPlayed = false;

            document.body.classList.add('splash-locked', 'splash-pending-reveal');
            document.body.classList.remove('splash-revealed');
            splash.classList.remove('is-hidden', 'step-reveal', 'step-impact', 'step-collapsed', 'step-bloom', 'step-fadeout');
            splash.style.display = 'flex';

            renderLetters();
            initSplashCanvas();
            lastFrameTime = performance.now();
            if (!animFrameId) {
                animFrameId = requestAnimationFrame(renderSplashCanvas);
            }

            // Total Duration: Exactly 4.0 Seconds
            // 0ms: Obsidian stillness

            // Step 1: 100ms — Strike 1 ("Ta") + Full Name Appears + Central Boxes Ignite
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-reveal');
                    // Light up central cubes
                    splashCubes.forEach(cube => {
                        if (cube.distFromCenter < 240) {
                            cube.elevation = 8;
                            cube.glow = 0.65;
                        }
                    });
                    playTaDumSound();
                }
            }, 100));

            // Step 1.5: 340ms — Strike 2 ("DUMMMM") + 3D Isometric Boxes Kinetic Shockwave!
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-impact');
                    triggerCubeShockwave();
                }
            }, 340));

            // Step 2: 1800ms — Smooth Collapse into "HS" Initials Monogram + Elevated Pedestal of Cubes
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-collapsed');
                    isCollapsed = true;
                }
            }, 1800));

            // Step 2.5: 2800ms — Monogram Radiance / Harmonic Box Bloom
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-bloom');
                    isBloom = true;
                }
            }, 2800));

            // Step 3: 3400ms — Cinematic 600ms Fade-out into Portfolio Homepage
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    splash.classList.add('step-fadeout');
                    document.body.classList.add('splash-revealed');
                    hideSoundHint();
                }
            }, 3400));

            // Step 4: 4000ms — Full Unlock & Sequence Complete
            timeouts.push(setTimeout(() => {
                if (!isComplete) {
                    isComplete = true;
                    splash.classList.add('is-hidden');
                    document.body.classList.remove('splash-locked', 'splash-pending-reveal');
                    if (animFrameId) {
                        cancelAnimationFrame(animFrameId);
                        animFrameId = null;
                    }
                }
            }, 4000));
        }

        // Start sequence: ALWAYS runs on reload/refresh or direct visit.
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

        // Pointerdown / click listener on splash
        splash.addEventListener('pointerdown', handleUserGesture);

        // Always launch sequence
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
