import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import articleService, { FALLBACK_ARTICLES } from '../services/articleService';
import toast from 'react-hot-toast';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(() => {
    return FALLBACK_ARTICLES.find(
      (a) => (a.slug === articleId || a.id === articleId || a._id === articleId)
    ) || null;
  });
  const [loading, setLoading] = useState(!article);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;

    articleService.getArticleById(articleId).then((result) => {
      if (isMounted && result) {
        setArticle(result);
      }
    }).finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => { isMounted = false; };
  }, [articleId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied!");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-pulse space-y-6">
          <div className="h-6 bg-gray-800 rounded w-28" />
          <div className="h-10 bg-gray-800 rounded w-3/4" />
          <div className="h-6 bg-gray-800 rounded w-1/2" />
          <div className="h-72 bg-gray-800 rounded-2xl w-full" />
          <div className="space-y-3 pt-6">
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-5/6" />
            <div className="h-4 bg-gray-800 rounded w-4/6" />
          </div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center py-16">
          <div className="text-4xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-white mb-2">Article Not Found</h1>
          <p className="text-gray-400 text-sm mb-6">
            The article you are looking for might have been moved or doesn't exist.
          </p>
          <Link 
            to="/articles" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  // Format content paragraphs
  const contentText = article.content || article.excerpt;
  const paragraphs = contentText.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={16} /> All Articles
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-xs font-medium text-gray-300 transition-colors"
          >
            <Share2 size={13} /> Share
          </button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-semibold text-blue-400 mb-4">
            {article.category}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 font-normal">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-400 pt-2 border-t border-gray-900">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {article.author ? article.author.charAt(0) : 'Y'}
              </div>
              <span className="text-gray-200 font-medium">{article.author || 'YR Team'}</span>
            </div>

            <span className="text-gray-600">•</span>

            <span className="inline-flex items-center gap-1">
              <Calendar size={14} className="text-blue-400" />
              {article.date}
            </span>

            <span className="text-gray-600">•</span>

            <span className="inline-flex items-center gap-1">
              <Clock size={14} className="text-purple-400" />
              {article.readTime} min read
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {article.cover && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900 max-h-[28rem]">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-full object-cover max-h-[28rem]"
              onError={(e) => {
                e.currentTarget.src = "/images/articles/react-performance.jpg";
              }}
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-invert max-w-none space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
          {paragraphs.map((p, i) => {
            const trimmed = p.trim();
            // Check if heading / numbered point
            if (/^\d+\./.test(trimmed)) {
              const lines = trimmed.split('\n');
              const heading = lines[0];
              const rest = lines.slice(1).join(' ');
              return (
                <div key={i} className="pt-4 pb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {heading}
                  </h2>
                  {rest && <p className="text-gray-300 leading-relaxed">{rest}</p>}
                </div>
              );
            }
            return (
              <p key={i} className="leading-relaxed whitespace-pre-wrap">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 mr-2">Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 text-gray-300"
              >
                <Tag size={11} className="text-blue-400" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-purple-950/60 border border-blue-900/40 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Ready to master these skills?</h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
            Explore our hands-on tech courses designed by industry experts to boost your career.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 transition-all"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </main>
  );
}