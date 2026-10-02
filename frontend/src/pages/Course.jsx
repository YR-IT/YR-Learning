import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourses } from "../data/courses";
import courseService from "../services/courseService";
import InstructorComponent from "../components/InstructorComponent";
import EnrollmentModal from "../components/EnrollmentModal";

import { motion } from "framer-motion";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Award, 
  BookOpen, 
  Download, 
  Share2, 
  Heart,
  CheckCircle,
  Globe,
  Smartphone,
  Trophy,
  Target,
  Zap,
  MessageCircle,
  ArrowRight,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  List,
  User,
  Monitor
} from "lucide-react";
import toast from "react-hot-toast";
export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        let foundCourse = await courseService.getCourseById(courseId);
        if (!foundCourse) {
          const courses = await getCourses();
          foundCourse = courses.find((c) => String(c._id) === String(courseId) || String(c.id) === String(courseId));
        }

        if (foundCourse) {
          setCourse(foundCourse);
        }
      } catch (err) {
        console.error("Error loading course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Course link copied to clipboard!");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div 
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading course...</p>
      </div>
    </div>
  );
  
  if (!course) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Course not found</h2>
        <p className="text-gray-600 dark:text-gray-300">The course you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const curriculumSections = course.curriculum?.sections?.length
    ? course.curriculum.sections
    : (course.chapters || []).map((chapter) => ({ ...chapter, lessons: [] }));
  const curriculumTopicCount = curriculumSections.reduce((total, section) => total + (section.lessons?.length || 0), 0);

  const courseFeatures = [
    { icon: BookOpen, title: "Curriculum", value: `${curriculumTopicCount} topics`, color: "text-red-500" },
    { icon: Clock, title: "Duration", value: course.duration ? `${course.duration} days` : "12+ hours", color: "text-blue-500" },
    { icon: Users, title: "Students", value: "5,000+", color: "text-green-500" },
    { icon: Award, title: "Certificate", value: "Included", color: "text-purple-500" },
    { icon: Globe, title: "Language", value: course.language || "Hindi + English", color: "text-orange-500" },
    { icon: Monitor, title: "Mode", value: course.mode || "100% Online", color: "text-emerald-500" }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {course.badge || "Bestseller"}
                </span>
                <span className="bg-emerald-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-sm">
                  🌐 100% Online
                </span>
                <span className="bg-indigo-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-sm">
                  🗣️ Hindi + English
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{course.rating || 4.9}</span>
                  <span className="text-gray-300">({(course.students || 5000).toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white">5,000+ students</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-white">Rs. {course.price}</span>
                <span className="text-lg text-gray-300 line-through">Rs. {Math.round(course.price * 1.5)}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  33% OFF
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayCircle className="w-5 h-5" />
                  Enroll Now
                </motion.button>
                
                <motion.button
                  onClick={handleLike}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isLiked 
                      ? "bg-red-500 text-white" 
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Saved' : 'Save'}
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={course.image || course.thumbnail
                    ? (/^(data:|https?:\/\/|\/)/.test(course.image || course.thumbnail)
                      ? course.image || course.thumbnail
                      : `data:image/jpeg;base64,${course.image || course.thumbnail}`)
                    : "/images/Digital-Marketing.jpg"}
                  alt={course.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Top Rated</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Updated 2024</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {courseFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <feature.icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{feature.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Curriculum Section */}
            <section id="curriculum" className="scroll-mt-20">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <List className="w-8 h-8 text-blue-600" />
                  Course Curriculum
                </h2>
                {curriculumSections.length ? (
                  <div className="space-y-4">
                    {curriculumSections.map((section, sectionIndex) => (
                      <div key={section._id || section.id || sectionIndex} className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{sectionIndex + 1}. {section.title}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{section.lessons?.length || 0} topics</span>
                        </div>
                        {section.lessons?.length > 0 && (
                          <ol className="mt-3 ml-5 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lesson._id || lessonIndex}>{typeof lesson === 'string' ? lesson : lesson.title}</li>
                            ))}
                          </ol>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">Curriculum details will be added soon.</p>
                )}
              </div>
            </section>

            {/* Instructor Section */}
            <section id="instructor" className="scroll-mt-20">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight transition-all duration-300">
                  Meet Your Instructor
                </h2>
              </div>
              <InstructorComponent courseTitle={course.title} />
            </section>

            {/* Reviews Section */}
       
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Card */}
              <motion.div
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">Rs. {course.price}</span>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">One-time payment</p>
                  </div>
                  
                  <motion.button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl mb-4 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enroll Now
                  </motion.button>
                  
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    30-day money-back guarantee
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Full lifetime access</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Access on mobile and TV</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Certificate of completion</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Course Stats */}
              <motion.div
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300">Rating</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">Students</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">12,543</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">12+ hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700 dark:text-gray-300">Lessons</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{curriculumTopicCount}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Enrollment Modal */}
      {course && (
        <EnrollmentModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          preselectedCourse={course.title}
        />
      )}
    </div>
  );
}