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
import InstructorShowcase from "../components/InstructorShowcase";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const found_courses = await getCourses();
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
      setLoading(false);
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Learning Mentor",
      description: "24/7 intelligent AI assistant for real-time coding guidance, doubt resolution, and career roadmaps.",
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

  const courseWiseTechnologies = [
    {
      title: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Responsive UI"],
      accent: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend Engineering",
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Authentication", "Deployment"],
      accent: "from-purple-500 to-pink-500"
    },
    {
      title: "Data & AI",
      items: ["Python", "Machine Learning", "Data Analysis", "AI Models", "Big Data", "Statistics"],
      accent: "from-emerald-500 to-teal-500"
    },
    {
      title: "Cyber & Cloud",
      items: ["Networking", "Security Tools", "Cloud Platforms", "Linux", "Ethical Hacking", "Monitoring"],
      accent: "from-orange-500 to-red-500"
    }
  ];

  const teamMembers = [
    {
      name: "YR IT Solutions",
      role: "Founder & Lead Developer",
      avatar: "/images/logo.png",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
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

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative z-10 mb-0 flex min-h-[92vh] sm:min-h-[96vh] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4 py-24 sm:py-32 text-center transition-all duration-500"
        style={{ y, backgroundImage: `url('/images/${theme === 'dark' ? 'webdev-workspace.jpg' : 'webdev-workspace-light.jpg'}')` }}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
          <div className="absolute inset-0 bg-white/10 dark:bg-gray-950/50 transition-colors duration-500 pointer-events-none" />
          <motion.div
            className="absolute top-4 left-4 z-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 sm:top-10 sm:left-10 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.h1 
            className="relative z-10 mb-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-200 bg-clip-text pb-2 text-3xl font-bold leading-tight text-transparent sm:mb-6 sm:pb-3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-sm"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About YR-Learning
          </motion.h1>
          
          <motion.p 
            className="relative z-10 mb-6 max-w-2xl px-2 text-sm leading-relaxed text-gray-900 dark:text-gray-100 sm:mb-8 sm:px-4 sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing online education with an integrated development environment, 
            real-time collaboration, and expert-led courses designed for the modern learner.
          </motion.p>

          <motion.div
            className="relative z-10 mb-8 flex w-full flex-col items-center justify-center gap-3 px-2 sm:mb-10 sm:flex-row sm:gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex w-full max-w-xs items-center justify-center space-x-2 rounded-full border border-gray-200/80 dark:border-transparent bg-white/85 dark:bg-gray-900/75 px-4 py-2 shadow-lg backdrop-blur-md sm:w-auto sm:max-w-none sm:px-6 sm:py-3 transition-colors duration-300">
              <Award className="text-yellow-500 flex-shrink-0" size={16} />
              <span className="text-center text-sm font-semibold text-gray-800 dark:text-white sm:text-base">Award-Winning Platform</span>
            </div>
            <div className="flex w-full max-w-xs items-center justify-center space-x-2 rounded-full border border-gray-200/80 dark:border-transparent bg-white/85 dark:bg-gray-900/75 px-4 py-2 shadow-lg backdrop-blur-md sm:w-auto sm:max-w-none sm:px-6 sm:py-3 transition-colors duration-300">
              <Users className="text-blue-500 flex-shrink-0" size={16} />
              <span className="text-center text-sm font-semibold text-gray-800 dark:text-white sm:text-base">10K+ Active Learners</span>
            </div>
            <div className="flex w-full max-w-xs items-center justify-center space-x-2 rounded-full border border-gray-200/80 dark:border-transparent bg-white/85 dark:bg-gray-900/75 px-4 py-2 shadow-lg backdrop-blur-md sm:w-auto sm:max-w-none sm:px-6 sm:py-3 transition-colors duration-300">
              <Star className="text-purple-500 flex-shrink-0" size={16} />
              <span className="text-center text-sm font-semibold text-gray-800 dark:text-white sm:text-base">4.9/5 Rating</span>
            </div>
          </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6 sm:pt-2 sm:pb-8 lg:pt-3 lg:pb-12 -mt-6 sm:-mt-10 lg:-mt-14 relative z-10">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/85 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(59,130,246,0.18)] dark:border-gray-700/80 dark:bg-gray-800/85 sm:p-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setActiveFeature(index)}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color}`} />
                  <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150`} />

                  <div className="relative z-10 text-left">
                    <div className="mb-4 flex items-center justify-between">
                      <motion.div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg shadow-blue-500/20 sm:h-14 sm:w-14`}
                        whileHover={{
                          scale: 1.12,
                          rotate: 8,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        <Icon className="text-white" size={window.innerWidth < 640 ? 20 : 22} />
                      </motion.div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-bold text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-blue-300">
                        {index + 1}
                      </div>
                    </div>

                    <motion.h3
                      className="mb-3 text-lg font-bold text-gray-900 dark:text-white sm:text-xl"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <InstructorShowcase />

        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm dark:border-blue-700 dark:bg-gray-800/80 dark:text-blue-300">
              Learning Tracks
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight pb-2 sm:pb-3">
              Course-wise Technologies
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
              Learning paths built around the tools and technologies students use in each track, so every course feels practical, modern, and job-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {courseWiseTechnologies.map((group, index) => (
              <motion.div
                key={group.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/85 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(79,70,229,0.18)] dark:border-gray-700/80 dark:bg-gray-800/85 sm:p-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent}`} />
                <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${group.accent} px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white`}>
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors duration-300 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:group-hover:border-blue-500/50 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-300"
                    >
                      {item}
                    </span>
                  ))}
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