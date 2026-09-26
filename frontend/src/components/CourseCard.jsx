import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Star, BookOpen, ArrowRight, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseCard({ 
  id,
  course,
  courseImage,
  price,
  description,
  instructor,
  category,
  isActive, 
  onHover,
  viewMode = "grid" 
}) {
  const [showOnLeft, setShowOnLeft] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && isActive) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setShowOnLeft(rect.right + 300 > windowWidth);
    }
  }, [isActive]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites!");
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: course,
        text: description,
        url: window.location.origin + `/course/${id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/course/${id}`);
      toast.success("Course link copied to clipboard!");
    }
  };

  const handleCourseClick = () => {
    setIsLoading(true);
    toast.success(`Opening ${course}...`);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    toast.success(isExpanded ? "Course details collapsed" : "Showing course details");
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-gray-900/50 overflow-hidden border border-white/20 dark:border-gray-700/20 transition-all duration-300 relative h-full ${
          viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Action buttons overlay */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleLike}
            className={`p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked 
                ? "bg-red-500 text-white" 
                : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            onClick={handleShare}
            className="p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={14} />
          </motion.button>
        </div>

        <Link to={`/course/${id}`} onClick={handleCourseClick} className={`flex-1 ${viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
          <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-64 sm:flex-shrink-0" : ""}`}>
            <motion.img
              src={`data:image/jpeg;base64,${courseImage}`}
              alt={course}
              className={`w-full object-cover transition-transform duration-500 ${
                viewMode === "list" ? "h-40 sm:h-full" : "h-40 sm:h-48"
              }`}
              whileHover={{ scale: 1.1 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <motion.div 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100"
                whileHover={{ scale: 1.05 }}
              >
                ₹{price}
              </motion.div>
            </div>
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.div>
            </div>
            
            {/* Loading overlay */}
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-6 sm:w-8 h-6 sm:h-8 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
          
          <div className={`p-4 sm:p-6 flex-1 flex flex-col ${viewMode === "list" ? "justify-between" : ""}`}>
            <motion.h3 
              className={`font-bold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                viewMode === "list" ? "text-lg sm:text-xl" : "text-base sm:text-xl"
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {course}
            </motion.h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-shrink-0">
              By {instructor}
            </p>
            
            <div className={`flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0 ${
              viewMode === "list" ? "flex-wrap gap-2" : ""
            }`}>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>1.2k</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 dark:text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
            </div>
            
            <motion.div
              className={`flex items-center justify-between mt-auto ${
                viewMode === "list" ? "flex-row-reverse sm:flex-row" : ""
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className={`font-bold text-blue-600 dark:text-blue-400 ${
                viewMode === "list" ? "text-xl sm:text-2xl" : "text-lg sm:text-2xl"
              }`}>₹{price}</span>
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white p-1.5 sm:p-2 rounded-full group-hover:from-blue-700 group-hover:to-purple-700 dark:group-hover:from-blue-600 dark:group-hover:to-purple-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>
          </div>
        </Link>

       
      </motion.div>
    </motion.div>
  );
}