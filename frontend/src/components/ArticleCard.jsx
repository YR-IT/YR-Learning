import { Clock, User, Calendar as CalendarIcon, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ArticleCard({ article, index = 0 }) {
  const {
    id,
    _id,
    title,
    excerpt,
    category,
    readTime,
    date,
    author,
    tags = [],
    cover
  } = article;

  const articleId = _id || id;

  return (
    <Link to={`/articles/${article.slug || articleId}`} className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={cover || "/images/articles/react-performance.jpg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/images/articles/react-performance.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600/90 text-white backdrop-blur shadow-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="inline-flex items-center gap-1">
              <CalendarIcon size={14} className="text-blue-500" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} className="text-purple-500" />
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">
            {excerpt}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between mt-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              {author ? author.charAt(0) : "Y"}
            </div>
            <span>{author}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            Read Article
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}
