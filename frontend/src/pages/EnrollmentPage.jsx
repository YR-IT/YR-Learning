import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Mail,
  User,
  Phone,
  MapPin,
  Building,
  Briefcase,
  BookOpen,
  Send,
  AlertCircle,
  Tag,
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import { submitEnrollment } from '../services/enrollmentService';
import { sendEnrollmentEmail } from '../services/emailService';

export default function EnrollmentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseParam = searchParams.get('course') || '';

  const initialForm = {
    name: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
    genderOther: '',
    city: '',
    currentStatus: 'Student',
    statusOther: '',
    currentProfessionOrCourse: '',
    institutionOrCompany: '',
    courseEnrolledFor: 'Data Structures and Algorithms in Java',
    courseOther: '',
    mode: 'Online',
    expectations: '',
    couponCode: '',
    comments: '',
    declarationConfirmed: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (courseParam) {
      const lower = courseParam.toLowerCase();
      if (lower.includes('data structure') || lower.includes('dsa') || lower.includes('java')) {
        setFormData(prev => ({ ...prev, courseEnrolledFor: 'Data Structures and Algorithms in Java' }));
      } else if (lower.includes('digital') || lower.includes('marketing') || lower.includes('seo')) {
        setFormData(prev => ({ ...prev, courseEnrolledFor: 'Digital Marketing and SEO' }));
      } else if (lower.includes('ai') || lower.includes('machine learning')) {
        setFormData(prev => ({ ...prev, courseEnrolledFor: 'AI and Machine Learning' }));
      } else if (lower.includes('web') || lower.includes('react') || lower.includes('full-stack') || lower.includes('javascript')) {
        setFormData(prev => ({ ...prev, courseEnrolledFor: 'Web Development' }));
      } else if (lower.includes('graphic') || lower.includes('video') || lower.includes('editing') || lower.includes('design')) {
        setFormData(prev => ({ ...prev, courseEnrolledFor: 'Graphic Designing and Video Editing' }));
      } else {
        setFormData(prev => ({ ...prev, courseEnrolledFor: courseParam }));
      }
    }
  }, [courseParam]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phoneNumber,
      gender,
      genderOther,
      city,
      currentStatus,
      statusOther,
      currentProfessionOrCourse,
      institutionOrCompany,
      courseEnrolledFor,
      courseOther,
      mode,
      expectations,
      couponCode,
      comments,
      declarationConfirmed,
    } = formData;

    if (!name.trim() || !email.trim() || !phoneNumber.trim() || !city.trim() ||
        !currentProfessionOrCourse.trim() || !institutionOrCompany.trim() || !expectations.trim()) {
      toast.error('Please fill in all required fields marked with *');
      return;
    }

    if (!declarationConfirmed) {
      toast.error('Please accept the declaration to proceed with enrollment.');
      return;
    }

    const finalGender = gender === 'Other' ? (genderOther.trim() || 'Other') : gender;
    const finalStatus = currentStatus === 'Other' ? (statusOther.trim() || 'Other') : currentStatus;
    const finalCourse = courseEnrolledFor === 'Other' ? (courseOther.trim() || 'Custom Training') : courseEnrolledFor;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      gender: finalGender,
      city: city.trim(),
      currentStatus: finalStatus,
      currentProfessionOrCourse: currentProfessionOrCourse.trim(),
      institutionOrCompany: institutionOrCompany.trim(),
      courseEnrolledFor: finalCourse,
      mode,
      expectations: expectations.trim(),
      couponCode: couponCode.trim(),
      comments: comments.trim(),
      declarationConfirmed: true,
    };

    try {
      setSubmitting(true);
      const res = await submitEnrollment(payload);
      setIsSuccess(true);
      setSubmittedData(res.enrollment || payload);
      toast.success('Enrollment submitted successfully!');

      // Send email notification/confirmation via EmailJS
      sendEnrollmentEmail(payload).catch((emailErr) => {
        console.warn('EmailJS notification warning:', emailErr);
      });
    } catch (err) {
      console.error('Enrollment error:', err);
      const msg = err.response?.data?.message || 'Failed to submit form. Please check your network and try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const coursesList = [
    'Data Structures and Algorithms in Java',
    'Digital Marketing and SEO',
    'AI and Machine Learning',
    'Web Development',
    'Graphic Designing and Video Editing',
    'Other',
  ];

  const statusOptions = ['Student', 'Working Professional', 'Freelancer', 'Other'];
  const genderOptions = ['Male', 'Female', 'Prefer not to say', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Card Container */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <GraduationCap size={28} className="text-yellow-300" />
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                Official Admission Form
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              YR IT Solutions Courses
            </h1>
            <p className="mt-2 text-base sm:text-lg text-blue-100 font-medium leading-relaxed max-w-2xl">
              Join us to master programming, build real world projects and shape your career in tech.
            </p>

            <div className="mt-5 p-3.5 rounded-xl bg-slate-950/40 border border-white/15 text-xs sm:text-sm text-blue-200 flex items-start gap-2.5">
              <AlertCircle size={18} className="text-yellow-300 flex-shrink-0 mt-0.5" />
              <span>
                Please fill out the form with accurate details. Once submitted, our team will contact you with further instructions and batch details.
              </span>
            </div>

            <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-purple-900/50 border border-purple-400/30 text-xs sm:text-sm text-purple-200 flex items-center gap-2.5">
              <Tag size={16} className="text-yellow-400 flex-shrink-0" />
              <span className="font-semibold text-yellow-300">Notice:</span>
              <span>Coupon code only available for PIET College students / USF / Government Institutes and Schools</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                  <CheckCircle size={44} />
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Enrollment Application Submitted!</h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-white">{submittedData?.name}</span>! We have received your application for{' '}
                    <span className="font-semibold text-indigo-400">{submittedData?.courseEnrolledFor}</span>.
                  </p>
                </div>

                <div className="p-5 bg-slate-800/80 border border-slate-700 rounded-2xl max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 text-slate-300">
                  <p><span className="text-slate-400 font-medium">Email:</span> {submittedData?.email}</p>
                  <p><span className="text-slate-400 font-medium">Phone:</span> {submittedData?.phoneNumber}</p>
                  <p><span className="text-slate-400 font-medium">Mode:</span> {submittedData?.mode}</p>
                  <p><span className="text-slate-400 font-medium">Institution / Company:</span> {submittedData?.institutionOrCompany}</p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => navigate('/courses')}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    Explore More Courses
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-xs text-rose-400 font-medium">* Indicates required question</p>

                {/* SECTION 1: Personal Details */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <User size={16} /> 1. Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        City <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Delhi, Panipat, Bangalore"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Gender <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {genderOptions.map((g) => (
                        <label
                          key={g}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.gender === g
                              ? 'bg-indigo-600/30 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={handleChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>

                    {formData.gender === 'Other' && (
                      <input
                        type="text"
                        name="genderOther"
                        placeholder="Please specify gender"
                        value={formData.genderOther}
                        onChange={handleChange}
                        className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    )}
                  </div>
                </div>

                {/* SECTION 2: Background */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={16} /> 2. Background & Status
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Current Status <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {statusOptions.map((s) => (
                        <label
                          key={s}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.currentStatus === s
                              ? 'bg-indigo-600/30 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="currentStatus"
                            value={s}
                            checked={formData.currentStatus === s}
                            onChange={handleChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>

                    {formData.currentStatus === 'Other' && (
                      <input
                        type="text"
                        name="statusOther"
                        placeholder="Please specify your status"
                        value={formData.statusOther}
                        onChange={handleChange}
                        className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Course / Profession Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentProfessionOrCourse"
                        required
                        placeholder="e.g. B.Tech CSE, BCA, Frontend Dev"
                        value={formData.currentProfessionOrCourse}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Institution / Company Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="institutionOrCompany"
                        required
                        placeholder="e.g. PIET College, USF, ABC Corp"
                        value={formData.institutionOrCompany}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Training & Preferences */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen size={16} /> 3. Training Details
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Course you are enrolling for <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {coursesList.map((c) => (
                        <label
                          key={c}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.courseEnrolledFor === c
                              ? 'bg-indigo-600/30 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="courseEnrolledFor"
                            value={c}
                            checked={formData.courseEnrolledFor === c}
                            onChange={handleChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>

                    {formData.courseEnrolledFor === 'Other' && (
                      <input
                        type="text"
                        name="courseOther"
                        placeholder="Specify the course name"
                        value={formData.courseOther}
                        onChange={handleChange}
                        className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Mode <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-xs">
                      {['Online', 'Offline'].map((m) => (
                        <label
                          key={m}
                          className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.mode === m
                              ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={m}
                            checked={formData.mode === m}
                            onChange={handleChange}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      What are your expectations from this training? <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      name="expectations"
                      required
                      placeholder="e.g. Gain hands-on project building experience, learn industry patterns, and prepare for placement interviews..."
                      value={formData.expectations}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Tag size={13} className="text-yellow-400" />
                        Coupon Code <span className="text-slate-500 text-[11px]">(Optional)</span>
                      </label>
                      <span className="text-[10px] text-amber-300/80">PIET / USF / Govt Institutes</span>
                    </div>
                    <input
                      type="text"
                      name="couponCode"
                      placeholder="Enter coupon code if applicable (e.g. PIET2026)"
                      value={formData.couponCode}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare size={13} />
                      Any Comments <span className="text-slate-500 text-[11px]">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      name="comments"
                      placeholder="Any specific timings, batch preferences, or questions for our team..."
                      value={formData.comments}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* SECTION 4: Declaration */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="declarationConfirmed"
                      checked={formData.declarationConfirmed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-900"
                    />
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      <strong className="text-white">Declaration*:</strong> I hereby confirm that all the above details are correct and I’m interested in joining the YR IT Solutions Training Programme.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Enrollment Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
