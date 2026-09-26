const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    currentStatus: {
      type: String,
      required: [true, 'Current status is required'],
      trim: true,
    },
    currentProfessionOrCourse: {
      type: String,
      required: [true, 'Course or Profession name is required'],
      trim: true,
    },
    institutionOrCompany: {
      type: String,
      required: [true, 'Institution or Company name is required'],
      trim: true,
    },
    courseEnrolledFor: {
      type: String,
      required: [true, 'Course you are enrolling for is required'],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, 'Mode is required (Online/Offline)'],
      enum: ['Online', 'Offline'],
      default: 'Online',
    },
    expectations: {
      type: String,
      required: [true, 'Expectations from this training are required'],
      trim: true,
    },
    couponCode: {
      type: String,
      trim: true,
      default: '',
    },
    comments: {
      type: String,
      trim: true,
      default: '',
    },
    declarationConfirmed: {
      type: Boolean,
      required: [true, 'Declaration confirmation is required'],
      default: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
