const Article = require('../models/Article');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
const getAllArticles = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });
    return res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
};

// @desc    Get single article by ID or slug
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    let article;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(id);
    }
    if (!article) {
      article = await Article.findOne({ slug: id });
    }

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving article', error: error.message });
  }
};

// @desc    Create article
// @route   POST /api/articles
// @access  Private (Admin)
const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, category, readTime, date, author, tags, cover } = req.body;

    if (!title || !excerpt) {
      return res.status(400).json({ message: 'Title and excerpt are required' });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newArticle = await Article.create({
      title,
      slug,
      excerpt,
      content: content || '',
      category: category || 'General',
      readTime: readTime || 5,
      date: date || new Date().toISOString().split('T')[0],
      author: author || (req.admin ? req.admin.name : 'YR Team'),
      tags: tags || [],
      cover: cover || '/images/articles/react-performance.jpg',
    });

    return res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article: newArticle,
    });
  } catch (error) {
    console.error('Create article error:', error);
    return res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private (Admin)
const updateArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      article: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update article', error: error.message });
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private (Admin)
const deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete article', error: error.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
