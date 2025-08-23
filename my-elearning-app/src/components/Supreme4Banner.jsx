import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function Supreme4Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://backend-1-bn9o.onrender.com/api/banner/getbanner');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Transform the simple banner data into the expected format
        const transformedBanners = data.map((banner, index) => ({
          ...banner,
          titleRest: banner.title,
          imageSrc: banner.image, // This will be the base64 string
        }));
        
        setBanners(transformedBanners);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [banners.length]);

  if (loading) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg font-semibold">Loading banners...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-8 text-center min-h-[300px] flex items-center justify-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Unable to load banners</h3>
            <p className="text-red-100">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl shadow-2xl p-8 text-center min-h-[300px] flex items-center justify-center">
          <div>
            <h3 className="text-xl font-bold mb-2">No banners available</h3>
            <p className="text-gray-300">Check back later for updates!</p>
          </div>
        </div>
      </div>
    );
  }

  const active = banners[currentIndex];
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Full-width banner image container */}
          <div className="relative w-full h-[400px] md:h-[450px] p-0 md:p-0">
            {/* Image with border */}
            <div className="relative w-full h-full ">
              <motion.img 
                src={`data:image/jpeg;base64,${active.imageSrc}`}
                alt={active.titleRest || "Banner Image"} 
                className="w-full h-full "
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-2xl md:text-4xl';
                  fallback.innerHTML = `<div class="text-center p-8"><div class="text-4xl md:text-6xl mb-4">📚</div><div>${active.titleRest || 'Training Program'}</div></div>`;
                  e.target.parentNode.appendChild(fallback);
                }}
              />

              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6">
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400">
                    {active.titleRest}
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Floating NEW badge */}
            <motion.div 
              className="absolute top-8 right-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs md:text-sm shadow-lg z-10"
              animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              NEW!
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {banners.length > 1 && (
            <>
              {/* Arrow buttons - smaller and more subtle */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-all duration-300 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous banner"
              >
                <ChevronLeft size={18} />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-all duration-300 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next banner"
              >
                <ChevronRight size={18} />
              </motion.button>

              {/* Dots indicator - positioned at bottom right */}
              <motion.div 
                className="absolute bottom-4 right-4 flex space-x-2 z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to banner ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? "bg-white w-4 shadow-lg" 
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </motion.div>

              {/* Banner counter - positioned at bottom left */}
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {currentIndex + 1} / {banners.length}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}