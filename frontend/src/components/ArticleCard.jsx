import { Clock, Calendar as CalendarIcon, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const {
    id,
    _id,
    slug,
    title,
    excerpt,
    category,
    readTime,
    date,
    author,
    tags = [],
    cover
  } = article;

  const targetSlug = slug || _id || id;

  return (
    <Link 
      to={`/articles/${targetSlug}`} 
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
    >
      <article className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-800 shrink-0">
          <img
            src={cover || "/images/articles/react-performance.jpg"}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/images/articles/react-performance.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60" />
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600/90 text-white backdrop-blur shadow-sm">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-2.5">
              <span className="inline-flex items-center gap-1">
                <CalendarIcon size={13} className="text-blue-400" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} className="text-purple-400" />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 sm:line-clamp-3 mb-4 leading-relaxed">
              {excerpt}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-300 border border-gray-700/60"
                  >
                    <Tag size={10} className="text-gray-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3.5 border-t border-gray-800/80 flex items-center justify-between mt-auto">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-300">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                {author ? author.charAt(0) : "Y"}
              </div>
              <span className="truncate max-w-[120px]">{author}</span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              Read
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
