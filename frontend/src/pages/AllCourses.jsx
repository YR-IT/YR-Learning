import { useState, useEffect, useMemo } from "react";
import { getCourses } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { Search, Filter, Grid, List, BookOpen, Users, Clock, Star, TrendingUp, GraduationCap, ArrowRight, Video, Trophy, FolderOpen, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import InstructorShowcase from "../components/InstructorShowcase";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../contexts/ThemeContext";

export default function AllCourses() {
  const { theme } = useTheme();
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [activeCard, setActiveCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: courses = [], isLoading, isError: error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses
  });

  // Get unique categories from courses
  const categories = useMemo(() => ["All", ...new Set(courses.map(course => course.category))], [courses]);

  // Handle URL search parameter
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const instructorName = typeof course.instructor === 'string' 
        ? course.instructor 
        : (course.instructor?.name || '');
      const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (course.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           instructorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort courses
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        // Keep original order for popular (assuming it's already sorted by popularity)
        break;
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory, sortBy]);

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + (course.students || 1200), 0),
    totalHours: courses.reduce((sum, course) => sum + (course.duration || 12), 0),
    avgRating: 4.8
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 dark:bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 dark:border-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 dark:border-purple-600 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 dark:border-indigo-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-300 dark:border-pink-600 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('/images/${theme === 'dark' ? 'hero-tech.jpg' : 'hero-tech.jpg'}')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent dark:from-gray-950/80 dark:via-gray-950/60 dark:to-gray-950/40 transition-colors duration-500 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            
            {/* Left Content */}
            <motion.div
              className="space-y-3.5 sm:space-y-5 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-white/20 bg-purple-50/90 dark:bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-purple-700 dark:text-white">
                <GraduationCap size={15} />
                <span>Industry-Aligned Tech Programs</span>
              </div>

              {/* Main Heading */}
              <motion.div
                className="space-y-2 sm:space-y-3"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Discover Your Perfect</span>
                  <br />
                  <span className="text-gray-900 dark:text-white drop-shadow-sm">Path In </span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Tech Career
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-800 dark:text-gray-100 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium drop-shadow-sm">
                  Master full-stack software development, DSA, AI, machine learning, and cloud architecture with comprehensive roadmaps, live mentorship, and verifiable certification.
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a
                  href="#courses-catalog"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/40"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
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
              <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-white/20 bg-white/85 dark:bg-gray-950/40 p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-colors duration-300">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-white/20 bg-purple-50/90 dark:bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-purple-700 dark:text-white"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Tech Mentorship</span>
                </motion.div>
                <motion.div
                  className="mt-3.5 sm:mt-4 text-base sm:text-lg font-bold text-gray-900 dark:text-white"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  ⭐ 4.9/5 Rating <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-200">(12k+ Reviews)</span>
                </motion.div>
              </div>

              {/* Feature Pills Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-lg mt-3">
                {[
                  { title: "Live Classes", icon: Video, color: "text-purple-600 dark:text-purple-400" },
                  { title: "Hackathons", icon: Trophy, color: "text-blue-600 dark:text-blue-400" },
                  { title: "Real Projects", icon: FolderOpen, color: "text-cyan-600 dark:text-cyan-400" },
                  { title: "Internships", icon: Briefcase, color: "text-emerald-600 dark:text-emerald-400" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/85 dark:bg-gray-900/50 shadow-md backdrop-blur-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={heroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color} mb-1`} />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div id="courses-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 relative z-10">
        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            {/* Enhanced Search Bar */}
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 sm:pl-16 pr-6 py-4 sm:py-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl placeholder-gray-500 dark:placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchParams({});
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className={`grid gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 items-stretch ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredCourses.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12 sm:py-16 px-4"
            >
              <div className="text-gray-400 dark:text-gray-500 text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No courses found</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `No courses match "${searchTerm}". Try adjusting your search terms or filters.`
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 dark:bg-blue-400 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full flex flex-col"
              >
                <CourseCard 
                  course={course.title}
                  id={course.slug || course._id}
                  slug={course.slug}
                  courseImage={course.image || course.thumbnail}
                  price={course.price}
                  description={course.description}
                  rating={course.rating}
                  instructor={course.instructor}
                  category={course.category}
                  isActive={activeCard === course._id}
                  onHover={() => setActiveCard(course._id)}
                  viewMode={viewMode}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Load More Button (if needed) */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-semibold hover:from-blue-700 dark:hover:from-blue-500 hover:to-purple-700 dark:hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Courses
            </motion.button>
          </div>
        )}

        <InstructorShowcase/>

        {/* Bottom Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center relative overflow-hidden">
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                10,000+
              </motion.div>
              <div className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-medium">Students Enrolled</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-200/50 dark:border-green-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center relative overflow-hidden">
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.3)", "0 0 0px rgba(34, 197, 94, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                95%
              </motion.div>
              <div className="text-sm sm:text-base text-green-700 dark:text-green-300 font-medium">Placement Rate</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center relative overflow-hidden">
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(147, 51, 234, 0)", "0 0 20px rgba(147, 51, 234, 0.3)", "0 0 0px rgba(147, 51, 234, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                4.9/5
              </motion.div>
              <div className="text-sm sm:text-base text-purple-700 dark:text-purple-300 font-medium">Student Rating</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, delay: 1 }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-orange-200/50 dark:border-orange-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(249, 115, 22, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center relative overflow-hidden">
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(249, 115, 22, 0)", "0 0 20px rgba(249, 115, 22, 0.3)", "0 0 0px rgba(249, 115, 22, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                500+
              </motion.div>
              <div className="text-sm sm:text-base text-orange-700 dark:text-orange-300 font-medium">Companies Hiring</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}