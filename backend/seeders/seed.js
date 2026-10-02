const Admin = require('../models/Admin');
const Course = require('../models/Course');
const Article = require('../models/Article');
const Enrollment = require('../models/Enrollment');
const Banner = require('../models/Banner');

const initialCourses = [
  {
    title: "Data Structures and Algorithms in Java",
    description: "Master Data Structures and Algorithms in Java with a comprehensive 45-day structured plan. From time complexity and recursion to binary trees, graphs, and dynamic programming, crack top product-based company coding interviews.",
    image: "/images/ai-learning.jpg",
    price: 3500,
    category: "Computer Science",
    duration: 45,
    students: 2450,
    rating: 4.9,
    badge: "Bestseller",
    instructor: {
      name: "Gauri Singhal",
      role: "DSA & Java Instructor",
      bio: "Intern at YR IT Solution, Celebal Technologies | DSE @ Infosys. Passionate about algorithms, interview problem solving, and mentoring students.",
      avatar: "/images/dsa_instructor.png",
      linkedin: "https://www.linkedin.com/in/gaurisinghal28"
    },
    chapters: [
      { id: 1, title: "Day 01-07: Java Essentials, OOP & Complexity Analysis" },
      { id: 2, title: "Day 08-14: Arrays, Two Pointers & Sliding Window" },
      { id: 3, title: "Day 15-21: Strings, Searching & Sorting Patterns" },
      { id: 4, title: "Day 22-28: Linked Lists, Stacks & Queues" },
      { id: 5, title: "Day 29-35: Binary Trees & Binary Search Trees (BST)" },
      { id: 6, title: "Day 36-40: Heaps, Hashing & Greedy Algorithms" },
      { id: 7, title: "Day 41-45: Graphs, Dynamic Programming & Mock Interviews" }
    ],
    curriculum: {
      sections: [
        {
          title: "Week 1 (Days 1-7): Java Foundations, Memory & Complexity",
          lessons: [
            { title: "Day 01: Java Syntax, Environment Setup & JVM Memory Architecture", duration: "45:00", videoUrl: "" },
            { title: "Day 02: Classes, Objects, References & OOP Foundations", duration: "50:00", videoUrl: "" },
            { title: "Day 03: Time & Space Complexity (Big-O, Big-Theta, Big-Omega)", duration: "40:00", videoUrl: "" },
            { title: "Day 04: Recursion Mechanics & Call Stack Visualization in Java", duration: "55:00", videoUrl: "" },
            { title: "Day 05: Mathematical Algorithms (GCD, Sieve of Eratosthenes, Power)", duration: "42:00", videoUrl: "" },
            { title: "Day 06: Backtracking Basics: Permutations & Subsets Generation", duration: "58:00", videoUrl: "" },
            { title: "Day 07: Weekly Milestone: Recursion & Complexity Assessment", duration: "60:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 2 (Days 8-14): Arrays, Two Pointers & Sliding Window",
          lessons: [
            { title: "Day 08: Array Internals & Java ArrayList Deep Dive", duration: "40:00", videoUrl: "" },
            { title: "Day 09: Two Pointers Pattern: Pair Sum & 3Sum Problem", duration: "48:00", videoUrl: "" },
            { title: "Day 10: Trapping Rainwater & Container With Most Water", duration: "52:00", videoUrl: "" },
            { title: "Day 11: Sliding Window: Fixed vs Variable Length Windows", duration: "50:00", videoUrl: "" },
            { title: "Day 12: Prefix Sum, Difference Arrays & Range Queries", duration: "45:00", videoUrl: "" },
            { title: "Day 13: Kadane's Algorithm for Maximum Subarray & Circular Subarrays", duration: "44:00", videoUrl: "" },
            { title: "Day 14: Weekly Milestone: Top 15 LeetCode Array Problems in Java", duration: "65:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 3 (Days 15-21): Strings, Searching & Sorting Patterns",
          lessons: [
            { title: "Day 15: String Pool, Immutability & StringBuilder in Java", duration: "38:00", videoUrl: "" },
            { title: "Day 16: Anagrams, Palindromes & String Matching Algorithms", duration: "46:00", videoUrl: "" },
            { title: "Day 17: Binary Search on 1D Arrays & Floor/Ceil Queries", duration: "50:00", videoUrl: "" },
            { title: "Day 18: Binary Search on Answer / Monotonic Predicates", duration: "55:00", videoUrl: "" },
            { title: "Day 19: Merge Sort & Inversion Count Implementation", duration: "52:00", videoUrl: "" },
            { title: "Day 20: Quick Sort, Dutch National Flag & QuickSelect", duration: "54:00", videoUrl: "" },
            { title: "Day 21: Weekly Milestone: Searching & Sorting Speed Contest", duration: "60:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 4 (Days 22-28): Linked Lists, Stacks & Queues",
          lessons: [
            { title: "Day 22: Singly Linked List: Construction, Reversal & Middle Node", duration: "48:00", videoUrl: "" },
            { title: "Day 23: Floyd's Cycle Detection (Fast & Slow Pointers)", duration: "45:00", videoUrl: "" },
            { title: "Day 24: Doubly Linked Lists & Merge K Sorted Lists", duration: "55:00", videoUrl: "" },
            { title: "Day 25: Stack Implementation: Array vs Node-Based & Parentheses Matching", duration: "42:00", videoUrl: "" },
            { title: "Day 26: Monotonic Stack: Next Greater Element & Largest Rectangle in Histogram", duration: "60:00", videoUrl: "" },
            { title: "Day 27: Queue, Deque, Circular Queue & Sliding Window Maximum", duration: "50:00", videoUrl: "" },
            { title: "Day 28: Weekly Milestone: Implement LRU Cache in Java", duration: "55:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 5 (Days 29-35): Binary Trees & Binary Search Trees (BST)",
          lessons: [
            { title: "Day 29: Tree Representation, Node Structure & Recursion on Trees", duration: "45:00", videoUrl: "" },
            { title: "Day 30: DFS Traversals: Pre-order, In-order, Post-order (Recursive & Iterative)", duration: "52:00", videoUrl: "" },
            { title: "Day 31: BFS / Level-Order Traversal, Zigzag & Tree Views (Top/Bottom/Left)", duration: "55:00", videoUrl: "" },
            { title: "Day 32: Tree Properties: Height, Diameter, Balanced Tree & Symmetry", duration: "48:00", videoUrl: "" },
            { title: "Day 33: Binary Search Tree (BST): Lookup, Insertion, Deletion & Valid BST", duration: "50:00", videoUrl: "" },
            { title: "Day 34: Lowest Common Ancestor (LCA) in Binary Tree & BST", duration: "45:00", videoUrl: "" },
            { title: "Day 35: Weekly Milestone: Tree Path Sums & Serialize/Deserialize Trees", duration: "60:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 6 (Days 36-40): Heaps, Hashing & Greedy Algorithms",
          lessons: [
            { title: "Day 36: PriorityQueue in Java, Min-Heap & Max-Heap Heapify", duration: "48:00", videoUrl: "" },
            { title: "Day 37: Top K Frequent Elements & Median from Data Stream", duration: "54:00", videoUrl: "" },
            { title: "Day 38: HashMap & HashSet Internals: Hash Functions, Buckets & Collision Resolution", duration: "46:00", videoUrl: "" },
            { title: "Day 39: Greedy Algorithms: Activity Selection, Job Sequencing, Huffman Coding", duration: "50:00", videoUrl: "" },
            { title: "Day 40: Weekly Milestone: Custom Java Comparators & Heap Optimization", duration: "55:00", videoUrl: "" }
          ]
        },
        {
          title: "Week 7 (Days 41-45): Graphs, Dynamic Programming & Interviews",
          lessons: [
            { title: "Day 41: Graph Representations (Adjacency Matrix & List) & BFS/DFS", duration: "55:00", videoUrl: "" },
            { title: "Day 42: Cycle Detection in Directed/Undirected Graphs & Topological Sort", duration: "58:00", videoUrl: "" },
            { title: "Day 43: Shortest Paths: Dijkstra Algorithm & Disjoint Set Union (DSU)", duration: "60:00", videoUrl: "" },
            { title: "Day 44: Dynamic Programming Patterns: 1D DP, 0/1 Knapsack & Longest Common Subsequence", duration: "65:00", videoUrl: "" },
            { title: "Day 45: Capstone: 45-Day Java DSA Assessment & Mock Technical Interview", duration: "75:00", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Day 01: Java Syntax & Environment Setup", duration: "45:00" },
      { title: "Day 02: Classes, Objects & OOP Foundations", duration: "50:00" },
      { title: "Day 03: Time & Space Complexity", duration: "40:00" },
      { title: "Day 04: Recursion Mechanics in Java", duration: "55:00" }
    ]
  },
  {
    title: "Digital Marketing and SEO",
    description: "Comprehensive masterclass on Search Engine Optimization (SEO), organic growth strategies, keyword research, technical SEO audits, Google Ads, and high-converting performance marketing.",
    image: "/images/Digital-Marketing.jpg",
    price: 3500,
    category: "Business",
    duration: 30,
    students: 1890,
    rating: 4.8,
    badge: "Popular",
    instructor: {
      name: "Jane Smith",
      role: "Digital Marketing & SEO Lead",
      bio: "Digital Marketing & SEO strategist with over 8 years of experience scaling organic traffic and marketing funnels.",
      avatar: "/images/trainer1.jpg"
    },
    chapters: [
      { id: 1, title: "Fundamentals of Digital Marketing & Brand Positioning" },
      { id: 2, title: "Search Engine Optimization (SEO) & Technical Audits" },
      { id: 3, title: "Keyword Research, Content Strategy & On-Page SEO" },
      { id: 4, title: "Google Analytics 4, Search Console & Tracking" },
      { id: 5, title: "Performance Marketing, Meta Ads & Google Ads" },
      { id: 6, title: "Capstone: Real-World SEO Campaign & Live Client Audit" }
    ],
    curriculum: {
      sections: [
        {
          title: "SEO & Content Architecture",
          lessons: [
            { title: "How Search Engines Work & Crawling/Indexing", duration: "25:00", videoUrl: "" },
            { title: "Mastering Keyword Intent & Competitor Research", duration: "35:00", videoUrl: "" },
            { title: "On-Page SEO: Metadata, Headings, Schema & Core Web Vitals", duration: "40:00", videoUrl: "" }
          ]
        },
        {
          title: "Paid Advertising & Growth Funnels",
          lessons: [
            { title: "Google Search Ads & Bidding Strategies", duration: "45:00", videoUrl: "" },
            { title: "Meta Ads Manager: Audience Targeting & Creative Funnels", duration: "50:00", videoUrl: "" },
            { title: "Conversion Rate Optimization (CRO) & A/B Testing", duration: "35:00", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "How Search Engines Work & Crawling/Indexing", duration: "25:00" },
      { title: "Mastering Keyword Intent & Competitor Research", duration: "35:00" },
      { title: "Google Search Ads & Bidding Strategies", duration: "45:00" }
    ]
  },
  {
    title: "AI and Machine Learning",
    description: "Master artificial intelligence and machine learning from the ground up: Python, mathematics, regression, neural networks, computer vision, NLP, and modern Generative AI & LLM workflows.",
    image: "/images/ai.jpg",
    price: 3500,
    category: "Data Science",
    duration: 40,
    students: 3200,
    rating: 4.9,
    badge: "Trending",
    instructor: {
      name: "Vishal",
      role: "Machine Learning Trainer",
      bio: "Specializes in Machine Learning and AI applications with deep expertise in PyTorch, computer vision, and neural network architectures.",
      avatar: "/images/Trainer6.jpeg"
    },
    chapters: [
      { id: 1, title: "Python for Data Science, NumPy & Pandas" },
      { id: 2, title: "Mathematics for Machine Learning & Statistics" },
      { id: 3, title: "Supervised & Unsupervised Learning Algorithms" },
      { id: 4, title: "Deep Learning & Neural Networks with PyTorch" },
      { id: 5, title: "Computer Vision, NLP & Transformer Architectures" },
      { id: 6, title: "Generative AI, Prompt Engineering & LLM Deployment" }
    ],
    curriculum: {
      sections: [
        {
          title: "Core Machine Learning",
          lessons: [
            { title: "Python Libraries: NumPy, Pandas, Matplotlib & Seaborn", duration: "35:00", videoUrl: "" },
            { title: "Supervised Learning: Linear & Logistic Regression, Decision Trees", duration: "45:00", videoUrl: "" },
            { title: "Model Evaluation: Cross-Validation, Precision, Recall & ROC-AUC", duration: "40:00", videoUrl: "" }
          ]
        },
        {
          title: "Deep Learning & Generative AI",
          lessons: [
            { title: "Introduction to Artificial Neural Networks & PyTorch", duration: "50:00", videoUrl: "" },
            { title: "Convolutional Neural Networks (CNNs) for Computer Vision", duration: "45:00", videoUrl: "" },
            { title: "Transformers, Large Language Models (LLMs) & RAG Architecture", duration: "60:00", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Python Libraries: NumPy & Pandas", duration: "35:00" },
      { title: "Supervised Learning: Regression & Trees", duration: "45:00" },
      { title: "Neural Networks & Deep Learning with PyTorch", duration: "50:00" }
    ]
  },
  {
    title: "Web Development",
    description: "Complete Full-Stack Web Development roadmap covering modern HTML5/CSS3, JavaScript ES6+, React 19, Node.js, Express, MongoDB, and production cloud deployment on Vercel and Render.",
    image: "/images/webdev-workspace.jpg",
    price: 3500,
    category: "Development",
    duration: 45,
    students: 4100,
    rating: 4.9,
    badge: "Top Rated",
    instructor: {
      name: "Sumit Kumar",
      role: "Web Development Instructor",
      bio: "Former Full Stack Developer at DRDO & PwC. Expert in React.js, Node.js, database design, and scalable web architecture.",
      avatar: "/images/trainer3.jpg"
    },
    chapters: [
      { id: 1, title: "Modern HTML5, Responsive CSS3 & Tailwind CSS" },
      { id: 2, title: "Core JavaScript Mastery & Asynchronous ES6+" },
      { id: 3, title: "Modern Frontend with React 19 & State Management" },
      { id: 4, title: "Backend REST APIs with Node.js & Express" },
      { id: 5, title: "MongoDB, Mongoose & Cloud Asset Storage" },
      { id: 6, title: "Capstone: Production Full-Stack App on Vercel & Render" }
    ],
    curriculum: {
      sections: [
        {
          title: "Frontend Engineering",
          lessons: [
            { title: "Semantic HTML5, CSS Grid, Flexbox & Tailwind CSS", duration: "35:00", videoUrl: "" },
            { title: "JavaScript ES6+, Closures, Promises & Async/Await", duration: "45:00", videoUrl: "" },
            { title: "React 19 Hooks, Component Lifecycle & Context API", duration: "50:00", videoUrl: "" }
          ]
        },
        {
          title: "Backend & Deployment",
          lessons: [
            { title: "Node.js & Express Server Architecture & Middlewares", duration: "40:00", videoUrl: "" },
            { title: "MongoDB Atlas, Mongoose Schemas, Indexes & Relations", duration: "45:00", videoUrl: "" },
            { title: "JWT Authentication, CORS & Production Cloud Deployment", duration: "55:00", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Semantic HTML5 & Responsive Tailwind CSS", duration: "35:00" },
      { title: "React 19 Hooks & Component Architecture", duration: "50:00" },
      { title: "Node.js & Express REST APIs", duration: "40:00" }
    ]
  },
  {
    title: "Graphic Designing and Video Editing",
    description: "Learn professional graphic design and video editing from industry creatives. Master Adobe Photoshop, Illustrator, Premiere Pro, After Effects, thumbnail creation, and viral social media video production.",
    image: "/images/istockphoto-1356364268-170667a.jpg",
    price: 3500,
    category: "Design",
    duration: 35,
    students: 2150,
    rating: 4.8,
    badge: "Hot",
    instructor: {
      name: "Isha",
      role: "Graphic Design & Video Editing Specialist",
      bio: "Professional Designer and Video Editor with 6+ years creating visual branding, Premiere Pro/After Effects pipelines, and UI assets.",
      avatar: "/images/trainer2.jpg"
    },
    chapters: [
      { id: 1, title: "Graphic Design Principles, Typography & Color Theory" },
      { id: 2, title: "Adobe Photoshop: Photo Retouching & Social Graphics" },
      { id: 3, title: "Adobe Illustrator: Vector Art, Logos & Brand Identity" },
      { id: 4, title: "Adobe Premiere Pro: Timeline, Cuts, Audio & Transitions" },
      { id: 5, title: "After Effects: Motion Graphics, Kinetic Text & VFX" },
      { id: 6, title: "Capstone: High-Conversion Commercial Ad & Portfolio Reel" }
    ],
    curriculum: {
      sections: [
        {
          title: "Graphic Design & Visual Identity",
          lessons: [
            { title: "Color Psychology, Visual Hierarchy & Typography Rules", duration: "30:00", videoUrl: "" },
            { title: "Photoshop: Selection Tools, Masking & Thumbnail Design", duration: "45:00", videoUrl: "" },
            { title: "Illustrator: Pen Tool Mastery, Vector Logos & Branding Assets", duration: "50:00", videoUrl: "" }
          ]
        },
        {
          title: "Video Editing & Motion Graphics",
          lessons: [
            { title: "Premiere Pro: Rough Cuts, Pacing, Sound Design & Color Grading", duration: "55:00", videoUrl: "" },
            { title: "After Effects: Keyframing, Kinetic Typography & Motion Presets", duration: "50:00", videoUrl: "" },
            { title: "Short-Form Content: Reels, Shorts & TikTok Retention Editing", duration: "40:00", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Color Psychology & Visual Hierarchy", duration: "30:00" },
      { title: "Photoshop Masking & High-CTR Thumbnail Design", duration: "45:00" },
      { title: "Premiere Pro Timeline & Professional Sound Design", duration: "55:00" }
    ]
  }
];

const initialArticles = [
  {
    title: "10 Proven Techniques to Boost React App Performance in 2026",
    slug: "react-performance-2026",
    excerpt: "From compiler-driven memoization to streaming SSR and bundle optimization, learn the practical steps top engineering teams use to ship snappy apps.",
    content: "Modern web applications demand peak performance. In this article, we explore key techniques including code splitting, lazy loading, reducing re-renders with optimized hook usage, utilizing Web Workers for intensive calculations, and monitoring Largest Contentful Paint (LCP) and Interaction to Next Paint (INP).",
    category: "Web Development",
    readTime: 8,
    date: "2026-02-15",
    author: "Ananya Rao",
    tags: ["React", "Optimization", "Best Practices", "Performance"],
    cover: "/images/articles/react-performance.jpg"
  },
  {
    title: "The Ultimate DSA Roadmap: From Arrays to DP (with Patterns)",
    slug: "dsa-roadmap-mastery",
    excerpt: "A structured, pattern-first approach to mastering Data Structures and Algorithms for top tech interviews—complete with practice ladders.",
    content: "Mastering DSA is not about memorizing 500 problems; it's about recognizing underlying patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stacks, BFS/DFS tree traversals, and Dynamic Programming state transitions.",
    category: "Data Structures",
    readTime: 12,
    date: "2026-01-28",
    author: "Rahul Mehta",
    tags: ["DSA", "Interviews", "Roadmap", "Python"],
    cover: "/images/articles/dsa-roadmap.jpg"
  },
  {
    title: "Design a Hiring-Ready Developer Portfolio (That Actually Converts)",
    slug: "portfolio-ux-that-converts",
    excerpt: "Craft a portfolio that showcases proof of skill, not just boilerplate code—learn layout hierarchy, storytelling, and UX cues that impress recruiters.",
    content: "A compelling developer portfolio focuses on outcomes: live demos, measurable impact, clean architecture, responsive design, and clear calls to action. We break down the top portfolio teardowns from senior hiring managers.",
    category: "UI/UX",
    readTime: 7,
    date: "2026-01-10",
    author: "Meera Iyer",
    tags: ["Portfolio", "UX", "Careers", "Design"],
    cover: "/images/articles/portfolio-ux.jpg"
  },
  {
    title: "CI/CD for Busy Devs: From Zero to Production in a Weekend",
    slug: "cicd-production-weekend",
    excerpt: "A pragmatic guide to setting up automated GitHub Actions pipelines, containerized environments, and cloud observability without drowning in tooling.",
    content: "Automating your deployment pipeline gives you confidence and velocity. Learn how to write concise GitHub Actions workflows for linting, testing, Docker image building, and deployment to cloud targets with automated rollbacks.",
    category: "DevOps",
    readTime: 10,
    date: "2025-12-20",
    author: "Kartik Singh",
    tags: ["DevOps", "CI/CD", "Docker", "AWS"],
    cover: "/images/articles/devops-cicd.jpg"
  },
  {
    title: "Breaking into AI/ML in 2026: What Recruiters Actually Look For",
    slug: "breaking-into-ai-ml-2026",
    excerpt: "Degrees vs. real production projects, Kaggle vs. deployment—understand the signals that matter most and how to build high-impact AI portfolios.",
    content: "The AI landscape is moving fast. Companies look for practitioners who can not only train models, but also evaluate, fine-tune, deploy, and monitor LLMs and machine learning pipelines in production.",
    category: "AI/ML",
    readTime: 9,
    date: "2025-11-18",
    author: "Priya Desai",
    tags: ["AI/ML", "Careers", "LLMs", "Data Science"],
    cover: "/images/articles/aiml-career.jpg"
  },
  {
    title: "Cyber Security Foundations: Threats, Tools, and Best Practices",
    slug: "cyber-security-foundations",
    excerpt: "Understand modern attack vectors, essential defensive practices, OWASP Top 10 vulnerabilities, and how to secure web applications end-to-end.",
    content: "Security is non-negotiable. Learn how to implement proper authentication, sanitize user input, manage environment secrets securely, prevent CSRF/XSS, and set up Content Security Policies (CSP).",
    category: "Cyber Security",
    readTime: 10,
    date: "2025-10-05",
    author: "Neha Kapoor",
    tags: ["Cyber Security", "OWASP", "Authentication", "InfoSec"],
    cover: "/images/articles/cyber-security.jpg"
  }
];

const seedData = async () => {
  try {
    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@yrelearning.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`👤 Admin created -> Email: ${adminEmail} | Password: ${adminPassword}`);
    } else {
      console.log(`👤 Admin already exists: ${adminEmail}`);
    }

    // 2. Seed Courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(initialCourses);
      console.log(`📚 Seeded ${initialCourses.length} initial courses into MongoDB database yr_elearning!`);
    } else {
      console.log(`📚 Courses collection already contains ${courseCount} courses.`);
    }

    // 3. Seed Articles
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      await Article.insertMany(initialArticles);
      console.log(`📰 Seeded ${initialArticles.length} initial articles into MongoDB database yr_elearning!`);
    } else {
      console.log(`📰 Articles collection already contains ${articleCount} articles.`);
    }

    // 4. Seed Enrollments
    const enrollmentCount = await Enrollment.countDocuments();
    if (enrollmentCount === 0) {
      const sampleEnrollments = [
        {
          name: 'Gaurav Singhal',
          email: 'singhalg818@gmail.com',
          phoneNumber: '+91 98765 43210',
          gender: 'Male',
          city: 'Panipat',
          currentStatus: 'Student',
          currentProfessionOrCourse: 'B.Tech CSE',
          institutionOrCompany: 'PIET College',
          courseEnrolledFor: 'Website Development',
          mode: 'Online',
          expectations: 'Master Full Stack development and build production ready real-world applications',
          couponCode: 'PIET2026',
          comments: 'Interested in the upcoming weekend batch',
          declarationConfirmed: true,
          status: 'Confirmed',
        },
        {
          name: 'Ananya Sharma',
          email: 'ananya.sharma@example.com',
          phoneNumber: '+91 98123 45678',
          gender: 'Female',
          city: 'Delhi',
          currentStatus: 'Working Professional',
          currentProfessionOrCourse: 'Software Engineer',
          institutionOrCompany: 'Tech Innovators Ltd',
          courseEnrolledFor: 'Machine Learning / AI',
          mode: 'Online',
          expectations: 'Upskill in Generative AI, PyTorch and deploy LLM applications',
          couponCode: '',
          comments: '',
          declarationConfirmed: true,
          status: 'Pending',
        }
      ];
      await Enrollment.insertMany(sampleEnrollments);
      console.log(`🎓 Seeded ${sampleEnrollments.length} sample enrollments into yr_elearning!`);
    } else {
      console.log(`🎓 Enrollments collection already contains ${enrollmentCount} records.`);
    }

    // 5. Seed Banners & Instructor Banners
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const sampleBanners = [
        {
          title: "Master High-Impact Tech Skills & Accelerate Your Career",
          image: "/images/hero-tech.jpg",
          type: "banner",
          link: "/courses",
        },
        {
          title: "Full-Stack Web Development Bootcamp - Live Projects & Mentorship",
          image: "/images/webdev-workspace.jpg",
          type: "banner",
          link: "/courses",
        },
        {
          title: "Artificial Intelligence & Generative AI Masterclass 2026",
          image: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png",
          type: "banner",
          link: "/courses",
        },
        {
          title: "Jane Smith - Senior Web Architect & Full-Stack Lead",
          name: "Jane Smith",
          about: "10+ years experience in building high-scale distributed applications and mentoring engineers.",
          image: "/images/trainer1.jpg",
          type: "instructor",
          link: "/courses",
        },
        {
          title: "Alex Johnson - AI / Machine Learning Specialist",
          name: "Alex Johnson",
          about: "Expert in PyTorch, Computer Vision, Generative AI models and production deployments.",
          image: "/images/trainer2.jpg",
          type: "instructor",
          link: "/courses",
        },
        {
          title: "Gauri Singhal - Data Structures & Algorithms Guru",
          name: "Gauri Singhal",
          about: "Intern at YR IT Solution, Celebal Technologies | DSE @ Infosys. Expert in Java, algorithms, and interview preparation.",
          image: "/images/dsa_instructor.png",
          type: "instructor",
          link: "/courses",
        },
      ];
      await Banner.insertMany(sampleBanners);
      console.log(`🖼️ Seeded ${sampleBanners.length} promotional and instructor banners into yr_elearning!`);
    } else {
      console.log(`🖼️ Banners collection already contains ${bannerCount} records.`);
    }
  } catch (error) {
    console.error('Error during data seeding:', error.message);
  }
};

module.exports = seedData;

// Allow direct execution: `node seeders/seed.js`
if (require.main === module) {
  require('dotenv').config();
  const connectDB = require('../config/db');
  (async () => {
    await connectDB();
    await seedData();
    process.exit(0);
  })();
}
