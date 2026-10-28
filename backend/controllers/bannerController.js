const Banner = require('../models/Banner');
const cloudinary = require('../config/cloudinary');

// Helper to stream upload buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, folder = 'yr_elearning/banners') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// Helper to extract image from req.file or req.body and ensure Cloudinary URL
const extractAndUploadImage = async (req, fileFieldName = 'image', folder = 'yr_elearning/banners') => {
  const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;

  // 1. File uploaded from laptop via multipart/form-data
  if (file && file.buffer) {
    try {
      const secureUrl = await uploadBufferToCloudinary(file.buffer, folder);
      return secureUrl;
    } catch (err) {
      console.warn('Cloudinary upload warning (falling back to base64):', err.message);
      return file.buffer.toString('base64');
    }
  }

  // 2. Data in body (URL or base64)
  const bodyImg = req.body ? (req.body.image || req.body.banner || req.body[fileFieldName] || '') : '';
  if (!bodyImg) return '';

  // Already a Cloudinary or HTTPS URL
  if (bodyImg.startsWith('http://') || bodyImg.startsWith('https://')) {
    return bodyImg;
  }

  // Base64 data URI
  if (bodyImg.startsWith('data:image')) {
    try {
      const res = await cloudinary.uploader.upload(bodyImg, { folder });
      return res.secure_url;
    } catch (err) {
      console.warn('Cloudinary base64 upload failed:', err.message);
      return bodyImg;
    }
  }

  return bodyImg;
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

// @desc    Add banner (uploads to Cloudinary)
// @route   POST /api/banner/addbanner
// @access  Admin
const addBanner = async (req, res) => {
  try {
    const { title, link, type } = req.body;
    const image = await extractAndUploadImage(req, 'banner', 'yr_elearning/banners');

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

// @desc    Update banner (uploads new image to Cloudinary if provided)
// @route   PUT /api/banner/updatebanner/:id
// @access  Admin
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;
    const newImage = await extractAndUploadImage(req, 'banner', 'yr_elearning/banners');

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

// @desc    Add instructor banner (uploads to Cloudinary)
// @route   POST /api/banner/addinstructor
// @access  Admin
const addInstructor = async (req, res) => {
  try {
    const { name, about, title, link } = req.body;
    const image = await extractAndUploadImage(req, 'image', 'yr_elearning/instructors');

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
    const newImage = await extractAndUploadImage(req, 'image', 'yr_elearning/instructors');

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
