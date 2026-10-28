const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'Technical Trainer',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      required: true,
      default: '/images/trainer1.jpg',
    },
    coAvatar: {
      type: String,
      default: '',
    },
    expertise: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    students: {
      type: String,
      default: '5,000+',
    },
    coursesCount: {
      type: Number,
      default: 5,
    },
    accent: {
      type: String,
      default: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    linkedin: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
