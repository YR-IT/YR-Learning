import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import articleService from '../services/articleService';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    articleService.getArticleById(articleId).then((result) => {
      if (active) setArticle(result);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [articleId]);

  if (loading) return <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-16 text-gray-600 dark:text-gray-300">Loading article…</main>;
  if (!article) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article not found</h1>
        <Link to="/articles" className="mt-4 inline-block text-blue-700 dark:text-blue-400 hover:underline">Back to articles</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-12 sm:px-8">
      <Link to="/articles" className="text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline">← All articles</Link>
      <article className="mt-8">
        {article.cover && <img src={article.cover} alt="" className="mb-8 max-h-[28rem] w-full object-cover" />}
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{article.category}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-950 dark:text-white sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">{article.excerpt}</p>
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{article.author} · {article.date} · {article.readTime} min read</p>
        <div className="mt-10 whitespace-pre-wrap border-t border-gray-200 pt-8 leading-8 text-gray-800 dark:border-gray-700 dark:text-gray-200">
          {article.content || article.excerpt}
        </div>
      </article>
    </main>
  );
}