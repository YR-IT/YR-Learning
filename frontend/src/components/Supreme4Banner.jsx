import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../services/api";

const defaultBanners = [
  {
    _id: "def-1",
    title: "Accelerate Your Tech Career with Industry Mentorship",
    titleRest: "Accelerate Your Tech Career with Industry Mentorship",
    imageSrc: "/images/hero-tech.jpg",
  },
  {
    _id: "def-2",
    title: "Full-Stack Development Bootcamp - 100% Practical",
    titleRest: "Full-Stack Development Bootcamp - 100% Practical",
    imageSrc: "/images/webdev-workspace.jpg",
  },
  {
    _id: "def-3",
    title: "Artificial Intelligence & Generative AI Masterclass",
    titleRest: "Artificial Intelligence & Generative AI Masterclass",
    imageSrc: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png",
  },
];

const defaultInstructors = [
  {
    _id: "inst-1",
    title: "Jane Smith - Senior Web Architect & Full-Stack Lead",
    titleRest: "Jane Smith - Senior Web Architect & Full-Stack Lead",
    imageSrc: "/images/trainer1.jpg",
  },
  {
    _id: "inst-2",
    title: "Alex Johnson - AI / Machine Learning Specialist",
    titleRest: "Alex Johnson - AI / Machine Learning Specialist",
    imageSrc: "/images/trainer2.jpg",
  },
  {
    _id: "inst-3",
    title: "Sarah Lee - DSA & System Design Specialist",
    titleRest: "Sarah Lee - DSA & System Design Specialist",
    imageSrc: "/images/trainer3.jpg",
  },
];

export default function Supreme4Banner() {
  const [banners, setBanners] = useState(defaultBanners);
  const [instructorBanners, setInstructorBanners] = useState(defaultInstructors);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, instructorRes] = await Promise.all([
          fetch(`${API_BASE_URL}/banner/getbanner`).catch(() => null),
          fetch(`${API_BASE_URL}/banner/getinstructor`).catch(() => null),
        ]);

        if (bannerRes && bannerRes.ok) {
          const bannerData = await bannerRes.json();
          if (Array.isArray(bannerData) && bannerData.length > 0) {
            setBanners(
              bannerData.map((banner) => ({
                ...banner,
                titleRest: banner.title || banner.name,
                imageSrc: banner.image,
              }))
            );
          }
        }

        if (instructorRes && instructorRes.ok) {
          const instructorData = await instructorRes.json();
          if (Array.isArray(instructorData) && instructorData.length > 0) {
            setInstructorBanners(
              instructorData.map((banner) => ({
                ...banner,
                titleRest: banner.title || banner.name,
                imageSrc: banner.image,
              }))
            );
          }
        }
      } catch (err) {
        console.warn("Banner fetch notice, using fallback banners:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedBanners = isMobile ? instructorBanners : banners;

  useEffect(() => {
    if (displayedBanners.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayedBanners.length);
      }, 5500);
      return () => clearInterval(intervalId);
    }
  }, [displayedBanners.length]);

  if (loading && displayedBanners.length === 0) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg font-semibold">Loading promotions...</p>
          </div>
        </div>
      </div>
    );
  }

  const active = displayedBanners[currentIndex] || displayedBanners[0];
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % displayedBanners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + displayedBanners.length) % displayedBanners.length);

  const getImageSrc = (src) => {
    if (!src) return "/images/hero-tech.jpg";
    if (src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) {
      return src;
    }
    return `data:image/jpeg;base64,${src}`;
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full translate-x-12 translate-y-12" />
          </div>

          {/* Full-width banner image container */}
          <div className="flex items-center justify-stretch">
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px]">
              <img
                src={getImageSrc(active.imageSrc)}
                alt={active.titleRest || "Banner Image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/webdev-workspace.jpg";
                }}
              />

              {/* Title overlay at bottom of image with gradient scrim */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent p-5 sm:p-7">
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-md leading-tight"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-white">
                    {active.titleRest}
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Floating NEW badge */}
            <motion.div
              className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-gray-950 font-extrabold text-xs sm:text-sm shadow-xl z-10 uppercase tracking-wide border border-white/20"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Featured
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {displayedBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white p-2 sm:p-2.5 rounded-full transition-all duration-200 z-20 border border-white/20"
                aria-label="Previous banner"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white p-2 sm:p-2.5 rounded-full transition-all duration-200 z-20 border border-white/20"
                aria-label="Next banner"
              >
                <ChevronRight size={20} />
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-3 right-6 flex items-center space-x-2 z-20">
                {displayedBanners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? "w-6 bg-amber-400" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}