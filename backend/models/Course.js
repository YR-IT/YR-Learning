const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, default: '15:00' },
  videoUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  isFreePreview: { type: Boolean, default: false }
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
});

const chapterSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true }
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '/images/Digital-Marketing.jpg',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Development',
    },
    instructor: {
      type: mongoose.Schema.Types.Mixed, // Can be string "Jane Smith" or object { name, bio, avatar }
      default: 'YR Instructor',
    },
    duration: {
      type: Number,
      default: 12,
    },
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    badge: {
      type: String,
      default: 'Bestseller',
    },
    chapters: [chapterSchema],
    curriculum: {
      sections: [sectionSchema],
    },
    lessons: [lessonSchema],
    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
