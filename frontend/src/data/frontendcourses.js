const courses = [
  {
    id: "1",
    title: "Digital Marketing Mastery",
    description: "Complete guide to digital marketing",
    image: "/images/Digital-Marketing.jpg",
    chapters: [
      { id: 1, title: "Digital Marketing Fundamentals" },
      { id: 2, title: "Social Media Marketing" },
      { id: 3, title: "Email Marketing" },
    ],
    instructor: {
      name: "Jane Smith",
      bio: "Digital Marketing expert with over 10 years of experience",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    price: 49.99,
    category: "Business",
    curriculum: {
      sections: [
        {
          title: "Introduction",
          lessons: [
            {
              id: "1-1",
              title: "Introduction to Digital Marketing",
              duration: "(18:24)",
            },
            {
              id: "1-2",
              title: "Setting up Your Marketing Strategy",
              duration: "(25:18)",
            },
          ],
        },
        {
          title: "Social Media Marketing",
          lessons: [
            {
              id: "2-1",
              title: "Facebook Marketing Fundamentals",
              duration: "(45:12)",
            },
            {
              id: "2-2",
              title: "Instagram Growth Strategies",
              duration: "(32:44)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description:
      "Deep dive into advanced JavaScript concepts, ES6+, async programming, and more.",
    image: "/images/Women-shaping-the-future-of-coding-blog-08.03.2023.jpg",
    chapters: [
      { id: 1, title: "ES6 Features" },
      { id: 2, title: "Asynchronous JS" },
      { id: 3, title: "Advanced Functions" },
    ],
    instructor: {
      name: "John Smith",
      bio: "JavaScript expert and author, passionate about teaching advanced programming concepts.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    price: 59.99,
    category: "Programming Languages",
    curriculum: {
      sections: [
        {
          title: "ES6 and Beyond",
          lessons: [
            {
              id: "1-1",
              title: "Let and Const",
              duration: "(10:15)",
            },
            {
              id: "1-2",
              title: "Arrow Functions",
              duration: "(12:30)",
            },
          ],
        },
        {
          title: "Asynchronous JavaScript",
          lessons: [
            {
              id: "2-1",
              title: "Callbacks",
              duration: "(20:45)",
            },
            {
              id: "2-2",
              title: "Promises",
              duration: "(15:10)",
            },
            {
              id: "2-3",
              title: "Async/Await",
              duration: "(18:20)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description:
      "A complete guide to modern web development: HTML, CSS, JavaScript, and deployment.",
    image: "/images/webdev.jpeg",
    chapters: [
      { id: 1, title: "HTML & CSS Basics" },
      { id: 2, title: "Responsive Design" },
      { id: 3, title: "JavaScript Essentials" },
    ],
    instructor: {
      name: "Emily Clark",
      bio: "Full-stack developer and mentor, passionate about teaching web technologies.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    price: 69.99,
    category: "Web Development",
    curriculum: {
      sections: [
        {
          title: "HTML Fundamentals",
          lessons: [
            {
              id: "1-1",
              title: "Introduction to HTML",
              duration: "(22:10)",
            },
            {
              id: "1-2",
              title: "HTML5 Semantic Elements",
              duration: "(19:30)",
            },
          ],
        },
        {
          title: "CSS Basics",
          lessons: [
            {
              id: "2-1",
              title: "CSS Selectors and Properties",
              duration: "(15:50)",
            },
            {
              id: "2-2",
              title: "Box Model and Layout",
              duration: "(20:05)",
            },
          ],
        },
        {
          title: "JavaScript Essentials",
          lessons: [
            {
              id: "3-1",
              title: "Variables and Data Types",
              duration: "(12:15)",
            },
            {
              id: "3-2",
              title: "Control Structures",
              duration: "(18:40)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    title: "Introduction to Artificial Intelligence",
    description:
      "Explore the basics of AI, machine learning, and neural networks with hands-on projects.",
    image: "/images/ai.jpg",
    chapters: [
      { id: 1, title: "What is AI?" },
      { id: 2, title: "Machine Learning Basics" },
      { id: 3, title: "Neural Networks" },
    ],
    instructor: {
      name: "Dr. Alan Turing",
      bio: "AI researcher and educator, making complex topics accessible to all.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    price: 79.99,
    category: "AI",
    curriculum: {
      sections: [
        {
          title: "AI Foundations",
          lessons: [
            {
              id: "1-1",
              title: "History of AI",
              duration: "(14:22)",
            },
            {
              id: "1-2",
              title: "AI vs. Machine Learning vs. Deep Learning",
              duration: "(16:10)",
            },
          ],
        },
        {
          title: "Machine Learning",
          lessons: [
            {
              id: "2-1",
              title: "Supervised Learning",
              duration: "(25:30)",
            },
            {
              id: "2-2",
              title: "Unsupervised Learning",
              duration: "(22:15)",
            },
          ],
        },
        {
          title: "Neural Networks",
          lessons: [
            {
              id: "3-1",
              title: "Introduction to Neural Networks",
              duration: "(20:45)",
            },
            {
              id: "3-2",
              title: "Building a Neural Network",
              duration: "(30:10)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    title: "Python Programming Masterclass",
    description:
      "Master Python from basics to advanced topics, including data analysis and web development.",
    image: "/images/pythonimage.png",
    chapters: [
      { id: 1, title: "Python Basics" },
      { id: 2, title: "Data Structures" },
      { id: 3, title: "Web Development with Python" },
    ],
    instructor: {
      name: "Sarah Lee",
      bio: "Python developer and data scientist, passionate about teaching programming skills.",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    price: 54.99,
    category: "Programming Languages",
    curriculum: {
      sections: [
        {
          title: "Getting Started with Python",
          lessons: [
            {
              id: "1-1",
              title: "Installing Python",
              duration: "(10:05)",
            },
            {
              id: "1-2",
              title: "Your First Python Script",
              duration: "(12:20)",
            },
          ],
        },
        {
          title: "Python Data Structures",
          lessons: [
            {
              id: "2-1",
              title: "Lists and Tuples",
              duration: "(15:35)",
            },
            {
              id: "2-2",
              title: "Dictionaries and Sets",
              duration: "(18:50)",
            },
          ],
        },
        {
          title: "Web Development with Python",
          lessons: [
            {
              id: "3-1",
              title: "Flask Framework Basics",
              duration: "(22:15)",
            },
            {
              id: "3-2",
              title: "Building a Web App with Flask",
              duration: "(30:45)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    title: "React Advanced Patterns",
    description:
      "Take your React skills to the next level with hooks, context, and performance optimization.",
    image: "/images/reactimage.jpg",
    chapters: [
      { id: 1, title: "Hooks Deep Dive" },
      { id: 2, title: "Context API" },
      { id: 3, title: "Performance Optimization" },
    ],
    instructor: {
      name: "Jane Doe",
      bio: "Senior Frontend Engineer with 8+ years of experience teaching React and modern JavaScript.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    price: 64.99,
    category: "React",
    curriculum: {
      sections: [
        {
          title: "React Hooks",
          lessons: [
            {
              id: "1-1",
              title: "Introduction to Hooks",
              duration: "(12:10)",
            },
            {
              id: "1-2",
              title: "Building Custom Hooks",
              duration: "(18:30)",
            },
          ],
        },
        {
          title: "Context API",
          lessons: [
            {
              id: "2-1",
              title: "Context API Overview",
              duration: "(10:45)",
            },
            {
              id: "2-2",
              title: "Using Context in React",
              duration: "(15:20)",
            },
          ],
        },
        {
          title: "Performance Optimization",
          lessons: [
            {
              id: "3-1",
              title: "React Performance Best Practices",
              duration: "(20:15)",
            },
            {
              id: "3-2",
              title: "Profiling and Debugging React Apps",
              duration: "(25:40)",
            },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    title: "AI for Developers",
    description: "Practical AI for developers: APIs, tools, and real-world applications.",
    image: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png",
    chapters: [
      { id: 1, title: "AI APIs" },
      { id: 2, title: "Building AI Apps" },
      { id: 3, title: "Deploying AI Solutions" },
    ],
    instructor: {
      name: "Dr. Alan Turing",
      bio: "AI researcher and educator, making complex topics accessible to all.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    price: 89.99,
    category: "AI",
    curriculum: {
      sections: [
        {
          title: "AI APIs",
          lessons: [
            {
              id: "1-1",
              title: "Introduction to AI APIs",
              duration: "(15:10)",
            },
            {
              id: "1-2",
              title: "Using AI APIs in Your Applications",
              duration: "(20:25)",
            },
          ],
        },
        {
          title: "Building AI Applications",
          lessons: [
            {
              id: "2-1",
              title: "Choosing the Right AI Model",
              duration: "(18:40)",
            },
            {
              id: "2-2",
              title: "Training Your AI Model",
              duration: "(25:50)",
            },
          ],
        },
        {
          title: "Deploying AI Solutions",
          lessons: [
            {
              id: "3-1",
              title: "Deployment Strategies for AI",
              duration: "(22:15)",
            },
            {
              id: "3-2",
              title: "Monitoring and Maintaining AI Systems",
              duration: "(30:05)",
            },
          ],
        },
      ],
    },
  },
];

export default courses;