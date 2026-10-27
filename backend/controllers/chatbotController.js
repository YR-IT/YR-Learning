const { GoogleGenAI } = require('@google/genai');
const Course = require('../models/Course');

let cachedCoursesContext = '';
let lastCoursesFetch = 0;

const getCoursesContext = async () => {
  const now = Date.now();
  if (cachedCoursesContext && (now - lastCoursesFetch < 3 * 60 * 1000)) {
    return cachedCoursesContext;
  }

  try {
    const courses = await Course.find({}, 'title slug description price category duration rating mode badge instructor chapters curriculum').lean();
    if (courses && courses.length > 0) {
      cachedCoursesContext = courses
        .map((c, idx) => {
          const instructorName = typeof c.instructor === 'string'
            ? c.instructor
            : `${c.instructor?.name || 'YR Instructor'}${c.instructor?.role ? ` (${c.instructor.role})` : ''}${c.instructor?.bio ? ` - ${c.instructor.bio}` : ''}`;
          
          const durationStr = c.duration 
            ? (c.duration > 15 ? `${c.duration} Days` : `${c.duration} Weeks`) 
            : '45 Days';

          let syllabusModules = '';
          if (Array.isArray(c.chapters) && c.chapters.length > 0) {
            syllabusModules = c.chapters.map(ch => `  * ${ch.title}`).join('\n');
          } else if (c.curriculum?.sections && Array.isArray(c.curriculum.sections) && c.curriculum.sections.length > 0) {
            syllabusModules = c.curriculum.sections.map(s => `  * ${s.title}`).join('\n');
          }

          return `### ${idx + 1}. ${c.title}
- Course URL: /course/${c.slug || c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
- Category: ${c.category}
- Fee: Rs. ${c.price}
- Duration: ${durationStr} | Mode: ${c.mode || '100% Online'} | Rating: ${c.rating || 4.8}★
- Instructor: ${instructorName}
- Overview: ${c.description || 'Comprehensive industry curriculum with hands-on projects and 1-on-1 mentor guidance.'}
${syllabusModules ? `- Syllabus & Modules:\n${syllabusModules}` : ''}`;
        })
        .join('\n\n');
      lastCoursesFetch = now;
      return cachedCoursesContext;
    }
  } catch (err) {
    console.warn('Could not query courses from database for chatbot context:', err.message);
  }

  // Comprehensive fallback catalog matching all 6 YR Learning courses
  return `### 1. Data Structures and Algorithms in Java
- Course URL: /course/data-structures-and-algorithms-in-java
- Category: Computer Science
- Fee: Rs. 3500
- Duration: 45 Days | Mode: 100% Online | Rating: 4.9★ (Bestseller)
- Instructor: Gauri Singhal (DSA & Java Instructor, Software Developer at YR IT Solutions, Celebal Technologies | DSE @ Infosys)
- Overview: Master Data Structures and Algorithms in Java with a comprehensive 45-day structured plan. From time complexity and recursion to binary trees, graphs, and dynamic programming, crack top product-based company coding interviews.
- Syllabus & Modules:
  * Module 1 (Day 1-7): Java Essentials, OOP & Complexity Analysis (Syntax, JVM Architecture, Classes, Inheritance, Interfaces, Big-O Notation, Recursion & Call Stack)
  * Module 2 (Day 8-14): Arrays, Two Pointers & Sliding Window (Dynamic Arrays, 2 Pointers, Kadane's Algorithm, Prefix Sums, Matrix Transformations)
  * Module 3 (Day 15-21): Strings, Searching & Sorting Patterns (Immutability, StringBuilder, Binary Search on Answer, Merge Sort, Quick Sort Partitioning)
  * Module 4 (Day 22-28): Linked Lists, Stacks & Queues (Singly/Doubly Linked Lists, Cycle Detection, Monotonic Stack, Queue, Deque)
  * Module 5 (Day 29-35): Binary Trees & Binary Search Trees (BST Traversals, Height, Balanced Trees, LCA, BST Lookup & Validations)
  * Module 6 (Day 36-40): Heaps, Hashing & Greedy Algorithms (PriorityQueue, Hash Tables, Frequency Maps, Greedy Patterns)
  * Module 7 (Day 41-45): Graphs, Dynamic Programming & FAANG Mock Interviews (Adjacency List, BFS/DFS, Cycle Detection, 1D & 2D Dynamic Programming, 0/1 Knapsack, Longest Common Subsequence)

### 2. Web Development
- Course URL: /course/web-development
- Category: Development
- Fee: Rs. 3499
- Duration: 56 Days (8 Weeks) | Mode: 100% Online | Rating: 4.9★ (Bestseller)
- Instructor: Aditya Naulakha (Frontend Lead) & Harshvardhan Gupta (Backend Lead)
- Overview: Complete journey from beginner to professional full-stack web developer with an 8-week structured roadmap. Master HTML5, CSS3, JavaScript, React.js, Tailwind CSS, REST APIs, Git, and cloud deployment.
- Syllabus & Modules:
  * Phase 1 (Week 1-2): HTML & CSS Foundations (Semantic HTML5, Box Model, Flexbox, CSS Grid, Responsive Mobile-First Design, Git & GitHub)
  * Phase 2 (Week 3): Advanced CSS & Animations (CSS Transitions & Keyframes, Sass/SCSS, Tailwind CSS Framework, Modern UI Systems)
  * Phase 3 (Week 4): JavaScript Fundamentals (DOM Manipulation, Events, ES6+ Arrow Functions & Destructuring, Async/Await, Fetch API, Error Handling)
  * Phase 4 (Week 5): Frontend Framework (React.js) (JSX, Components, Props, State Management, Hooks: useState, useEffect, useMemo, useCallback, React Router)
  * Phase 5 (Week 6-8): Final Capstone Projects & Production Deployment (Portfolio Website, Full-Feature React Web App, Deployment to Vercel/Netlify, SEO, Lighthouse Audits, Mock Interviews)

### 3. UI/UX Design
- Course URL: /course/ui-ux
- Category: Design
- Fee: Rs. 2999
- Duration: 30 Days (4 Weeks) | Mode: 100% Online | Rating: 4.9★ (Trending)
- Instructor: Isha (UI/UX Design Specialist at MAAC with 6+ years of UI/UX and visual design experience)
- Overview: Master modern UI/UX design from scratch using Figma. Learn design thinking, user research, wireframing, component systems, auto-layout, interactive prototyping, and build production-ready digital interfaces.
- Syllabus & Modules:
  * Module 1 (Week 1): Design Begins with Why (UI vs UX, Good vs Bad Design, User Research Methods, UX Laws & Psychology)
  * Module 2 (Week 2): From Ideas to Interface (Figma Interface, Low-Fidelity Wireframes, Moodboards, User Flows, Typography, Spacing, Color Theory, Style Guides)
  * Module 3 (Week 3): Deep Dive (Advanced Prototyping, Auto Layout, Grids, Responsive Constraints, Components & Variants, High-Fidelity UI Screens)
  * Module 4 (Week 4): Build. Test. Launch. (End-to-End Capstone Project, Micro-interactions, Usability Testing, Design Iteration, Developer Handoff)

### 4. Machine Learning
- Course URL: /course/machine-learning
- Category: Artificial Intelligence
- Fee: Rs. 3800
- Duration: 40 Days (6 Weeks) | Mode: 100% Online | Rating: 4.8★ (Popular)
- Instructor: Gauri Sharma (AIML Engineer, currently working at Opalina; Ex-CA with 1.5 years of corporate experience and 3+ years of mentoring and training 1,000+ students globally)
- Overview: Hands-on journey into Artificial Intelligence and Machine Learning. Master Python data science libraries, regression, classification, clustering, random forests, neural networks, and model deployment.
- Syllabus & Modules:
  * Module 1 (Week 1): Python for ML & Numerical Computing (NumPy Matrix Operations, Pandas Data Manipulation, Matplotlib & Seaborn Data Visualization)
  * Module 2 (Week 2): Data Preprocessing & Feature Engineering (Missing Values, Outliers, One-Hot & Label Encoding, Feature Scaling, PCA Dimensionality Reduction)
  * Module 3 (Week 3): Supervised Learning - Regression & Classification (Linear & Logistic Regression, Confusion Matrix, Precision, Recall, ROC-AUC, KNN, Naive Bayes)
  * Module 4 (Week 4): Tree-Based Models & Ensemble Learning (Decision Trees, Random Forests, XGBoost, LightGBM, Support Vector Machines SVM)
  * Module 5 (Week 5): Unsupervised Learning & Clustering (K-Means, Elbow Method, Hierarchical Clustering, Customer Segmentation Project)
  * Module 6 (Week 6): Deep Learning Intro & Model Deployment (Artificial Neural Networks ANN, Keras/TensorFlow, Model Serialization, FastAPI/Flask REST API deployment)

### 5. Data Science
- Course URL: /course/data-science
- Category: Data Science
- Fee: Rs. 3999
- Duration: 45 Days (6 Weeks) | Mode: 100% Online | Rating: 4.9★ (Bestseller)
- Instructor: Vinay Sheoran (Senior Data Science Trainer, Ex-Data Scientist at Flipkart & Publicis Re:Sources with 8+ years experience)
- Overview: Become a proficient Data Scientist with industry-standard statistical analysis, SQL querying, data wrangling with Pandas, predictive modeling, business intelligence dashboards, and machine learning insights.
- Syllabus & Modules:
  * Module 1 (Week 1): Python Essentials & Data Wrangling (Data Structures, CSV/Excel/JSON Ingestion, Web Scraping, Pandas GroupBy, Aggregations & Pivot Tables)
  * Module 2 (Week 2): Applied Statistics & EDA (Descriptive Statistics, Probability Distributions, Hypothesis Testing, A/B Testing, Correlation & Heatmaps)
  * Module 3 (Week 3): Data Visualization & Business Dashboards (Storytelling with Data, Interactive Plotly Visualizations, Power BI / Tableau Dashboards)
  * Module 4 (Week 4): SQL & Database Querying for Analysts (PostgreSQL/MySQL, Complex Joins, Subqueries, CTEs, Window Functions ROW_NUMBER & RANK)
  * Module 5 (Week 5): Applied Machine Learning for Business Insights (Predictive Modeling, Churn Prediction, Time Series Sales Forecasting, SHAP Feature Importance)
  * Module 6 (Week 6): End-to-End Capstone Project & Career Roadmap (Production Data Pipeline, Portfolio Project, GitHub Presentation, Technical Interview Prep)

### 6. Digital Marketing
- Course URL: /course/digital-marketing
- Category: Digital Marketing
- Fee: Rs. 2499
- Duration: 30 Days (6 Weeks) | Mode: 100% Online | Rating: 4.8★ (Bestseller)
- Instructor: Divyaraj Kush (Digital Marketing Lead, Growth Marketing Strategist)
- Overview: Comprehensive Digital Marketing Bootcamp. Learn On-Page and Off-Page SEO, Keyword Research, Technical SEO, Google Ads, Meta Ads, Content Marketing, and Analytics to scale brands organically and with paid ads.
- Syllabus & Modules:
  * Module 1 (Week 1): Digital Marketing & Brand Strategy (Ecosystem, Consumer Funnel, Buyer Personas, Competitive Benchmarking, Inbound Marketing)
  * Module 2 (Week 2): SEO Mastery (Search Engines Crawling & Indexing, Keyword Research, On-Page SEO, Technical SEO, Core Web Vitals, Backlinks)
  * Module 3 (Week 3): High-Converting Content Marketing & Copywriting (SEO Blogs, AIDA/PAS Frameworks, Search Intent Matching, Visual Assets)
  * Module 4 (Week 4): Social Media Marketing & Organic Growth (Instagram, LinkedIn, YouTube Strategy, Algorithm Growth Hacks, Community Building)
  * Module 5 (Week 5): Paid Advertising - Google Ads & Meta Ads (Search Campaigns, Keyword Match Types, Meta Ads Manager, Pixel Tracking, ROAS & CPA Optimization)
  * Module 6 (Week 6): Analytics, Marketing Automation & Freelancing (Google Analytics 4 GA4, Search Console, Email Marketing Automation, Freelance Proposals & Client Acquisition)`;
};

const generateReply = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      message: 'Gemini chat is not configured. Set GEMINI_API_KEY in the backend environment.',
    });
  }

  const incomingMessages = req.body?.messages;
  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    return res.status(400).json({ message: 'Send at least one chat message.' });
  }

  const rawContents = incomingMessages.slice(-12).flatMap((message) => {
    const role = message?.role === 'assistant' ? 'model' : message?.role;
    const text = typeof message?.content === 'string' ? message.content.trim() : '';
    if (!['user', 'model'].includes(role) || !text) return [];
    return [{ role, parts: [{ text: text.slice(0, 4000) }] }];
  });

  // Ensure conversation turns alternate properly without consecutive duplicates
  const contents = [];
  for (const item of rawContents) {
    if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
      contents[contents.length - 1].parts[0].text += `\n${item.parts[0].text}`;
    } else {
      contents.push(item);
    }
  }

  if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
    return res.status(400).json({ message: 'The last chat message must be from the user.' });
  }

  // Model candidates with fallback support (e.g. if gemini-3.8-flash hits 503 high demand spikes)
  const candidateModels = [
    process.env.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.8-flash',
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];

  const coursesContext = await getCoursesContext();

  const systemInstruction = `You are the official AI Learning Mentor and Student Advisor for YR Learning (YR IT Solutions).

CORE GOAL & KNOWLEDGE:
1. Ground all course advice, syllabus explanations, fee inquiries, and career guidance in YR Learning's official courses catalog below.
2. When answering about courses, roadmap, or syllabus, ALWAYS recommend the matching official YR Learning course with:
   - Exact Course Title
   - Fee in Rs.
   - Duration (in Days or Weeks)
   - Instructor name and their industry credentials
   - Key modules and syllabus highlights
   - Clickable links: [View Course Details](/course/<slug>) and [Enroll Now](/enroll)

FORMATTING GUIDELINES (VERY IMPORTANT):
- Headings: Use standard Markdown headings (### Section Title) for all headings and section breaks.
- DO NOT wrap headings in double asterisks (NEVER write "### **Heading**" or "**Heading:**" as a standalone line). Write clean headers like "### Course Overview", "### Curriculum & Modules", "### Why Choose This Course", "### Fee & Enrollment".
- Bolding: Use standard bolding (**bold text**) ONLY for labels and important keywords, e.g. **Fee:**, **Duration:**, **Instructor:**, **Mode:**, **Key Topics:**.
- Bullet points: Use clean bullet points (- ) for lists.
- Links: Use markdown links, e.g. [Enroll Now](/enroll), [Course Details](/course/web-development), [Contact Support](/contact).

OFFICIAL YR LEARNING COURSES CATALOG:
${coursesContext}

ADDITIONAL PLATFORM DETAILS:
- How to Enroll: Students can visit [Enrollment Page](/enroll) or click "Enroll Now" on any course page.
- Contact & Support: Email yrelearning@gmail.com, WhatsApp +91 7404890806, or visit [Contact Page](/contact).
- Certification: Every course includes an industry-recognized completion certificate with verifiable credential ID.
- Mode: 100% online with live mentor support, capstone portfolio projects, and FAANG/product company mock interviews.

TONE & STYLE:
- Encouraging, professional, knowledgeable, and student-focused.
- For coding and technical questions, provide clear explanations with well-formatted code snippets.
- Keep answers well-structured, neat, readable, and directly relevant to YR Learning's offerings.`;

  const ai = new GoogleGenAI({ apiKey });
  let lastError = null;

  for (const model of uniqueModels) {
    try {
      const result = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
        },
      });

      const reply = result.text?.trim();
      if (reply) {
        return res.status(200).json({ reply, modelUsed: model });
      }
    } catch (error) {
      console.warn(`Gemini attempt with model "${model}" failed:`, error.message);
      lastError = error;
    }
  }

  console.error('All Gemini model candidates failed. Last error:', lastError?.message);
  return res.status(502).json({
    message: 'The AI assistant is temporarily unavailable. Please try again shortly.',
    error: lastError?.message || 'Unknown error',
  });
};

module.exports = { generateReply };