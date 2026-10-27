const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { loginLimiter, accountLockoutProtection } = require('../middleware/rateLimiter');

// Login route protected with IP-level rate limiting and account-level brute-force protection
router.post('/login', loginLimiter, accountLockoutProtection, adminLogin);
router.get('/me', protectAdmin, getAdminProfile);

module.exports = router;
