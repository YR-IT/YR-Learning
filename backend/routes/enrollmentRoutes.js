const express = require('express');
const router = express.Router();
const {
  submitEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
} = require('../controllers/enrollmentController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public enrollment submission
router.post('/', submitEnrollment);

// Admin retrieval & management
router.get('/', getAllEnrollments);
router.get('/:id', getEnrollmentById);
router.patch('/:id/status', updateEnrollmentStatus);
router.delete('/:id', deleteEnrollment);

module.exports = router;
