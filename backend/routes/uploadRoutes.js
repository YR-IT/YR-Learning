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

// @desc    Upload image to Cloudinary (from laptop file or base64 data URI)
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protectAdmin, upload.any(), async (req, res) => {
  try {
    const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;
    const folder = req.body.folder || 'yr_elearning';

    // 1. If physical file uploaded from laptop via FormData
    if (file && file.buffer) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary stream upload error:', error);
            return res.status(500).json({ message: 'Image upload failed', error: error.message });
          }
          return res.status(200).json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      return uploadStream.end(file.buffer);
    }

    // 2. If base64 data URI or image URL passed in body
    const bodyImage = req.body.image || req.body.file || req.body.cover || req.body.thumbnail;
    if (bodyImage && typeof bodyImage === 'string') {
      if (bodyImage.startsWith('http://') || bodyImage.startsWith('https://')) {
        return res.status(200).json({ success: true, url: bodyImage });
      }

      const result = await cloudinary.uploader.upload(bodyImage, {
        folder,
        resource_type: 'image',
      });

      return res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return res.status(400).json({ message: 'No image file or data provided for upload' });
  } catch (error) {
    console.error('Upload route error:', error);
    return res.status(500).json({ message: 'Server upload error', error: error.message });
  }
});

module.exports = router;
