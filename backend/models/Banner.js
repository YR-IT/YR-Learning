const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['banner', 'instructor'],
      default: 'banner',
    },
    link: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);

