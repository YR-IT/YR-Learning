import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Login from "./pages/Login";
import AddStudent from "./pages/AddStudent";
import Refreshhandler from "./handlers/refreshhandler";
import CreatorPanel from "./panels/creatorpanel";
import AddCourse from "./panels/AddCourse";
import ManageCourses from "./panels/ManageCourses";
import EnrolledStudents from "./panels/EnrolledStudents";
import ManageArticles from "./panels/ManageArticles";
import EditCourse from "./panels/EditCourse";
import EditBanner from "./panels/EditBanner";
import Chatbot from "./components/Chatbot";
import FloatingChatbot from "./components/FloatingChatbot";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import InstructorManager from "./panels/EditInstructorBanner";
import Article from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import EnrollmentPage from "./pages/EnrollmentPage";
import authService from "./services/authService";

// Protected Admin Route
const AdminRoute = ({ children, isAuthenticated }) => {
  const isAuth = isAuthenticated || authService.isAuthenticated();
  return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  useEffect(() => {
    // Show initial loader for first-time page load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Router>
          <ScrollToTop />
          <Refreshhandler SetIsAuthenticated={setIsAuthenticated} />
          <div className="pt-20">
            <Navbar SetisAuthenticated={setIsAuthenticated} />
            
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/articles" element={<Article />} />
              <Route path="/articles/:articleId" element={<ArticleDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/enroll" element={<EnrollmentPage />} />
              <Route path="/enrollment" element={<EnrollmentPage />} />
              
              {/* Admin Login Route */}
              <Route path="/login" element={<Login SetIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Navigate to="/login" replace />} />
              
              {/* Removed routes redirect gracefully */}
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/ide" element={<Navigate to="/" replace />} />
              
              {/* Protected Admin Creator Panel */}
              <Route 
                path="/panel" 
                element={
                  <AdminRoute isAuthenticated={isAuthenticated}>
                    <CreatorPanel />
                  </AdminRoute>
                }
              >
                <Route index element={<Navigate to="manage-courses" replace />} />
                <Route path="manage-courses" element={<ManageCourses />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="edit-banner" element={<EditBanner />} />
                <Route path="edit-course/:courseId" element={<EditCourse />} />
                <Route path="enrolled-students" element={<EnrolledStudents />} />
                <Route path="articles" element={<ManageArticles />} />
                <Route path="mobilebanners" element={<InstructorManager />} />
                <Route path="add-student" element={<AddStudent />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Footer />
            <FloatingChatbot />
          </div>
          <Toaster position="top-right" />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;