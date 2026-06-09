export const portfolioData = {
    name: "Aditya Jha",
    role: "Full Stack Developer",
    heroHeadline: ["Building", "Full Stack", "Solutions"],
    shortBio: "Hi, I'm Aditya Jha, a Full Stack MERN Developer who loves thinking of new ideas and turning them into reality through code.",
    email: "developer.adityajha@gmail.com",

    longBio: [
        "I’m a Full Stack Developer. Passionate about emerging technologies and innovation, I enjoy building modern web applications that solve real world problems and create meaningful imapact. I focus on building modern, user centric digital experiences that combine robust engineering and seamless performance.",
        "My work spans across developer focused platforms, AI-powered solutions, and scalable SaaS products. From comprehensive developer ecosystems like TrivoXa to intelligent health-tech and ed-tech solutions such as PULSE and Attendora, I aim to create applications that are both technically resilient and impactful in real world use cases.",
        "Leveraging a strong foundation in core algorithms and modern frameworks like Next.js, React, and Node.js, I enjoy bridging dynamic frontend experiences with secure, scalable backend systems while maintaining performance, accessibility, and maintainability at every stage of development.",
        "Beyond development, I am actively growing in the open-source ecosystem, contributing to projects, collaborating with developers, and continuously expanding my understanding of modern software engineering practices. Alongside I am also elevating myself into Data Structures and Algorithms and Competitive Programming. I am deeply committed to continuous learning, innovation, and solving meaningful problems through technology, always striving to become a better engineer and a better version of myself every day."
    ],

    skills: {
        languages: [
            { name: "C", icon: "devicon-c-plain colored" },
            { name: "C++", icon: "devicon-cplusplus-plain colored" },
            { name: "JavaScript", icon: "devicon-javascript-plain colored" },
            { name: "TypeScript", icon: "devicon-typescript-plain colored"},
            { name: "HTML5", icon: "devicon-html5-plain colored" },
            { name: "CSS3", icon: "devicon-css3-plain colored" }
        ],
        frontend: [
            { name: "React", icon: "devicon-react-original colored" },
            { name: "Next.js", icon: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
            { name: "Three.js", icon: "devicon-threejs-original" },
            { name: "Framer Motion", icon: "devicon-framermotion-original" }
        ],
        backend: [
            { name: "Node.js", icon: "devicon-nodejs-plain colored" },
            { name: "Express", icon: "devicon-express-original" },
            { name: "REST API", icon: "devicon-swagger-plain colored" },
            { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
            { name: "Firebase", icon: "devicon-firebase-plain colored" },
            {name: "Supabase", icon: "devicon-supabase-plain colored"},
        ],
        database: [
            { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
            { name: "Firebase", icon: "devicon-firebase-plain colored" },
            {name: "Supabase", icon: "devicon-supabase-plain colored"},
        ],
        tools: [
            { name: "Git", icon: "devicon-git-plain colored" },
            { name: "GitHub", icon: "devicon-github-original" },
            { name : "Postman", icon: "devicon-postman-plain colored" },
            {name: "Docker", icon: "devicon-docker-plain colored"},
        ]
    },

    softSkills: [
        { name: "Leadership" },
        { name: "Team Work" },
        { name: "Conflict Resolution" },
        { name: "Critical Thinking"},
        { name: "Problem Solving"},
        { name: "Networking" },
        { name: "Communication" }
    ],

    experience: [
        {
            year: "May - Present",
            title: "Contributor",
            company: "GSSoc'26",
            description: "Contributing to open-source projects under GirlScript Summer of Code, collaborating with developers globally, and writing code to solve real-world issues.",
            logo: "/Pics/gssoc.jpg"
        },
        {
            year: "Present",
            title: "Collaboration & Freelance",
            company: "Open to Work",
            description: "Currently looking for work collaboration and freelancing opportunities. Building robust personal projects and expanding technical expertise in AI tools and modern web frameworks."
        }
    ],

    projects: [
        {
            title: "TrivoXa",
            category: "Developer Toolkit",
            description: "A browser based developer workspace that consolidates the tools most developers keep scattered across tabs into one environment. It includes an AI assistant and an ai architecture scaffolding, a personal workspace, a 3D visualizer that maps out any public GitHub repository, and a package analyzer for evaluating NPM dependencies. The whole thing is installable, works offline, and syncs your history across devices so nothing gets lost between sessions. Designed to save developers up to 60% of their routine workflow time.",
            tech: ["JavaScript", "Node.js", "Express", "MongoDB", "Three.js", "JWT"],
            link: "https://trivoxa.vercel.app",
            image: "/projects/trivoxa.png"
        },
        {
            title: "PokeDex",
            category: "Interactive Web App",
            description: "A comprehensive Pokémon encyclopedia covering over 1025 species across all 9 generations. Features include a Squad Analyzer that calculates Level 100 stats and evaluates team synergy, visual evolution chain tracking with precise requirements such as levels, items, and friendship, and a type matchup calculator for competitive play. The entire experience is delivered through a compact glassmorphic interface built on the App Router and Server Components architecture.",
            tech: ["Next.js", "React", "Tailwind CSS", "Radix UI", "PokeAPI"],
            link: "https://pokedex-project-db.vercel.app",
            image: "/projects/pokedex.png"
        },
        {
            title: "Attendora",
            category: "EdTech Solution",
            description: "A smart attendance tracking platform built for students. It includes an AI timetable scanner that can parse a photo of your schedule and automatically configure weekly classes using Llama 3.2 Vision. Other core features include predictive attendance goals, a bunk planner that calculates safe skip margins, an integrated GPA calculator, gamified achievements to keep users engaged, and full CSV report exports. All data stays synced across devices through Firebase.",
            tech: ["Vanilla JS", "Firebase", "OpenRouter AI", "PWA", "Chart.js"],
            link: "https://attendora-sat.vercel.app/",
            image: "/projects/attendora.png"
        },
        {
            title: "PULSE",
            category: "HealthTech & Wellness",
            description: "A unified health dashboard that consolidates activity, sleep, stress, and nutrition tracking into a single interface. It integrates a Gemini AI chatbot that supports both text and voice queries for health guidance. Additional tools include a BMI calculator, a symptom checker, a PDF report generator, and custom workout and nutrition planners. The platform also features a simulated telemedicine interface for booking consultations, and runs as an installable PWA with full offline support.",
            tech: ["Vanilla JS", "Tailwind CSS", "Chart.js", "Gemini AI", "jsPDF", "PWA"],
            link: "https://pulse-kappa-two.vercel.app/#",
            image: "/projects/pulse.png"
        },
    ],

    education: [
        {
            institution: "Bhagwan Parshuram Institute of Technology",
            affiliation: "Affiliated To GGSIPU",
            degree: "B.Tech Computer Science Engineering (Data Science)",
            year: "2024-2028",
            logo: "/projects/BPIT.webp"
        }
    ],

    socials: [
        { name: "GitHub", url: "https://github.com/adityajha-coder", icon: "github" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/aditya-jha-8534a1305/", icon: "linkedin" },
        { name: "Instagram", url: "https://instagram.com/adjzyy", icon: "instagram" }
    ],

    certifications: [
        // {
        //     title: "Smart India Hackathon 2025",
        //     // issuer: "Govt of India",
        //     image: "/certifications/SIH certificate.jpg"
        // },
        // {
        //     title: "Build with Gemini Hackathon",
        //     issuer: "Google",
        //     image: "/certifications/build-with-gemini-certi.jpeg"
        // },
        {
            title: "Google Developer on Campus",
            // issuer: "GDG-BPIT",
            image: "/certifications/gdg-certi.png"
        },
        {
            title: "SUI x NS Workshop",
            // issuer: "SUI",
            image: "/certifications/SUI-Workshop-NS-Certi.jpeg"
        },
        // {
        //     title: "ACE(M) Hackathon",
        //     issuer: "ACE",
        //     image: "/certifications/ACE(M)-Hack-Certi.jpeg"
        // }
    ]
};
