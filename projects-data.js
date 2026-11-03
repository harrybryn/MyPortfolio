// ==========================================================================
// HARRY SEVILLA PORTFOLIO — PROJECT DATABASE (11 DELIVERED PROJECTS)
// ==========================================================================
const PROJECTS_DATA = [
    {
        id: 'anigrow',
        title: 'Ani-Grow: AI-Powered Poultry & Livestock Farming Guide',
        shortTitle: 'Ani-Grow',
        logo: 'assets/anigrow_logo.png',
        screen: 'assets/Ani-Grow/6_nobg.png',
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
        overview: {
            title: 'Farming with Data, Not Guesswork',
            description: 'Contributed to the design and development of an AI-powered poultry and livestock farming guide for Golden Nutriharvest, Inc., a San Miguel Foods grower partner with over 15 years in the industry. The system combines IoT prototypes, an Android app for caretakers, and a web dashboard for farm administrators. A project grounded in on-site research, hardware prototyping, and expert evaluation.',
            heroImage: 'assets/Ani-Grow/Ani-Grow Home.webp'
        },
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
        sections: [
            {
                id: 'the-challenge',
                title: 'The Challenge',
                badge: 'PROBLEM STATEMENT',
                description: 'Caretakers at Golden Nutriharvest weighed only a small sample of chickens once a week and used the average to represent the whole flock. Sorting out underweight "rejects" was done by eye, and feed was fixed to general standards instead of actual weight. The goal was to replace this with continuous, objective weight monitoring and growth-based decisions.',
                images: ['assets/Ani-Grow/Ani-Grow Home.webp'],
                layout: 'single',
                device: 'standalone'
            },
            {
                id: 'animal-registration',
                title: 'Animal Registration and Daily Logging',
                badge: 'CARETAKER MOBILE WORKFLOW',
                description: 'Caretakers create a profile for each animal or batch (species, age, pen) and log daily observations such as feeding times and disease. Row-Level Security means each caretaker only sees and edits the records in their own assigned scope.',
                images: ['assets/Ani-Grow/Ani-Grow Animal Batch.webp', 'assets/Ani-Grow/Ani-Grow Animal Batch 2.webp'],
                layout: 'duo-crop',
                device: 'standalone'
            },
            {
                id: 'automated-feeding',
                title: 'Automated Feeding Dispenser',
                badge: 'IOT MACHINE AUTOMATION',
                description: 'Feed can be dispensed on a schedule or triggered manually from the app. The ESP32-controlled dispenser syncs every dispense to Supabase in real time, so caretakers can check feeding history and remaining feed from their phone.',
                images: ['assets/Ani-Grow/Ani-Grow Devices 3.webp', 'assets/Ani-Grow/Ani-Grow Analytics Feed.webp'],
                layout: 'duo-crop',
                device: 'standalone'
            },
            {
                id: 'weight-segregation',
                title: 'Weight Segregation',
                badge: 'LOAD CELL SENSORS & ACTUATORS',
                description: 'A 100 kg load cell with an HX711 amplifier measures each animal\'s weight, and the ESP32 classifies it. A 12V linear actuator then directs the animal into its sorting cell, while limit switches prevent overextension and an LCD shows the live reading. The app displays the resulting weight classification per animal.',
                images: ['assets/Ani-Grow/Ani-Grow Devices 2.webp', 'assets/Ani-Grow/Ani-Grow Analytics Growth.webp'],
                layout: 'duo-crop',
                device: 'standalone'
            },
            {
                id: 'iot-settings',
                title: 'IoT Device Settings',
                badge: 'HARDWARE TELEMETRY',
                description: 'A dedicated page in the app for managing and monitoring the connected hardware prototypes from the phone.',
                images: ['assets/Ani-Grow/Ani-Grow Devices 1.webp', 'assets/Ani-Grow/Ani-Grow Devices 3.webp', 'assets/Ani-Grow/Ani-Grow Devices 2.webp'],
                layout: 'fade-loop',
                device: 'standalone'
            },
            {
                id: 'ai-care-guide',
                title: 'AI Care Guide',
                badge: 'CLAUDE API INTELLIGENCE',
                description: 'Using the Claude API and the animal\'s own data, the app generates step-by-step care guides based on type, age, and growth stage, covering feeding adjustments, housing conditions, and general farming practices. Guides are available right from each animal\'s profile.',
                images: ['assets/Ani-Grow/Ani-Grow Guide.webp'],
                layout: 'single',
                device: 'standalone'
            },
            {
                id: 'predictive-analytics',
                title: 'Predictive Analytics and Growth Pattern Detection',
                badge: 'PREDICTIVE ANALYTICS',
                description: 'Growth rates and harvest-ready dates are forecast from historical weight and feeding data. The app also compares each animal\'s growth against the expected pattern for its type and age, and flags irregular trends such as slower-than-expected weight gain so caretakers can step in early.',
                images: ['assets/Ani-Grow/Ani-Grow Analytics Prediction.webp', 'assets/Ani-Grow/Ani-Grow Analytics Growth 2.webp'],
                layout: 'duo-crop',
                device: 'standalone'
            },
            {
                id: 'health-monitoring',
                title: 'Health Monitoring and Reminders',
                badge: 'HEALTH MODULE',
                description: 'A timestamped record of vaccinations, medicines, and treatments per animal. Firebase Cloud Messaging sends push reminders before upcoming health tasks, along with alerts for harvest readiness and low feed.',
                images: ['assets/Ani-Grow/Ani-Grow Health Module.webp', 'assets/Ani-Grow/Ani-Grow Analytics Health 1.webp', 'assets/Ani-Grow/Ani-Grow Analytics Health 2.webp'],
                layout: 'fade-loop',
                device: 'standalone'
            },
            {
                id: 'admin-dashboard',
                title: 'Admin Web Dashboard',
                badge: 'FARM COMMAND WEB DASHBOARD',
                description: 'A React web platform built for farm owners and administrators, bringing together data from every animal, IoT prototype, and caretaker account. It shows farm-wide growth trends, feeding consumption, and health statistics in one place, a view that wasn\'t possible with per-caretaker record-keeping.',
                images: ['assets/Ani-Grow/AdminDashboard.webp'],
                layout: 'single',
                device: 'standalone'
            },
            {
                id: 'user-management',
                title: 'User Management',
                badge: 'RBAC ADMIN CONSOLE',
                description: 'Administrators add, edit, and deactivate caretaker and staff accounts and assign roles (admin or caretaker), without touching the database directly.',
                images: ['assets/Ani-Grow/UserManagement.webp'],
                layout: 'single',
                device: 'standalone'
            }
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
                image: 'assets/Ani-Grow/6_nobg.png'
            },
            {
                id: 'predictive-analytics',
                num: '02',
                title: 'Weight Forecast & Harvest Trajectory',
                badge: 'Predictive Analytics',
                desc: 'Continuous growth benchmark tracking against breed curves, predicting market-ready harvest dates and milestone variances.',
                image: 'assets/Ani-Grow/2_nobg.png'
            },
            {
                id: 'growth-distribution',
                num: '03',
                title: 'Distribution Trend & Growth Insights',
                badge: 'Flock Telemetry',
                desc: 'Headcount distribution across normal, underweight, and overweight categories with Average Daily Gain (ADG) calculations.',
                image: 'assets/Ani-Grow/3_nobg.png'
            },
            {
                id: 'ai-care-guide',
                num: '04',
                title: 'Actionable Guide & Lifecycle Roadmap',
                badge: 'Claude API Intelligence',
                desc: 'AI-tailored feeding ratios, temperature recommendations, and milestone guidelines customized to each batch lifecycle stage.',
                image: 'assets/Ani-Grow/5_nobg.png'
            },
            {
                id: 'weighing-history',
                num: '05',
                title: 'Weighing History & Scale Telemetry',
                badge: 'IoT Machine Integration',
                desc: 'Direct telemetry synchronization with load cell hardware scales, logging day-by-day weight logs and batch comparisons.',
                image: 'assets/Ani-Grow/4_nobg.png'
            },
            {
                id: 'biometric-report',
                num: '06',
                title: 'Official Biometric & Audit Report',
                badge: 'Official Audit',
                desc: 'Formatted export and print-ready biometric performance audit for compliance with San Miguel Foods grower standards.',
                image: 'assets/Ani-Grow/1_nobg.png'
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
        title: 'TOURGO',
        shortTitle: 'TOURGO',
        fullTitle: 'TOURGO: Collaborative Mobile Travel Coordination Platform',
        logo: 'assets/TourGoAppLogo.png',
        screen: 'assets/Tourgo/Home.jpg',
        category: 'Trip Planning Guide',
        badge: 'Group Travel & Coordination',
        accentColor: '#007aff',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'Mobile Application Developer',
        tagline: 'A new way for travel groups to plan trips together.',
        repoUrl: 'https://github.com/harrybryn',
        siteUrl: 'https://github.com/harrybryn',
        roles: ['Research', 'UX', 'UI', 'Mobile Development', 'Backend & AI'],
        overview: {
            title: 'Planning with Intent',
            description: 'Designed and built a collaborative mobile app for Filipino friend groups, bringing destination voting, a shared itinerary, expense splitting, live member tracking, and an AI travel assistant into one platform. A project grounded in real group-travel problems, iteration, and hands-on testing.',
            heroImage: 'assets/Tourgo/Home.jpg'
        },
        overviewHeadline: 'Planning with Intent',
        overviewDesc: 'Designed and built a collaborative mobile app for Filipino friend groups, bringing destination voting, a shared itinerary, expense splitting, live member tracking, and an AI travel assistant into one platform. A project grounded in real group-travel problems, iteration, and hands-on testing.',
        challenge: 'Travel groups planning a trip usually juggle endless chat debates, scattered itineraries, spreadsheets, and unsettled shared expenses. The goal was to replace all of that with a single, synchronized mobile experience that takes a group from initial idea to the post-trip recap.',
        desc: 'A collaborative mobile application for friend groups and travel communities designed to streamline group trips, featuring destination voting, shared 1-day AI itineraries, live location radar, transparent expense splitting, and post-trip scrapbooks.',
        deliverables: [
            'Instant group onboarding via 6-digit join codes and real-time chat sync',
            'Special Feature: 1-Day AI Itinerary Builder powered by Google Gemini',
            'Fair, transparent group expense ledger with multi-party settlement',
            'Live group safety radar and digital roll call checkpoints',
            'Interactive travel scrapbook and community destination guide'
        ],
        architecture: 'Cross-platform React Native (Expo) architecture backed by Supabase PostgreSQL for real-time trip synchronization, Google Gemini & Groq APIs for intelligent itinerary synthesis, and OpenWeather API for localized travel route forecasts.',
        tags: ['React Native', 'Expo', 'Supabase', 'Google Gemini AI', 'Tailwind CSS', 'OpenWeather', 'TravelTech'],
        builtWith: [
            'React Native (Expo)',
            'Supabase (Auth, PostgreSQL, Storage, Realtime)',
            'Tailwind CSS',
            'Google Gemini AI',
            'Groq',
            'OpenWeather API',
            'TravelTime / Mapbox',
            'OCR.Space',
            'Firebase Cloud Messaging'
        ],
        sections: [
            {
                id: 'the-challenge',
                title: 'The Challenge',
                badge: 'PROBLEM STATEMENT',
                description: 'Travel groups planning a trip usually juggle endless chat debates, scattered itineraries, spreadsheets, and unsettled shared expenses. The goal was to replace all of that with a single, synchronized mobile experience that takes a group from initial idea to the post-trip recap.',
                images: ['assets/Tourgo/Home.jpg'],
                layout: 'single'
            },
            {
                id: 'group-decisions',
                title: 'Group Decisions & Trip Onboarding',
                badge: 'TRIP ONBOARDING',
                description: 'Members propose destinations and dates, vote, and let the host lock the tour once the deadline hits. No more scrolling through chat threads to find out what was decided. Locking the tour finalizes the plan and opens the shared itinerary, with instant 6-digit join code access.',
                images: ['assets/Tourgo/Create_Trips_Step1.jpg', 'assets/Tourgo/Create_Trips_Step3.jpg'],
                layout: 'duo-crop'
            },
            {
                id: 'one-itinerary',
                title: 'One Itinerary, Everyone in Sync — Special Feature: 1-Day Itinerary Builder',
                badge: 'SPECIAL FEATURE · 1-DAY ITINERARY',
                description: 'A day-by-day plan with times, tags (Transport, Activity, Food, Meetup), and reactions, backed by real-time sync across every member\'s device. Features a dedicated special tool that builds an optimized 1-Day Itinerary with scheduled times, destination spots, route maps, and turn-by-turn stop details generated via AI.',
                images: [
                    'assets/Tourgo/1 Day Itenerary Features/Itenerary.jpg',
                    'assets/Tourgo/1 Day Itenerary Features/Time.jpg',
                    'assets/Tourgo/1 Day Itenerary Features/Locations.jpg',
                    'assets/Tourgo/1 Day Itenerary Features/Route.jpg',
                    'assets/Tourgo/1 Day Itenerary Features/Details.jpg'
                ],
                layout: 'fade-loop'
            },
            {
                id: 'fair-expenses',
                title: 'Fair, Transparent Expenses',
                badge: 'TRIPS EXPENSES LEDGER',
                description: 'Built around how Filipino groups actually split costs: split, pinaluwal, or solo. Members can scan receipts with OCR, see who owes whom, and settle up with proof of payment that the receiver verifies before the debt is marked paid.',
                images: ['assets/Tourgo/Trips_Expenses.png'],
                layout: 'single'
            },
            {
                id: 'group-radar', title: 'Group Radar & Trip Safety',
                badge: 'TRIPS SAFETY & LOCATION',
                description: 'Opt-in, trip-scoped live location radar and battery status shown on a map only during the trip\'s finalized dates. Paired with a digital Roll Call tool to account for everyone before departures, designed for safety and coordination without compromising privacy.',
                images: ['assets/Tourgo/Trips_Safety_Location.jpg', 'assets/Tourgo/Trips_Safety_RollCall.jpg'],
                layout: 'duo-crop'
            },
            {
                id: 'trips-checklist',
                title: 'Trips Preparation & Collaborative Checklist',
                badge: 'TRIPS CHECKLIST',
                description: 'A shared packing and task checklist that keeps the group prepared. Members claim group items, verify personal gear, and track packing commitment before heading out.',
                images: ['assets/Tourgo/Trips_Checklist.jpg'],
                layout: 'single'
            },
            {
                id: 'agilito-ai',
                title: 'Agilito, the AI Travel Assistant',
                badge: 'AI INTELLIGENCE',
                description: 'An in-app assistant that suggests spots to accept or decline, powered by Google Gemini with Groq as a fallback so suggestions stay available when one service is limited.',
                images: ['assets/Tourgo/AgilitoAi.jpg'],
                layout: 'single'
            },
            {
                id: 'weather-forecast',
                title: 'Real-Time Weather Forecast',
                badge: 'ROUTE ADVISORY',
                description: 'Integrated live weather forecast and precipitation monitoring for all scheduled destinations, allowing travelers to plan outdoor activities around sunny conditions and avoid rain delays.',
                images: ['assets/Tourgo/WeatherForcast.jpg'],
                layout: 'single'
            },
            {
                id: 'trip-recap',
                title: 'Trip Recap, Scrapbook & Community Feed',
                badge: 'POST-TRIP MEMORIES',
                description: 'After the trip, members add memories, photos, and ratings to a recap scrapbook, kept private among friends or published to the community feed to help other travelers discover authentic regional gems.',
                images: ['assets/Tourgo/Post_Trips_Scrapbook.jpg', 'assets/Tourgo/Community.jpg'],
                layout: 'duo-crop'
            }
        ],
        outcome: {
            title: 'The Outcome',
            description: 'The result: a working all-in-one trip planner tested on real Android and iPhone devices. Core flows (login, trip hosting and joining, destination voting, itinerary, commitment tracking, Radar, and the expense ledger with verified settle-up) passed all 11 functional test cases. From research and database design to UI and launch-ready features, TOURGO shows how a group trip can feel organized, fair, and fun, without the group chat chaos.',
            narrative: 'The result: a working all-in-one trip planner tested on real Android and iPhone devices. Core flows (login, trip hosting and joining, destination voting, itinerary, commitment tracking, Radar, and the expense ledger with verified settle-up) passed all 11 functional test cases. From research and database design to UI and launch-ready features, TOURGO shows how a group trip can feel organized, fair, and fun, without the group chat chaos.'
        },
        screenshots: [
            {
                src: 'assets/Tourgo/Home.jpg',
                title: 'TOURGO Home Dashboard',
                badge: 'DASHBOARD',
                desc: 'Main group travel hub displaying active trips, upcoming destinations, member avatars, and quick actions.'
            },
            {
                src: 'assets/Tourgo/1 Day Itenerary Features/Itenerary.jpg',
                title: '1-Day Itinerary Builder',
                badge: 'SPECIAL FEATURE',
                desc: 'Special feature generating optimized 1-day travel schedules with scheduled time slots and activity checkpoints.'
            },
            {
                src: 'assets/Tourgo/1 Day Itenerary Features/Route.jpg',
                title: 'AI Route & Transit Navigation',
                badge: 'ROUTE MAPPING',
                desc: 'Optimized travel routing and travel-time estimates between scheduled destination stops.'
            },
            {
                src: 'assets/Tourgo/Trips_Expenses.png',
                title: 'Group Expenses Ledger',
                badge: 'EXPENSES',
                desc: 'Transparent multi-party expense splitting with split, solo, and pinaluwal accounting.'
            },
            {
                src: 'assets/Tourgo/Trips_Safety_Location.jpg',
                title: 'Group Radar & Live Location',
                badge: 'SAFETY RADAR',
                desc: 'Trip-scoped live member location and battery status for coordinated exploration.'
            },
            {
                src: 'assets/Tourgo/Trips_Safety_RollCall.jpg',
                title: 'Group Roll Call Verification',
                badge: 'SAFETY CHECK',
                desc: 'Digital check-in to confirm every group member is accounted for at each checkpoint.'
            },
            {
                src: 'assets/Tourgo/Trips_Checklist.jpg',
                title: 'Collaborative Packing Checklist',
                badge: 'CHECKLIST',
                desc: 'Synchronized packing and duty assignments preventing forgotten travel necessities.'
            },
            {
                src: 'assets/Tourgo/AgilitoAi.jpg',
                title: 'Agilito AI Travel Companion',
                badge: 'GEMINI AI',
                desc: 'Context-aware Gemini AI suggestions for local attractions, food spots, and hidden gems.'
            },
            {
                src: 'assets/Tourgo/Post_Trips_Scrapbook.jpg',
                title: 'Post-Trip Memories Scrapbook',
                badge: 'SCRAPBOOK',
                desc: 'Collaborative photo album and ratings log preserving memories after the journey.'
            }
        ]
    },
    {
        id: 'binhi',
        title: 'BINHI Concept: Event Services Booking & Operations Hub',
        shortTitle: 'BINHI Concept',
        logo: 'assets/Binhi/binhi_logo.png',
        screen: 'assets/Binhi/admin_dashboard.webp',
        category: 'Event Services Booking System',
        badge: 'Event Services & Inventory Logistics',
        accentColor: '#ededec',
        year: '2026',
        timeline: '2025 – 2026',
        role: 'Full-Stack Web & Logistics Developer',
        tagline: 'Event Services Booking and Management System',
        client: 'BINHI Concept Lights, Sounds & Event Styling (Malolos, Bulacan)',
        repoUrl: 'https://github.com/harrybryn',
        siteUrl: '',
        roles: ['Full-Stack Development', 'UI/UX Design', 'Database Architecture', 'E-Commerce', 'Inventory Logistics', 'Capstone'],
        overviewHeadline: 'Connecting Bookings with Real-Time Gear Inventory',
        overviewDesc: 'Designed and developed a centralized e-commerce and operations platform for BINHI Concept, a lights, sounds, and event styling service in Malolos, Bulacan. Built with an Iterative Waterfall methodology, the system unifies public package browsing, calendar availability validation, PayMongo checkout, physical serial-level equipment allocation, and role-based workflows across clients, administrators, warehouse managers, and rigging technicians.',
        overview: {
            title: 'Connecting Bookings with Real-Time Gear Inventory',
            description: 'Designed and developed a centralized e-commerce and operations platform for BINHI Concept, a lights, sounds, and event styling service in Malolos, Bulacan. Built with an Iterative Waterfall methodology, the system unifies public package browsing, calendar availability validation, PayMongo checkout, physical serial-level equipment allocation, and role-based workflows across clients, administrators, warehouse managers, and rigging technicians.',
            heroImage: 'assets/Binhi/admin_dashboard.webp'
        },
        challenge: 'Event production businesses handle high-value audio rigs, subwoofers, moving lights, and microphones that must be scheduled across overlapping event dates. BINHI Concept previously relied on fragmented inquiries, manual spreadsheet reservations, and verbal equipment checks, creating double-booking risks and uncertain logistics fee calculations. The challenge was to connect real-time customer reservations directly with physical warehouse unit availability and automated transit turnaround windows.',
        desc: 'Centralized e-commerce and resource operations platform for lights, sounds, and event styling services in Malolos, Bulacan. Connects real-time client reservations directly with warehouse equipment inventory, PayMongo checkout, transit turnaround windows, and role-based staff portals.',
        deliverables: [
            'Customer reservation portal with dynamic package selection and calendar lock',
            'Secure payment gateway integration via PayMongo for reservation down payments',
            'Real-time master calendar preventing gear clashes across overlapping dates',
            'Two-tier inventory architecture tracking serial numbers, barcodes, and maintenance states',
            'Field-crew mobile portal with equipment manifests, checklists, and route navigation'
        ],
        architecture: 'React 18 frontend with TypeScript and Vite, backed by Supabase PostgreSQL for transactional inventory locks and real-time reservation updates, TanStack Query for state caching, and PayMongo for checkout processing.',
        tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'TanStack Query', 'PayMongo', 'Row-Level Security'],
        builtWith: [
            'React 18',
            'TypeScript',
            'Vite',
            'Tailwind CSS',
            'Supabase (PostgreSQL, Auth, Storage, Realtime)',
            'TanStack Query (React Query)',
            'PayMongo',
            'Row-Level Security (RLS)',
            'Vercel'
        ],
        sections: [
            {
                id: 'the-challenge',
                title: 'The Challenge',
                badge: 'PROBLEM STATEMENT',
                description: 'Event production businesses handle high-value audio rigs, subwoofers, moving lights, and microphones that must be scheduled across overlapping event dates. BINHI Concept previously relied on fragmented inquiries, manual spreadsheet reservations, and verbal equipment checks, creating double-booking risks and uncertain logistics fee calculations. The challenge was to connect real-time customer reservations directly with physical warehouse unit availability and automated transit turnaround windows.',
                images: ['assets/Binhi/admin_dashboard.webp'],
                layout: 'single',
                device: 'standalone'
            },
            {
                id: 'customer-portal',
                title: 'Customer Portal & Online Reservations',
                badge: 'CLIENT BOOKING & RESERVATIONS',
                description: 'Designed for event hosts, clients can browse signature lighting and audio packages, inspect exact gear inclusions, verify calendar dates in real time, and submit reservations with secure online down payments via PayMongo. Customers track active bookings in real time, view quotation breakdowns, manage reservations, and exchange accumulated loyalty points for monetary discounts.',
                images: [
                    'assets/Binhi/customer_services.webp',
                    'assets/Binhi/customer_date.webp',
                    'assets/Binhi/customer_loyalty.webp'
                ],
                layout: 'fade-loop',
                device: 'standalone'
            },
            {
                id: 'admin-hub',
                title: 'Admin Operations Hub & Master Calendar',
                badge: 'OPERATIONS CONTROL CENTER',
                description: 'A centralized command center giving administrators full operational visibility. Features an executive KPI overview, a master production calendar with automated transit turnaround validation, a signature package builder mapping physical equipment models, regional transport fee rule matrices, and dynamic affiliate commission payout tracking.',
                images: [
                    'assets/Binhi/admin_dashboard.webp',
                    'assets/Binhi/admin_calendar.webp',
                    'assets/Binhi/admin_package_builder.webp',
                    'assets/Binhi/admin_affiliate.webp'
                ],
                layout: 'fade-loop',
                device: 'standalone'
            },
            {
                id: 'inventory-management',
                title: 'Multi-Layer Inventory & Equipment Allocation',
                badge: 'WAREHOUSE LOGISTICS ENGINE',
                description: 'A two-tier inventory architecture built for warehouse logistics. Layer 1 maintains master equipment models and technical specifications (audio production, lighting fixtures, atmospheric stage effects). Layer 2 tracks individual physical serial numbers, barcode labels, and maintenance states. Physical units are automatically reserved per confirmed booking, preventing scheduling conflicts before gear leaves the warehouse.',
                images: ['assets/Binhi/inventory_dashboard.webp'],
                layout: 'single',
                device: 'standalone'
            },
            {
                id: 'crew-logistics',
                title: 'On-Site Event Crew & Rigging Logistics',
                badge: 'FIELD CREW & MOBILE PORTAL',
                description: 'Tailored for field technicians and staging crew, this mobile-optimized portal provides real-time access to assigned event schedules, venue call times, client contact info, and GPS navigation routes. Interactive digital checklists guide crew members through equipment setup, sound/light checks, and post-event teardown verification to ensure all physical units return safely.',
                images: ['assets/Binhi/crew_dashboard.webp'],
                layout: 'single',
                device: 'standalone'
            }
        ],
        outcome: {
            title: 'The Outcome',
            narrative: 'The result: an integrated, production-grade online booking and event management platform delivered over a 12-week development lifecycle using the Iterative Waterfall methodology. By synchronizing client reservations directly with warehouse serial tags and transit turnaround windows, BINHI Concept eliminated double-booking risks and streamlined client communication from initial package browsing to final balance settlement.',
            stats: [
                {
                    value: '100%',
                    label: 'Clash Elimination',
                    sub: 'Zero double-booking across concurrent audio/lighting gigs'
                },
                {
                    value: '12 Weeks',
                    label: 'Lifecycle Duration',
                    sub: 'Production-ready delivery via Iterative Waterfall'
                },
                {
                    value: '4 Roles',
                    label: 'Dedicated Portals',
                    sub: 'Clients, Administrators, Warehouse, and Field Crew'
                }
            ]
        }
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
