const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseLessons,
  addLesson,
  updateLesson,
  deleteLesson,
  getStudents,
} = require('../controllers/courseController');
const { protectAdmin } = require('../middleware/authMiddleware');

const {
  submitEnrollment,
  getAllEnrollments,
} = require('../controllers/enrollmentController');

// Standard REST endpoints
router.get('/', getAllCourses);
router.post('/', protectAdmin, createCourse);

// Backward-compatible panel endpoints
router.get('/allcourses', getAllCourses);
router.post('/create', protectAdmin, createCourse);
router.put('/updatecourse/:id', protectAdmin, updateCourse);
router.delete('/deletecourse/:id', protectAdmin, deleteCourse);

// Lesson endpoints
router.get('/lessons/:courseId', getCourseLessons);
router.post('/addlessons/:courseId', protectAdmin, addLesson);
router.put('/updatelessons/:courseId', protectAdmin, updateLesson);
router.delete('/deletelessons/:courseId/:lessonId', protectAdmin, deleteLesson);

// Students & Enrollment
router.get('/getstudents', protectAdmin, getAllEnrollments);
router.post('/enroll', submitEnrollment);
router.post('/enroll/:courseId', submitEnrollment);

// Keep the parameterized route after all named routes.
router.get('/:id', getCourseById);

module.exports = router;
