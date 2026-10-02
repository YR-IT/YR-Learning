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

// Multer memory storage for handling form-data banner & instructor uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Promotional banners
router.get('/getbanner', getBanners);
router.post('/addbanner', upload.single('banner'), addBanner);
router.put('/updatebanner/:id', upload.single('banner'), updateBanner);
router.delete('/deletebanner/:id', deleteBanner);

// Instructor mobile banners
router.get('/getinstructor', getInstructorBanners);
router.post('/addinstructor', upload.single('image'), addInstructor);
router.put('/updateinstructor/:id', upload.single('image'), updateInstructor);
router.delete('/deleteinstructor/:id', deleteInstructor);

module.exports = router;
