const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Course = require('../models/Course');

const fullCourses = [
  {
    title: "Data Structures and Algorithms in Java",
    slug: "data-structures-and-algorithms-in-java",
    description: "Master Data Structures and Algorithms in Java with a comprehensive 45-day structured plan. From time complexity and recursion to binary trees, graphs, and dynamic programming, crack top product-based company coding interviews.",
    image: "/images/ai-learning.jpg",
    price: 3500,
    category: "Computer Science",
    duration: 45,
    students: 5200,
    rating: 4.9,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Gauri Singhal",
      role: "DSA & Java Instructor",
      bio: "Intern at YR IT Solution, Celebal Technologies | DSE @ Infosys. Passionate about algorithms, interview problem solving, and mentoring students.",
      avatar: "/images/dsa_instructor.png",
      linkedin: "https://www.linkedin.com/in/gaurisinghal28",
      social: {
        linkedin: "https://www.linkedin.com/in/gaurisinghal28",
      },
    },
    chapters: [
      { id: 1, title: "Day 01-07: Java Essentials, OOP & Complexity Analysis" },
      { id: 2, title: "Day 08-14: Arrays, Two Pointers & Sliding Window" },
      { id: 3, title: "Day 15-21: Strings, Searching & Sorting Patterns" },
      { id: 4, title: "Day 22-28: Linked Lists, Stacks & Queues" },
      { id: 5, title: "Day 29-35: Binary Trees & Binary Search Trees (BST)" },
      { id: 6, title: "Day 36-40: Heaps, Hashing & Greedy Algorithms" },
      { id: 7, title: "Day 41-45: Graphs, Dynamic Programming & Mock Interviews" },
    ],
    curriculum: {
      sections: [
        {
          title: "Module 1: Java Foundations & Complexity Analysis (Week 1)",
          lessons: [
            { title: "Java Syntax, Variables, Data Types & JVM Architecture", duration: "45:00" },
            { title: "Object-Oriented Programming (Classes, Objects, Inheritance & Interfaces)", duration: "50:00" },
            { title: "Time and Space Complexity (Big-O, Big-Omega, Big-Theta notation)", duration: "40:00" },
            { title: "Recursion Fundamentals & Call Stack Tracing", duration: "55:00" },
            { title: "Mathematical Algorithms (GCD, Sieve of Eratosthenes, Power function)", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Arrays, Two Pointers & Sliding Window (Week 2)",
          lessons: [
            { title: "Static vs Dynamic Arrays (Java ArrayList internals)", duration: "40:00" },
            { title: "Two Pointers Pattern: Pair Sum, 3Sum & Container With Most Water", duration: "50:00" },
            { title: "Sliding Window Pattern: Fixed & Dynamic Windows", duration: "48:00" },
            { title: "Prefix Sum & Kadane's Algorithm for Maximum Subarray", duration: "45:00" },
            { title: "Matrix Traversal & 2D Array Transformations", duration: "45:00" }
          ]
        },
        {
          title: "Module 3: Strings, Searching & Sorting Patterns (Week 3)",
          lessons: [
            { title: "String Manipulation, Immutability & StringBuilder", duration: "40:00" },
            { title: "Binary Search (Iterative & Recursive implementation)", duration: "45:00" },
            { title: "Binary Search on Answer & Peak Element Problems", duration: "50:00" },
            { title: "Merge Sort, Inversion Count & Quick Sort Partitioning", duration: "55:00" }
          ]
        },
        {
          title: "Module 4: Linked Lists, Stacks & Queues (Week 4)",
          lessons: [
            { title: "Singly & Doubly Linked List Operations and Reversal", duration: "50:00" },
            { title: "Floyd's Fast & Slow Pointers (Cycle Detection)", duration: "45:00" },
            { title: "Stack Implementation & Valid Parentheses", duration: "40:00" },
            { title: "Monotonic Stack Pattern: Next Greater Element", duration: "50:00" },
            { title: "Queue, Deque & Circular Queue Implementation", duration: "45:00" }
          ]
        },
        {
          title: "Module 5: Binary Trees & Binary Search Trees (Week 5)",
          lessons: [
            { title: "Binary Tree Traversals (Inorder, Preorder, Postorder & Level-Order BFS)", duration: "55:00" },
            { title: "Tree Properties: Height, Diameter, Balanced Tree & Symmetry", duration: "45:00" },
            { title: "Binary Search Tree (BST) Lookup, Insert & Delete Operations", duration: "50:00" },
            { title: "Lowest Common Ancestor (LCA) & Valid BST Verification", duration: "50:00" }
          ]
        },
        {
          title: "Module 6: Graphs, Dynamic Programming & Interview Prep (Week 6)",
          lessons: [
            { title: "Graph Representation (Adjacency List) & BFS/DFS Traversals", duration: "55:00" },
            { title: "Cycle Detection in Directed and Undirected Graphs", duration: "50:00" },
            { title: "1D Dynamic Programming (Climbing Stairs, House Robber)", duration: "50:00" },
            { title: "2D Dynamic Programming (0/1 Knapsack, Longest Common Subsequence)", duration: "55:00" },
            { title: "Top Interview Problem Solving & Mock Interview Evaluation", duration: "60:00" }
          ]
        }
      ]
    }
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux",
    description: "Master modern UI/UX design from scratch using Figma. Learn design thinking, user research, wireframing, component systems, auto-layout, interactive prototyping, and build production-ready digital interfaces.",
    image: "/images/Digital-Marketing.jpg",
    price: 2999,
    category: "Design",
    duration: 30,
    students: 3800,
    rating: 4.9,
    badge: "Trending",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Isha",
      role: "UI/UX Design Specialist",
      bio: "Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.",
      avatar: "/images/trainer2.jpg",
      linkedin: "https://LinkedIn.com/in/isha-uiux",
      social: {
        linkedin: "https://LinkedIn.com/in/isha-uiux",
      },
    },
    chapters: [
      { id: 1, title: 'Module 1: "Design Begins with Why" (Week 1)' },
      { id: 2, title: 'Module 2: "From Ideas to Interface" (Week 2)' },
      { id: 3, title: 'Module 3: "Deep Dive" (Week 3)' },
      { id: 4, title: 'Module 4: "Build. Test. Launch." (Week 4)' }
    ],
    curriculum: {
      sections: [
        {
          title: 'Module 1: "Design Begins with Why" (Week 1)',
          lessons: [
            { title: "Introduction to UI & UX", duration: "40:00" },
            { title: "Good vs Bad UI", duration: "35:00" },
            { title: "Role of a UI/UX Designer", duration: "30:00" },
            { title: "UX Research Methods", duration: "45:00" },
            { title: "UX Laws and Design Principles", duration: "45:00" }
          ]
        },
        {
          title: 'Module 2: "From Ideas to Interface" (Week 2)',
          lessons: [
            { title: "Figma Interface & Essential Tools", duration: "45:00" },
            { title: "Low-Fidelity Wireframes", duration: "40:00" },
            { title: "Moodboards", duration: "30:00" },
            { title: "User Flow", duration: "35:00" },
            { title: "Mockups and UI Screens", duration: "50:00" },
            { title: "Typography Basics", duration: "35:00" },
            { title: "Spacing and Layout Principles", duration: "40:00" },
            { title: "Color Theory", duration: "35:00" },
            { title: "Style Guide", duration: "40:00" }
          ]
        },
        {
          title: 'Module 3: "Deep Dive" (Week 3)',
          lessons: [
            { title: "Advanced Prototyping", duration: "50:00" },
            { title: "Auto Layout", duration: "45:00" },
            { title: "Columns and Layout Grids", duration: "35:00" },
            { title: "Constraints and Responsive Behaviour", duration: "40:00" },
            { title: "Components and Variants", duration: "50:00" },
            { title: "Boolean Operations", duration: "30:00" },
            { title: "Responsive Layout Design", duration: "45:00" },
            { title: "High-Fidelity Wireframes", duration: "50:00" }
          ]
        },
        {
          title: 'Module 4: "Build. Test. Launch." (Week 4)',
          lessons: [
            { title: "Project Brief", duration: "30:00" },
            { title: "Planning", duration: "35:00" },
            { title: "Building Final UI Screens", duration: "60:00" },
            { title: "Prototyping & Transitions", duration: "45:00" },
            { title: "Testing & Design Iteration", duration: "40:00" },
            { title: "Exporting and Sharing Design", duration: "30:00" }
          ]
        }
      ]
    }
  },
  {
    title: "Machine Learning",
    slug: "machine-learning",
    description: "A hands-on journey into Artificial Intelligence and Machine Learning. Master Python data science libraries, regression, classification, clustering, random forests, neural networks, and model deployment.",
    image: "/images/ai.jpg",
    price: 3800,
    category: "Artificial Intelligence",
    duration: 40,
    students: 4200,
    rating: 4.8,
    badge: "Popular",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Vishal",
      role: "Machine Learning Trainer",
      bio: "Ex-data analyst at Novateur Electrical and Digital System Pvt Ltd. Specializes in Machine Learning and AI applications with deep expertise in PyTorch, scikit-learn, and neural networks.",
      avatar: "/images/Trainer6.jpeg",
      linkedin: "#",
      social: {
        linkedin: "#",
      },
    },
    chapters: [
      { id: 1, title: "Module 1: Python for Machine Learning & Numerical Computing (Week 1)" },
      { id: 2, title: "Module 2: Data Preprocessing & Feature Engineering (Week 2)" },
      { id: 3, title: "Module 3: Supervised Learning - Regression & Classification (Week 3)" },
      { id: 4, title: "Module 4: Tree-Based Models & Ensemble Learning (Week 4)" },
      { id: 5, title: "Module 5: Unsupervised Learning & Clustering (Week 5)" },
      { id: 6, title: "Module 6: Deep Learning Intro & Model Deployment (Week 6)" }
    ],
    curriculum: {
      sections: [
        {
          title: "Module 1: Python for Machine Learning & Numerical Computing (Week 1)",
          lessons: [
            { title: "Python Refresher, Virtual Environments & Jupyter Setup", duration: "40:00" },
            { title: "NumPy for Matrix Operations & Linear Algebra Basics", duration: "45:00" },
            { title: "Pandas for Data Manipulation & Dataset Loading", duration: "50:00" },
            { title: "Matplotlib & Seaborn for Exploratory Data Visualization", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Data Preprocessing & Feature Engineering (Week 2)",
          lessons: [
            { title: "Handling Missing Values, Outliers & Data Imputation", duration: "40:00" },
            { title: "Feature Encoding (One-Hot, Label Encoding) & Scaling", duration: "45:00" },
            { title: "Train/Test Split, Cross-Validation & Overfitting Prevention", duration: "40:00" },
            { title: "Dimensionality Reduction with Principal Component Analysis (PCA)", duration: "45:00" }
          ]
        },
        {
          title: "Module 3: Supervised Learning - Regression & Classification (Week 3)",
          lessons: [
            { title: "Simple & Multiple Linear Regression Implementation", duration: "45:00" },
            { title: "Logistic Regression & Classification Decision Boundaries", duration: "50:00" },
            { title: "Model Evaluation: MSE, R2, Confusion Matrix, Precision & Recall", duration: "45:00" },
            { title: "K-Nearest Neighbors (KNN) & Naive Bayes Classifier", duration: "40:00" }
          ]
        },
        {
          title: "Module 4: Tree-Based Models & Ensemble Learning (Week 4)",
          lessons: [
            { title: "Decision Trees: Gini Impurity & Information Gain", duration: "45:00" },
            { title: "Random Forests: Bagging & Feature Subsampling", duration: "50:00" },
            { title: "Boosting Algorithms: AdaBoost, XGBoost & LightGBM", duration: "50:00" },
            { title: "Support Vector Machines (SVM) & Kernel Methods", duration: "45:00" }
          ]
        },
        {
          title: "Module 5: Unsupervised Learning & Clustering (Week 5)",
          lessons: [
            { title: "K-Means Clustering Algorithm & The Elbow Method", duration: "45:00" },
            { title: "Hierarchical Clustering & Dendrograms", duration: "40:00" },
            { title: "Customer Segmentation & Anomaly Detection Project", duration: "50:00" }
          ]
        },
        {
          title: "Module 6: Deep Learning Intro & Model Deployment (Week 6)",
          lessons: [
            { title: "Introduction to Artificial Neural Networks (ANN) & Perceptrons", duration: "50:00" },
            { title: "Building a Multi-Layer Neural Network with Keras / TensorFlow", duration: "55:00" },
            { title: "Saving Models with Joblib/Pickle & Creating a Flask/FastAPI Endpoint", duration: "50:00" },
            { title: "End-to-End Capstone Project Presentation & Interview Prep", duration: "60:00" }
          ]
        }
      ]
    }
  },
  {
    title: "Data Science",
    slug: "data-science",
    description: "Become a proficient Data Scientist with industry-standard statistical analysis, SQL querying, data wrangling with Pandas, predictive modeling, business intelligence dashboards, and machine learning insights.",
    image: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png",
    price: 3999,
    category: "Data Science",
    duration: 45,
    students: 4600,
    rating: 4.9,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Vijay Sheoran",
      role: "Senior Data Science Trainer",
      bio: "Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
      avatar: "/images/trainer1.jpg",
      linkedin: "#",
      social: {
        linkedin: "#",
      },
    },
    chapters: [
      { id: 1, title: "Module 1: Python Essentials & Data Wrangling (Week 1)" },
      { id: 2, title: "Module 2: Applied Statistics & Exploratory Data Analysis (Week 2)" },
      { id: 3, title: "Module 3: Data Visualization & Business Dashboards (Week 3)" },
      { id: 4, title: "Module 4: SQL & Database Querying for Analysts (Week 4)" },
      { id: 5, title: "Module 5: Applied Machine Learning for Business Insights (Week 5)" },
      { id: 6, title: "Module 6: End-to-End Capstone Project & Career Roadmap (Week 6)" }
    ],
    curriculum: {
      sections: [
        {
          title: "Module 1: Python Essentials & Data Wrangling (Week 1)",
          lessons: [
            { title: "Python for Data Science Setup & Core Data Structures", duration: "40:00" },
            { title: "Data Ingestion: CSV, Excel, JSON & Web Scraping with BeautifulSoup", duration: "45:00" },
            { title: "Data Cleaning & Transforming with Pandas DataFrames", duration: "50:00" },
            { title: "GroupBy, Aggregations, Pivot Tables & Merging Datasets", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Applied Statistics & Exploratory Data Analysis (Week 2)",
          lessons: [
            { title: "Descriptive Statistics: Mean, Median, Variance & Standard Deviation", duration: "40:00" },
            { title: "Probability Distributions: Normal, Binomial & Poisson", duration: "45:00" },
            { title: "Hypothesis Testing, A/B Testing & p-value Interpretation", duration: "50:00" },
            { title: "Correlation Analysis, Covariance & Heatmaps", duration: "40:00" }
          ]
        },
        {
          title: "Module 3: Data Visualization & Business Dashboards (Week 3)",
          lessons: [
            { title: "Storytelling with Data: Chart Types & Best Practices", duration: "40:00" },
            { title: "Interactive Visualizations with Plotly & Seaborn", duration: "45:00" },
            { title: "Power BI / Tableau Fundamentals: Connecting Data Sources", duration: "50:00" },
            { title: "Building Interactive Business KPI Dashboards", duration: "55:00" }
          ]
        },
        {
          title: "Module 4: SQL & Database Querying for Analysts (Week 4)",
          lessons: [
            { title: "Relational Databases & PostgreSQL / MySQL Setup", duration: "35:00" },
            { title: "SELECT Queries, Filtering (WHERE), Sorting & Aggregations (HAVING)", duration: "45:00" },
            { title: "Multi-table JOINs (INNER, LEFT, RIGHT, FULL)", duration: "50:00" },
            { title: "Subqueries, CTEs & Window Functions (ROW_NUMBER, RANK)", duration: "55:00" }
          ]
        },
        {
          title: "Module 5: Applied Machine Learning for Business Insights (Week 5)",
          lessons: [
            { title: "Predictive Modeling Workflow & Problem Formulation", duration: "40:00" },
            { title: "Customer Churn Prediction using Classification Models", duration: "50:00" },
            { title: "Sales Forecasting using Time Series Analysis (ARIMA basics)", duration: "45:00" },
            { title: "Interpreting Model Outputs with SHAP & Feature Importance", duration: "45:00" }
          ]
        },
        {
          title: "Module 6: End-to-End Capstone Project & Career Roadmap (Week 6)",
          lessons: [
            { title: "Project Planning, Data Pipeline & Architecture", duration: "40:00" },
            { title: "Building a Complete Industry Data Science Portfolio Project", duration: "60:00" },
            { title: "Creating a GitHub Repository, Documentation & Project Presentation", duration: "45:00" },
            { title: "Data Science Interview Questions & Technical Screen Preparation", duration: "50:00" }
          ]
        }
      ]
    }
  },
  {
    title: "SEO and Marketing",
    slug: "seo-and-marketing",
    description: "Comprehensive Digital Marketing and SEO Bootcamp. Learn On-Page and Off-Page SEO, Keyword Research, Technical SEO, Google Ads, Meta Ads, Content Marketing, and Analytics to scale brands organically and with paid ads.",
    image: "/images/Digital-Marketing.jpg",
    price: 2499,
    category: "Marketing",
    duration: 30,
    students: 3900,
    rating: 4.8,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "DivyaRaj Kush",
      role: "SEO & Digital Marketing Lead",
      bio: "SEO and Growth Marketing Strategist specializing in search engine optimization, content scaling, Google Ads, and performance marketing.",
      avatar: "/seo_and_marketing_trainer.jpeg",
      linkedin: "#",
      social: {
        linkedin: "#",
      },
    },
    chapters: [
      { id: 1, title: "Module 1: Fundamentals of Digital Marketing & Brand Strategy (Week 1)" },
      { id: 2, title: "Module 2: Search Engine Optimization (SEO) Mastery (Week 2)" },
      { id: 3, title: "Module 3: High-Converting Content Marketing & Copywriting (Week 3)" },
      { id: 4, title: "Module 4: Social Media Marketing & Organic Growth (Week 4)" },
      { id: 5, title: "Module 5: Paid Advertising - Google Ads & Meta Ads (Week 5)" },
      { id: 6, title: "Module 6: Analytics, Marketing Automation & Freelancing (Week 6)" }
    ],
    curriculum: {
      sections: [
        {
          title: "Module 1: Fundamentals of Digital Marketing & Brand Strategy (Week 1)",
          lessons: [
            { title: "Digital Marketing Ecosystem & Consumer Buying Journey", duration: "35:00" },
            { title: "Defining Target Audience, Buyer Personas & Market Research", duration: "40:00" },
            { title: "Competitive Benchmarking & Value Proposition Design", duration: "35:00" },
            { title: "Overview of Inbound vs Outbound Marketing Channels", duration: "40:00" }
          ]
        },
        {
          title: "Module 2: Search Engine Optimization (SEO) Mastery (Week 2)",
          lessons: [
            { title: "How Search Engines Work: Crawling, Indexing & Ranking", duration: "40:00" },
            { title: "Comprehensive Keyword Research with Free & Paid Tools", duration: "50:00" },
            { title: "On-Page SEO: Title Tags, Meta Descriptions, URL Structure & Internal Linking", duration: "45:00" },
            { title: "Technical SEO: XML Sitemaps, Robots.txt, Core Web Vitals & Mobile Indexing", duration: "50:00" },
            { title: "Off-Page SEO: Backlink Building Strategies, Outreach & Domain Authority", duration: "45:00" }
          ]
        },
        {
          title: "Module 3: High-Converting Content Marketing & Copywriting (Week 3)",
          lessons: [
            { title: "Creating SEO-Optimized Articles, Blogs & Landing Pages", duration: "45:00" },
            { title: "Copywriting Frameworks: AIDA, PAS & StoryBrand Method", duration: "40:00" },
            { title: "Keyword Density, Search Intent Matching & Content Optimization", duration: "40:00" },
            { title: "Designing Visual Content Assets & Infographics", duration: "35:00" }
          ]
        },
        {
          title: "Module 4: Social Media Marketing & Organic Growth (Week 4)",
          lessons: [
            { title: "Organic Social Strategy for Instagram, LinkedIn, YouTube & X", duration: "45:00" },
            { title: "Social Media Algorithm Hacks: Consistency, Engagement & Short-form Video", duration: "40:00" },
            { title: "Community Management, Brand Voice & Online Reputation", duration: "35:00" },
            { title: "Influencer Collaboration & Affiliate Partnerships", duration: "35:00" }
          ]
        },
        {
          title: "Module 5: Paid Advertising - Google Ads & Meta Ads (Week 5)",
          lessons: [
            { title: "Google Search Campaigns: Keyword Match Types & Quality Score", duration: "50:00" },
            { title: "Meta Ads Manager Setup: Pixel Tracking & Custom Audiences", duration: "50:00" },
            { title: "Ad Creatives, Ad Copy & Landing Page Conversion Optimization", duration: "45:00" },
            { title: "Budget Optimization (ROAS, CPA, CPC & CTR Analysis)", duration: "45:00" }
          ]
        },
        {
          title: "Module 6: Analytics, Marketing Automation & Freelancing (Week 6)",
          lessons: [
            { title: "Google Analytics 4 (GA4) & Google Search Console Setup", duration: "45:00" },
            { title: "Tracking Conversions, Goals & User Funnels", duration: "40:00" },
            { title: "Email Marketing Automation with Mailchimp / Brevo", duration: "40:00" },
            { title: "Client Acquisition, Freelance Proposals & Agency Workflow", duration: "50:00" }
          ]
        }
      ]
    }
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Your complete journey from beginner to professional full-stack web developer with an 8-week structured roadmap. Master HTML5, CSS3, JavaScript, React.js, modern UI frameworks, responsive design, Git, and deployment.",
    image: "/images/webdev-workspace.jpg",
    price: 3499,
    category: "Development",
    duration: 56,
    students: 7200,
    rating: 4.9,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Sumit Kumar",
      role: "Web Development Instructor",
      bio: "Former Full Stack Developer at DRDO & PwC. Expert in React.js, Node.js, database design, and scalable web architecture.",
      avatar: "/images/trainer3.jpg",
      linkedin: "https://www.linkedin.com/in/er-sumit-kr",
      social: {
        linkedin: "https://www.linkedin.com/in/er-sumit-kr",
      },
    },
    chapters: [
      { id: 1, title: "Phase 1: HTML & CSS Foundations (Week 1–2)" },
      { id: 2, title: "Phase 2: Advanced CSS & Animations (Week 3)" },
      { id: 3, title: "Phase 3: JavaScript Fundamentals (Week 4)" },
      { id: 4, title: "Phase 4: Frontend Framework (React) (Week 5)" },
      { id: 5, title: "Phase 5: Final Projects & Deployment (Week 6-8)" }
    ],
    curriculum: {
      sections: [
        {
          title: "Phase 1: HTML & CSS Foundations (Week 1–2)",
          lessons: [
            { title: "HTML5 Fundamentals & Semantic HTML", duration: "45:00" },
            { title: "CSS3 Styling & Box Model Architecture", duration: "45:00" },
            { title: "Flexbox & Grid Layouts", duration: "50:00" },
            { title: "Responsive Design & Mobile-First Approach", duration: "45:00" },
            { title: "Development Tools & Browser DevTools Mastery", duration: "35:00" },
            { title: "Version Control (Git & GitHub Basics)", duration: "40:00" }
          ]
        },
        {
          title: "Phase 2: Advanced CSS & Animations (Week 3)",
          lessons: [
            { title: "CSS Animations & Transitions", duration: "40:00" },
            { title: "Sass / SCSS Preprocessors", duration: "45:00" },
            { title: "CSS Frameworks (Tailwind CSS / Bootstrap)", duration: "50:00" },
            { title: "Mobile-First Design Best Practices", duration: "40:00" },
            { title: "CSS Best Practices & Design Systems", duration: "45:00" }
          ]
        },
        {
          title: "Phase 3: JavaScript Fundamentals (Week 4)",
          lessons: [
            { title: "JavaScript Basics (Variables, Data Types, Conditionals & Loops)", duration: "45:00" },
            { title: "DOM Manipulation & Dynamic UI Updates", duration: "50:00" },
            { title: "Events & Event Handling in Modern JavaScript", duration: "45:00" },
            { title: "ES6+ Features (Arrow Functions, Destructuring, Spread/Rest)", duration: "45:00" },
            { title: "Async JavaScript, Promises, Fetch API & Async/Await", duration: "55:00" },
            { title: "Error Handling & Debugging Techniques", duration: "35:00" }
          ]
        },
        {
          title: "Phase 4: Frontend Framework (React) (Week 5)",
          lessons: [
            { title: "React Components & JSX Syntax", duration: "50:00" },
            { title: "State Management with useState & useReducer", duration: "50:00" },
            { title: "Props, Component Communication & Event Handling", duration: "45:00" },
            { title: "React Hooks (useEffect, useMemo, useCallback, useRef)", duration: "55:00" },
            { title: "React Router for Single Page Application Navigation", duration: "45:00" },
            { title: "API Integration & Handling Asynchronous State", duration: "50:00" }
          ]
        },
        {
          title: "Phase 5: Final Projects & Deployment (Week 6-8)",
          lessons: [
            { title: "Portfolio Website Design & Structure", duration: "60:00" },
            { title: "Complete Full-Feature React Capstone Project", duration: "75:00" },
            { title: "GitHub Pages, Netlify & Vercel Deployment", duration: "40:00" },
            { title: "Performance Optimization, Lighthouse Audits & SEO", duration: "45:00" },
            { title: "Career Preparation, Resume Review & Mock Interviews", duration: "50:00" }
          ]
        }
      ]
    }
  }
];

async function updateDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove old courses and insert clean updated courses
    await Course.deleteMany({});
    console.log('Cleared existing courses from database');

    const createdCourses = await Course.insertMany(fullCourses);
    console.log(`Successfully added ${createdCourses.length} courses with instructors and easy doable syllabuses to database:`);
    createdCourses.forEach(c => {
      console.log(`- ${c.title} -> slug: /course/${c.slug} | Instructor: ${c.instructor.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error updating courses:', error);
    process.exit(1);
  }
}

updateDatabase();
