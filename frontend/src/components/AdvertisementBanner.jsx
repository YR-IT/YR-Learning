import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getCourses } from "../data/courses";
import { useNavigate } from "react-router-dom";

export default function AdvertisementBanner() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      const generatedSlides = courses.slice(0, 4).map(course => ({
        title: course.title,
        description: course.description,
        button: `View ${course.title}` ,
        link: `/course/${course._id}`,
        image: `data:image/jpeg;base64,${course.thumbnail}`,
        price: course.price,
        category: course.category,
        rating: 4.8, // aTBD: This should come from the API
        students: "2.5k", // TBD: This should come from the API
        duration: "12h" // TBD: This should come from the API
      }));
      setSlides(generatedSlides);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (slides.length === 0) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const goToSlide = (e, index) => {
    e.stopPropagation();
    if (slides.length === 0) return;
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  if (slides.length === 0) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const currentSlide = slides[current];

  return (
    <div className="relative mb-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
          onClick={() => navigate(currentSlide.link)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[300px]">
            <motion.div 
              className="flex-1 flex flex-col items-start space-y-6 pr-4 md:pr-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2 text-yellow-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(currentSlide.rating) ? "currentColor" : "none"} />
                ))}
                <span className="text-white ml-2">{currentSlide.rating}</span>
              </motion.div>

              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {currentSlide.title}
              </motion.h2>

              <motion.p 
                className="text-lg md:text-xl opacity-90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {currentSlide.description}
              </motion.p>

              <motion.div 
                className="flex flex-wrap items-center gap-6 text-sm opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <span>⭐ {currentSlide.students} students enrolled</span>
                <span>⏱️ {currentSlide.duration} course</span>
              </motion.div>

            </motion.div>

            <motion.div 
              className="flex-shrink-0 w-full md:w-80 mt-8 md:mt-0 md:ml-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <motion.img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="rounded-2xl shadow-2xl object-cover w-full h-48 md:h-64"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {slides.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={(e) => goToSlide(e, idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === idx 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}