const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Submit new course enrollment form
// @route   POST /api/enrollments or POST /api/course/enroll
// @access  Public
const submitEnrollment = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      gender,
      city,
      currentStatus,
      currentProfessionOrCourse,
      institutionOrCompany,
      courseEnrolledFor,
      mode,
      expectations,
      couponCode,
      comments,
      declarationConfirmed,
    } = req.body;

    // Validation
    if (!name || !email || !phoneNumber || !gender || !city || !currentStatus || 
        !currentProfessionOrCourse || !institutionOrCompany || !courseEnrolledFor || 
        !mode || !expectations) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields indicated with an asterisk (*).',
      });
    }

    if (declarationConfirmed !== true && declarationConfirmed !== 'true') {
      return res.status(400).json({
        success: false,
        message: 'You must confirm the declaration to complete enrollment.',
      });
    }

    const newEnrollment = await Enrollment.create({
      name,
      email,
      phoneNumber,
      gender,
      city,
      currentStatus,
      currentProfessionOrCourse,
      institutionOrCompany,
      courseEnrolledFor,
      mode,
      expectations,
      couponCode: couponCode || '',
      comments: comments || '',
      declarationConfirmed: true,
      status: 'Pending',
    });

    // Optionally increment students count on corresponding course if title matches
    try {
      await Course.findOneAndUpdate(
        { title: new RegExp(courseEnrolledFor.split(' ')[0], 'i') },
        { $inc: { students: 1 } }
      );
    } catch (courseErr) {
      // Non-critical, continue
    }

    return res.status(201).json({
      success: true,
      message: 'Enrollment form submitted successfully! Our team will contact you with batch details soon.',
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error('Enrollment submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit enrollment form. Please try again.',
      error: error.message,
    });
  }
};

// @desc    Get all enrolled students (for admin panel)
// @route   GET /api/enrollments or GET /api/course/getstudents
// @access  Public or Protected
const getAllEnrollments = async (req, res) => {
  try {
    const { search, course, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { institutionOrCompany: { $regex: search, $options: 'i' } },
      ];
    }

    if (course && course !== 'All') {
      query.courseEnrolledFor = { $regex: course, $options: 'i' };
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const enrollments = await Enrollment.find(query).sort({ createdAt: -1 });

    // Format for backward compatibility with panel table
    const formatted = enrollments.map((enr) => ({
      _id: enr._id,
      id: enr._id,
      name: enr.name,
      email: enr.email,
      phoneNumber: enr.phoneNumber,
      gender: enr.gender,
      city: enr.city,
      currentStatus: enr.currentStatus,
      currentProfessionOrCourse: enr.currentProfessionOrCourse,
      institutionOrCompany: enr.institutionOrCompany,
      course: enr.courseEnrolledFor,
      courseEnrolledFor: enr.courseEnrolledFor,
      mode: enr.mode,
      expectations: enr.expectations,
      couponCode: enr.couponCode,
      comments: enr.comments,
      status: enr.status,
      enrolledDate: new Date(enr.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      createdAt: enr.createdAt,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Fetch enrollments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
      error: error.message,
    });
  }
};

// @desc    Get single enrollment by ID
// @route   GET /api/enrollments/:id
// @access  Private (Admin)
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    return res.status(200).json(enrollment);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enrollment status
// @route   PATCH /api/enrollments/:id/status
// @access  Private (Admin)
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      enrollment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private (Admin)
const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
};
