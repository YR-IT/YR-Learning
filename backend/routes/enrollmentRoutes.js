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

// Public enrollment submission
router.post('/', submitEnrollment);

// Admin stats & earnings (placed before /:id)
router.get('/stats', getEnrollmentStats);

// Admin retrieval & management
router.get('/', getAllEnrollments);
router.get('/:id', getEnrollmentById);
router.patch('/:id/status', updateEnrollmentStatus);
router.delete('/:id', deleteEnrollment);

module.exports = router;
