import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Sparkles,
  HelpCircle,
  ArrowRight,
  BookOpen,
  GraduationCap,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../services/emailService';

export default function Contact() {
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    subject: 'Course Inquiry',
    message: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const subjectOptions = [
    'Course Inquiry',
    'Enrollment Assistance',
    'Corporate & College Training',
    'Syllabus & Learning Roadmap',
    'Placement & Internship Guidance',
    'Other Inquiries',
  ];

  const contactCards = [
    {
      icon: Phone,
      title: 'Call / WhatsApp',
      value: '+91 7404890806',
      subtext: 'Mon-Sat from 9am to 7pm IST',
      actionUrl: 'tel:+917404890806',
      actionLabel: 'Call Now',
      whatsappUrl: 'https://wa.me/917404890806?text=Hi%20YR%20Learning%2C%20I%20have%20an%20inquiry%20regarding%20your%20courses.',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      icon: Mail,
      title: 'Official Email',
      value: 'yr.itsolutions.pvtltd@gmail.com',
      subtext: 'We respond within 24 business hours',
      actionUrl: 'mailto:yr.itsolutions.pvtltd@gmail.com',
      actionLabel: 'Send Email',
      gradient: 'from-indigo-600 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      value: 'Gurugram, Haryana, India',
      subtext: 'Tech Corridor & Innovation Hub',
      actionUrl: '',
      actionLabel: 'HQ Location',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      value: '9:00 AM - 7:00 PM IST',
      subtext: 'Live mentor support throughout the week',
      actionUrl: '/chatbot',
      actionLabel: 'Chat with AI 24/7',
      gradient: 'from-emerald-600 to-teal-600',
    },
  ];

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer:
        'You can browse our course catalog at any time, click on any course for its curriculum, and click "Enroll Now" or visit our official Admission page at /enroll. After submitting the enrollment form, our team will confirm your batch and schedule.',
    },
    {
      question: 'Are the training batches online or offline?',
      answer:
        'All our courses are completely online with live interactive sessions, class recordings, hands-on project repositories, and 1-on-1 mentor support in Hindi + English.',
    },
    {
      question: 'Do you offer college discounts or coupon codes?',
      answer:
        'Yes! We offer dedicated scholarship programs and institutional partner discounts for students of PIET College, USF, and accredited government technical colleges.',
    },
    {
      question: 'Will I receive a verified certificate upon completion?',
      answer:
        'Every student who successfully completes our training program, capstone projects, and code reviews receives an industry-recognized certificate of completion with verifiable credential IDs.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await sendContactEmail(formData);

      if (res.success || res.simulated) {
        setIsSuccess(true);
        toast.success('Your message has been sent successfully!');
      } else {
        toast.error('Could not send message. Please try again or reach out on WhatsApp.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      toast.error('Something went wrong. Please reach out via email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background Glows and Decorative Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-64 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Connect with YR Learning Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            We’d Love to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Have questions about our developer bootcamps, syllabi, batch timings, or corporate workshops?
            Reach out directly and our mentors will guide you every step of the way.
          </p>
        </motion.div>

        {/* 4 Cards Grid - Quick Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-base font-semibold text-white break-words">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {card.subtext}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <a
                    href={card.actionUrl}
                    target={card.actionUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
                  >
                    {card.actionLabel}
                    <ArrowRight size={13} />
                  </a>

                  {card.whatsappUrl && (
                    <a
                      href={card.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors font-medium"
                    >
                      <MessageCircle size={12} /> WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content: Form + Information Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Contact Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <MessageSquare className="text-indigo-400" size={24} />
                  Send an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill in your details and we’ll get back to you via email or phone.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium hidden sm:inline-block">
                EmailJS Powered
              </span>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You for Connecting!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  We have received your message regarding{' '}
                  <span className="text-indigo-400 font-semibold">{formData.subject}</span>. Our team
                  will review your inquiry and reach out to{' '}
                  <span className="text-white font-semibold">{formData.email}</span> shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData(initialForm);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                  <Link
                    to="/courses"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-opacity"
                  >
                    Explore Courses
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number <span className="text-slate-500 text-[11px]">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Topic */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Topic / Subject <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    >
                      {subjectOptions.map((subj, i) => (
                        <option key={i} value={subj} className="bg-slate-900 text-white">
                          {subj}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message / Question <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder="Tell us what you're looking for, which course interests you, or how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Sending Your Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Key Benefits, Direct Enrollment & Map (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Enroll Banner */}
            <div className="bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Ready to Start Learning?</h3>
                  <p className="text-xs text-indigo-200">Official Admissions are open for upcoming batches</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Skip general inquiries and submit your student admission application directly to secure your seat.
              </p>
              <Link
                to="/enroll"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Go to Admission Form</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Why Reach Out Highlights */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-400" />
                Why Connect With YR Learning?
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">1-on-1 Free Career Counseling</strong>
                    Speak with real engineers about tech stacks, salaries, and interview expectations.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">College & Training Partnerships</strong>
                    Special corporate and college programs with tailored training schedules.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Guaranteed Syllabus Roadmap</strong>
                    Curriculum built around React 19, Node.js, AI/ML, and production architectures.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
              <HelpCircle className="text-indigo-400" size={26} />
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Quick answers to common questions about admissions, batches, and curricula.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
