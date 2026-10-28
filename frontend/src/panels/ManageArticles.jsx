import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import articleService from '../services/articleService';
import { API_BASE_URL } from '../services/api';
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [coverPreview, setCoverPreview] = useState('');

  const fetchArticles = async () => {
    try {
      setArticles(await articleService.getAllArticles());
    } catch {
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

  // Upload cover image directly from laptop to Cloudinary
  const handleCoverFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB.');
      e.target.value = '';
      return;
    }

    setCoverPreview(URL.createObjectURL(file));
    setUploadingImage(true);
    const toastId = toast.loading('Uploading cover to Cloudinary...');

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'yr_elearning/articles');

      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        throw new Error(data.message || 'Image upload failed');
      }

      setForm((prev) => ({ ...prev, cover: data.url }));
      setCoverPreview(data.url);
      toast.success('Cover uploaded to Cloudinary!', { id: toastId });
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      toast.error(err.message || 'Failed to upload cover to Cloudinary', { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploadingImage) {
      toast.error('Please wait for cover image to finish uploading to Cloudinary.');
      return;
    }
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
      setCoverPreview('');
      setEditingArticle(null);
      const fileInput = document.getElementById('cover-file');
      if (fileInput) fileInput.value = '';

      toast.success(editingArticle ? 'Article updated.' : 'Article added.');
      await fetchArticles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save article.');
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
    setCoverPreview(article.cover || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setForm(initialForm);
    setCoverPreview('');
    const fileInput = document.getElementById('cover-file');
    if (fileInput) fileInput.value = '';
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
          <p className="admin-eyebrow">EDITORIAL &amp; CONTENT</p>
          <h1 className="text-2xl font-bold text-gray-900">Manage Articles</h1>
          <p className="text-gray-600">Publish guides and tutorials with Cloudinary-hosted cover images.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">{editingArticle ? 'Edit article' : 'Add an article'}</h2>
        
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input name="title" value={form.title} onChange={updateField} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Summary / Excerpt
          <textarea name="excerpt" value={form.excerpt} onChange={updateField} required rows="2" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Article Content
          <textarea name="content" value={form.content} onChange={updateField} rows="8" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Publish Date
            <input name="date" type="date" value={form.date} onChange={updateField} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Category
            <input name="category" value={form.category} onChange={updateField} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Author
            <input name="author" value={form.author} onChange={updateField} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Read Time (minutes)
            <input name="readTime" type="number" min="1" value={form.readTime} onChange={updateField} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </label>
          <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
            Tags (comma-separated)
            <input name="tags" value={form.tags} onChange={updateField} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </label>
        </div>

        {/* Laptop File Upload to Cloudinary */}
        <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/70 space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            Cover Image (Upload from Laptop &rarr; Cloudinary)
          </label>
          <input
            id="cover-file"
            type="file"
            accept="image/*"
            onChange={handleCoverFileUpload}
            disabled={uploadingImage}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {uploadingImage && (
            <p className="text-xs text-blue-600 font-medium animate-pulse">Uploading directly to Cloudinary...</p>
          )}

          {coverPreview && (
            <div className="mt-3 relative inline-block">
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="h-32 w-auto max-w-full rounded-lg border border-gray-200 object-cover shadow-sm"
              />
              {form.cover && form.cover.includes('cloudinary.com') && (
                <span className="absolute bottom-2 left-2 text-[10px] bg-green-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow">
                  Cloudinary Hosted
                </span>
              )}
            </div>
          )}

          <label className="block text-xs text-gray-500 mt-2">
            Or direct Image URL:
            <input
              name="cover"
              type="text"
              value={form.cover}
              onChange={(e) => {
                updateField(e);
                setCoverPreview(e.target.value);
              }}
              placeholder="https://res.cloudinary.com/..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 bg-white"
            />
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploadingImage}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60 shadow-sm transition"
          >
            {saving ? 'Saving...' : editingArticle ? 'Update Article' : 'Publish Article'}
          </button>
          {editingArticle && (
            <button
              type="button"
              onClick={cancelEdit}
              disabled={saving}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Published Articles <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-1">{articles.length}</span>
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading articles…</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500">No articles have been added yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {articles.map((article) => {
              const id = article._id || article.id;
              return (
                <div key={id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    {article.cover && (
                      <img
                        src={article.cover}
                        alt=""
                        className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{article.title}</h3>
                      <p className="text-xs text-gray-500">
                        {article.category} &bull; {article.readTime} min read
                        {article.cover && article.cover.includes('cloudinary.com') && (
                          <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded ml-2 font-medium">Cloudinary</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Link to={`/articles/${article.slug || id}`} className="text-blue-600 hover:underline font-medium">
                      View
                    </Link>
                    {id && (
                      <button onClick={() => handleEdit(article)} className="text-gray-700 hover:text-black font-medium">
                        Edit
                      </button>
                    )}
                    {id && (
                      <button onClick={() => handleDelete(id)} className="text-red-600 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    )}
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