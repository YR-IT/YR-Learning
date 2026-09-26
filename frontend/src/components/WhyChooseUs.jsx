import { motion } from "framer-motion";
import { Code, Brain, Zap, Shield, Star, Users, Clock, Award, Monitor, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Live Code Editor",
      description: "Practice coding directly in your browser with our integrated IDE. No setup required, just start coding immediately.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your skill level and learning pace with intelligent recommendations.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      borderColor: "border-purple-200 dark:border-purple-700"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Project-Based Learning",
      description: "Build real-world projects that you can add to your portfolio. Learn by doing, not just watching.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      borderColor: "border-orange-200 dark:border-orange-700"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Industry-Ready Skills",
      description: "Curriculum designed by industry experts to ensure you learn the most in-demand skills employers want.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Online & Offline Access",
      description: "Our platform is available for both online and offline learning, so you can study anytime, anywhere.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-700"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Industry Internships",
      description: "We provide internships on real-time industry projects to help you gain practical experience.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-700"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "10K+", label: "Active Learners", color: "text-blue-600 dark:text-blue-400" },
    { icon: <Clock className="w-6 h-6" />, number: "500+", label: "Hours of Content", color: "text-purple-600 dark:text-purple-400" },
    { icon: <Star className="w-6 h-6" />, number: "4.9", label: "Average Rating", color: "text-orange-600 dark:text-orange-400" },
    { icon: <Award className="w-6 h-6" />, number: "95%", label: "Success Rate", color: "text-green-600 dark:text-green-400" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Why Choose YR-Learning?</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Transform Your Skills with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> Modern Learning</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the future of education with our cutting-edge platform designed to make learning 
            interactive, engaging, and effective for the modern developer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} rounded-2xl p-4 sm:p-6 h-full transition-all duration-300 group-hover:shadow-xl dark:group-hover:shadow-gray-800/30 group-hover:border-opacity-50`}>
                <div className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-center">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-center">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        

        
      </div>
    </section>
  );
}
