const Admin = require('../models/Admin');
const Course = require('../models/Course');
const Article = require('../models/Article');

const initialCourses = [
  {
    title: "Digital Marketing Mastery",
    description: "Complete guide to digital marketing, SEO, social media marketing, content creation, and analytics to scale any business.",
    image: "/images/Digital-Marketing.jpg",
    price: 49.99,
    category: "Business",
    duration: 18,
    students: 1420,
    rating: 4.8,
    badge: "Bestseller",
    instructor: {
      name: "Jane Smith",
      bio: "Digital Marketing expert with over 10 years of experience helping brands grow.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    chapters: [
      { id: 1, title: "Digital Marketing Fundamentals" },
      { id: 2, title: "Social Media & Viral Growth" },
      { id: 3, title: "Email Marketing & Funnels" }
    ],
    curriculum: {
      sections: [
        {
          title: "Introduction",
          lessons: [
            { title: "Introduction to Digital Marketing", duration: "18:24", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Setting up Your Marketing Strategy", duration: "25:18", videoUrl: "" }
          ]
        },
        {
          title: "Social Media Marketing",
          lessons: [
            { title: "Facebook Marketing Fundamentals", duration: "45:12", videoUrl: "" },
            { title: "Instagram Growth Strategies", duration: "32:44", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Introduction to Digital Marketing", duration: "18:24" },
      { title: "Setting up Your Marketing Strategy", duration: "25:18" },
      { title: "Facebook Marketing Fundamentals", duration: "45:12" }
    ]
  },
  {
    title: "Advanced Full-Stack JavaScript & React",
    description: "Deep dive into modern JavaScript, ES6+, React 19, Node.js, asynchronous patterns, state management, and real-world architectures.",
    image: "/images/Women-shaping-the-future-of-coding-blog-08.03.2023.jpg",
    price: 89.99,
    category: "Development",
    duration: 36,
    students: 2850,
    rating: 4.9,
    badge: "Top Rated",
    instructor: {
      name: "Alex Johnson",
      bio: "Senior Full Stack Engineer & Open Source Contributor",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    chapters: [
      { id: 1, title: "Advanced JS Concepts & Closures" },
      { id: 2, title: "Modern React & Hooks Deep Dive" },
      { id: 3, title: "Full Stack Architecture & APIs" }
    ],
    curriculum: {
      sections: [
        {
          title: "Core JavaScript Mastery",
          lessons: [
            { title: "Execution Context & Event Loop", duration: "24:10", videoUrl: "" },
            { title: "Async/Await & Promises Under the Hood", duration: "30:45", videoUrl: "" }
          ]
        },
        {
          title: "React Architecture",
          lessons: [
            { title: "Component Design Patterns", duration: "35:20", videoUrl: "" },
            { title: "Custom Hooks & State Management", duration: "40:15", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Execution Context & Event Loop", duration: "24:10" },
      { title: "Async/Await & Promises Under the Hood", duration: "30:45" },
      { title: "Component Design Patterns", duration: "35:20" }
    ]
  },
  {
    title: "Data Structures & Algorithms in Python",
    description: "Master problem-solving, algorithmic patterns, LeetCode strategies, and crack technical coding interviews with ease.",
    image: "/images/pythonimage.png",
    price: 69.99,
    category: "Computer Science",
    duration: 28,
    students: 1980,
    rating: 4.9,
    badge: "Popular",
    instructor: {
      name: "Rahul Mehta",
      bio: "Ex-FAANG Software Engineer & Competitive Programmer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    chapters: [
      { id: 1, title: "Arrays, Strings & Two Pointers" },
      { id: 2, title: "Trees, Graphs & Recursion" },
      { id: 3, title: "Dynamic Programming Patterns" }
    ],
    curriculum: {
      sections: [
        {
          title: "Foundations & Complexity",
          lessons: [
            { title: "Big-O Analysis & Space-Time Tradeoffs", duration: "22:00", videoUrl: "" },
            { title: "Array & Sliding Window Techniques", duration: "38:40", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Big-O Analysis & Space-Time Tradeoffs", duration: "22:00" },
      { title: "Array & Sliding Window Techniques", duration: "38:40" }
    ]
  },
  {
    title: "UI/UX Design Masterclass with Figma",
    description: "Learn modern user experience design, wireframing, interactive prototyping, design systems, and developer handoff.",
    image: "/images/istockphoto-1356364268-170667a.jpg",
    price: 54.99,
    category: "Design",
    duration: 20,
    students: 1650,
    rating: 4.7,
    badge: "Hot",
    instructor: {
      name: "Meera Iyer",
      bio: "Principal Product Designer & Design Mentor",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    chapters: [
      { id: 1, title: "Design Principles & Typography" },
      { id: 2, title: "Figma Components & Auto-Layout" },
      { id: 3, title: "Design Systems & Prototyping" }
    ],
    curriculum: {
      sections: [
        {
          title: "UX Fundamentals",
          lessons: [
            { title: "User Research & Personas", duration: "19:30", videoUrl: "" },
            { title: "Wireframing with Figma", duration: "33:15", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "User Research & Personas", duration: "19:30" },
      { title: "Wireframing with Figma", duration: "33:15" }
    ]
  },
  {
    title: "Machine Learning & AI Foundations",
    description: "Explore supervised and unsupervised machine learning, neural networks, computer vision, and NLP with Python and TensorFlow.",
    image: "/images/ai.jpg",
    price: 99.99,
    category: "Data Science",
    duration: 40,
    students: 3100,
    rating: 4.9,
    badge: "Trending",
    instructor: {
      name: "Priya Desai",
      bio: "AI Researcher & Data Scientist",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    chapters: [
      { id: 1, title: "Linear Algebra & Statistics" },
      { id: 2, title: "Supervised Learning Models" },
      { id: 3, title: "Deep Learning with PyTorch" }
    ],
    curriculum: {
      sections: [
        {
          title: "Mathematics for ML",
          lessons: [
            { title: "Vectors, Matrices & Gradient Descent", duration: "29:00", videoUrl: "" },
            { title: "Regression & Classification Basics", duration: "42:10", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Vectors, Matrices & Gradient Descent", duration: "29:00" },
      { title: "Regression & Classification Basics", duration: "42:10" }
    ]
  },
  {
    title: "DevOps & Cloud Engineering with Docker & AWS",
    description: "Build robust CI/CD pipelines, containerize applications, orchestrate with Kubernetes, and deploy to AWS Cloud infrastructure.",
    image: "/images/webdev.jpeg",
    price: 79.99,
    category: "DevOps",
    duration: 25,
    students: 1250,
    rating: 4.8,
    badge: "Featured",
    instructor: {
      name: "Kartik Singh",
      bio: "Cloud Architect & DevOps Consultant",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    chapters: [
      { id: 1, title: "Linux & Networking Essentials" },
      { id: 2, title: "Docker Containers & Compose" },
      { id: 3, title: "CI/CD Pipelines & AWS Deployment" }
    ],
    curriculum: {
      sections: [
        {
          title: "Containerization",
          lessons: [
            { title: "Docker Architecture & Dockerfiles", duration: "27:40", videoUrl: "" },
            { title: "Multi-container Apps with Docker Compose", duration: "34:50", videoUrl: "" }
          ]
        }
      ]
    },
    lessons: [
      { title: "Docker Architecture & Dockerfiles", duration: "27:40" },
      { title: "Multi-container Apps with Docker Compose", duration: "34:50" }
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
