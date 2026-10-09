import CourseCard from "../components/CourseCard";
import AdvertisementBanner from "../components/AdvertisementBanner";
import InstructorShowcase from "../components/InstructorShowcase";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import courseService from "../services/courseService";
import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Search, Filter, TrendingUp, Users, Award, Clock, Code, BookOpen, FileText, Zap, Globe, Target, Play, Video, Trophy, Briefcase, Wrench, FolderOpen, Monitor, Book } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const found_courses = await courseService.getAllCourses();
        if (Array.isArray(found_courses)) {
          setCourses(found_courses);
          const uniqueInstructors = Object.values(
            found_courses.reduce((acc, course) => {
              const instName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name;
              if (instName && !acc[instName]) {
                acc[instName] = course.instructor;
              }
              return acc;
            }, {})
          );
          setInstructors(uniqueInstructors);
        }
      } catch (err) {
        console.error("Failed to fetch courses from backend:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setIsVisible(true);
  }, []);

  const categories = ["All", ...new Set(courses.map(course => course.category))];
  const featuredCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    const featured = courses.filter(
      (c) => c.badge === "Bestseller" || c.badge === "Featured" || c.badge === "Top Rated" || c.isFeatured === true
    );
    if (featured.length >= 3) return featured.slice(0, 3);
    return courses.slice(0, 3);
  }, [courses]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      toast.success(`Found ${filteredCourses.length} courses matching "${value}"`);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== "All") {
      const categoryCount = courses.filter(course => course.category === category).length;
      toast.success(`Showing ${categoryCount} ${category} courses`);
    } else {
      toast.success("Showing all courses");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 dark:border-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 dark:border-purple-600 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 dark:border-indigo-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-300 dark:border-pink-600 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('/images/${theme === 'dark' ? 'hero-tech.jpg' : 'hero-tech-light.jpg'}')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent dark:from-gray-950/80 dark:via-gray-950/60 dark:to-gray-950/40 transition-colors duration-500 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Heading */}
              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Master Skills That</span>
                  <br />
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Define Your </span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Future Career
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-100 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium drop-shadow-sm">
                  Transform your career with expert-led courses, hands-on projects, and industry-recognized certifications from top professionals.
                </p>
              </motion.div>

              {/* Student Avatars */}
              <motion.div
                className="flex items-center gap-3 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/70 overflow-hidden"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${
                        i % 6 === 0 ? 'from-purple-400 to-pink-400' :
                        i % 6 === 1 ? 'from-blue-400 to-cyan-400' :
                        i % 6 === 2 ? 'from-green-400 to-emerald-400' :
                        i % 6 === 3 ? 'from-yellow-400 to-orange-400' :
                        i % 6 === 4 ? 'from-red-400 to-pink-400' :
                        'from-indigo-400 to-purple-400'
                      } flex items-center justify-center text-white font-bold text-sm`}>
                        {String.fromCharCode(65 + i - 1)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-gray-700 dark:text-gray-100 text-center lg:text-left">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">5,000+</span>
                  <span className="ml-2 text-xs sm:text-sm">Students Enrolled</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Visual Showcase */}
            <motion.div
              className="relative mt-8 lg:mt-0 flex flex-col items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-full max-w-lg rounded-3xl border border-gray-200/80 dark:border-white/20 bg-white/85 dark:bg-gray-950/40 p-5 sm:p-7 shadow-2xl backdrop-blur-md transition-colors duration-300">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-white/20 bg-purple-50/90 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-white"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Tech Mentorship</span>
                </motion.div>
                <motion.div
                  className="mt-5 text-lg font-bold text-gray-900 dark:text-white"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  ⭐ 4.9/5 Rating <span className="text-sm font-medium text-gray-600 dark:text-gray-200">(12k+ Reviews)</span>
                </motion.div>
              </div>

              {/* Feature Pills Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg mt-4">
                {[
                  { title: "Live Classes", icon: Video, color: "text-purple-600 dark:text-purple-400" },
                  { title: "Hackathons", icon: Trophy, color: "text-blue-600 dark:text-blue-400" },
                  { title: "Real Projects", icon: FolderOpen, color: "text-cyan-600 dark:text-cyan-400" },
                  { title: "Certificates", icon: Award, color: "text-emerald-600 dark:text-emerald-400" },
                ].map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="bg-white/90 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-200/80 dark:border-white/20 rounded-xl p-2.5 flex items-center gap-2 shadow-sm transition-colors duration-300"
                  >
                    <feat.icon size={16} className={feat.color} />
                    <span className="text-xs font-semibold text-gray-800 dark:text-white truncate">{feat.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 relative z-10">
        
        {/* Featured Courses Section */}
        <motion.div 
          className="mb-8 mt-0 relative sm:mb-14 lg:mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Enhanced Header Section */}
          <div className="text-center mb-4 sm:mb-10 lg:mb-12 relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1.5 sm:mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Featured Courses
              </span>
            </motion.h2>

            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3 sm:mb-6 lg:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Discover our most popular courses designed by industry experts to accelerate your career growth
            </motion.p>

            {/* Animated Divider */}
            <motion.div
              className="flex justify-center items-center gap-4 mb-3 sm:mb-7 lg:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-20"></div>
            </motion.div>
          </div>

          {/* Enhanced Courses Grid */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course._id || course.id || index}
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.3 + (index * 0.15),
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group relative h-full flex flex-col"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  {/* Course Card Container */}
                  <div className="relative transform group-hover:scale-105 transition-all duration-500 h-full flex flex-col flex-1">
                    <CourseCard 
                      id={course.slug || course._id || course.id}
                      slug={course.slug}
                      course={course.title}
                      courseImage={course.image || course.thumbnail}
                      price={course.price}
                      description={course.description}
                      rating={course.rating}
                      instructor={course.instructor}
                      category={course.category}
                    />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '0.2s' }}>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <Testimonials />    
      </div>
    </div>
  );
}