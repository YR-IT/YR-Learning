import { motion } from "framer-motion";
import { Star, Users, BookOpen, MessageCircle, Twitter, Linkedin, Github, Mail, Award, Check } from "lucide-react";

// Instructor data mapped to course categories/names
const INSTRUCTORS = {
  'data structures': {
    name: "Gauri Singhal",
    role: "DSA & Java Instructor",
    avatar: "/images/dsa_instructor.png",
    bio: "Software Developer at YR IT Solutions, Celebal Technologies | DSE @ Infosys. Passionate about algorithms, interview problem solving, and mentoring students.",
    rating: 4.9,
    students: "6,500+",
    courses: 5,
    expertise: ["Java", "Data Structures", "Algorithms", "Competitive Programming", "System Design"],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/gaurisinghal28",
      github: "#"
    },
    email: "gauri@example.com"
  },
  'digital marketing': {
    name: "Divyaraj Kush",
    role: "Digital Marketing Lead",
    avatar: "/seo_and_marketing_trainer.jpeg",
    bio: "Digital Marketing and Growth Strategist specializing in search engine optimization, content scaling, and performance marketing.",
    rating: 4.8,
    students: "8,900+",
    courses: 11,
    expertise: ["Digital Marketing", "SEO", "Content Marketing", "Google Ads", "Social Media", "Analytics"],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "divyaraj@example.com"
  },
  'graphic designing': {
    name: "Isha",
    role: "UI/UX Design Specialist",
    avatar: "/images/trainer2.jpg",
    bio: "Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.",
    rating: 4.9,
    students: "7,800+",
    courses: 9,
    expertise: ["UI/UX", "Design Systems", "Wireframing", "User Research"],
    social: {
      twitter: "#",
      linkedin: "https://LinkedIn.com/in/isha-uiux",
      github: "#"
    },
    email: "isha@example.com"
  },
  'data science': {
    name: "Vinay Sheoran",
    role: "Senior Data Science Trainer",
    avatar: "/images/trainer1.jpg",
    bio: "Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
    rating: 4.9,
    students: "10,000+",
    courses: 15,
    expertise: ["Python", "SQL", "PowerBI", "Statistical Analysis"],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/vinay-sheoran-262a79295/",
      github: "#"
    },
    email: "vinay@example.com"
  },
  'web development': {
    name: "Aditya Naulakha & Harshvardhan Gupta",
    role: "Frontend & Backend Development Leads",
    avatar: "/frontend_trainer.jpeg",
    bio: "Aditya Naulakha (Frontend Lead): Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems. Harshvardhan Gupta (Backend Lead): Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.",
    rating: 4.9,
    students: "12,000+",
    courses: 18,
    expertise: ["Frontend (React.js)", "Backend (Node.js)", "Cloud Computing", "AI Solutions", "Express", "MongoDB", "SaaS Architecture"],
    instructors: [
      {
        name: "Aditya Naulakha",
        role: "Frontend Web Development Lead",
        avatar: "/frontend_trainer.jpeg",
        bio: "Software developer passionate about AI, full-stack development, and SaaS products. Leadership experience as President of DROID Club and upcoming AI-Native Software Engineer at EPAM Systems.",
        expertise: ["Frontend", "React.js", "AI-Driven Solutions", "SaaS"],
        linkedin: "https://www.linkedin.com/in/aditya-naulakha"
      },
      {
        name: "Harshvardhan Gupta",
        role: "Backend Web Development Lead",
        avatar: "/backend_trainer.jpeg",
        bio: "Software developer passionate about backend development, cloud computing, and AI. Leadership experience as Vice President of DROID Club and upcoming Programmer Analyst Trainee at Cognizant.",
        expertise: ["Backend", "Cloud Computing", "AI", "Node.js", "Express", "System Design", "MongoDB"],
        linkedin: "https://www.linkedin.com/in/harshvardhan-gupta-19298b28b/"
      }
    ],
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    email: "yrelearning@gmail.com"
  },
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
    name: "Gauri Sharma",
    role: "AIML Engineer",
    avatar: "/images/ml_instructor.jpeg",
    bio: "Currently working at Opalina. Ex-CA with 1.5 years of corporate experience and 3+ years of mentoring and training more than 1,000 students across the globe.",
    rating: 4.8,
    students: "1,000+",
    courses: 14,
    expertise: ["AI & Machine Learning", "Python", "Deep Learning", "Model Deployment"],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/gauri-sharma-gs06102003/",
      github: "#"
    },
    email: "gauri.sharma@example.com"
  },
  'ui/ux design': {
    name: "Isha",
    role: "UI/UX Design Specialist",
    avatar: "/images/trainer2.jpg",
    bio: "Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.",
    rating: 4.9,
    students: "6,700+",
    courses: 9,
    expertise: ["UI/UX", "Design Systems", "Wireframing", "User Research"],
    social: {
      twitter: "#",
      linkedin: "https://LinkedIn.com/in/isha-uiux",
      github: "#"
    },
    email: "isha@example.com"
  },
  'default': {
    name: "Gauri Singhal",
    role: "DSA & Java Instructor",
    avatar: "/images/dsa_instructor.png",
    bio: "Software Developer at YR IT Solutions, Celebal Technologies | DSE @ Infosys. Expert in Java, algorithms, and interview preparation.",
    rating: 4.9,
    students: "8,500+",
    courses: 12,
    expertise: ["Java", "Data Structures", "Algorithms", "Interview Prep"],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/gaurisinghal28",
      github: "#"
    },
    email: "gauri@example.com"
  }
};

export default function InstructorCard({ courseTitle = '', instructor: propInstructor }) {
  const sanitize = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
      .replace(/vijay\s+sheoran/gi, 'Vinay Sheoran')
      .replace(/vijay/gi, 'Vinay')
      .replace(/divyaRaj/g, 'Divyaraj')
      .replace(/divyaraj/gi, 'Divyaraj')
      .replace(/aaditya\s+naulakha/gi, 'Aditya Naulakha')
      .replace(/aaditya/gi, 'Aditya');
  };

  // Get instructor based on course title or use the provided instructor prop
  const getInstructor = () => {
    const lowerTitle = courseTitle.toLowerCase();
    let defaultByTitle = INSTRUCTORS['default'];

    if (lowerTitle.includes('data structure') || lowerTitle.includes('dsa') || lowerTitle.includes('java')) {
      defaultByTitle = INSTRUCTORS['data structures'];
    } else if (lowerTitle.includes('web') || lowerTitle.includes('frontend') || lowerTitle.includes('full stack')) {
      defaultByTitle = INSTRUCTORS['web development'];
    } else if (lowerTitle.includes('digital') || lowerTitle.includes('seo') || lowerTitle.includes('marketing')) {
      defaultByTitle = INSTRUCTORS['digital marketing'];
    } else if (lowerTitle.includes('graphic') || lowerTitle.includes('video') || lowerTitle.includes('editing')) {
      defaultByTitle = INSTRUCTORS['graphic designing'];
    } else if (lowerTitle.includes('machine learning') || lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence')) {
      defaultByTitle = INSTRUCTORS['machine learning'];
    } else if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) {
      defaultByTitle = INSTRUCTORS['data science'];
    } else if (lowerTitle.includes('cyber') || lowerTitle.includes('security')) {
      defaultByTitle = INSTRUCTORS['cyber security'];
    } else if (lowerTitle.includes('ui') || lowerTitle.includes('ux') || lowerTitle.includes('design')) {
      defaultByTitle = INSTRUCTORS['ui/ux design'];
    }

    let resolved = defaultByTitle;

    if (propInstructor) {
      if (typeof propInstructor === 'object' && propInstructor.name) {
        resolved = {
          ...defaultByTitle,
          ...propInstructor,
          role: propInstructor.role || defaultByTitle.role || 'Course Instructor',
          avatar: propInstructor.avatar || defaultByTitle.avatar || '/images/dsa_instructor.png',
          bio: propInstructor.bio || defaultByTitle.bio,
        };
      } else if (typeof propInstructor === 'string') {
        const found = Object.values(INSTRUCTORS).find(i => i.name.toLowerCase() === propInstructor.toLowerCase());
        if (found) resolved = found;
      }
    }

    return {
      ...resolved,
      name: sanitize(resolved.name),
      role: sanitize(resolved.role),
      bio: sanitize(resolved.bio),
      email: resolved.email ? sanitize(resolved.email.toLowerCase()) : resolved.email,
      instructors: Array.isArray(resolved.instructors)
        ? resolved.instructors.map((inst) => ({
            ...inst,
            name: sanitize(inst.name),
            role: sanitize(inst.role),
            bio: sanitize(inst.bio),
            linkedin: inst.linkedin ? sanitize(inst.linkedin) : inst.linkedin,
          }))
        : resolved.instructors,
    };
  };

  const instructor = getInstructor();

  // If the course has multiple instructors (e.g. Web Development with Frontend & Backend leads)
  if (instructor.instructors && instructor.instructors.length > 0) {
    return (
      <div className="relative max-w-6xl mx-auto space-y-6">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

        <div className="text-center sm:text-left mb-2">
          <p className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-1">
            Dedicated Mentors
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Learn from Frontend &amp; Backend Specialists
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {instructor.instructors.map((inst, index) => (
            <motion.div
              key={index}
              className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 dark:border-gray-700/50 group flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Gradient accent line */}
              <div
                className={`h-1.5 bg-gradient-to-r ${
                  index === 0
                    ? 'from-emerald-500 via-teal-500 to-sky-500'
                    : 'from-blue-600 via-indigo-600 to-purple-600'
                } transition-all duration-300 group-hover:h-2`}
              />

              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  {/* Profile Image */}
                  <div className="relative shrink-0">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${
                        index === 0 ? 'from-teal-500 to-emerald-600' : 'from-blue-600 to-indigo-600'
                      } rounded-2xl opacity-70 group-hover:opacity-100 blur-md transition-all duration-300`}
                    />
                    <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                      <img
                        src={inst.avatar}
                        alt={inst.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          objectPosition:
                            inst.avatar?.includes('frontend_trainer') || inst.name?.includes('Aditya')
                              ? 'top center'
                              : 'center',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/trainer3.jpg';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 z-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-1.5 rounded-full shadow-md">
                      <Award size={16} className="text-yellow-300" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {inst.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          index === 0
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
                        }`}
                      >
                        {inst.role}
                      </span>
                      {inst.linkedin && (
                        <a
                          href={inst.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white text-xs font-semibold transition-all shadow-sm border border-blue-200 dark:border-blue-800/50"
                        >
                          <Linkedin size={12} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {inst.bio}
                    </p>
                  </div>
                </div>

                {/* Expertise Tags */}
                {inst.expertise && (
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/60">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {inst.expertise.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                        >
                          <Check size={11} className="text-blue-500 shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

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
                  style={{
                    objectPosition: instructor.avatar?.includes('frontend_trainer') || instructor.name?.includes('Aditya') ? 'top center' : 'center',
                  }}
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
                        const linkedinUrl = instructor.social?.linkedin || instructor.linkedin;
                        if (linkedinUrl && linkedinUrl !== '#') {
                          window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.href = `mailto:${instructor.email}?subject=Question about your course`;
                        }
                      }}
                    >
                      <Linkedin size={16} />
                      Connect on LinkedIn
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