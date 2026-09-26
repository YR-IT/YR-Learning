const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protectAdmin } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protectAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert buffer to stream upload
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'yr_elearning',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Image upload failed', error: error.message });
        }
        return res.status(200).json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload route error:', error);
    return res.status(500).json({ message: 'Server upload error', error: error.message });
  }
});

module.exports = router;
