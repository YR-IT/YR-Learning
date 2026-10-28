const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getBanners,
  getInstructorBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require('../controllers/bannerController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Multer memory storage for handling form-data banner & instructor uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Promotional banners (public read, admin write)
router.get('/getbanner', getBanners);
router.post('/addbanner', protectAdmin, upload.any(), addBanner);
router.put('/updatebanner/:id', protectAdmin, upload.any(), updateBanner);
router.delete('/deletebanner/:id', protectAdmin, deleteBanner);

// Instructor mobile banners (public read, admin write)
router.get('/getinstructor', getInstructorBanners);
router.post('/addinstructor', protectAdmin, upload.any(), addInstructor);
router.put('/updateinstructor/:id', protectAdmin, upload.any(), updateInstructor);
router.delete('/deleteinstructor/:id', protectAdmin, deleteInstructor);

module.exports = router;
