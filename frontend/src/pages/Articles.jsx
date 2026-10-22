import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Search, Sparkles, ArrowRight, Code, Award, Zap } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import articleService, { FALLBACK_ARTICLES } from "../services/articleService";

export default function Article() {
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
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
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 dark:border-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 dark:border-purple-600 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 dark:border-indigo-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-300 dark:border-pink-600 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: "url('/images/articles-hero.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent dark:from-gray-950/80 dark:via-gray-950/60 dark:to-gray-950/40 transition-colors duration-500 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            
            {/* Left Content */}
            <motion.div
              className="space-y-3.5 sm:space-y-5 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-white/20 bg-purple-50/90 dark:bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-purple-700 dark:text-white">
                <BookOpen size={15} />
                <span>Knowledge & Tech Research</span>
              </div>

              {/* Main Heading */}
              <motion.div
                className="space-y-2 sm:space-y-3"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Insights That</span>
                  <br />
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Power Your </span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Tech Knowledge
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-800 dark:text-gray-100 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium drop-shadow-sm">
                  Explore insightful architectural guides, practical tutorials, and expert tips across software engineering, AI, and modern web development.
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a
                  href="#articles-feed"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/40"
                >
                  <span>Explore Articles</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Reader Avatars */}
              <motion.div
                className="flex items-center gap-3 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/70 overflow-hidden"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${
                        i % 6 === 0 ? 'from-purple-400 to-pink-400' :
                        i % 6 === 1 ? 'from-blue-400 to-cyan-400' :
                        i % 6 === 2 ? 'from-green-400 to-emerald-400' :
                        i % 6 === 3 ? 'from-yellow-400 to-orange-400' :
                        i % 6 === 4 ? 'from-red-400 to-pink-400' :
                        'from-indigo-400 to-purple-400'
                      } flex items-center justify-center text-white font-bold text-sm`}>
                        {String.fromCharCode(65 + i - 1)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-gray-700 dark:text-gray-100 text-center lg:text-left">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">15,000+</span>
                  <span className="ml-2 text-xs sm:text-sm">Monthly Readers</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Visual Showcase */}
            <motion.div
              className="relative mt-8 lg:mt-0 flex flex-col items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-white/20 bg-white/85 dark:bg-gray-950/40 p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-colors duration-300">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-white/20 bg-purple-50/90 dark:bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-purple-700 dark:text-white"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Industry Research & Guides</span>
                </motion.div>
                <motion.div
                  className="mt-3.5 sm:mt-4 text-base sm:text-lg font-bold text-gray-900 dark:text-white"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  ⭐ 4.9/5 Rating <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-200">(Curated by Staff Engineers)</span>
                </motion.div>
              </div>

              {/* Feature Pills Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-lg mt-3">
                {[
                  { title: "System Design", icon: Code, color: "text-purple-600 dark:text-purple-400" },
                  { title: "Deep Dives", icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
                  { title: "Best Practices", icon: Award, color: "text-cyan-600 dark:text-cyan-400" },
                  { title: "AI Research", icon: Zap, color: "text-emerald-600 dark:text-emerald-400" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/85 dark:bg-gray-900/50 shadow-md backdrop-blur-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={heroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color} mb-1`} />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Search & Categories Bar */}
      <div id="articles-feed" className="mx-auto max-w-7xl px-4 mt-8 mb-6 space-y-4 sm:px-6 lg:px-8 relative z-10">
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

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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
