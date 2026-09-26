const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      default: 'General',
    },
    readTime: {
      type: Number,
      default: 5,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    author: {
      type: String,
      default: 'YR Team',
    },
    tags: [
      {
        type: String,
      },
    ],
    cover: {
      type: String,
      default: '/images/articles/react-performance.jpg',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
