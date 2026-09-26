import { motion } from "framer-motion";
import { Star, Users, BookOpen, MessageCircle, Twitter, Linkedin, Github, Mail, Award, Check } from "lucide-react";

// Instructor data mapped to course categories/names
const INSTRUCTORS = {
  'data science': {
    name: "Vinay Sheoran",
    role: "Senior Data Science Trainer",
    avatar: "/images/trainer1.jpg",
    bio: "Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
    rating: 4.9,
    students: "10,000+",
    courses: 15,
    expertise: ["Machine Learning", "AI", "Big Data", "Python", "Data Analysis"],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "vinay@example.com"
  },
  'web development': {
    name: "Sumit Kumar",
    role: "Web Development Instructor",
    avatar: "/images/trainer3.jpg",
    bio: "Former Full Stack Developer at DRDO & PwC. Expert in React.js, Node.js, and scalable web architecture.",
    rating: 4.7,
    students: "12,000+",
    courses: 18,
    expertise: ["Web Development", "Full Stack", "React.js", "Node.js", "JavaScript"],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/er-sumit-kr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "#"
    },
    email: "sumit@example.com"
  },
  // 'data science': {
  //   name: "Ridham",
  //   role: "Data Science Trainer",
  //   avatar: "/images/Trainer5.jpeg",
  //   bio: "Ex-Data Science Trainee at Creator's Bite US. Specializes in Data Science, Machine Learning, and Analytics.",
  //   rating: 4.7,
  //   students: "7,200+",
  //   courses: 10,
  //   expertise: ["Data Science", "Machine Learning", "Analytics", "Python"],
  //   social: {
  //     twitter: "#",
  //     linkedin: "#",
  //     github: "#"
  //   },
  //   email: "ridham@example.com"
  // },
  'cyber security': {
    name: "Gautam",
    role: "Cyber Security Trainer",
    avatar: "/images/Trainer4.jpeg",
    bio: "Penetration tester at YR IT SOLUTION and Cyber Security Practitioner at TCS. Expert in cybersecurity and ethical hacking.",
    rating: 4.9,
    students: "5,800+",
    courses: 8,
    expertise: ["Cyber Security", "Ethical Hacking", "Penetration Testing", "Security"],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "gautam@example.com"
  },
  'machine learning': {
    name: "Vishal",
    role: "Machine Learning Trainer",
    avatar: "/images/Trainer6.jpeg",
    bio: "Ex-data analyst at Novateur Electrical and Digital System Pvt Ltd. Specializes in Machine Learning and AI applications.",
    rating: 4.8,
    students: "9,100+",
    courses: 14,
    expertise: ["Machine Learning", "AI", "Deep Learning", "Python", "TensorFlow"],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "vishal@example.com"
  },
  'ui/ux design': {
    name: "Isha",
    role: "UI/UX Design Specialist",
    avatar: "/images/trainer2.jpg",
    bio: "Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces and design systems.",
    rating: 4.9,
    students: "6,700+",
    courses: 9,
    expertise: ["UI/UX Design", "User Experience", "User Interface", "Design Systems", "Figma"],
    social: {
      twitter: "#",
      linkedin: "https://LinkedIn.com/in/isha-uiux",
      github: "#"
    },
    email: "isha@example.com"
  },
  'default': {
    name: "Aryan Kumar",
    role: "Web Development Trainer",
    avatar: "/images/Trainer7.jpeg",
    bio: "Official member of Superteam India and Ex-TA at Coding Ninjas. Expert in modern web technologies and frameworks.",
    rating: 4.8,
    students: "8,500+",
    courses: 12,
    expertise: ["Web Development", "Frontend", "Backend", "Full Stack", "JavaScript"],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "aryan@example.com"
  }
};

export default function InstructorCard({ courseTitle = '', instructor: propInstructor }) {
  // Get instructor based on course title or use the provided instructor prop
  const getInstructor = () => {
    if (propInstructor) return propInstructor;
    
    const lowerTitle = courseTitle.toLowerCase();
    
    if (lowerTitle.includes('web') || lowerTitle.includes('frontend') || lowerTitle.includes('full stack')) {
      return INSTRUCTORS['web development'];
    } else if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) {
      return INSTRUCTORS['data science'];
    } else if (lowerTitle.includes('cyber') || lowerTitle.includes('security')) {
      return INSTRUCTORS['cyber security'];
    } else if (lowerTitle.includes('machine learning') || lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence')) {
      return INSTRUCTORS['machine learning'];
    } else if (lowerTitle.includes('ui') || lowerTitle.includes('ux') || lowerTitle.includes('design')) {
      return INSTRUCTORS['ui/ux design'];
    } else if (lowerTitle.includes('digital') || lowerTitle.includes('marketing')) {
      return INSTRUCTORS['digital marketing'];
    }
    
    return INSTRUCTORS['default'];
  };

  const instructor = getInstructor();

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-70" />
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-50" />
      
      <motion.div 
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 dark:border-gray-700/50 group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -5, 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glow effect container */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
        </div>
        
        {/* Gradient accent line */}
        <div className={`h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:h-2`} />
        
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-70 group-hover:opacity-100 blur-lg transition-all duration-300"></div>
              <motion.div 
                className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/trainer3.jpg';
                  }}
                />
              </motion.div>
              <div className="absolute -bottom-3 -right-3 z-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg">
                <Award size={20} className="text-yellow-300" />
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {instructor.name}
              </motion.h3>
              <motion.p 
                className="text-blue-500 dark:text-blue-400 text-sm font-medium mb-4 inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {instructor.role}
              </motion.p>

              {/* Bio */}
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {instructor.bio}
              </motion.p>

              {/* Expertise Tags */}
              {instructor.expertise && (
                <motion.div 
                  className="flex flex-wrap justify-center md:justify-start gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {instructor.expertise.map((skill, index) => (
                    <motion.span 
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={12} className="text-blue-500" />
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Message Box */}
              <motion.div 
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Message {instructor.name.split(' ')[0]}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                      Have questions? Send a message to the instructor.
                    </p>
                    <motion.button
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Open LinkedIn profile in a new tab
                        if (instructor.social?.linkedin) {
                          window.open(instructor.social.linkedin, '_blank', 'noopener,noreferrer');
                        } else {
                          // Fallback to email if LinkedIn is not available
                          window.location.href = `mailto:${instructor.email}?subject=Question about your course`;
                        }
                      }}
                    >
                      <MessageCircle size={16} />
                      Contact via LinkedIn
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}