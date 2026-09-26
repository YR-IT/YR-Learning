import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Send
} from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white dark:bg-gray-400 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white dark:bg-gray-400 rounded-full translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white dark:bg-gray-400 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                Yr-learning
              </span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              Empowering learners worldwide with cutting-edge courses and expert instructors. 
              Transform your career with our comprehensive learning platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <Mail size={16} className="text-blue-400 dark:text-blue-300" />
                <span>yr.itsolutions.pvtltd@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <Phone size={16} className="text-blue-400 dark:text-blue-300" />
                <span>+91 7404890806</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <MapPin size={16} className="text-blue-400 dark:text-blue-300" />
                <span>Gurugram, Haryana, India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Courses", path: "/courses" },
                { name: "About Us", path: "/about" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "Login", path: "/login" },
                { name: "Sign Up", path: "/signup" },
              ].map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <ArrowRight size={14} />
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Course Categories</h3>
            <div className="space-y-3">
              {[
                "Web Development",
                "React Development", 
                "AI & Machine Learning",
                "Programming Languages",
                "Data Science",
                "Mobile Development"
              ].map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/courses#${category.replace(/\s+/g, '%20')}`}
                    className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <ArrowRight size={14} />
                    <span>{category}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest courses and learning tips.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 focus:border-transparent transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={14} />
                </motion.button>
              </div>
            </form>

            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 dark:text-green-300 text-sm mt-2"
              >
                ✓ Successfully subscribed!
              </motion.div>
            )}

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: "hover:text-blue-400 dark:hover:text-blue-300", link: "https://www.facebook.com/profile.php?id=61577752955890&rdid=ILY8kzZlwX92GdoH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F162i8uqYzy%2F#" },
                  { icon: Instagram, color: "hover:text-pink-400 dark:hover:text-pink-300", link: "https://www.instagram.com/yritsolutions2025?utm_source=ig_contact_invite" },
                  { icon: Linkedin, color: "hover:text-blue-400 dark:hover:text-blue-300", link: "https://www.linkedin.com/in/yashika-sharma1775/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                  { icon: Youtube, color: "hover:text-red-400 dark:hover:text-red-300", link: "https://www.youtube.com/@yritsolutions" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-300 dark:text-gray-400 ${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/50 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-gray-300 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Yr-learning. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>

        {/* Development Credit */}
        <motion.div 
          className="mt-4 pt-4 border-t border-white/10 dark:border-gray-800/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
        </motion.div>
      </div>
    </footer>
  );
}
