const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/me', protectAdmin, getAdminProfile);

module.exports = router;
