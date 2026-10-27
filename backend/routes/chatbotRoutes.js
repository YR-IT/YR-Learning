const express = require('express');
const { generateReply } = require('../controllers/chatbotController');
const {
  chatbotPerMinuteLimiter,
  chatbotGeneralLimiter,
  validateChatbotInput,
} = require('../middleware/rateLimiter');

const router = express.Router();

// Protected with burst limiter, 10-minute quota limiter, and payload size validation
router.post(
  '/',
  chatbotPerMinuteLimiter,
  chatbotGeneralLimiter,
  validateChatbotInput,
  generateReply
);

module.exports = router;