import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  Home,
  Info,
  FileText,
  Bot,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/articles", label: "Articles", icon: FileText },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/chatbot", label: "AI Chatbot", icon: Bot },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          borderBottom: "3px solid",
          borderImage: "linear-gradient(to right, #6366f1, #a21caf) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo with hover animation */}
            <motion.div >
              <Link to="/" className="flex items-center ">
                <img
                  src="/images/logo.png"
                  alt="YR IT Solutions"
                  className="h-10 w-auto object-contain hover:opacity-95 transition-opacity"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
                
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                      }`}
                      style={{ position: "relative" }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {/* Animated underline for active */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-underline"
                          className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Top Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-pressed={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] flex flex-col justify-end"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Bottom Sheet Panel */}
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white dark:bg-gray-900 rounded-t-2xl p-4 border-t border-gray-200 dark:border-gray-800 max-h-[70vh] w-full overflow-y-auto"
            >
              <div className="mx-auto max-w-7xl">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-600 dark:bg-blue-400 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}