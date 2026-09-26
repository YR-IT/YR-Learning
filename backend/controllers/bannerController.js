const Banner = require('../models/Banner');

// @desc    Get promotional banners
// @route   GET /api/banner/getbanner
// @access  Public
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ type: 'banner' });
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get instructor banners
// @route   GET /api/banner/getinstructor
// @access  Public
const getInstructorBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ type: 'instructor' });
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add banner
// @route   POST /api/banner/addbanner
// @access  Private (Admin)
const addBanner = async (req, res) => {
  try {
    const { title, image, type, link } = req.body;
    const banner = await Banner.create({
      title,
      image,
      type: type || 'banner',
      link: link || '',
    });
    return res.status(201).json({ success: true, banner });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete banner
// @route   DELETE /api/banner/deletebanner/:id
// @access  Private (Admin)
const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBanners,
  getInstructorBanners,
  addBanner,
  deleteBanner,
};
