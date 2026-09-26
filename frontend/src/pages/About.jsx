import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { 
  Code, 
  BookOpen, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Award, 
  Lightbulb,
  Target,
  Heart,
  Star,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Play,
  CheckCircle,
  Rocket,
  Brain,
  Monitor,
  Database,
  Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { getCourses } from "../data/courses";

export default function About() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [techRef, techInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const found_courses = await getCourses();
      setCourses(found_courses);
      
      const uniqueInstructors = Object.values(
        found_courses.reduce((acc, course) => {
          if (!acc[course.instructor]) {
            acc[course.instructor] = course.instructor;
          }
          return acc;
        }, {})
      );
      setInstructors(uniqueInstructors);
      setLoading(false);
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Code,
      title: "Integrated IDE",
      description: "Built-in code editor with syntax highlighting, autocomplete, and real-time collaboration features.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Extensive library of courses covering programming, web development, data science, and more.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Learning",
      description: "Interactive coding sessions with instant feedback and live collaboration.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with encrypted data and secure authentication.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners worldwide and build your professional network.",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const techStack = [
    { name: "React 19", category: "Frontend", icon: "⚛️" },
    { name: "Vite", category: "Build Tool", icon: "⚡" },
    { name: "Tailwind CSS", category: "Styling", icon: "🎨" },
    { name: "Framer Motion", category: "Animation", icon: "🎭" },
    { name: "Express.js", category: "Backend", icon: "🚀" },
    { name: "MongoDB", category: "Database", icon: "🍃" },
    { name: "Socket.io", category: "Real-time", icon: "🔌" },
    { name: "CodeMirror", category: "IDE", icon: "💻" },
    { name: "JWT", category: "Auth", icon: "🔐" },
    { name: "Cloudinary", category: "Media", icon: "☁️" }
  ];

  const teamMembers = [
    {
      name: "YR IT Solutions",
      role: "Founder & Lead Developer",
      avatar: "/images/Your_paragraph_text-removebg-preview.png",
      bio: "Passionate about creating innovative learning experiences through technology.",
      social: { github: "#", linkedin: "#", email: "contact@yr-it.com" }
    }
  ];

  const stats = [
    { label: "Active Learners", value: 10000, suffix: "+" },
    { label: "Courses Available", value: courses.length, suffix: "+" },
    { label: "Expert Instructors", value: instructors.length, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div 
          className="absolute top-10 sm:top-20 left-4 sm:left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 border-2 border-blue-300 dark:border-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-20 sm:top-40 right-8 sm:right-20 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 border-2 border-purple-300 dark:border-purple-600 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 sm:bottom-40 left-8 sm:left-20 w-10 sm:w-16 lg:w-20 h-10 sm:h-16 lg:h-20 border-2 border-indigo-300 dark:border-indigo-600 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="text-center mb-12 sm:mb-16 lg:mb-20 relative"
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-4 sm:top-10 left-4 sm:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500 rounded-full opacity-60"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight pb-2 sm:pb-3"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About YR-Learning
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing online education with an integrated development environment, 
            real-time collaboration, and expert-led courses designed for the modern learner.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 w-full"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none">
              <Award className="text-yellow-500 flex-shrink-0" size={16} />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base text-center">Award-Winning Platform</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none">
              <Users className="text-blue-500 flex-shrink-0" size={16} />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base text-center">10K+ Active Learners</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none">
              <Star className="text-purple-500 flex-shrink-0" size={16} />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base text-center">4.9/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={statsInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 dark:border-gray-700 group relative overflow-hidden"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ y: 30, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">
                {statsInView && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium text-xs sm:text-sm lg:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:border-gray-700 group relative overflow-hidden cursor-pointer"
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gray-200 dark:bg-gray-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <motion.div 
                className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, -8, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-6 left-8 w-1 h-1 bg-cyan-400 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
            </motion.div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <motion.div 
                  className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Target className="text-white" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Our Mission
                </motion.h3>
              </div>
              <motion.p 
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg text-center group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                To democratize quality programming education by providing an integrated learning environment 
                that combines theoretical knowledge with practical coding experience, making technology 
                education accessible to everyone, everywhere.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:border-gray-700 group relative overflow-hidden cursor-pointer"
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              rotateX: 5,
              rotateY: -5,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gray-200 dark:bg-gray-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <motion.div 
                className="absolute top-6 right-4 w-2 h-2 bg-purple-400 rounded-full"
                animate={{ 
                  y: [0, -18, 0],
                  x: [0, -12, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.div 
                className="absolute top-12 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full"
                animate={{ 
                  y: [0, -12, 0],
                  x: [0, 8, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.div 
                className="absolute bottom-8 right-8 w-1 h-1 bg-yellow-400 rounded-full"
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, -6, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
              />
            </div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
            </motion.div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <motion.div 
                  className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: -360,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Lightbulb className="text-white" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Our Vision
                </motion.h3>
              </div>
              <motion.p 
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg text-center group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                To become the world's leading platform for interactive programming education, 
                fostering a global community of skilled developers who can build the future 
                through innovative technology solutions.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          ref={featuresRef}
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={featuresInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight pb-2 sm:pb-3"
              initial={{ y: 30, opacity: 0 }}
              animate={featuresInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Platform Features
            </motion.h2>
            <motion.div
              className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={featuresInView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 dark:border-gray-700 group relative overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    rotateX: 5,
                    rotateY: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setActiveFeature(index)}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  
                  {/* Glow effect background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 opacity-0 group-hover:opacity-20 rounded-xl sm:rounded-2xl blur-xl transition-opacity duration-500`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Card content */}
                  <div className="relative z-10 text-center">
                    <motion.div 
                      className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r ${feature.color} dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 mx-auto`}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon className="text-white flex-shrink-0" size={window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 22 : 24} />
                    </motion.div>
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-300 mb-2 sm:mb-3 group-hover:text-blue-700 dark:group-hover:text-white transition-colors duration-300 text-center"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base text-center"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          ref={techRef}
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={techInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight pb-2 sm:pb-3"
              initial={{ y: 30, opacity: 0 }}
              animate={techInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Technology Stack
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={techInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Built with cutting-edge technologies for optimal performance and user experience
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 dark:border-gray-700 group relative overflow-hidden"
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={techInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.08,
                  rotateY: 15,
                  rotateX: 10,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 rounded-xl sm:rounded-2xl transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, 
                      hsl(${(index * 60) % 360}, 70%, 60%), 
                      hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                      hsl(${(index * 60 + 240) % 360}, 70%, 60%))`
                  }}
                  animate={{
                    background: [
                      `linear-gradient(45deg, 
                        hsl(${(index * 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 240) % 360}, 70%, 60%))`,
                      `linear-gradient(45deg, 
                        hsl(${(index * 60 + 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 180) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 300) % 360}, 70%, 60%))`,
                      `linear-gradient(45deg, 
                        hsl(${(index * 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 240) % 360}, 70%, 60%))`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Blur glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-xl sm:rounded-2xl blur-xl transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, 
                      hsl(${(index * 60) % 360}, 80%, 70%), 
                      hsl(${(index * 60 + 180) % 360}, 80%, 70%))`
                  }}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <motion.div 
                    className="text-2xl sm:text-3xl mb-2 sm:mb-3 transition-transform duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateZ: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    animate={{
                      rotateY: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                  <motion.h4 
                    className="font-bold text-gray-800 dark:text-gray-300 mb-1 group-hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.name}
                  </motion.h4>
                  <motion.p 
                    className="text-xs sm:text-sm text-gray-600 dark:text-gray-500 group-hover:text-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.category}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={ctaInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Ready to Start Learning?
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Join thousands of learners who are already mastering programming with 
              our interactive platform
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button 
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/courses')}
              >
                <Rocket size={18} />
                <span>Start Learning Now</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}