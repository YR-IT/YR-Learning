import api from './api';

export const articleService = {
  // Get all articles from backend
  async getAllArticles(params = {}) {
    try {
      const response = await api.get('/articles', { params });
      return response.data || [];
    } catch (error) {
      console.warn('Backend unavailable, using fallback articles:', error.message);
      return [
        {
          id: "react-performance-2026",
          title: "10 Proven Techniques to Boost React App Performance in 2026",
          excerpt: "From compiler-driven memoization to streaming SSR and bundle optimization, learn the practical steps top engineering teams use to ship snappy apps.",
          category: "Web Development",
          readTime: 8,
          date: "2026-02-15",
          author: "Ananya Rao",
          tags: ["React", "Optimization", "Best Practices", "Performance"],
          cover: "/images/articles/react-performance.jpg",
        },
        {
          id: "dsa-roadmap-mastery",
          title: "The Ultimate DSA Roadmap: From Arrays to DP (with Patterns)",
          excerpt: "A structured, pattern-first approach to mastering Data Structures and Algorithms for top tech interviews—complete with practice ladders.",
          category: "Data Structures",
          readTime: 12,
          date: "2026-01-28",
          author: "Rahul Mehta",
          tags: ["DSA", "Interviews", "Roadmap", "Python"],
          cover: "/images/articles/dsa-roadmap.jpg",
        },
        {
          id: "portfolio-ux-that-converts",
          title: "Design a Hiring-Ready Developer Portfolio (That Actually Converts)",
          excerpt: "Craft a portfolio that showcases proof of skill, not just boilerplate code—learn layout hierarchy, storytelling, and UX cues that impress recruiters.",
          category: "UI/UX",
          readTime: 7,
          date: "2026-01-10",
          author: "Meera Iyer",
          tags: ["Portfolio", "UX", "Careers", "Design"],
          cover: "/images/articles/portfolio-ux.jpg",
        },
        {
          id: "cicd-production-weekend",
          title: "CI/CD for Busy Devs: From Zero to Production in a Weekend",
          excerpt: "A pragmatic guide to setting up automated GitHub Actions pipelines, containerized environments, and cloud observability without drowning in tooling.",
          category: "DevOps",
          readTime: 10,
          date: "2025-12-20",
          author: "Kartik Singh",
          tags: ["DevOps", "CI/CD", "Docker", "AWS"],
          cover: "/images/articles/devops-cicd.jpg",
        },
        {
          id: "breaking-into-ai-ml-2026",
          title: "Breaking into AI/ML in 2026: What Recruiters Actually Look For",
          excerpt: "Degrees vs. real production projects, Kaggle vs. deployment—understand the signals that matter most and how to build high-impact AI portfolios.",
          category: "AI/ML",
          readTime: 9,
          date: "2025-11-18",
          author: "Priya Desai",
          tags: ["AI/ML", "Careers", "LLMs", "Data Science"],
          cover: "/images/articles/aiml-career.jpg",
        },
        {
          id: "cyber-security-foundations",
          title: "Cyber Security Foundations: Threats, Tools, and Best Practices",
          excerpt: "Understand modern attack vectors, essential defensive practices, OWASP Top 10 vulnerabilities, and how to secure web applications end-to-end.",
          category: "Cyber Security",
          readTime: 10,
          date: "2025-10-05",
          author: "Neha Kapoor",
          tags: ["Cyber Security", "OWASP", "Authentication", "InfoSec"],
          cover: "/images/articles/cyber-security.jpg",
        }
      ];
    }
  },

  // Get single article by ID or slug
  async getArticleById(id) {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error.message);
      return null;
    }
  },

  // Create article (Admin)
  async createArticle(data) {
    const response = await api.post('/articles', data);
    return response.data;
  },

  // Update article (Admin)
  async updateArticle(id, data) {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
  },

  // Delete article (Admin)
  async deleteArticle(id) {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  }
};

export default articleService;
