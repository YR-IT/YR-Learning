const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', protectAdmin, createArticle);
router.put('/:id', protectAdmin, updateArticle);
router.delete('/:id', protectAdmin, deleteArticle);

module.exports = router;
