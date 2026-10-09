import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseCard({ 
  id,
  slug,
  course,
  courseImage,
  price,
  description,
  rating,
  instructor,
  category,
  isActive, 
  onHover,
  viewMode = "grid" 
}) {
  const coursePathId = slug || id;
  const [showOnLeft, setShowOnLeft] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const imageSrc = courseImage
    ? (/^(data:|https?:\/\/|\/)/.test(courseImage)
      ? courseImage
      : `data:image/jpeg;base64,${courseImage}`)
    : "/images/Digital-Marketing.jpg";
  const instructorName = typeof instructor === "string" ? instructor : (instructor?.name || "YR Instructor");
  const instructorAvatar = typeof instructor === "object"
    ? instructor?.avatar || instructor?.image || instructor?.profileImage
    : null;

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
        url: window.location.origin + `/course/${coursePathId}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/course/${coursePathId}`);
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
      className="relative group w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-gray-900/50 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 relative w-full h-full flex flex-1 ${
          viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/course/${coursePathId}`} onClick={handleCourseClick} className={`w-full flex-1 flex ${viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"}`}>
          <div className={`relative overflow-hidden w-full ${viewMode === "list" ? "sm:w-64 sm:flex-shrink-0" : "h-44 sm:h-48 flex-shrink-0"}`}>
            <motion.img
              src={imageSrc}
              alt={course}
              className="w-full h-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.02 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <motion.button
                type="button"
                onClick={handleShare}
                aria-label="Share course"
                className="rounded-full bg-white/90 p-2 text-gray-600 shadow-sm transition-colors hover:text-blue-600"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Share2 size={16} />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleLike}
                aria-label={isLiked ? "Remove course bookmark" : "Bookmark course"}
                aria-pressed={isLiked}
                className={`rounded-full p-2 shadow-sm transition-colors ${
                  isLiked ? "bg-blue-600 text-white" : "bg-white/90 text-gray-600 hover:text-blue-600"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Bookmark size={16} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
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
          
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              {rating != null && (
                <div className="mb-2 flex items-center gap-2 text-sm" aria-label={`Rated ${Number(rating).toFixed(1)} out of 5`}>
                  <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>{index < Math.round(Number(rating)) ? "★" : "☆"}</span>
                    ))}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">{Number(rating).toFixed(2)}</span>
                </div>
              )}
              <motion.h3 
                className={`font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                  viewMode === "list" ? "text-lg sm:text-xl" : "text-base sm:text-lg min-h-12"
                }`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {course}
              </motion.h3>
              
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {instructorAvatar ? (
                  <img src={instructorAvatar} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {instructorName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="line-clamp-2">
                  By <span className="font-medium text-gray-800 dark:text-gray-200">{instructorName}</span>
                  {category && <> in {category}</>}
                </span>
              </div>

              {description && (
                <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-xs leading-4 mb-2 line-clamp-2">
                  {description}
                </p>
              )}

            </div>
            
            <motion.div
              className="mt-2 border-t border-gray-100 pt-3 dark:border-gray-700/60"
            >
              <span className="mb-2 block text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Rs. {price}</span>
              <motion.div
                className="w-full rounded-md border border-blue-200 py-2 text-center text-sm font-medium text-blue-700 transition-colors group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-blue-500/50 dark:text-blue-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Enroll Course
              </motion.div>
            </motion.div>
          </div>
        </Link>

       
      </motion.div>
    </motion.div>
  );
}