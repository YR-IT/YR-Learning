const express = require('express');
const router = express.Router();
const {
  getBanners,
  getInstructorBanners,
  addBanner,
  deleteBanner,
} = require('../controllers/bannerController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/getbanner', getBanners);
router.get('/getinstructor', getInstructorBanners);
router.post('/addbanner', protectAdmin, addBanner);
router.delete('/deletebanner/:id', protectAdmin, deleteBanner);

module.exports = router;
