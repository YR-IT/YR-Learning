const Course = require('../models/Course');
const mongoose = require('mongoose');

const slugify = (text) =>
  text
    ? text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    : '';

// @desc    Get all courses
// @route   GET /api/courses or /api/course/allcourses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'instructor.name': { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

// @desc    Get course by ID or Slug
// @route   GET /api/courses/:id or /api/course/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const param = req.params.id;
    let course = null;

    if (mongoose.Types.ObjectId.isValid(param)) {
      course = await Course.findById(param);
    }

    if (!course) {
      course = await Course.findOne({ slug: param.toLowerCase() });
    }

    if (!course) {
      const normalizedTitle = param.replace(/-/g, ' ');
      course = await Course.findOne({
        title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') }
      });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
};

// @desc    Create course
// @route   POST /api/courses or /api/course/create
// @access  Private (Admin)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      price,
      category,
      instructor,
      duration,
      badge,
      chapters,
      curriculum,
      lessons,
    } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({ message: 'Title, description, and price are required' });
    }

    const newCourse = await Course.create({
      title,
      slug: req.body.slug || slugify(title),
      description,
      image: image || '/images/Digital-Marketing.jpg',
      price: Number(price),
      category: category || 'Development',
      instructor: instructor || 'YR Instructor',
      duration: duration || 10,
      badge: badge || 'New',
      chapters: chapters || [],
      curriculum: curriculum || { sections: [] },
      lessons: lessons || [],
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    console.error('Create course error:', error);
    return res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id or /api/course/updatecourse/:id
// @access  Private (Admin)
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updateData = { ...req.body };
    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }
    const updated = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id or /api/course/deletecourse/:id
// @access  Private (Admin)
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

// @desc    Get lessons for a course
// @route   GET /api/course/lessons/:courseId
// @access  Public
const getCourseLessons = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json(course.lessons || []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add lesson to a course
// @route   POST /api/course/addlessons/:courseId
// @access  Private (Admin)
const addLesson = async (req, res) => {
  try {
    const { title, duration, videoUrl, description } = req.body;
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newLesson = {
      title,
      duration: duration || '15:00',
      videoUrl: videoUrl || '',
      description: description || '',
    };

    course.lessons.push(newLesson);
    await course.save();

    return res.status(201).json({
      success: true,
      message: 'Lesson added successfully',
      lessons: course.lessons,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson
// @route   PUT /api/course/updatelessons/:courseId
// @access  Private (Admin)
const updateLesson = async (req, res) => {
  try {
    const { lessonId, title, duration, videoUrl, description } = req.body;
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (title) lesson.title = title;
    if (duration) lesson.duration = duration;
    if (videoUrl !== undefined) lesson.videoUrl = videoUrl;
    if (description !== undefined) lesson.description = description;

    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      lessons: course.lessons,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/course/deletelessons/:courseId/:lessonId
// @access  Private (Admin)
const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.lessons.pull({ _id: lessonId });
    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      lessons: course.lessons,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrolled students list
// @route   GET /api/course/getstudents
// @access  Private (Admin)
const getStudents = async (req, res) => {
  try {
    // Return sample enrolled student summaries
    const courses = await Course.find().select('title students enrolledUsers');
    const students = [
      { id: '1', name: 'Aarav Sharma', email: 'aarav@example.com', course: 'Full Stack Web Development', enrolledDate: '2025-01-15' },
      { id: '2', name: 'Diya Patel', email: 'diya@example.com', course: 'Machine Learning & AI', enrolledDate: '2025-02-10' },
      { id: '3', name: 'Rohan Gupta', email: 'rohan@example.com', course: 'Data Structures & Algorithms', enrolledDate: '2025-03-01' },
      { id: '4', name: 'Sneha Verma', email: 'sneha@example.com', course: 'DevOps & Cloud Engineering', enrolledDate: '2025-03-12' },
    ];
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
