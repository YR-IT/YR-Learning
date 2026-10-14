import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Sparkles } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import articleService, { FALLBACK_ARTICLES } from "../services/articleService";
import { useTheme } from "../contexts/ThemeContext";

export default function Article() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const data = await articleService.getAllArticles();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      } catch (err) {
        console.error("Failed to load articles:", err);
      }
    };

    fetchArticles();
    return () => { isMounted = false; };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category).filter(Boolean)));
    return ["All", ...unique];
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.title?.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCat && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      {/* Header Visual Banner Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-gray-800 transition-all duration-500"
        >
          {/* Mobile View (< md): Custom 4:3 high-res composition */}
          <div
            className="block md:hidden w-full aspect-[4/3] bg-cover bg-center transition-all duration-500 relative"
            style={{
              backgroundImage: `url('${theme === 'dark' ? '/images/articles-hero-mobile.jpg' : '/images/articles-hero-mobile-light.jpg'}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/30 to-transparent flex flex-col justify-end p-5 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/80 text-white text-xs font-semibold backdrop-blur-md w-fit mb-2 shadow-lg">
                <BookOpen size={13} />
                <span>Knowledge & Research</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                Articles & Guides
              </h1>
              <p className="text-xs text-slate-200 mt-1 max-w-xs drop-shadow line-clamp-2">
                Deep dives on full-stack web, AI, cloud engineering, and career tips.
              </p>
            </div>
          </div>

          {/* Desktop View (>= md): Full panoramic wide landscape composition */}
          <div
            className="hidden md:flex w-full min-h-[400px] lg:min-h-[460px] bg-cover bg-center transition-all duration-500 relative items-end"
            style={{
              backgroundImage: `url('${theme === 'dark' ? '/images/articles-hero.jpg' : '/images/articles-hero-light.jpg'}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent flex flex-col justify-end p-8 lg:p-12 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/85 text-white text-xs font-semibold backdrop-blur-md w-fit mb-3 shadow-lg">
                <BookOpen size={15} />
                <span>Insights, Engineering Guides & Tutorials</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                Articles & Tech Guides
              </h1>
              <p className="text-sm lg:text-base text-slate-200 mt-2 max-w-2xl drop-shadow leading-relaxed">
                Explore insightful architectural guides, practical tutorials, and expert tips across software engineering, AI, and modern web development.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Categories Bar */}
        <div className="mt-8 mb-6 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, tags..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-gray-800 bg-white dark:bg-gray-900/90 text-slate-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  category === c
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30"
                    : "bg-white dark:bg-gray-900/90 text-slate-700 dark:text-gray-400 border-slate-300 dark:border-gray-800 hover:border-blue-400 dark:hover:border-gray-700 hover:text-blue-600 dark:hover:text-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-4 border border-gray-800 animate-pulse">
                <div className="w-full aspect-video bg-gray-800 rounded-xl mb-4" />
                <div className="h-4 bg-gray-800 rounded w-1/3 mb-2" />
                <div className="h-6 bg-gray-800 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-800 rounded w-full mb-2" />
                <div className="h-4 bg-gray-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800 mt-4">
            <Sparkles className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No articles found</h3>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search terms or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filtered.map((article, idx) => (
              <ArticleCard key={article._id || article.id || article.slug || idx} article={article} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
