import api from './api';

export const FALLBACK_ARTICLES = [
  {
    id: "react-performance-2026",
    slug: "react-performance-2026",
    title: "10 Proven Techniques to Boost React App Performance in 2026",
    excerpt: "From compiler-driven memoization to streaming SSR and bundle optimization, learn the practical steps top engineering teams use to ship snappy apps.",
    content: `Modern web applications demand peak performance. As user expectations rise and web apps grow increasingly complex, keeping your React applications lightning fast requires a disciplined approach to rendering, asset delivery, and state management.

1. Leverage the React Compiler for Automatic Memoization
The newest generation of React leverages compiler-level analysis to automatically memoize component sub-trees, hook inputs, and JSX allocations. This eliminates tedious manual 'useMemo' and 'useCallback' boilerplate while preventing unnecessary cascading re-renders across deeply nested component trees.

2. Adopt Route-Based and Component-Level Code Splitting
Never load code your user doesn't need yet. Split large component chunks using 'React.lazy' and dynamic imports for heavy modals, panels, and secondary routes. This slashes your initial JavaScript bundle size, directly speeding up your Largest Contentful Paint (LCP) and Total Blocking Time (TBT).

3. Optimize Images with Modern Formats and Responsive Dimensions
Images are consistently the heaviest assets transferred over the wire. Convert legacy JPEG and PNG images into modern AVIF or WebP formats with sensible dimensions (e.g. 1200px max width for desktop cards). Always specify 'loading="lazy"' and 'decoding="async"' on below-the-fold imagery.

4. Virtualize Massive Lists and Data Grids
Rendering thousands of DOM nodes at once brings even high-end machines to their knees. Use windowing libraries or native CSS containment techniques to render only the items currently visible in the viewport.

5. Offload Heavy Calculations to Web Workers
Intensive tasks like sorting huge datasets, audio/video analysis, or complex math should never block the main browser thread. Offload them to Web Workers to ensure user interactions remain at a rock-solid 60 frames per second.

6. Monitor Interaction to Next Paint (INP)
Replace outdated FID tracking with the modern INP metric. Track input responsiveness closely in Google Lighthouse and Chrome DevTools Performance panel, targeting sub-200ms latency on all key user actions.`,
    category: "Web Development",
    readTime: 8,
    date: "2026-02-15",
    author: "Ananya Rao",
    tags: ["React", "Optimization", "Best Practices", "Performance"],
    cover: "/images/articles/react-performance.jpg",
  },
  {
    id: "dsa-roadmap-mastery",
    slug: "dsa-roadmap-mastery",
    title: "The Ultimate DSA Roadmap: From Arrays to DP (with Patterns)",
    excerpt: "A structured, pattern-first approach to mastering Data Structures and Algorithms for top tech interviews—complete with practice ladders.",
    content: `Mastering Data Structures and Algorithms (DSA) is not about blindly memorizing 500 LeetCode solutions. It is about building strong muscle memory around underlying algorithmic patterns.

1. The Two-Pointer & Sliding Window Pattern
Understand how two pointers converging or sliding window boundaries solve complex subarray and substring challenges in linear O(N) time instead of brute-force O(N²). Common applications include finding maximum sums, longest unique substrings, and palindrome checks.

2. Fast and Slow Pointers (Floyd's Cycle Detection)
Master detecting cycles in linked lists, identifying linked list middle nodes, and solving circular array problems with minimal O(1) auxiliary space.

3. Monotonic Stacks and Queues
Whenever a problem asks for the "Next Greater Element", "Previous Smaller Element", or calculates histogram areas, a monotonic stack is almost always the optimal solution.

4. Graph & Tree Traversals: BFS vs DFS
Build deep intuition for when to use Breadth-First Search (shortest path in unweighted graphs, level-order traversal) versus Depth-First Search (backtracking, connected components, topological sorting, detecting cycles).

5. Dynamic Programming: From Recursion to Tabulation
Demystify Dynamic Programming by breaking it into three predictable steps:
- State definition: What variables uniquely identify the subproblem?
- Recurrence relation: How does state(n) depend on earlier states?
- Base cases and memoization / 1D space optimization.`,
    category: "Data Structures",
    readTime: 12,
    date: "2026-01-28",
    author: "Rahul Mehta",
    tags: ["DSA", "Interviews", "Roadmap", "Python"],
    cover: "/images/articles/dsa-roadmap.jpg",
  },
  {
    id: "portfolio-ux-that-converts",
    slug: "portfolio-ux-that-converts",
    title: "Design a Hiring-Ready Developer Portfolio (That Actually Converts)",
    excerpt: "Craft a portfolio that showcases proof of skill, not just boilerplate code—learn layout hierarchy, storytelling, and UX cues that impress recruiters.",
    content: `Recruiters and hiring managers spend an average of 30 to 45 seconds reviewing a candidate portfolio. If your site looks generic, slow, or disorganized, they will move on to the next applicant.

1. Lead with Impact and Clarity
Your hero section should immediately communicate who you are, what technology stack you excel in, and what unique value you bring. Avoid generic buzzwords; showcase real problem-solving capabilities.

2. Case Studies Beat Raw GitHub Links
Instead of a simple grid of repository links, present 2 or 3 in-depth case studies for your flagship projects. Include:
- The problem: What real-world user or business challenge does this solve?
- The tech stack choice: Why did you choose React, Node, or PostgreSQL over alternatives?
- Challenges and hurdles: How did you overcome race conditions, scaling bottlenecks, or complex auth flows?
- Measurable outcomes: Live deployment link, demo credentials, and performance stats.

3. Flawless Responsive Design & Dark Mode
Engineering leaders will inspect your portfolio on both 4K monitors and mobile phones. Ensure navigation is smooth, touch targets are generous (at least 48px), and the dark theme is rich and readable.

4. Clear Calls to Action (CTA)
Make getting in touch frictionless. Place links to your Resume (PDF), LinkedIn, GitHub, and a working Contact form or email link right in the header and footer.`,
    category: "UI/UX",
    readTime: 7,
    date: "2026-01-10",
    author: "Meera Iyer",
    tags: ["Portfolio", "UX", "Careers", "Design"],
    cover: "/images/articles/portfolio-ux.jpg",
  },
  {
    id: "cicd-production-weekend",
    slug: "cicd-production-weekend",
    title: "CI/CD for Busy Devs: From Zero to Production in a Weekend",
    excerpt: "A pragmatic guide to setting up automated GitHub Actions pipelines, containerized environments, and cloud observability without drowning in tooling.",
    content: `Automating your software deployment pipeline is the single best investment you can make for engineering velocity and sleep quality.

1. The Pillars of Continuous Integration (CI)
Every commit to your main branch or pull request should trigger automated checks:
- Code formatting and linting (ESLint, Prettier).
- Type checking (TypeScript compiler).
- Unit and integration tests (Vitest, Jest).
If any step fails, the pull request cannot be merged. This protects production from silent regressions.

2. Dockerizing Multi-Stage Builds
Learn how multi-stage Dockerfiles keep container images ultra-lean. Build your assets in a full Node environment, then copy only the static dist bundle into a minimal Nginx or Alpine runtime container, shrinking images from 800MB down to under 25MB.

3. Automated Continuous Delivery (CD)
Use GitHub Actions to authenticate securely with cloud providers using OpenID Connect (OIDC) rather than long-lived API keys. Automate deployments to Vercel, Render, AWS, or DigitalOcean upon merging into main.

4. Observability and Health Checks
Add automated '/health' endpoints to your services. Configure rollback triggers if post-deployment smoke tests fail, guaranteeing zero downtime for active users.`,
    category: "DevOps",
    readTime: 10,
    date: "2025-12-20",
    author: "Kartik Singh",
    tags: ["DevOps", "CI/CD", "Docker", "AWS"],
    cover: "/images/articles/devops-cicd.jpg",
  },
  {
    id: "breaking-into-ai-ml-2026",
    slug: "breaking-into-ai-ml-2026",
    title: "Breaking into AI/ML in 2026: What Recruiters Actually Look For",
    excerpt: "Degrees vs. real production projects, Kaggle vs. deployment—understand the signals that matter most and how to build high-impact AI portfolios.",
    content: `The Artificial Intelligence and Machine Learning industry has matured rapidly. While foundational math remains essential, industry recruiters prioritize engineers who can deploy, monitor, and cost-optimize real-world AI applications.

1. Shift from Toy Notebooks to Production Pipelines
A Jupyter notebook with 95% accuracy on MNIST or Titanic is no longer enough. Stand out by building end-to-end applications:
- Data ingestion and automated feature pipelines.
- Vector database integration (Pinecone, Chroma, pgvector) with hybrid semantic search.
- Retrieval-Augmented Generation (RAG) pipelines with citation verification and hallucination guards.
- Fast API inference endpoints with streaming responses and rate limiting.

2. Mastering LLM Orchestration and Agents
Understand function calling, structured JSON output extraction, multi-agent orchestration, and context window caching. Know when to prompt-engineer, when to use few-shot examples, and when fine-tuning is actually necessary.

3. Evaluation and Observability
Demonstrate how you evaluate AI models using LLM-as-a-judge frameworks, latency profiling, and cost tracking per token. Companies need engineers who can keep AI architectures reliable and within budget.`,
    category: "AI/ML",
    readTime: 9,
    date: "2025-11-18",
    author: "Priya Desai",
    tags: ["AI/ML", "Careers", "LLMs", "Data Science"],
    cover: "/images/articles/aiml-career.jpg",
  },
  {
    id: "cyber-security-foundations",
    slug: "cyber-security-foundations",
    title: "Cyber Security Foundations: Threats, Tools, and Best Practices",
    excerpt: "Understand modern attack vectors, essential defensive practices, OWASP Top 10 vulnerabilities, and how to secure web applications end-to-end.",
    content: `Security is not a feature you bolt on right before shipping—it must be baked into every layer of software architecture from day one.

1. Defending Against the OWASP Top 10
Understand the most critical web application vulnerabilities:
- Injection: Always use parameterized queries and ORMs/ODMs to prevent SQL and NoSQL injection.
- Broken Authentication: Store passwords with bcrypt/Argon2 with high salt rounds, enforce HttpOnly secure cookies, and implement multi-factor authentication.
- Cross-Site Scripting (XSS): Sanitize all user inputs and avoid dangerously setting raw HTML without sanitization libraries like DOMPurify.
- Cross-Site Request Forgery (CSRF): Use SameSite cookie attributes and anti-CSRF tokens for sensitive state-changing operations.

2. Content Security Policy (CSP) and Secure Headers
Implement strict HTTP response headers: Content-Security-Policy, Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff, and Referrer-Policy to protect client sessions against clickjacking and script injection.

3. Secrets and Environment Variable Hygiene
Never commit credentials, API keys, or private certificates to version control. Use secret management tools like Doppler, HashiCorp Vault, or encrypted platform environment variables with restricted access controls.`,
    category: "Cyber Security",
    readTime: 10,
    date: "2025-10-05",
    author: "Neha Kapoor",
    tags: ["Cyber Security", "OWASP", "Authentication", "InfoSec"],
    cover: "/images/articles/cyber-security.jpg",
  }
];

export const articleService = {
  // Get all articles with fast fallback
  async getAllArticles(params = {}) {
    try {
      const response = await api.get('/articles', { params, timeout: 3000 });
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return FALLBACK_ARTICLES;
    } catch (error) {
      console.warn('Backend unavailable, using fallback articles:', error.message);
      return FALLBACK_ARTICLES;
    }
  },

  // Get single article by ID or slug
  async getArticleById(id) {
    const fallback = FALLBACK_ARTICLES.find(
      (a) => (a._id || a.id || a.slug) === id || a.slug === id
    );

    try {
      const response = await api.get(`/articles/${id}`, { timeout: 3000 });
      if (response?.data) {
        return response.data;
      }
      return fallback || null;
    } catch (error) {
      return fallback || null;
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
