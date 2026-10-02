import { useState, useEffect, useMemo } from "react";
import { getCourses } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { Search, Filter, Grid, List, BookOpen, Users, Clock, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import InstructorShowcase from "../components/InstructorShowcase"
import { useQuery } from "@tanstack/react-query";

export default function AllCourses() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Your Perfect 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> Course</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our comprehensive collection of courses designed to accelerate your learning journey
          </motion.p>
        </motion.div>

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

          {/* Active Filters & Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </span>
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className={`grid gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
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
              >
                <CourseCard 
                  course={course.title}
                  id={course._id}
                  courseImage={course.image || course.thumbnail}
                  price={course.price}
                  description={course.description}
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