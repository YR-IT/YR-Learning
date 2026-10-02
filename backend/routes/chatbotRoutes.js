const express = require('express');
const { generateReply } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/', generateReply);

module.exports = router;