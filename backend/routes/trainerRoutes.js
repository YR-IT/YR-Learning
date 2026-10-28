const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Multer memory storage for handling avatar uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Public read routes
router.get('/', getTrainers);
router.get('/:id', getTrainerById);

// Protected admin write routes
router.post('/', protectAdmin, upload.any(), createTrainer);
router.put('/:id', protectAdmin, upload.any(), updateTrainer);
router.delete('/:id', protectAdmin, deleteTrainer);

module.exports = router;
