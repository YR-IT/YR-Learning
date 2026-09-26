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
router.get('/:id', getCourseById);
router.put('/:id', protectAdmin, updateCourse);
router.delete('/:id', protectAdmin, deleteCourse);

// Backward-compatible panel endpoints
router.get('/allcourses', getAllCourses);
router.post('/create', createCourse);
router.put('/updatecourse/:id', updateCourse);
router.delete('/deletecourse/:id', deleteCourse);

// Lesson endpoints
router.get('/lessons/:courseId', getCourseLessons);
router.post('/addlessons/:courseId', addLesson);
router.put('/updatelessons/:courseId', updateLesson);
router.delete('/deletelessons/:courseId/:lessonId', deleteLesson);

// Students & Enrollment
router.get('/getstudents', getAllEnrollments);
router.post('/enroll', submitEnrollment);
router.post('/enroll/:courseId', submitEnrollment);

module.exports = router;
