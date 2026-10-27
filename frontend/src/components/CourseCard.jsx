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
  const courseIdentifier = `${slug || ""} ${id || ""} ${course || ""}`.toLowerCase();
  let imageSrc = courseImage
    ? (/^(data:|https?:\/\/|\/)/.test(courseImage)
      ? courseImage
      : `data:image/jpeg;base64,${courseImage}`)
    : ((courseIdentifier.includes("cyber") || courseIdentifier.includes("security"))
      ? "/images/cyber-security.jpg"
      : "/images/Digital-Marketing.jpg");

  if ((courseIdentifier.includes("cyber") || courseIdentifier.includes("security")) && (!courseImage || imageSrc.includes("Digital-Marketing"))) {
    imageSrc = "/images/cyber-security.jpg";
  }
  const rawInstructorName = typeof instructor === "string" ? instructor : (instructor?.name || "YR Instructor");
  const instructorName = rawInstructorName
    .replace(/vijay\s+sheoran/gi, "Vinay Sheoran")
    .replace(/vijay/gi, "Vinay")
    .replace(/divyaRaj/g, "Divyaraj")
    .replace(/divyaraj/gi, "Divyaraj")
    .replace(/aaditya\s+naulakha/gi, "Aditya Naulakha")
    .replace(/aaditya/gi, "Aditya");
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
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
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
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl dark:hover:shadow-gray-900/50 overflow-hidden border border-gray-200/90 dark:border-gray-700/80 transition-all duration-300 relative w-full h-full flex flex-1 ${
          viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/course/${coursePathId}`} onClick={handleCourseClick} className={`w-full flex-1 flex ${viewMode === "list" ? "flex-col sm:flex-row" : "flex-col"}`}>
          <div className={`relative overflow-hidden w-full ${viewMode === "list" ? "sm:w-64 sm:flex-shrink-0" : "h-36 sm:h-44 md:h-48 flex-shrink-0"}`}>
            <motion.img
              src={imageSrc}
              alt={course}
              className="w-full h-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.02 }}
              loading="lazy"
              onError={(e) => {
                if (courseIdentifier.includes("cyber") || courseIdentifier.includes("security")) {
                  if (!e.target.src.includes("cyber-security.jpg")) {
                    e.target.src = "/images/cyber-security.jpg";
                  }
                }
              }}
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
          
          <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
            <div>
              {rating != null && (
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm" aria-label={`Rated ${Number(rating).toFixed(1)} out of 5`}>
                  <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>{index < Math.round(Number(rating)) ? "★" : "☆"}</span>
                    ))}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{Number(rating).toFixed(2)}</span>
                </div>
              )}

              {/* Course Title */}
              <motion.h3 
                className={`font-semibold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                  viewMode === "list" ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"
                }`}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {course}
              </motion.h3>

              {/* Course Description directly under Title with tight spacing */}
              {description && (
                <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-xs leading-relaxed mb-2 line-clamp-2">
                  {description}
                </p>
              )}
              
              {/* Instructor Information */}
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
                {instructorAvatar ? (
                  <img
                    src={instructorAvatar}
                    alt=""
                    className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    style={{
                      objectPosition: instructorAvatar?.includes('frontend_trainer') ? 'top center' : 'center',
                    }}
                  />
                ) : (
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-300 font-bold text-[10px] sm:text-xs">
                    {instructorName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="truncate">
                  By <span className="font-medium text-gray-800 dark:text-gray-200">{instructorName}</span>
                  {category && <span className="text-gray-400 dark:text-gray-500"> • {category}</span>}
                </span>
              </div>

            </div>
            
            <motion.div
              className="mt-2 border-t border-gray-100 pt-2.5 sm:pt-3 dark:border-gray-700/60"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Price</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">Rs. {price}</span>
              </div>
              <motion.div
                className="w-full rounded-xl border border-blue-600/30 bg-blue-50/60 py-1.5 sm:py-2 text-center text-xs sm:text-sm font-semibold text-blue-700 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-300 dark:group-hover:bg-blue-600 dark:group-hover:text-white shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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