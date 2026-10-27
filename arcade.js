// ==========================================================================
// DEVELOPER SKILLS LAB: BENCHMARK & ARCADE (Harry Sevilla Portfolio)
// Bryle Lim-Grade Typewriter & Benchmark Engine + 5 Interactive Reflex Tests
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ── Audio Synthesizer (Zero external dependencies) ──────────────────
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.08) {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    const sound = {
        tick: () => playTone(650, 'sine', 0.04, 0.05),
        press: () => playTone(450, 'triangle', 0.05, 0.06),
        error: () => playTone(180, 'sawtooth', 0.1, 0.08),
        chime: () => {
            playTone(523.25, 'sine', 0.15, 0.07);
            setTimeout(() => playTone(659.25, 'sine', 0.18, 0.07), 80);
            setTimeout(() => playTone(783.99, 'sine', 0.25, 0.09), 160);
        },
        success: () => {
            playTone(587.33, 'sine', 0.12, 0.07);
            setTimeout(() => playTone(880, 'sine', 0.3, 0.1), 100);
        }
    };

    // ==========================================================================
    // Modal Overlay & Segmented Game Switcher
    // ==========================================================================
    const arcadeOverlay = document.getElementById('arcadeOverlay');
    const openArcadeBtn = document.getElementById('openArcadeBtn');
    const tabs = document.querySelectorAll('.skills-tab');
    const panels = document.querySelectorAll('.skills-panel');

    let currentActiveTab = 'reaction';

    function switchGameTab(tabName) {
        currentActiveTab = tabName;

        tabs.forEach(t => {
            const match = t.getAttribute('data-tab') === tabName;
            t.classList.toggle('is-active', match);
            t.setAttribute('aria-selected', match ? 'true' : 'false');
        });

        panels.forEach(p => {
            const match = p.getAttribute('data-panel') === tabName;
            p.classList.toggle('is-active', match);
        });

        // Trigger hooks for specific games
        if (tabName === 'typer') {
            if (window.ttFocus) window.ttFocus();
        }
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-tab');
            if (target) switchGameTab(target);
        });
    });

    function openSkillsModal() {
        if (!arcadeOverlay) return;
        arcadeOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        switchGameTab('reaction');
    }

    function closeSkillsModal() {
        if (!arcadeOverlay) return;
        arcadeOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Header Button trigger
    openArcadeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openSkillsModal();
    });

    // Close on backdrop or [data-close-arcade]
    document.querySelectorAll('[data-close-arcade]').forEach(el => {
        el.addEventListener('click', closeSkillsModal);
    });

    // Global Key Listener for Modal (Esc, 1-5 hotkeys, Tab restart)
    document.addEventListener('keydown', (e) => {
        if (!arcadeOverlay || !arcadeOverlay.classList.contains('is-open')) return;

        // Escape closes
        if (e.key === 'Escape') {
            e.preventDefault();
            closeSkillsModal();
            return;
        }

        // Hotkeys 1-5 to switch games immediately
        if (['1', '2', '3', '4', '5'].includes(e.key) && e.target.tagName !== 'INPUT') {
            const tabMap = { '1': 'reaction', '2': 'aim', '3': 'simon', '4': 'tug', '5': 'typer' };
            const target = tabMap[e.key];
            if (target && target !== currentActiveTab) {
                e.preventDefault();
                switchGameTab(target);
                return;
            }
        }
    });

    // ==========================================================================
    // 1. SPEED TYPING BENCHMARK (Bryl Lim-Grade Monkeytype Replica)
    // ==========================================================================
    (() => {
        const wordsEl = document.getElementById('ttWords');
        const kbEl = document.getElementById('ttKeyboard');
        const elWpm = document.getElementById('ttWpm');
        const elAcc = document.getElementById('ttAcc');
        const elTime = document.getElementById('ttTime');
        const rWpm = document.getElementById('ttResWpm');
        const rAcc = document.getElementById('ttResAcc');
        const rRaw = document.getElementById('ttResRaw');
        const rTime = document.getElementById('ttResTime');
        const verdictEl = document.getElementById('ttVerdict');
        const container = document.querySelector('.tt-container');
        const restartBtn = document.getElementById('ttRestartBtn');

        if (!wordsEl || !kbEl) return;

        const HARRY_WPM = 110; // Benchmark reference

        const WORD_BANK = ('the be of and to in he have it that for they with as not on she at by this we you do but from or which one would all will there say who make when can more if no out other so what time up go about than into could state only new year some take come these know see use get like then first any work now may such give over think most even find day also after way many must look before great back through long where much should well people down own just because good each those feel seem how high too place little world very still hand old life tell write become here show house both between need mean call under last right move thing school never same begin while number part turn real leave might want point form off child few small since against ask late home large person end open public follow during without again hold around possible head consider word program problem however lead system set order eye plan run keep face fact group play stand early course change help line build async react python logic server stack cache deploy above across action activity actual add address admit adult affect agent agree ahead air allow almost along already although always among amount animal another answer appear apply area argue arm arrive art article artist assume attack attention author available avoid away baby balance bank base beautiful behavior behind believe benefit best better beyond black blood blue board body book born break bring brother business camera campaign cancer candidate capital card care career case cause center century chair challenge chance character charge check choice choose church citizen city civil claim clean clear clock close cold culture current dark data daughter dead deal death debate decade decision deep degree design detail determine develop difference different difficult direct discuss disease draw dream drive drop east easy edge effect effort eight either electric elegant energy enjoy entire environment episode escape especially establish evening event every everyone everything evidence exactly example expect experience explain factor fail fall family far fast fear federal feeling field fight figure final financial fire firm focus force foreign forget former forward friend future game garden general girl glass goal government grab green ground growth guess happen happy hard hear heart heavy history hope hospital hotel huge human hundred husband idea identify image imagine impact important improve include indeed indicate individual industry influence information inside instead institution interest interview issue item journal judge justice kitchen land language learn letter light listen live local machine magazine maintain main manage management market material matter measure media medical meet member memory mention method middle military mind minute modern moment money month morning mother movie music national natural nature near network newspaper night normal north note nothing notice novel object occur offer office officer often once operation opinion opportunity option organization origin outcome outside owner page paper parent partner phone photograph physical piece plant political popular population position power prepare present president pressure prevent price private probable process produce product protect prove provide purpose question quickly quite radio raise range rapidly rather reach read ready reason receive record reduce reflect region remain remember remove report represent require research resource respond result return reveal review revolution river road rock role room rule save science score screen season search second secret security sense serve service setup share shout simple single sister situation skill society soldier somebody someone something source space speak standard star start station statement stay step stock story stream street strength strong structure student study subject success suggest summer table task teacher technology term test thank theater theme theory thought three ticket today together tomorrow tonight total toward town trade traditional travel treat treatment trust understand unit until value various view village visit voice walk watch water weight window wish woman wonder young').split(' ');

        const KB_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
        const N_WORDS = 26;

        let words = [];
        let wordEls = [];
        let wi = 0;
        let ci = 0;
        let started = false;
        let finished = false;
        let startTime = 0;
        let rafId = null;
        let raw = 0;
        let correct = 0;
        let dispWpm = 0;
        let dispAcc = 100;
        let dispTime = 0;
        let lastStatWrite = 0;

        const caretEl = document.createElement('span');
        caretEl.className = 'tt-caret';

        function rand(n) {
            return Math.floor(Math.random() * n);
        }

        function genWords() {
            words = Array.from({ length: N_WORDS }, () => WORD_BANK[rand(WORD_BANK.length)]);
        }

        function buildKeyboard() {
            kbEl.innerHTML = '';
            let idx = 0;
            KB_ROWS.forEach((row) => {
                const r = document.createElement('div');
                r.className = 'tt-krow';
                for (const ch of row) {
                    const k = document.createElement('span');
                    k.className = 'tt-key';
                    k.dataset.key = ch;
                    k.textContent = ch;
                    k.addEventListener('click', () => handleChar(ch));
                    r.appendChild(k);
                    idx++;
                }
                kbEl.appendChild(r);
            });

            const r = document.createElement('div');
            r.className = 'tt-krow';
            const sp = document.createElement('span');
            sp.className = 'tt-key space';
            sp.dataset.key = ' ';
            sp.textContent = 'space';
            sp.addEventListener('click', handleSpace);
            r.appendChild(sp);
            kbEl.appendChild(r);
        }

        function keyEl(ch) {
            try {
                return kbEl.querySelector(`.tt-key[data-key="${ch === ' ' ? ' ' : ch}"]`);
            } catch (e) {
                return null;
            }
        }

        function flashKey(ch) {
            const k = keyEl(ch);
            if (k) {
                k.classList.add('active');
                setTimeout(() => k.classList.remove('active'), 110);
            }
        }

        function highlightNext() {
            kbEl.querySelectorAll('.tt-key.next').forEach((k) => k.classList.remove('next'));
            if (finished) return;
            const cur = wordEls[wi];
            let nc = null;
            if (cur && ci < cur.word.length) nc = cur.word[ci];
            else if (wi < words.length - 1) nc = ' ';
            if (nc) {
                const k = keyEl(nc);
                if (k) k.classList.add('next');
            }
        }

        function buildText() {
            wordsEl.innerHTML = '';
            wordEls = [];
            words.forEach((w) => {
                const wEl = document.createElement('span');
                wEl.className = 'tt-word';
                const chars = [];
                for (const ch of w) {
                    const c = document.createElement('span');
                    c.className = 'tt-char';
                    c.textContent = ch;
                    wEl.appendChild(c);
                    chars.push(c);
                }
                wordsEl.appendChild(wEl);
                wordEls.push({ el: wEl, chars, word: w });
            });
            wordsEl.appendChild(caretEl);
        }

        function moveCaret() {
            const cur = wordEls[wi];
            if (!cur) return;
            let left, top;
            if (ci < cur.chars.length) {
                const el = cur.chars[ci];
                left = el.offsetLeft;
                top = el.offsetTop;
            } else if (cur.chars.length > 0) {
                const el = cur.chars[cur.chars.length - 1];
                left = el.offsetLeft + el.offsetWidth;
                top = el.offsetTop;
            } else {
                left = cur.el.offsetLeft;
                top = cur.el.offsetTop;
            }
            caretEl.style.left = left + 'px';
            caretEl.style.top = top + 'px';
        }

        function start() {
            started = true;
            startTime = performance.now();
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(statsLoop);
        }

        function statsLoop(now) {
            const ms = now || performance.now();
            const t = started ? (ms - startTime) / 1000 : 0;
            const tgtWpm = (started && t > 0.5) ? (correct / 5) / (t / 60) : 0;
            const tgtAcc = raw ? (correct / raw * 100) : 100;

            dispWpm += (tgtWpm - dispWpm) * 0.16;
            dispAcc += (tgtAcc - dispAcc) * 0.16;
            dispTime += (t - dispTime) * 0.4;

            if (Math.abs(tgtWpm - dispWpm) < 0.5) dispWpm = tgtWpm;
            if (Math.abs(tgtAcc - dispAcc) < 0.5) dispAcc = tgtAcc;

            if (ms - lastStatWrite >= 200) {
                lastStatWrite = ms;
                if (elWpm) elWpm.textContent = Math.round(dispWpm);
                if (elAcc) elAcc.textContent = Math.round(dispAcc);
                if (elTime) elTime.textContent = Math.floor(dispTime + 1e-4);
            }

            if (!finished && arcadeOverlay?.classList.contains('is-open')) {
                rafId = requestAnimationFrame(statsLoop);
            }
        }

        function afterInput() {
            moveCaret();
            highlightNext();
            const cur = wordEls[wi];
            if (cur && wi === words.length - 1 && ci >= cur.word.length) {
                finish();
            }
        }

        function handleChar(k) {
            if (finished) return;
            if (!started) start();
            const cur = wordEls[wi];
            if (!cur) return;

            flashKey(k);

            if (ci < cur.word.length) {
                const el = cur.chars[ci];
                const ok = (k === cur.word[ci]);
                el.classList.add(ok ? 'correct' : 'incorrect');
                raw++;
                if (ok) correct++;
                ci++;
                if (ok) sound.tick(); else sound.error();
            } else if (cur.chars.length - cur.word.length < 8) {
                const ex = document.createElement('span');
                ex.className = 'tt-char extra';
                ex.textContent = k;
                cur.el.appendChild(ex);
                cur.chars.push(ex);
                raw++;
                ci++;
                sound.error();
            }
            afterInput();
        }

        function handleSpace() {
            if (finished || !started) return;
            flashKey(' ');
            if (wi < words.length - 1) {
                wi++;
                ci = 0;
                sound.press();
                afterInput();
            }
        }

        function handleBackspace() {
            if (finished) return;
            if (ci > 0) {
                ci--;
                const cur = wordEls[wi];
                if (cur) {
                    if (ci >= cur.word.length) {
                        const ex = cur.chars.pop();
                        if (ex) ex.remove();
                    } else {
                        cur.chars[ci].classList.remove('correct', 'incorrect');
                    }
                }
                sound.press();
            } else if (wi > 0) {
                wi--;
                ci = wordEls[wi].chars.length;
                sound.press();
            }
            moveCaret();
            highlightNext();
        }

        function countUp(el, target, dur) {
            if (!el) return;
            const t0 = performance.now();
            (function tick(now) {
                const p = Math.min(1, (now - t0) / dur);
                const e = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * e);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            })(t0);
        }

        function finish() {
            if (finished) return;
            finished = true;
            cancelAnimationFrame(rafId);
            const el = Math.max(0.001, (performance.now() - startTime) / 1000);
            const wpm = Math.round((correct / 5) / (el / 60));
            const rawWpm = Math.round((raw / 5) / (el / 60));
            const acc = raw ? Math.round(correct / raw * 100) : 100;

            if (rAcc) rAcc.textContent = acc;
            if (rRaw) rRaw.textContent = rawWpm;
            if (rTime) rTime.textContent = el.toFixed(1);

            const beat = wpm >= HARRY_WPM;
            const icon = beat
                ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>'
                : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>';

            if (verdictEl) {
                verdictEl.className = 'tt-verdict' + (beat ? ' beat' : '');
                verdictEl.innerHTML = icon + '<span>' + (beat ? `you beat Harry • ${HARRY_WPM} wpm` : `you didn't beat Harry • ${HARRY_WPM} wpm`) + '</span>';
            }

            container?.classList.add('show-results');
            if (beat) sound.success(); else sound.chime();
            countUp(rWpm, wpm, 750);
        }

        function reset() {
            cancelAnimationFrame(rafId);
            started = false;
            finished = false;
            startTime = 0;
            wi = 0;
            ci = 0;
            raw = 0;
            correct = 0;
            dispWpm = 0;
            dispAcc = 100;
            dispTime = 0;
            lastStatWrite = 0;

            if (elWpm) elWpm.textContent = '0';
            if (elAcc) elAcc.textContent = '100';
            if (elTime) elTime.textContent = '0';

            container?.classList.remove('show-results');
            genWords();
            buildText();
            moveCaret();
            highlightNext();
        }

        // Global Typing Listener when panel is active
        document.addEventListener('keydown', (e) => {
            if (!arcadeOverlay?.classList.contains('is-open')) return;
            if (currentActiveTab !== 'typer') return;

            // Prevent scroll or browser shortcuts on space and tab
            if (e.key === 'Tab') {
                e.preventDefault();
                reset();
                return;
            }

            if (e.key === 'Backspace') {
                e.preventDefault();
                handleBackspace();
                return;
            }

            if (e.key === ' ') {
                e.preventDefault();
                handleSpace();
                return;
            }

            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const k = e.key.toLowerCase();
                if ((k >= 'a' && k <= 'z') || k === ',' || k === '.' || k === '-' || k === "'") {
                    handleChar(k);
                }
            }
        });

        restartBtn?.addEventListener('click', reset);

        window.ttFocus = () => {
            wordsEl.focus();
            moveCaret();
            highlightNext();
        };

        // Initialize keyboard & words
        buildKeyboard();
        reset();
    })();

    // ==========================================================================
    // 2. REACTION SPEED TEST
    // ==========================================================================
    (() => {
        const screen = document.getElementById('reactionScreen');
        const mainTxt = document.getElementById('reactionMainText');
        const subTxt = document.getElementById('reactionSubText');
        const bestEl = document.getElementById('reactionBestMs');
        const avgEl = document.getElementById('reactionAvgMs');
        const triesEl = document.getElementById('reactionTries');

        if (!screen) return;

        let state = 'idle'; // idle | waiting | ready | result | early
        let waitTimer = null;
        let readyTime = 0;
        let attempts = [];
        let bestMs = Infinity;

        // Restore High Score
        const savedBest = localStorage.getItem('arcade_reaction_best');
        if (savedBest) {
            bestMs = parseInt(savedBest, 10);
            if (bestEl) bestEl.textContent = `${bestMs} ms`;
        }

        function setState(newState) {
            state = newState;
            screen.setAttribute('data-state', newState);
        }

        function startWaiting() {
            setState('waiting');
            mainTxt.textContent = 'Wait for flash...';
            subTxt.textContent = 'Do not click yet!';
            const delay = 1400 + Math.random() * 2600;
            waitTimer = setTimeout(() => {
                setState('ready');
                readyTime = performance.now();
                mainTxt.textContent = 'CLICK NOW!';
                subTxt.textContent = 'Click as fast as possible!';
                playTone(880, 'sine', 0.05, 0.08);
            }, delay);
        }

        function handleClick() {
            if (state === 'idle' || state === 'result' || state === 'early') {
                startWaiting();
            } else if (state === 'waiting') {
                clearTimeout(waitTimer);
                setState('early');
                mainTxt.textContent = 'Too soon!';
                subTxt.textContent = 'Click to try again.';
                sound.error();
            } else if (state === 'ready') {
                const reactionMs = Math.round(performance.now() - readyTime);
                setState('result');
                attempts.push(reactionMs);

                let rating = 'Fast Reflexes';
                if (reactionMs < 190) rating = 'Godlike Reflexes!';
                else if (reactionMs > 280) rating = 'Average Speed';

                mainTxt.textContent = `${reactionMs} ms`;
                subTxt.textContent = `${rating} • Click to try again.`;

                if (reactionMs < bestMs) {
                    bestMs = reactionMs;
                    localStorage.setItem('arcade_reaction_best', bestMs.toString());
                    if (bestEl) bestEl.textContent = `${bestMs} ms`;
                }

                const avg = Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
                if (avgEl) avgEl.textContent = `${avg} ms`;
                if (triesEl) triesEl.textContent = `${attempts.length} / 5`;

                sound.chime();
            }
        }

        screen.addEventListener('click', handleClick);
    })();

    // ==========================================================================
    // 3. AIM REFLEX BENCHMARK
    // ==========================================================================
    (() => {
        const field = document.getElementById('aimField');
        const overlay = document.getElementById('aimOverlayPrompt');
        const startBtn = document.getElementById('aimStartBtn');
        const scoreVal = document.getElementById('aimScoreVal');
        const timerVal = document.getElementById('aimTimerVal');
        const accVal = document.getElementById('aimAccVal');
        const bestVal = document.getElementById('aimBestScoreVal');

        if (!field) return;

        let isRunning = false;
        let score = 0;
        let clicks = 0;
        let targetsHit = 0;
        let timeLeft = 30.0;
        let gameTimer = null;
        let currentTarget = null;
        let bestPts = parseInt(localStorage.getItem('arcade_aim_best') || '0', 10);

        if (bestVal) bestVal.textContent = `${bestPts} pts`;

        function spawnTarget() {
            if (!isRunning) return;
            if (currentTarget) currentTarget.remove();

            const target = document.createElement('div');
            target.className = 'aim-target';

            const rect = field.getBoundingClientRect();
            const padding = 36;
            const x = padding + Math.random() * (rect.width - padding * 2);
            const y = padding + Math.random() * (rect.height - padding * 2);

            target.style.left = `${x}px`;
            target.style.top = `${y}px`;

            target.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                if (!isRunning) return;
                targetsHit++;
                clicks++;
                score += 100;
                if (scoreVal) scoreVal.textContent = score;
                updateAcc();
                sound.tick();
                target.remove();
                spawnTarget();
            });

            field.appendChild(target);
            currentTarget = target;
        }

        function updateAcc() {
            const acc = clicks ? Math.round((targetsHit / clicks) * 100) : 100;
            if (accVal) accVal.textContent = `${acc}%`;
        }

        field.addEventListener('mousedown', () => {
            if (!isRunning) return;
            clicks++;
            updateAcc();
            sound.error();
        });

        function startGame() {
            isRunning = true;
            score = 0;
            clicks = 0;
            targetsHit = 0;
            timeLeft = 30.0;
            overlay.style.display = 'none';

            if (scoreVal) scoreVal.textContent = '0';
            if (accVal) accVal.textContent = '100%';
            if (timerVal) timerVal.textContent = '30.0s';

            spawnTarget();

            const startTime = performance.now();
            gameTimer = setInterval(() => {
                const elapsed = (performance.now() - startTime) / 1000;
                const rem = Math.max(0, 30.0 - elapsed);
                if (timerVal) timerVal.textContent = `${rem.toFixed(1)}s`;

                if (rem <= 0) {
                    endGame();
                }
            }, 100);
        }

        function endGame() {
            isRunning = false;
            clearInterval(gameTimer);
            if (currentTarget) currentTarget.remove();

            if (score > bestPts) {
                bestPts = score;
                localStorage.setItem('arcade_aim_best', bestPts.toString());
                if (bestVal) bestVal.textContent = `${bestPts} pts`;
            }

            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <h3>Challenge Complete!</h3>
                <p>Score: <strong>${score} pts</strong> • Accuracy: <strong>${clicks ? Math.round((targetsHit/clicks)*100) : 100}%</strong></p>
                <button type="button" class="skills-action-btn" id="aimRestartAction">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                    <span>Play Again</span>
                </button>
            `;
            document.getElementById('aimRestartAction')?.addEventListener('click', startGame);
            sound.chime();
        }

        startBtn?.addEventListener('click', startGame);
    })();

    // ==========================================================================
    // 4. MEMORY SEQUENCE (SIMON)
    // ==========================================================================
    (() => {
        const pads = document.querySelectorAll('.simon-pad');
        const startBtn = document.getElementById('simonStartBtn');
        const levelTxt = document.getElementById('simonLevel');
        const bestTxt = document.getElementById('simonBest');
        const statusTxt = document.getElementById('simonStatus');

        if (pads.length === 0) return;

        const FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        let sequence = [];
        let playerStep = 0;
        let isPlayingSequence = false;
        let isPlayerTurn = false;
        let level = 1;
        let bestLevel = parseInt(localStorage.getItem('arcade_simon_best') || '0', 10);

        if (bestTxt) bestTxt.textContent = bestLevel;

        function flashPad(idx, duration = 280) {
            const pad = pads[idx];
            if (!pad) return;
            pad.classList.add('is-lit');
            playTone(FREQS[idx], 'sine', duration / 1000, 0.12);
            setTimeout(() => {
                pad.classList.remove('is-lit');
            }, duration);
        }

        function playSequence() {
            isPlayingSequence = true;
            isPlayerTurn = false;
            statusTxt.textContent = 'Watch sequence...';

            let i = 0;
            const interval = setInterval(() => {
                if (i >= sequence.length) {
                    clearInterval(interval);
                    isPlayingSequence = false;
                    isPlayerTurn = true;
                    playerStep = 0;
                    statusTxt.textContent = 'Your turn! Repeat the pattern.';
                    return;
                }
                flashPad(sequence[i], 320);
                i++;
            }, 550);
        }

        function nextRound() {
            levelTxt.textContent = level;
            sequence.push(Math.floor(Math.random() * 6));
            setTimeout(playSequence, 800);
        }

        pads.forEach(pad => {
            pad.addEventListener('click', () => {
                if (!isPlayerTurn || isPlayingSequence) return;
                const idx = parseInt(pad.getAttribute('data-pad'), 10);
                flashPad(idx, 180);

                if (idx === sequence[playerStep]) {
                    playerStep++;
                    if (playerStep === sequence.length) {
                        isPlayerTurn = false;
                        level++;
                        if (level - 1 > bestLevel) {
                            bestLevel = level - 1;
                            localStorage.setItem('arcade_simon_best', bestLevel.toString());
                            if (bestTxt) bestTxt.textContent = bestLevel;
                        }
                        statusTxt.textContent = 'Correct! Next level incoming...';
                        sound.chime();
                        setTimeout(nextRound, 700);
                    }
                } else {
                    isPlayerTurn = false;
                    statusTxt.textContent = `Game Over! You reached Level ${level}.`;
                    sound.error();
                }
            });
        });

        startBtn?.addEventListener('click', () => {
            level = 1;
            sequence = [];
            levelTxt.textContent = '1';
            nextRound();
        });
    })();

    // ==========================================================================
    // 5. CPS TAP DUEL
    // ==========================================================================
    (() => {
        const tapBtn = document.getElementById('tugTapBtn');
        const resetBtn = document.getElementById('tugResetBtn');
        const fillP1 = document.getElementById('tugFillP1');
        const fillP2 = document.getElementById('tugFillP2');
        const knot = document.getElementById('tugKnot');
        const p1Stat = document.getElementById('tugP1Stat');
        const p2Stat = document.getElementById('tugP2Stat');
        const statusTxt = document.getElementById('tugMatchStatus');
        const timerTxt = document.getElementById('tugTimer');
        const liveCpsTxt = document.getElementById('tugLiveCps');
        const bestCpsEl = document.getElementById('tugBestCps');

        if (!tapBtn) return;

        let isPlaying = false;
        let isOver = false;
        let p1Taps = 0;
        let p2Taps = 0;
        let markerPos = 50;
        let p1Timestamps = [];
        let startTime = 0;
        let botInterval = null;
        let timerInterval = null;

        const savedBest = localStorage.getItem('arcade_tug_best') || '0.0';
        if (bestCpsEl) bestCpsEl.textContent = `${savedBest} CPS`;

        function updateTrack() {
            const clamped = Math.max(0, Math.min(100, markerPos));
            fillP1.style.width = `${clamped}%`;
            fillP2.style.width = `${100 - clamped}%`;
            knot.style.left = `${clamped}%`;
        }

        function calcCps(timestamps) {
            const now = performance.now();
            return timestamps.filter(t => now - t <= 1000).length;
        }

        function handleTap() {
            if (isOver) return;
            if (!isPlaying) {
                isPlaying = true;
                startTime = performance.now();
                statusTxt.textContent = 'PULL!';

                timerInterval = setInterval(() => {
                    const sec = (performance.now() - startTime) / 1000;
                    timerTxt.textContent = `${sec.toFixed(1)}s`;
                    const cps = calcCps(p1Timestamps);
                    liveCpsTxt.textContent = `${cps.toFixed(1)} CPS`;
                }, 100);

                botInterval = setInterval(() => {
                    if (!isPlaying || isOver) return;
                    p2Taps++;
                    markerPos -= 1.8 + Math.random() * 1.5;
                    p2Stat.innerHTML = `<span class="dot-p2"></span> BOT: ${p2Taps}`;
                    updateTrack();

                    if (markerPos <= 0) {
                        endMatch('Bot Wins! Better luck next time.');
                    }
                }, 180);
            }

            p1Taps++;
            p1Timestamps.push(performance.now());
            markerPos += 2.2;
            p1Stat.innerHTML = `<span class="dot-p1"></span> YOU: ${p1Taps}`;
            updateTrack();
            sound.tick();

            if (markerPos >= 100) {
                endMatch('YOU WIN! Incredible tapping speed!');
            }
        }

        function endMatch(msg) {
            isPlaying = false;
            isOver = true;
            clearInterval(botInterval);
            clearInterval(timerInterval);
            statusTxt.textContent = msg;

            const cps = calcCps(p1Timestamps);
            const currentBest = parseFloat(localStorage.getItem('arcade_tug_best') || '0.0');
            if (cps > currentBest) {
                localStorage.setItem('arcade_tug_best', cps.toFixed(1));
                if (bestCpsEl) bestCpsEl.textContent = `${cps.toFixed(1)} CPS`;
            }

            if (markerPos >= 100) sound.success(); else sound.error();
        }

        function resetMatch() {
            isPlaying = false;
            isOver = false;
            clearInterval(botInterval);
            clearInterval(timerInterval);
            p1Taps = 0;
            p2Taps = 0;
            markerPos = 50;
            p1Timestamps = [];
            statusTxt.textContent = 'Ready';
            timerTxt.textContent = '0.0s';
            liveCpsTxt.textContent = '0.0 CPS';
            p1Stat.innerHTML = '<span class="dot-p1"></span> YOU: 0';
            p2Stat.innerHTML = '<span class="dot-p2"></span> BOT: 0';
            updateTrack();
        }

        tapBtn.addEventListener('click', handleTap);
        resetBtn?.addEventListener('click', resetMatch);

        document.addEventListener('keydown', (e) => {
            if (!arcadeOverlay?.classList.contains('is-open')) return;
            if (currentActiveTab === 'tug' && e.code === 'Space') {
                e.preventDefault();
                handleTap();
            }
        });
    })();

    // Auto-open if query or hash specifies skills
    if (window.location.search.includes('open=skills') || window.location.hash === '#skills') {
        setTimeout(openSkillsModal, 150);
    }
});
