import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import articleService from '../services/articleService';
import './ManageArticles.css';

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  date: '',
  category: 'Data Structures and Algorithms in Java',
  readTime: 5,
  author: 'YR Learning',
  tags: 'Java, DSA',
  cover: '',
};

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    try {
      setArticles(await articleService.getAllArticles());
    } catch (error) {
      toast.error('Could not load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const articleData = {
        ...form,
        readTime: Number(form.readTime),
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        cover: form.cover.trim() || undefined,
        date: form.date || undefined,
      };
      if (editingArticle) {
        await articleService.updateArticle(editingArticle._id || editingArticle.id, articleData);
      } else {
        await articleService.createArticle(articleData);
      }
      setForm(initialForm);
      setEditingArticle(null);
      toast.success(editingArticle ? 'Article updated.' : 'Article added.');
      await fetchArticles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add article.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setForm({
      title: article.title || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      date: article.date || '',
      category: article.category || '',
      readTime: article.readTime || 5,
      author: article.author || '',
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
      cover: article.cover || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setForm(initialForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article? This cannot be undone.')) return;
    try {
      await articleService.deleteArticle(id);
      setArticles((current) => current.filter((article) => (article._id || article.id) !== id));
      if ((editingArticle?._id || editingArticle?.id) === id) cancelEdit();
      toast.success('Article deleted.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete article.');
    }
  };

  return (
    <section className="manage-articles-admin space-y-8">
      <header className="articles-admin-header">
        <div>
          <p className="admin-eyebrow">EDITORIAL</p>
          <h1>Articles</h1>
          <p>Publish Java data structures and algorithms guides for learners.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 bg-white border border-gray-200 rounded-md p-6">
        <h2 className="text-lg font-semibold text-gray-900">{editingArticle ? 'Edit article' : 'Add an article'}</h2>
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input name="title" value={form.title} onChange={updateField} required className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Summary
          <textarea name="excerpt" value={form.excerpt} onChange={updateField} required rows="2" className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Article content
          <textarea name="content" value={form.content} onChange={updateField} rows="8" className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Publish date
            <input name="date" type="date" value={form.date} onChange={updateField} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Category
            <input name="category" value={form.category} onChange={updateField} required className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Author
            <input name="author" value={form.author} onChange={updateField} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Read time (minutes)
            <input name="readTime" type="number" min="1" value={form.readTime} onChange={updateField} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
            <input name="tags" value={form.tags} onChange={updateField} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Cover image URL
          <input name="cover" type="url" value={form.cover} onChange={updateField} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
        </label>
        <button disabled={saving} className="rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
          {saving ? 'Adding…' : 'Add article'}
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Published articles <span className="articles-count">{articles.length}</span></h2>
        {loading ? <p className="text-gray-600">Loading articles…</p> : articles.length === 0 ? (
          <p className="text-gray-600">No articles have been added yet.</p>
        ) : (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {articles.map((article) => {
              const id = article._id || article.id;
              return (
                <div key={id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{article.title}</h3>
                    {saving ? 'Saving…' : editingArticle ? 'Save changes' : 'Add article'}
                  </div>
                  {editingArticle && <button type="button" onClick={cancelEdit} disabled={saving} className="ml-2 rounded border border-gray-300 px-4 py-2 font-semibold text-gray-700">Cancel</button>}
                  <div className="flex items-center gap-4">
                    <Link to={`/articles/${article.slug || id}`} className="text-sm font-medium text-blue-700 hover:underline">Open</Link>
                    {id && <button onClick={() => handleEdit(article)} className="text-sm font-medium text-gray-700 hover:underline">Edit</button>}
                    {id && <button onClick={() => handleDelete(id)} className="text-sm font-medium text-red-700 hover:underline">Delete</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}