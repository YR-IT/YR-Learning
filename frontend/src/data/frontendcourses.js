const courses = [
  {
    id: "data-structures-and-algorithms-in-java",
    _id: "data-structures-and-algorithms-in-java",
    slug: "data-structures-and-algorithms-in-java",
    title: "Data Structures and Algorithms in Java",
    description: "Master Data Structures and Algorithms in Java with a comprehensive 45-day structured plan. From time complexity and recursion to binary trees, graphs, and dynamic programming, crack top product-based company coding interviews.",
    image: "/images/ai-learning.jpg",
    price: 2999,
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
      bio: "Software Developer at YR IT Solutions, Celebal Technologies | DSE @ Infosys. Passionate about algorithms, interview problem solving, and mentoring students.",
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
            { id: "1-1", title: "Java Syntax, Variables, Data Types & JVM Architecture", duration: "45:00" },
            { id: "1-2", title: "Object-Oriented Programming (Classes, Objects, Inheritance & Interfaces)", duration: "50:00" },
            { id: "1-3", title: "Time and Space Complexity (Big-O, Big-Omega, Big-Theta notation)", duration: "40:00" },
            { id: "1-4", title: "Recursion Fundamentals & Call Stack Tracing", duration: "55:00" },
            { id: "1-5", title: "Mathematical Algorithms (GCD, Sieve of Eratosthenes, Power function)", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Arrays, Two Pointers & Sliding Window (Week 2)",
          lessons: [
            { id: "2-1", title: "Static vs Dynamic Arrays (Java ArrayList internals)", duration: "40:00" },
            { id: "2-2", title: "Two Pointers Pattern: Pair Sum, 3Sum & Container With Most Water", duration: "50:00" },
            { id: "2-3", title: "Sliding Window Pattern: Fixed & Dynamic Windows", duration: "48:00" },
            { id: "2-4", title: "Prefix Sum & Kadane's Algorithm for Maximum Subarray", duration: "45:00" },
            { id: "2-5", title: "Matrix Traversal & 2D Array Transformations", duration: "45:00" }
          ]
        },
        {
          title: "Module 3: Strings, Searching & Sorting Patterns (Week 3)",
          lessons: [
            { id: "3-1", title: "String Manipulation, Immutability & StringBuilder", duration: "40:00" },
            { id: "3-2", title: "Binary Search (Iterative & Recursive implementation)", duration: "45:00" },
            { id: "3-3", title: "Binary Search on Answer & Peak Element Problems", duration: "50:00" },
            { id: "3-4", title: "Merge Sort, Inversion Count & Quick Sort Partitioning", duration: "55:00" }
          ]
        },
        {
          title: "Module 4: Linked Lists, Stacks & Queues (Week 4)",
          lessons: [
            { id: "4-1", title: "Singly & Doubly Linked List Operations and Reversal", duration: "50:00" },
            { id: "4-2", title: "Floyd's Fast & Slow Pointers (Cycle Detection)", duration: "45:00" },
            { id: "4-3", title: "Stack Implementation & Valid Parentheses", duration: "40:00" },
            { id: "4-4", title: "Monotonic Stack Pattern: Next Greater Element", duration: "50:00" },
            { id: "4-5", title: "Queue, Deque & Circular Queue Implementation", duration: "45:00" }
          ]
        },
        {
          title: "Module 5: Binary Trees & Binary Search Trees (Week 5)",
          lessons: [
            { id: "5-1", title: "Binary Tree Traversals (Inorder, Preorder, Postorder & Level-Order BFS)", duration: "55:00" },
            { id: "5-2", title: "Tree Properties: Height, Diameter, Balanced Tree & Symmetry", duration: "45:00" },
            { id: "5-3", title: "Binary Search Tree (BST) Lookup, Insert & Delete Operations", duration: "50:00" },
            { id: "5-4", title: "Lowest Common Ancestor (LCA) & Valid BST Verification", duration: "50:00" }
          ]
        },
        {
          title: "Module 6: Graphs, Dynamic Programming & Interview Prep (Week 6)",
          lessons: [
            { id: "6-1", title: "Graph Representation (Adjacency List) & BFS/DFS Traversals", duration: "55:00" },
            { id: "6-2", title: "Cycle Detection in Directed and Undirected Graphs", duration: "50:00" },
            { id: "6-3", title: "1D Dynamic Programming (Climbing Stairs, House Robber)", duration: "50:00" },
            { id: "6-4", title: "2D Dynamic Programming (0/1 Knapsack, Longest Common Subsequence)", duration: "55:00" },
            { id: "6-5", title: "Top Interview Problem Solving & Mock Interview Evaluation", duration: "60:00" }
          ]
        }
      ]
    }
  },
  {
    id: "ui-ux",
    _id: "ui-ux",
    slug: "ui-ux",
    title: "UI/UX Design",
    description: "Master modern UI/UX design from scratch using Figma. Learn design thinking, user research, wireframing, component systems, auto-layout, interactive prototyping, and build production-ready digital interfaces.",
    image: "/images/ui-ux-design.jpg",
    price: 2499,
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
      expertise: ["UI/UX", "Design Systems", "Wireframing", "User Research"],
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
            { id: "u1-1", title: "Introduction to UI & UX", duration: "40:00" },
            { id: "u1-2", title: "Good vs Bad UI", duration: "35:00" },
            { id: "u1-3", title: "Role of a UI/UX Designer", duration: "30:00" },
            { id: "u1-4", title: "UX Research Methods", duration: "45:00" },
            { id: "u1-5", title: "UX Laws and Design Principles", duration: "45:00" }
          ]
        },
        {
          title: 'Module 2: "From Ideas to Interface" (Week 2)',
          lessons: [
            { id: "u2-1", title: "Figma Interface & Essential Tools", duration: "45:00" },
            { id: "u2-2", title: "Low-Fidelity Wireframes", duration: "40:00" },
            { id: "u2-3", title: "Moodboards", duration: "30:00" },
            { id: "u2-4", title: "User Flow", duration: "35:00" },
            { id: "u2-5", title: "Mockups and UI Screens", duration: "50:00" },
            { id: "u2-6", title: "Typography Basics", duration: "35:00" },
            { id: "u2-7", title: "Spacing and Layout Principles", duration: "40:00" },
            { id: "u2-8", title: "Color Theory", duration: "35:00" },
            { id: "u2-9", title: "Style Guide", duration: "40:00" }
          ]
        },
        {
          title: 'Module 3: "Deep Dive" (Week 3)',
          lessons: [
            { id: "u3-1", title: "Advanced Prototyping", duration: "50:00" },
            { id: "u3-2", title: "Auto Layout", duration: "45:00" },
            { id: "u3-3", title: "Columns and Layout Grids", duration: "35:00" },
            { id: "u3-4", title: "Constraints and Responsive Behaviour", duration: "40:00" },
            { id: "u3-5", title: "Components and Variants", duration: "50:00" },
            { id: "u3-6", title: "Boolean Operations", duration: "30:00" },
            { id: "u3-7", title: "Responsive Layout Design", duration: "45:00" },
            { id: "u3-8", title: "High-Fidelity Wireframes", duration: "50:00" }
          ]
        },
        {
          title: 'Module 4: "Build. Test. Launch." (Week 4)',
          lessons: [
            { id: "u4-1", title: "Project Brief", duration: "30:00" },
            { id: "u4-2", title: "Planning", duration: "35:00" },
            { id: "u4-3", title: "Building Final UI Screens", duration: "60:00" },
            { id: "u4-4", title: "Prototyping & Transitions", duration: "45:00" },
            { id: "u4-5", title: "Testing & Design Iteration", duration: "40:00" },
            { id: "u4-6", title: "Exporting and Sharing Design", duration: "30:00" }
          ]
        }
      ]
    }
  },
  {
    id: "machine-learning",
    _id: "machine-learning",
    slug: "machine-learning",
    title: "Machine Learning",
    description: "A hands-on journey into Artificial Intelligence and Machine Learning. Master Python data science libraries, regression, classification, clustering, random forests, neural networks, and model deployment.",
    image: "/images/machine-learning.jpg",
    price: 2499,
    category: "Artificial Intelligence",
    duration: 40,
    students: 4200,
    rating: 4.8,
    badge: "Popular",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Gauri Sharma",
      role: "AIML Engineer",
      bio: "Currently working at Opalina. Ex-CA with 1.5 years of corporate experience and 3+ years of mentoring and training more than 1,000 students across the globe.",
      avatar: "/images/ml_instructor.jpeg",
      linkedin: "https://www.linkedin.com/in/gauri-sharma-gs06102003/",
      social: {
        linkedin: "https://www.linkedin.com/in/gauri-sharma-gs06102003/",
      },
      expertise: ["AI & Machine Learning", "Python", "Deep Learning", "Model Deployment"],
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
            { id: "ml-1", title: "Python Refresher, Virtual Environments & Jupyter Setup", duration: "40:00" },
            { id: "ml-2", title: "NumPy for Matrix Operations & Linear Algebra Basics", duration: "45:00" },
            { id: "ml-3", title: "Pandas for Data Manipulation & Dataset Loading", duration: "50:00" },
            { id: "ml-4", title: "Matplotlib & Seaborn for Exploratory Data Visualization", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Data Preprocessing & Feature Engineering (Week 2)",
          lessons: [
            { id: "ml-5", title: "Handling Missing Values, Outliers & Data Imputation", duration: "40:00" },
            { id: "ml-6", title: "Feature Encoding (One-Hot, Label Encoding) & Scaling", duration: "45:00" },
            { id: "ml-7", title: "Train/Test Split, Cross-Validation & Overfitting Prevention", duration: "40:00" },
            { id: "ml-8", title: "Dimensionality Reduction with Principal Component Analysis (PCA)", duration: "45:00" }
          ]
        },
        {
          title: "Module 3: Supervised Learning - Regression & Classification (Week 3)",
          lessons: [
            { id: "ml-9", title: "Simple & Multiple Linear Regression Implementation", duration: "45:00" },
            { id: "ml-10", title: "Logistic Regression & Classification Decision Boundaries", duration: "50:00" },
            { id: "ml-11", title: "Model Evaluation: MSE, R2, Confusion Matrix, Precision & Recall", duration: "45:00" },
            { id: "ml-12", title: "K-Nearest Neighbors (KNN) & Naive Bayes Classifier", duration: "40:00" }
          ]
        },
        {
          title: "Module 4: Tree-Based Models & Ensemble Learning (Week 4)",
          lessons: [
            { id: "ml-13", title: "Decision Trees: Gini Impurity & Information Gain", duration: "45:00" },
            { id: "ml-14", title: "Random Forests: Bagging & Feature Subsampling", duration: "50:00" },
            { id: "ml-15", title: "Boosting Algorithms: AdaBoost, XGBoost & LightGBM", duration: "50:00" },
            { id: "ml-16", title: "Support Vector Machines (SVM) & Kernel Methods", duration: "45:00" }
          ]
        },
        {
          title: "Module 5: Unsupervised Learning & Clustering (Week 5)",
          lessons: [
            { id: "ml-17", title: "K-Means Clustering Algorithm & The Elbow Method", duration: "45:00" },
            { id: "ml-18", title: "Hierarchical Clustering & Dendrograms", duration: "40:00" },
            { id: "ml-19", title: "Customer Segmentation & Anomaly Detection Project", duration: "50:00" }
          ]
        },
        {
          title: "Module 6: Deep Learning Intro & Model Deployment (Week 6)",
          lessons: [
            { id: "ml-20", title: "Introduction to Artificial Neural Networks (ANN) & Perceptrons", duration: "50:00" },
            { id: "ml-21", title: "Building a Multi-Layer Neural Network with Keras / TensorFlow", duration: "55:00" },
            { id: "ml-22", title: "Saving Models with Joblib/Pickle & Creating a Flask/FastAPI Endpoint", duration: "50:00" },
            { id: "ml-23", title: "End-to-End Capstone Project Presentation & Interview Prep", duration: "60:00" }
          ]
        }
      ]
    }
  },
  {
    id: "data-science",
    _id: "data-science",
    slug: "data-science",
    title: "Data Science",
    description: "Become a proficient Data Scientist with industry-standard statistical analysis, SQL querying, data wrangling with Pandas, predictive modeling, business intelligence dashboards, and machine learning insights.",
    image: "/images/data-science.jpg",
    price: 3499,
    category: "Data Science",
    duration: 45,
    students: 4600,
    rating: 4.9,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Vinay Sheoran",
      role: "Senior Data Science Trainer",
      bio: "Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
      avatar: "/images/trainer1.jpg",
      linkedin: "https://www.linkedin.com/in/vinay-sheoran-262a79295/",
      social: {
        linkedin: "https://www.linkedin.com/in/vinay-sheoran-262a79295/",
      },
      expertise: ["Python", "SQL", "PowerBI", "Statistical Analysis"],
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
            { id: "ds-1", title: "Python for Data Science Setup & Core Data Structures", duration: "40:00" },
            { id: "ds-2", title: "Data Ingestion: CSV, Excel, JSON & Web Scraping with BeautifulSoup", duration: "45:00" },
            { id: "ds-3", title: "Data Cleaning & Transforming with Pandas DataFrames", duration: "50:00" },
            { id: "ds-4", title: "GroupBy, Aggregations, Pivot Tables & Merging Datasets", duration: "45:00" }
          ]
        },
        {
          title: "Module 2: Applied Statistics & Exploratory Data Analysis (Week 2)",
          lessons: [
            { id: "ds-5", title: "Descriptive Statistics: Mean, Median, Variance & Standard Deviation", duration: "40:00" },
            { id: "ds-6", title: "Probability Distributions: Normal, Binomial & Poisson", duration: "45:00" },
            { id: "ds-7", title: "Hypothesis Testing, A/B Testing & p-value Interpretation", duration: "50:00" },
            { id: "ds-8", title: "Correlation Analysis, Covariance & Heatmaps", duration: "40:00" }
          ]
        },
        {
          title: "Module 3: Data Visualization & Business Dashboards (Week 3)",
          lessons: [
            { id: "ds-9", title: "Storytelling with Data: Chart Types & Best Practices", duration: "40:00" },
            { id: "ds-10", title: "Interactive Visualizations with Plotly & Seaborn", duration: "45:00" },
            { id: "ds-11", title: "Power BI / Tableau Fundamentals: Connecting Data Sources", duration: "50:00" },
            { id: "ds-12", title: "Building Interactive Business KPI Dashboards", duration: "55:00" }
          ]
        },
        {
          title: "Module 4: SQL & Database Querying for Analysts (Week 4)",
          lessons: [
            { id: "ds-13", title: "Relational Databases & PostgreSQL / MySQL Setup", duration: "35:00" },
            { id: "ds-14", title: "SELECT Queries, Filtering (WHERE), Sorting & Aggregations (HAVING)", duration: "45:00" },
            { id: "ds-15", title: "Multi-table JOINs (INNER, LEFT, RIGHT, FULL)", duration: "50:00" },
            { id: "ds-16", title: "Subqueries, CTEs & Window Functions (ROW_NUMBER, RANK)", duration: "55:00" }
          ]
        },
        {
          title: "Module 5: Applied Machine Learning for Business Insights (Week 5)",
          lessons: [
            { id: "ds-17", title: "Predictive Modeling Workflow & Problem Formulation", duration: "40:00" },
            { id: "ds-18", title: "Customer Churn Prediction using Classification Models", duration: "50:00" },
            { id: "ds-19", title: "Sales Forecasting using Time Series Analysis (ARIMA basics)", duration: "45:00" },
            { id: "ds-20", title: "Interpreting Model Outputs with SHAP & Feature Importance", duration: "45:00" }
          ]
        },
        {
          title: "Module 6: End-to-End Capstone Project & Career Roadmap (Week 6)",
          lessons: [
            { id: "ds-21", title: "Project Planning, Data Pipeline & Architecture", duration: "40:00" },
            { id: "ds-22", title: "Building a Complete Industry Data Science Portfolio Project", duration: "60:00" },
            { id: "ds-23", title: "Creating a GitHub Repository, Documentation & Project Presentation", duration: "45:00" },
            { id: "ds-24", title: "Data Science Interview Questions & Technical Screen Preparation", duration: "50:00" }
          ]
        }
      ]
    }
  },
  {
    id: "digital-marketing",
    _id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Comprehensive Digital Marketing Masterclass. Master Search Engine Optimization (SEO), Social Media Marketing (SMM), Google Ads, Meta Ads, Content Strategy, Email Marketing, Funnel Building, and Marketing Analytics to scale brands organically and with paid performance marketing.",
    image: "/images/Digital-Marketing.jpg",
    price: 2499,
    category: "Digital Marketing",
    duration: 30,
    students: 3900,
    rating: 4.8,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Divyaraj Kush",
      role: "Digital Marketing & Growth Lead",
      bio: "Digital Marketing and Performance Growth Strategist specializing in search engine optimization, content scaling, Google Ads, and Meta ad campaigns.",
      avatar: "/seo_and_marketing_trainer.jpeg",
      linkedin: "#",
      social: {
        linkedin: "#",
      },
    },
    chapters: [
      { id: 1, title: "MODULE 1: Digital Marketing & Website Foundations" },
      { id: 2, title: "MODULE 2: Keyword Research Mastery (Semrush + Ahrefs + Google Keyword Planner Mix)" },
      { id: 3, title: "MODULE 3: Practical SEO — On-Page, Authority, Backlinks & Google Maps (Local SEO)" },
      { id: 4, title: "MODULE 4: Meta Ads Mastery (Facebook & Instagram Ads + Lead Funnel)" },
      { id: 5, title: "MODULE 5: Google Ads Mastery (Search, Display & YouTube Ads)" },
      { id: 6, title: "MODULE 6: AI Marketing & Freelancing Bonus (Earning Blueprint)" }
    ],
    curriculum: {
      sections: [
        {
          title: "MODULE 1: Digital Marketing & Website Foundations",
          goal: "Understand how digital marketing drives business revenue, how websites work behind the scenes, and how to manage WordPress websites without writing a single line of code.",
          lessons: [
            { id: "dm-1-1", title: "Lesson 1.1: Foundations of Digital Marketing — Traditional vs Digital Marketing, Organic (Free Long-Term) vs Paid (Fast Results) channels, and the Customer Journey.", duration: "45:00" },
            { id: "dm-1-2", title: "Lesson 1.2: Domain Names Demystified — What is a domain name, how to choose a high-converting brand name, TLDs (.com vs .in), and live domain registration search on [GoDaddy](https://www.godaddy.com/domains) & [Hostinger](https://www.hostinger.com/domain-name-search).", duration: "40:00" },
            { id: "dm-1-3", title: "Lesson 1.3: Web Hosting & Infrastructure — How web hosting works, connecting domains to servers via Nameservers/DNS, and SSL certificates.", duration: "35:00" },
            { id: "dm-1-4", title: "Lesson 1.4: WordPress & Landing Page Overview — Live walkthrough of [WordPress Dashboard](https://wordpress.org/documentation/overview/) ([Hostinger WordPress](https://www.hostinger.com/in/wordpress-hosting)), understanding Posts vs Pages, Themes, Plugins, and creating high-converting Landing Pages for ad campaigns.", duration: "50:00" }
          ]
        },
        {
          title: "MODULE 2: Keyword Research Mastery (Semrush + Ahrefs + Google Keyword Planner Mix)",
          goal: "Learn how to find exactly what potential customers are searching for on Google, filter out low-competition \"easy-to-rank\" keywords, and spy on competitors' top traffic sources.",
          lessons: [
            { id: "dm-2-1", title: "Lesson 2.1: Understanding Keywords & Search Intent — Short-Tail vs Long-Tail keywords, and mastering the 4 types of User Intent: Informational (I), Navigational (N), Commercial (C), and Transactional (T).", duration: "40:00" },
            { id: "dm-2-2", title: "Lesson 2.2: Semrush Live Mastery — Navigating the [Semrush Keyword Magic Tool](https://www.semrush.com/analytics/keywordmagic/) ([Manual](https://www.semrush.com/kb/617-keyword-magic-tool-manual)), analyzing Search Volume, CPC, and applying the Golden KD% Filter (< 29% Easy) to discover hidden ranking opportunities.", duration: "50:00" },
            { id: "dm-2-3", title: "Lesson 2.3: Ahrefs & Google Ads Keyword Planner Combo — Analyzing Keyword Difficulty & Traffic Potential in [Ahrefs](https://ahrefs.com/keywords-explorer) ([Guide](https://ahrefs.com/seo/keyword-research)), and using the 100% Free [Google Ads Keyword Planner](https://business.google.com/in/ad-tools/keyword-planner/) to extract localized city-wise search volumes and commercial bid estimates.", duration: "45:00" },
            { id: "dm-2-4", title: "Lesson 2.4: Competitor Keyword Spying — Using [Semrush Domain Overview](https://www.semrush.com/analytics/keywordoverview/) to uncover any competitor's top ranking pages and replicate their winning keywords.", duration: "40:00" }
          ]
        },
        {
          title: "MODULE 3: Practical SEO — On-Page, Authority, Backlinks & Google Maps (Local SEO)",
          goal: "Learn how to place keywords on pages to rank on Google Page 1, understand website authority, build safe backlinks, and rank local businesses on Google Maps.",
          lessons: [
            { id: "dm-3-1", title: "Lesson 3.1: Zero-Coding On-Page SEO — Optimizing the 6 critical on-page ranking factors: URL Slug, Title Tag, Meta Description, H1/H2 Headings, First 100 Words, and Image Alt Text following the [Google Search Central SEO Guide](https://developers.google.com/search/docs).", duration: "45:00" },
            { id: "dm-3-2", title: "Lesson 3.2: Domain Authority & Page Authority — Understanding Domain Age, [Moz Domain Authority (DA)](https://moz.com/learn/seo/domain-authority), [Moz Page Authority (PA)](https://moz.com/learn/seo/page-authority), and Spam Score using the [Moz Domain Analysis Checker](https://moz.com/domain-analysis).", duration: "40:00" },
            { id: "dm-3-3", title: "Lesson 3.3: Backlinks Mastery (Off-Page SEO) — Dofollow vs Nofollow links, Link Juice, Anchor Text, and inspecting backlink profiles on [Moz Link Explorer](https://moz.com/link-explorer). 5 safe beginner link-building strategies (Profile Creation, Citations, Web 2.0, Q&A, and Guest Posts).", duration: "50:00" },
            { id: "dm-3-4", title: "Lesson 3.4: Google Business Profile (Local SEO Mastery) — How to set up and optimize a [Google Business Profile](https://business.google.com/us/business-profile/) to rank local shops, doctors, coaching centers, and salons in the Google Maps \"Top 3 Local Pack\".", duration: "45:00" },
            { id: "dm-3-5", title: "Lesson 3.5: Google Search Console & Google Analytics (GA4) Tour — Tracking Organic Clicks, Impressions, CTR, and Keyword Positions in [Google Search Console](https://search.google.com/search-console/about), requesting instant URL indexing, and viewing live visitors on [Google Analytics](https://marketingplatform.google.com/about/analytics/).", duration: "45:00" }
          ]
        },
        {
          title: "MODULE 4: Meta Ads Mastery (Facebook & Instagram Ads + Lead Funnel)",
          goal: "Stop wasting money on \"Boost Post\" and run profitable lead generation campaigns across Instagram & Facebook using Meta Ads Manager.",
          lessons: [
            { id: "dm-4-1", title: "Lesson 4.1: Meta Ads Manager Architecture — Difference between mobile Boost Post and professional [Meta Ads Manager](https://fbp.exceedlms.com/student/path/219703-ads-manager-basics); mastering the 3-Tier Hierarchy: Campaign Objective (Leads/Traffic) → Ad Set (Audience/Budget) → Ad Creative.", duration: "45:00" },
            { id: "dm-4-2", title: "Lesson 4.2: High-Precision Audience Targeting — Targeting customers by Location (Pin code / Kilometer Radius), Age, Gender, Interests, Behaviors, and selecting profitable ad placements (Instagram Reels & Stories).", duration: "50:00" },
            { id: "dm-4-3", title: "Lesson 4.3: AI-Powered Ad Creatives & Copywriting — Generating high-converting Hook-Problem-Solution ad copies with [ChatGPT](https://developers.openai.com/chatgpt) and designing thumb-stopping 1080x1080 ad graphics in 10 minutes using [Canva](https://www.canva.com/canva-ai/).", duration: "45:00" },
            { id: "dm-4-4", title: "Lesson 4.4: In-App Instant Lead Forms & WhatsApp Funnels — Setting up zero-friction [Meta Lead Ads](https://www.facebook.com/business/help/308211472265735) with pre-filled forms, qualifying questions, Click-to-WhatsApp ads, and the 5-Minute Lead Follow-Up System to convert inquiries into sales.", duration: "50:00" }
          ]
        },
        {
          title: "MODULE 5: Google Ads Mastery (Search, Display & YouTube Ads)",
          goal: "Capture high-intent customers who are actively searching to buy services on Google, master keyword bidding, and avoid budget waste with negative keywords.",
          lessons: [
            { id: "dm-5-1", title: "Lesson 5.1: High-Intent Marketing & Account Setup — Push Marketing (Meta) vs Pull Marketing (Google), exploring [Google Ads Campaign Types](https://support.google.com/google-ads/answer/2567043?hl=en), and unlocking Expert Mode.", duration: "40:00" },
            { id: "dm-5-2", title: "Lesson 5.2: Google Search Ads Live Setup — Building a [Google Search Campaign](https://support.google.com/google-ads/answer/9510373?hl=en), setting up Responsive Search Ads (RSAs), Maximize Clicks bidding, and setting Max CPC bid limits to protect your budget.", duration: "50:00" },
            { id: "dm-5-3", title: "Lesson 5.3: Keyword Match Types & Negative Keywords — Mastering Broad Match, Phrase Match (\"keyword\"), and Exact Match ([keyword]). Blocking money-wasting searches (e.g., free, jobs, pdf) with Negative Keyword Lists.", duration: "45:00" },
            { id: "dm-5-4", title: "Lesson 5.4: Google Display & YouTube Video Ads — Creating visual banner ads on [Google Display Network](https://support.google.com/google-ads/answer/10759203?hl=en), and setting up Skippable In-Stream YouTube Video Ads at ultra-low costs (₹0.20 to ₹0.50 per view).", duration: "45:00" }
          ]
        },
        {
          title: "MODULE 6: AI Marketing & Freelancing Bonus (Earning Blueprint)",
          goal: "Leverage AI tools to speed up your marketing workflow, build a portfolio, and land your first paying freelance client locally or online.",
          lessons: [
            { id: "dm-6-1", title: "Lesson 6.1: Writing SEO Blogs in 10 Minutes with ChatGPT — The 3-step prompt framework to generate outline, structured human-sounding content, FAQ schema, and meta tags using [ChatGPT](https://developers.openai.com/chatgpt).", duration: "40:00" },
            { id: "dm-6-2", title: "Lesson 6.2: Real-World Case Studies & Campaign Walkthroughs — Practical breakdown of live client websites, organic traffic growth journeys, and real performance ad dashboards.", duration: "45:00" },
            { id: "dm-6-3", title: "Lesson 6.3: Landing Your First Local Client — Finding local businesses on Google Maps that lack good websites or ads, checking competitor ads on [Meta Ad Library](https://adlibrary.com/guides/meta-campaign-setup-tutorial), and pitching ₹3,000–₹10,000/month service packages.", duration: "45:00" },
            { id: "dm-6-4", title: "Lesson 6.4: Freelancing on Fiverr & Upwork — Crafting targeted micro-niche Gigs (e.g., Semrush Keyword Research, Google Business Profile Setup, Meta Ads Lead Gen) and setting up high-converting Gig graphics.", duration: "50:00" }
          ]
        }
      ]
    }
  },
  {
    id: "web-development",
    _id: "web-development",
    slug: "web-development",
    title: "Web Development",
    description: "Your complete journey from beginner to professional full-stack web developer with an 8-week structured roadmap. Master HTML5, CSS3, JavaScript, React.js, modern UI frameworks, responsive design, Git, and deployment.",
    image: "/images/webdev-workspace.jpg",
    price: 2499,
    category: "Development",
    duration: 56,
    students: 7200,
    rating: 4.9,
    badge: "Bestseller",
    language: "Hindi + English",
    mode: "100% Online",
    instructor: {
      name: "Aditya Naulakha & Harshvardhan Gupta",
      role: "Frontend & Backend Development Leads",
      bio: "Aditya Naulakha (Frontend Lead): Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems. Harshvardhan Gupta (Backend Lead): Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.",
      avatar: "/frontend_trainer.jpeg",
      coAvatar: "/backend_trainer.jpeg",
      linkedin: "https://www.linkedin.com/in/aditya-naulakha",
      social: {
        linkedin: "https://www.linkedin.com/in/aditya-naulakha",
      },
      instructors: [
        {
          name: "Aditya Naulakha",
          role: "Frontend Web Development Lead",
          avatar: "/frontend_trainer.jpeg",
          bio: "Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems.",
          expertise: ["Frontend", "React.js", "AI-Driven Solutions", "SaaS Architecture"],
          linkedin: "https://www.linkedin.com/in/aditya-naulakha"
        },
        {
          name: "Harshvardhan Gupta",
          role: "Backend Web Development Lead",
          avatar: "/backend_trainer.jpeg",
          bio: "Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.",
          expertise: ["Backend", "Cloud Computing", "AI", "Node.js", "Express", "System Design", "MongoDB"],
          linkedin: "https://www.linkedin.com/in/harshvardhan-gupta-19298b28b/"
        }
      ]
    },
    chapters: [
      { id: 1, title: "Phase 1: HTML & CSS Foundations (Week 1–2)" },
      { id: 2, title: "Phase 2: Advanced CSS & Animations (Week 3)" },
      { id: 3, title: "Phase 3: JavaScript Fundamentals (Week 4)" },
      { id: 4, title: "Phase 4: Frontend Framework (React) (Week 5) — Lead: Aditya Naulakha" },
      { id: 5, title: "Phase 5: Backend Architecture (Node.js & Express) (Week 6) — Lead: Harshvardhan Gupta" },
      { id: 6, title: "Phase 6: Database Architecture (MongoDB & Mongoose) (Week 7) — Lead: Harshvardhan Gupta" },
      { id: 7, title: "Phase 7: Full-Stack Integration, Capstone Projects & Deployment (Week 8)" }
    ],
    curriculum: {
      sections: [
        {
          title: "Phase 1: HTML & CSS Foundations (Week 1–2)",
          lessons: [
            { id: "w1-1", title: "HTML5 Fundamentals & Semantic HTML", duration: "45:00" },
            { id: "w1-2", title: "CSS3 Styling & Box Model Architecture", duration: "45:00" },
            { id: "w1-3", title: "Flexbox & Grid Layouts", duration: "50:00" },
            { id: "w1-4", title: "Responsive Design & Mobile-First Approach", duration: "45:00" },
            { id: "w1-5", title: "Development Tools & Browser DevTools Mastery", duration: "35:00" },
            { id: "w1-6", title: "Version Control (Git & GitHub Basics)", duration: "40:00" }
          ]
        },
        {
          title: "Phase 2: Advanced CSS & Animations (Week 3)",
          lessons: [
            { id: "w2-1", title: "CSS Animations & Transitions", duration: "40:00" },
            { id: "w2-2", title: "Sass / SCSS Preprocessors", duration: "45:00" },
            { id: "w2-3", title: "CSS Frameworks (Tailwind CSS / Bootstrap)", duration: "50:00" },
            { id: "w2-4", title: "Mobile-First Design Best Practices", duration: "40:00" },
            { id: "w2-5", title: "CSS Best Practices & Design Systems", duration: "45:00" }
          ]
        },
        {
          title: "Phase 3: JavaScript Fundamentals (Week 4)",
          lessons: [
            { id: "w3-1", title: "JavaScript Basics (Variables, Data Types, Conditionals & Loops)", duration: "45:00" },
            { id: "w3-2", title: "DOM Manipulation & Dynamic UI Updates", duration: "50:00" },
            { id: "w3-3", title: "Events & Event Handling in Modern JavaScript", duration: "45:00" },
            { id: "w3-4", title: "ES6+ Features (Arrow Functions, Destructuring, Spread/Rest)", duration: "45:00" },
            { id: "w3-5", title: "Async JavaScript, Promises, Fetch API & Async/Await", duration: "55:00" },
            { id: "w3-6", title: "Error Handling & Debugging Techniques", duration: "35:00" }
          ]
        },
        {
          title: "Phase 4: Frontend Framework (React) (Week 5) — Lead: Aditya Naulakha",
          lessons: [
            { id: "w4-1", title: "React Components & JSX Syntax", duration: "50:00" },
            { id: "w4-2", title: "State Management with useState & useReducer", duration: "50:00" },
            { id: "w4-3", title: "Props, Component Communication & Event Handling", duration: "45:00" },
            { id: "w4-4", title: "React Hooks (useEffect, useMemo, useCallback, useRef)", duration: "55:00" },
            { id: "w4-5", title: "React Router for Single Page Application Navigation", duration: "45:00" },
            { id: "w4-6", title: "API Integration & Handling Asynchronous State", duration: "50:00" }
          ]
        },
        {
          title: "Phase 5: Backend Architecture (Node.js & Express) (Week 6) — Lead: Harshvardhan Gupta",
          lessons: [
            { id: "w5-1", title: "Node.js Runtime Architecture, Event Loop & Global Objects", duration: "45:00" },
            { id: "w5-2", title: "Express.js Architecture, Routing & Middleware Pipeline", duration: "55:00" },
            { id: "w5-3", title: "RESTful API Design & HTTP Status Codes Best Practices", duration: "50:00" },
            { id: "w5-4", title: "Request Validation & Centralized Error Handling", duration: "45:00" },
            { id: "w5-5", title: "JWT Authentication, bcrypt Password Hashing & Protected Routes", duration: "60:00" }
          ]
        },
        {
          title: "Phase 6: Database Architecture (MongoDB & Mongoose) (Week 7) — Lead: Harshvardhan Gupta",
          lessons: [
            { id: "w6-1", title: "NoSQL Database Concepts & MongoDB Atlas Cluster Setup", duration: "45:00" },
            { id: "w6-2", title: "Mongoose Schema Design, Data Types & Validations", duration: "50:00" },
            { id: "w6-3", title: "CRUD Operations, Filtering, Sorting & Pagination", duration: "55:00" },
            { id: "w6-4", title: "Relational Modeling with Population & Aggregation Pipelines", duration: "60:00" },
            { id: "w6-5", title: "Database Indexing & Performance Optimization", duration: "40:00" }
          ]
        },
        {
          title: "Phase 7: Full-Stack Integration, Capstone Projects & Deployment (Week 8)",
          lessons: [
            { id: "w7-1", title: "Connecting React Frontend with Node/Express REST APIs", duration: "65:00" },
            { id: "w7-2", title: "CORS Configuration, Secure Cookies & LocalStorage Auth", duration: "45:00" },
            { id: "w7-3", title: "Building a Full-Stack Production Capstone Project", duration: "90:00" },
            { id: "w7-4", title: "Production Deployment (Render, Vercel & Atlas)", duration: "50:00" },
            { id: "w7-5", title: "Performance Audits, CI/CD Workflows & Full-Stack Interview Prep", duration: "55:00" }
          ]
        }
      ]
    }
  }
];

export default courses;