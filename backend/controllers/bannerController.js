const Banner = require('../models/Banner');

// Helper to extract image from req.file or req.body
const extractImage = (req, fileFieldName = 'image') => {
  if (req.file && req.file.buffer) {
    return req.file.buffer.toString('base64');
  }
  if (req.body) {
    return req.body.image || req.body.banner || req.body[fileFieldName] || '';
  }
  return '';
};

// @desc    Get promotional banners
// @route   GET /api/banner/getbanner
// @access  Public
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ type: 'banner' }).sort({ createdAt: -1 });
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
    const banners = await Banner.find({ type: 'instructor' }).sort({ createdAt: -1 });
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add banner
// @route   POST /api/banner/addbanner
// @access  Admin
const addBanner = async (req, res) => {
  try {
    const { title, link, type } = req.body;
    const image = extractImage(req, 'banner');

    if (!image) {
      return res.status(400).json({ message: 'Banner image is required.' });
    }

    const banner = await Banner.create({
      title: title || 'Featured Banner',
      image,
      type: type || 'banner',
      link: link || '',
    });

    return res.status(201).json({ success: true, banner });
  } catch (error) {
    console.error('Error adding banner:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update banner
// @route   PUT /api/banner/updatebanner/:id
// @access  Admin
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    const newImage = extractImage(req, 'banner');

    const updateData = {};
    if (title) updateData.title = title;
    if (link !== undefined) updateData.link = link;
    if (newImage) updateData.image = newImage;

    const banner = await Banner.findByIdAndUpdate(id, updateData, { new: true });
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    return res.status(200).json({ success: true, banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete banner
// @route   DELETE /api/banner/deletebanner/:id
// @access  Admin
const deleteBanner = async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.status(200).json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add instructor banner
// @route   POST /api/banner/addinstructor
// @access  Admin
const addInstructor = async (req, res) => {
  try {
    const { name, about, title, link } = req.body;
    const image = extractImage(req, 'image');

    if (!image) {
      return res.status(400).json({ message: 'Instructor image is required.' });
    }

    const instructorBanner = await Banner.create({
      title: title || name || 'YR Instructor',
      name: name || title || 'YR Instructor',
      about: about || link || 'Expert Technical Instructor',
      link: link || about || '',
      image,
      type: 'instructor',
    });

    return res.status(201).json({ success: true, instructor: instructorBanner });
  } catch (error) {
    console.error('Error adding instructor banner:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update instructor banner
// @route   PUT /api/banner/updateinstructor/:id
// @access  Admin
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about, title, link } = req.body;
    const newImage = extractImage(req, 'image');

    const updateData = {};
    if (name) updateData.name = name;
    if (title || name) updateData.title = title || name;
    if (about) updateData.about = about;
    if (link || about) updateData.link = link || about;
    if (newImage) updateData.image = newImage;

    const updated = await Banner.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Instructor banner not found' });
    }

    return res.status(200).json({ success: true, instructor: updated });
  } catch (error) {
    console.error('Error updating instructor banner:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete instructor banner
// @route   DELETE /api/banner/deleteinstructor/:id
// @access  Admin
const deleteInstructor = async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Instructor banner not found' });
    }
    return res.status(200).json({ success: true, message: 'Instructor banner deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBanners,
  getInstructorBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};
