// ==========================================================================
// HARRY SEVILLA PORTFOLIO — PROJECT DATABASE (11 DELIVERED PROJECTS)
// ==========================================================================
const PROJECTS_DATA = [
    {
        id: 'anigrow',
        title: 'Ani-Grow: AI-Powered Poultry & Livestock Farming Guide',
        shortTitle: 'Ani-Grow',
        logo: 'assets/anigrow_logo.png',
        screen: 'assets/Ani-Grow/6.jpg',
        category: 'Poultry & Livestock Guide',
        badge: 'Poultry & Livestock Analytics',
        accentColor: '#ededec',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'Lead Full-Stack Mobile & IoT Architect',
        tagline: 'AI-Powered Poultry and Livestock Farming Guide with Data Analytics',
        client: 'Golden Nutriharvest, Inc. (San Miguel Foods Grower Partner)',
        repoUrl: 'https://github.com/harrybryn',
        siteUrl: '',
        roles: ['Thesis', 'IoT Hardware', 'Mobile App Development', 'Web Dashboard', 'AI Integration', 'Capstone'],
        overviewHeadline: 'Farming with Data, Not Guesswork',
        overviewDesc: 'Contributed to the design and development of an AI-powered poultry and livestock farming guide for Golden Nutriharvest, Inc., a San Miguel Foods grower partner with over 15 years in the industry. The system combines IoT prototypes, an Android app for caretakers, and a web dashboard for farm administrators. A project grounded in on-site research, hardware prototyping, and expert evaluation.',
        challenge: 'Caretakers at Golden Nutriharvest weighed only a small sample of chickens once a week and used the average to represent the whole flock. Sorting out underweight "rejects" was done by eye, and feed was fixed to general standards instead of actual weight. The goal was to replace this with continuous, objective weight monitoring and growth-based decisions.',
        desc: 'A mobile application that helps farm animal caretakers manage poultry and livestock operations using AI guidance and data analytics. Supports and integrates with custom IoT machines for weight-based segregation and automated feeding of farm animals.',
        deliverables: [
            'Real-time animal weight telemetry and automatic sorting gates',
            'Automated scheduling and dosage controls for feeding dispensers',
            'Offline-first mobile data sync for farm field workers'
        ],
        architecture: 'Built with a cross-platform React Native frontend communicating with sensor hubs via REST & MQTT protocols. Backend processes real-time feed analytics and stores event logs in a normalized schema.',
        tags: ['React Native', 'IoT Integration', 'AI Analytics', 'Agricultural Tech', 'REST API'],
        builtWith: [
            'React Native (Expo)',
            'React (Vite)',
            'TypeScript',
            'Tailwind CSS',
            'Supabase (Auth, PostgreSQL, Realtime, Storage)',
            'Firebase Cloud Messaging',
            'Claude API',
            'ESP32 Microcontroller',
            'Arduino IDE',
            'Load cell + HX711',
            '12V Linear Actuator',
            'Relay Module',
            'LCD I2C Display',
            '3D-Printed Parts'
        ],
        outcome: {
            title: 'The Outcome & Validation',
            narrative: 'The result: a fully integrated system field-tested and evaluated by 3 technical experts and 10 commercial farm operators from poultry and piggery operations in Bulacan, evaluated using the ISO/IEC 25010:2023 quality model, with the hardware independently rated by 5 technical experts. Both were rated Strongly Agree.',
            stats: [
                {
                    value: '3.73 / 4.00',
                    label: 'Overall Software Quality',
                    sub: 'ISO/IEC 25010:2023 · Functional Suitability & Security highest at 3.79'
                },
                {
                    value: '3.65 / 4.00',
                    label: 'Overall IoT Hardware Quality',
                    sub: '5 Technical Experts · Usability rated highest at 3.87'
                },
                {
                    value: '10+',
                    label: 'Commercial Operators Evaluated',
                    sub: 'Tested with San Miguel Foods grower partner & piggery operators'
                }
            ]
        },
        caseStudySections: [
            {
                id: 'animal-management',
                num: '01',
                title: 'Animal Management & Housing Units',
                badge: 'Farm Command Center',
                desc: 'Caretakers and administrators monitor housings, flock populations, and mortality records across Broiler and Swine pens.',
                image: 'assets/Ani-Grow/6.jpg'
            },
            {
                id: 'predictive-analytics',
                num: '02',
                title: 'Weight Forecast & Harvest Trajectory',
                badge: 'Predictive Analytics',
                desc: 'Continuous growth benchmark tracking against breed curves, predicting market-ready harvest dates and milestone variances.',
                image: 'assets/Ani-Grow/2.jpg'
            },
            {
                id: 'growth-distribution',
                num: '03',
                title: 'Distribution Trend & Growth Insights',
                badge: 'Flock Telemetry',
                desc: 'Headcount distribution across normal, underweight, and overweight categories with Average Daily Gain (ADG) calculations.',
                image: 'assets/Ani-Grow/3.jpg'
            },
            {
                id: 'ai-care-guide',
                num: '04',
                title: 'Actionable Guide & Lifecycle Roadmap',
                badge: 'Claude API Intelligence',
                desc: 'AI-tailored feeding ratios, temperature recommendations, and milestone guidelines customized to each batch lifecycle stage.',
                image: 'assets/Ani-Grow/5.jpg'
            },
            {
                id: 'weighing-history',
                num: '05',
                title: 'Weighing History & Scale Telemetry',
                badge: 'IoT Machine Integration',
                desc: 'Direct telemetry synchronization with load cell hardware scales, logging day-by-day weight logs and batch comparisons.',
                image: 'assets/Ani-Grow/4.jpg'
            },
            {
                id: 'biometric-report',
                num: '06',
                title: 'Official Biometric & Audit Report',
                badge: 'Official Audit',
                desc: 'Formatted export and print-ready biometric performance audit for compliance with San Miguel Foods grower standards.',
                image: 'assets/Ani-Grow/1.jpg'
            },
            {
                id: 'caretaker-mobile-app',
                num: '07',
                title: 'Caretaker Mobile Companion Application',
                badge: 'Mobile App',
                desc: 'An Android app for field caretakers to monitor automated feeder hoppers, log daily biometric observations, and receive push notifications for low feed and harvest readiness.',
                image: 'assets/anigrow_hero_showcase.webp',
                isMobile: true
            }
        ],
        screenshots: [
            {
                src: 'assets/Ani-Grow/6.jpg',
                title: 'Animal Management & Housing Units',
                badge: 'Farm Command',
                desc: 'Multi-housing monitoring across Broiler and Swine units, active batch headcounts, and capacity utilization.'
            },
            {
                src: 'assets/Ani-Grow/2.jpg',
                title: 'Weight Forecast & Harvest Trajectory',
                badge: 'Predictive Analytics',
                desc: 'Predictive 140-day growth curves, harvest readiness dates, and milestone tracking against breed standards.'
            },
            {
                src: 'assets/Ani-Grow/3.jpg',
                title: 'Distribution Trend & Growth Insights',
                badge: 'Flock Telemetry',
                desc: 'Headcount distribution across normal, underweight, and overweight categories with Average Daily Gain (ADG) calculations.'
            },
            {
                src: 'assets/Ani-Grow/5.jpg',
                title: 'Actionable Guide & Lifecycle Roadmap',
                badge: 'AI Recommendations',
                desc: 'Automated care roadmap with daily task verification, temperature regulation, and AI-recommended feed adjustments.'
            },
            {
                src: 'assets/Ani-Grow/4.jpg',
                title: 'Weighing History & Scale Telemetry',
                badge: 'Data Telemetry',
                desc: 'Day-by-day weighing breakdowns from IoT load cell scales, historical trends, and min/max weight logs.'
            },
            {
                src: 'assets/Ani-Grow/1.jpg',
                title: 'Official Biometric & Audit Report',
                badge: 'Official Audit',
                desc: 'Exportable print layout report for farm performance records, mortality tracking, and San Miguel Foods compliance.'
            },
            {
                src: 'assets/anigrow_hero_showcase.webp',
                title: 'Caretaker Mobile App Interface',
                badge: 'Mobile App',
                desc: 'Android mobile app for caretakers: priority dispenser alerts, livestock count overview, and IoT device connection statuses.'
            }
        ]
    },
    {
        id: 'tourgo',
        title: 'TOURGO: Collaborative Mobile Travel Coordination Platform',
        shortTitle: 'TOURGO',
        logo: 'assets/TourGoAppLogo.png',
        screen: 'assets/screen_tourgo.png',
        category: 'MOBILE PLATFORM · AI',
        badge: 'Group Travel & Coordination',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'Mobile Application Developer',
        desc: 'Cross-platform mobile application designed to streamline group travel coordination, featuring real-time group chats, automated expense splitting, and AI-powered trip itinerary generation using Google Gemini.',
        deliverables: [
            'Instant group onboarding via 6-digit join codes and real-time chat',
            'Automated group expense split calculator with multi-currency tracking',
            'AI-powered day-trip generator powered by Gemini 1.5 Flash',
            'Push notification dispatch via Expo Notification service'
        ],
        architecture: 'Frontend built with React Native and Expo Router. Communicates with a Node/Express REST API with encrypted token authentication and Supabase PostgreSQL for trip state sync.',
        tags: ['React Native', 'Expo', 'Google Gemini AI', 'PostgreSQL', 'Tailwind CSS']
    },
    {
        id: 'binhi',
        title: 'Binhi: Lights & Sounds Production Booking System',
        shortTitle: 'Binhi Concept',
        logo: 'assets/BINHI Concept Logo.webp',
        screen: 'assets/screen_binhi.png',
        category: 'WEB SYSTEM · MULTI-PORTAL',
        badge: 'Lights & Sounds Booking',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'Lead Full-Stack Web Developer',
        desc: 'Full-scale events management and equipment booking web platform serving clients, crew, administrators, and affiliates. Features an automated quotation builder, crew scheduling, and SMS OTP verification.',
        deliverables: [
            '4 distinct role-based access portals (Client, Crew, Admin, Affiliate)',
            'Live package configuration & custom equipment pricing engine',
            'Automated booking confirmations via SMS OTP verification',
            'Calendar-based equipment clash prevention system'
        ],
        architecture: 'Single-page React web application backed by PHP REST services and MySQL database with strict transaction isolation and RBAC security.',
        tags: ['React', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API', 'SMS Gateway']
    },
    {
        id: 'colm',
        title: 'COLM Pulilan: Institutional Personnel & Records Platform',
        shortTitle: 'COLM Pulilan',
        logo: 'assets/COLM_Pulilan_logo.png',
        screen: 'assets/screen_colm.png',
        category: 'ENTERPRISE · HR & RECORDS',
        badge: 'Personnel & Records Portal',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'System Architect & Full-Stack Developer',
        desc: 'Institutional staff records and personnel management web platform for College of Our Lady of Mercy Pulilan, managing institutional directory, digital leave filing, and multi-tier administrative approvals.',
        deliverables: [
            'Centralized faculty and employee records database with role taxonomy',
            'Automated leave filing and multi-level approval hierarchy',
            'Role-based authorization and session management',
            'Comprehensive audit logging for institutional records compliance'
        ],
        architecture: 'React frontend coupled with a structured PHP and MySQL backend deployed in an on-premise institutional server with automated nightly backups.',
        tags: ['React', 'PHP', 'MySQL', 'Tailwind CSS', 'Enterprise Web', 'Role-Based Access']
    },
    {
        id: 'rnf',
        title: 'RNF Trucking: Freight & Dispatch Management System',
        shortTitle: 'RNF Trucking',
        logo: 'assets/rnftrucking.png',
        screen: 'assets/screen_rnf.svg',
        category: 'LOGISTICS & SUPPLY CHAIN',
        badge: 'Freight Dispatch & Fleet',
        year: '2025',
        timeline: '2025',
        role: 'Full-Stack Developer',
        desc: 'Logistics and fleet operations platform managing vehicle maintenance logs, dispatch schedules, driver manifests, and delivery tracking across regional supply routes.',
        deliverables: [
            'Driver dispatch scheduling and trip manifest generation',
            'Fleet vehicle maintenance logging and service alert triggers',
            'Freight rate calculation based on weight, distance, and toll matrices',
            'Exportable trip reports and delivery sign-off documentation'
        ],
        architecture: 'Electron desktop client paired with a cloud-synchronized PHP/MySQL backend for zero-latency offline manifest entries and instant cloud sync when connected.',
        tags: ['PHP', 'MySQL', 'JavaScript', 'Logistics', 'Operations ERP']
    },
    {
        id: 'wanderlocal',
        title: 'WanderLocal: Community Tourism & Local Destination Guide',
        shortTitle: 'WanderLocal',
        logo: 'assets/WanderLocalLogo.png',
        screen: 'assets/screen_wanderlocal.svg',
        category: 'TOURISM & EXPLORATION',
        badge: 'Tourism Discovery Guide',
        year: '2025',
        timeline: '2025',
        role: 'Frontend & API Engineer',
        desc: 'Community-driven regional travel platform connecting travelers with verified local guides, heritage trails, cultural culinary destinations, and indigenous craft markets.',
        deliverables: [
            'Interactive map directory featuring curated regional points of interest',
            'Verified local tour guide booking and itinerary scheduling',
            'Community review engine with photo verification and moderation filters',
            'Mobile-first responsive design optimized for low-bandwidth cellular networks'
        ],
        architecture: 'Next.js frontend with server-side rendered pages for maximum SEO visibility, communicating with PostgreSQL via Prisma ORM and Mapbox GL for geospatial visualization.',
        tags: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Mapbox', 'Tailwind CSS']
    },
    {
        id: 'together',
        title: 'Together: Collaborative Event & Meetup Coordinator',
        shortTitle: 'Together',
        logo: 'assets/TogetherLogo.png',
        screen: 'assets/screen_together.svg',
        category: 'COMMUNITY & EVENTS',
        badge: 'Collaborative Event Planner',
        year: '2024',
        timeline: '2024',
        role: 'Full-Stack Developer',
        desc: 'Social event coordinating web application allowing private groups and student organizations to vote on meeting times, create task allocations, and manage collective supplies.',
        deliverables: [
            'Poll-based meeting time availability matrix with conflict resolution',
            'Collaborative task checklists with real-time assignment claiming',
            'Event budget tracker with automated expense split tallying',
            'Automated Google Calendar and iCal synchronization links'
        ],
        architecture: 'Vue.js frontend coupled with a Firebase Firestore real-time database and Firebase Cloud Functions for instantaneous multi-user collaborative editing.',
        tags: ['Vue.js', 'Firebase', 'Realtime DB', 'Cloud Functions', 'Tailwind CSS']
    },
    {
        id: 'grammargalaxy',
        title: 'Grammar Galaxy: Gamified Language Mechanics Learning Quest',
        shortTitle: 'Grammar Galaxy',
        logo: 'assets/grammargalaxy.png',
        screen: 'assets/screen_grammargalaxy.svg',
        category: 'EDTECH · GAMIFIED LEARNING',
        badge: 'Gamified Grammar Game',
        year: '2024',
        timeline: '2024',
        role: 'Interactive Frontend Developer',
        desc: 'Gamified educational web platform reinforcing English grammar, syntax, and sentence structure through interactive space exploration quests and progressive difficulty levels.',
        deliverables: [
            'Interactive drag-and-drop sentence building and syntactic parsing games',
            'Adaptive spaced-repetition algorithm adjusting difficulty dynamically',
            'Student mastery dashboard tracking progress and learning weaknesses',
            'Teacher analytics portal for classroom quiz generation and score exports'
        ],
        architecture: 'Vanilla JavaScript canvas-accelerated rendering engine with HTML5 Audio integration and an Express/SQLite backend tracking learning telemetry.',
        tags: ['JavaScript', 'HTML5 Canvas', 'Web Audio API', 'Express', 'SQLite']
    },
    {
        id: 'boycold',
        title: 'Boy Cold Cafe: Point-of-Sale & Live Inventory Engine',
        shortTitle: 'Boy Cold Cafe POS',
        logo: 'assets/boycoldlogo.png',
        screen: 'assets/screen_boycold.svg',
        category: 'RETAIL · POS & INVENTORY',
        badge: 'Cafe POS & Inventory Terminal',
        year: '2024',
        timeline: '2024',
        role: 'Full-Stack Developer',
        desc: 'Specialty cafe management terminal facilitating rapid order taking, live ingredient inventory decrements, recipe cost breakdowns, and thermal receipt printing.',
        deliverables: [
            'Fast touch-optimized order terminal with modifiers and custom brew options',
            'Live recipe-based ingredient stock deductions upon order confirmation',
            'Daily sales reconciliation and end-of-shift cash drawer balance reports',
            'Direct thermal receipt printing via browser Web Serial and Bluetooth'
        ],
        architecture: 'Offline-first progressive web app built with React, indexedDB local storage caching, and a Node/MySQL cloud synchronization daemon.',
        tags: ['React', 'IndexedDB', 'Node.js', 'MySQL', 'Web Serial API', 'PWA']
    },
    {
        id: 'psychguide',
        title: 'PsychGuide: Mental Health Teleconsult & Case Management',
        shortTitle: 'PsychGuide',
        logo: 'assets/psychguide.png',
        screen: 'assets/screen_psychguide.svg',
        category: 'HEALTHCARE · TELECONSULT',
        badge: 'Teleconsultation & Case Records',
        year: '2023',
        timeline: '2023',
        role: 'Backend & Security Lead',
        desc: 'Confidential teleconsultation scheduling and patient records management platform built for university guidance counselors and student mental health advocates.',
        deliverables: [
            'Confidential appointment scheduling with counselor calendar availability',
            'Encrypted patient case note storage with access-tier protection',
            'Automated confidential intake questionnaire with preliminary triage score',
            'Crisis resource hotlines directory accessible without login'
        ],
        architecture: 'PHP/MySQL web application built with strict input sanitization, CSRF token validation, encrypted database fields, and SSL/TLS transport security.',
        tags: ['PHP', 'MySQL', 'Bootstrap 5', 'Data Encryption', 'Healthcare Portal']
    },
    {
        id: 'evergotesco',
        title: 'Ever Gotesco: Interactive Commercial Directory Kiosk',
        shortTitle: 'Ever Gotesco',
        logo: 'assets/evergotescologo.png',
        screen: 'assets/screen_evergotesco.svg',
        category: 'COMMERCIAL · MALL DIRECTORY',
        badge: 'Mall Directory & Map Kiosk',
        year: '2023',
        timeline: '2023',
        role: 'Frontend UI Developer',
        desc: 'Touchscreen commercial navigation directory designed for shopping mall kiosks, providing visitors with store category indexing, floor maps, and ongoing promotions.',
        deliverables: [
            'Interactive multi-floor map with store location highlighting',
            'Fuzzy search engine for tenant names, brand keywords, and product types',
            'Promotional events and mall announcements carousel widget',
            'Idle-screen screen saver and automated daily data synchronization'
        ],
        architecture: 'Client-side interactive web application built with HTML5, CSS3, JavaScript ES6+, and SVG path rendering for crisp zoomable mall maps on large touchscreen displays.',
        tags: ['JavaScript ES6+', 'SVG Mapping', 'Touch UI', 'JSON Store Index', 'Kiosk Web']
    }
];
