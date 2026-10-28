const express = require('express');
const router = express.Router();
const {
  submitEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentStats,
} = require('../controllers/enrollmentController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public enrollment submission (prospective students)
router.post('/', submitEnrollment);

// Admin stats & earnings (placed before /:id) - Protected
router.get('/stats', protectAdmin, getEnrollmentStats);

// Admin retrieval & management - Protected
router.get('/', protectAdmin, getAllEnrollments);
router.get('/:id', protectAdmin, getEnrollmentById);
router.patch('/:id/status', protectAdmin, updateEnrollmentStatus);
router.delete('/:id', protectAdmin, deleteEnrollment);

module.exports = router;
