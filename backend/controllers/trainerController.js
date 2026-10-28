const Trainer = require('../models/Trainer');
const Banner = require('../models/Banner');
const cloudinary = require('../config/cloudinary');

// Helper to stream upload buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, folder = 'yr_elearning/trainers') => {
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
const extractAndUploadImage = async (req, fileFieldName = 'avatar', folder = 'yr_elearning/trainers') => {
  const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;

  // 1. File uploaded from multipart/form-data
  if (file && file.buffer) {
    try {
      const secureUrl = await uploadBufferToCloudinary(file.buffer, folder);
      return secureUrl;
    } catch (err) {
      console.warn('Cloudinary upload warning (falling back to base64):', err.message);
      return `data:${file.mimetype || 'image/jpeg'};base64,${file.buffer.toString('base64')}`;
    }
  }

  // 2. Data in body (URL or base64)
  const bodyImg = req.body ? (req.body.avatar || req.body.image || req.body[fileFieldName] || '') : '';
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

// Helper to parse comma-separated string or array
const parseArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string' && val.trim()) {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: 1 });
    return res.status(200).json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return res.status(500).json({ message: 'Failed to fetch trainers', error: error.message });
  }
};

// @desc    Get trainer by ID
// @route   GET /api/trainers/:id
// @access  Public
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json(trainer);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving trainer', error: error.message });
  }
};

// @desc    Create a new trainer
// @route   POST /api/trainers
// @access  Private (Admin)
const createTrainer = async (req, res) => {
  try {
    const {
      name,
      role,
      bio,
      rating,
      students,
      coursesCount,
      accent,
      linkedin,
      email,
      github,
      twitter,
      order,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Trainer name is required.' });
    }

    const avatarUrl = await extractAndUploadImage(req, 'avatar', 'yr_elearning/trainers');

    const expertise = parseArray(req.body.expertise);
    const tags = parseArray(req.body.tags || req.body.expertise);

    const newTrainer = await Trainer.create({
      name: name.trim(),
      role: (role && role.trim()) || 'Technical Trainer',
      bio: (bio && bio.trim()) || '',
      avatar: avatarUrl || '/images/trainer1.jpg',
      expertise: expertise.length > 0 ? expertise : ['Full Stack', 'Mentorship'],
      tags: tags.length > 0 ? tags : ['Technical Skills', 'Hands-on'],
      rating: Number(rating) || 4.9,
      students: students || '5,000+',
      coursesCount: Number(coursesCount) || 5,
      accent: accent || 'from-blue-500 via-indigo-500 to-purple-500',
      linkedin: linkedin || '',
      email: email || '',
      github: github || '',
      twitter: twitter || '',
      order: Number(order) || 0,
      isActive: true,
    });

    // Also mirror into Banner collection for banner compatibility
    try {
      await Banner.create({
        name: newTrainer.name,
        title: newTrainer.name,
        about: newTrainer.bio || newTrainer.role,
        image: newTrainer.avatar,
        link: newTrainer.linkedin || '',
        type: 'instructor',
      });
    } catch (e) {
      console.warn('Mirror banner create warning:', e.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Trainer created successfully',
      trainer: newTrainer,
    });
  } catch (error) {
    console.error('Error creating trainer:', error);
    return res.status(500).json({ message: 'Failed to create trainer', error: error.message });
  }
};

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private (Admin)
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      bio,
      rating,
      students,
      coursesCount,
      accent,
      linkedin,
      email,
      github,
      twitter,
      order,
      isActive,
    } = req.body;

    const newAvatar = await extractAndUploadImage(req, 'avatar', 'yr_elearning/trainers');

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (role) updateData.role = role.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    if (rating !== undefined) updateData.rating = Number(rating);
    if (students !== undefined) updateData.students = students;
    if (coursesCount !== undefined) updateData.coursesCount = Number(coursesCount);
    if (accent) updateData.accent = accent;
    if (linkedin !== undefined) updateData.linkedin = linkedin;
    if (email !== undefined) updateData.email = email;
    if (github !== undefined) updateData.github = github;
    if (twitter !== undefined) updateData.twitter = twitter;
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = isActive === true || isActive === 'true';

    if (req.body.expertise) updateData.expertise = parseArray(req.body.expertise);
    if (req.body.tags) updateData.tags = parseArray(req.body.tags);
    if (newAvatar) updateData.avatar = newAvatar;

    const updated = await Trainer.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Mirror update in Banner collection if matching name
    try {
      const bannerUpdate = {};
      if (updated.name) bannerUpdate.name = updated.name;
      if (updated.name) bannerUpdate.title = updated.name;
      if (updated.bio) bannerUpdate.about = updated.bio;
      if (newAvatar) bannerUpdate.image = newAvatar;
      if (updated.linkedin) bannerUpdate.link = updated.linkedin;

      await Banner.findOneAndUpdate({ name: updated.name, type: 'instructor' }, bannerUpdate);
    } catch (e) {
      console.warn('Mirror banner update warning:', e.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Trainer updated successfully',
      trainer: updated,
    });
  } catch (error) {
    console.error('Error updating trainer:', error);
    return res.status(500).json({ message: 'Failed to update trainer', error: error.message });
  }
};

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private (Admin)
const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Trainer.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Also remove from Banner collection
    try {
      await Banner.findOneAndDelete({ name: deleted.name, type: 'instructor' });
    } catch (e) {
      console.warn('Mirror banner delete warning:', e.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Trainer deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    return res.status(500).json({ message: 'Failed to delete trainer', error: error.message });
  }
};

module.exports = {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
