import { motion } from "framer-motion";
import { Star, Users, BookOpen, ExternalLink } from "lucide-react";

export default function InstructorCard({ instructor }) {
  return (
    <motion.div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-2 right-2 w-3 h-3 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-2 h-2 bg-purple-200 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ 
          x: [0, 8, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        <motion.div className="relative mb-4">
          <motion.img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-blue-200 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Users size={12} />
          </motion.div>
        </motion.div>

        <motion.h3 
          className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          {instructor.name}
        </motion.h3>

        <motion.p 
          className="text-gray-600 text-sm mb-4 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {instructor.bio}
        </motion.p>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-4 w-full mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-semibold">4.9</span>
            </div>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-blue-500 mb-1">
              <BookOpen size={14} />
              <span className="text-xs font-semibold">12</span>
            </div>
            <span className="text-xs text-gray-500">Courses</span>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const url = instructor?.linkedin || instructor?.social?.linkedin;
            if (url && url !== '#') {
              window.open(url, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <span>View Profile</span>
          <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}