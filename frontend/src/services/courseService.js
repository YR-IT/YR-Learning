import api from './api';

export const courseService = {
  // Get all courses with optional filters
  async getAllCourses(params = {}) {
    try {
      const response = await api.get('/courses', { params });
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return response.data || [];
    } catch (error) {
      console.warn('Backend unavailable on primary URL, trying alternative:', error.message);
      try {
        const altBase = api.defaults.baseURL && api.defaults.baseURL.includes('localhost')
          ? 'https://yr-learning.onrender.com/api'
          : 'http://localhost:5000/api';
        const altResponse = await fetch(`${altBase}/courses`, { signal: AbortSignal.timeout(4000) });
        if (altResponse.ok) {
          const data = await altResponse.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      } catch (altErr) {
        console.warn('Alternative backend URL also failed:', altErr.message);
      }
      // Fallback to local import if all backends are offline
      try {
        const fallback = await import('../data/frontendcourses.js');
        return fallback.default || [];
      } catch {
        return [];
      }
    }
  },

  // Get single course by ID
  async getCourseById(id) {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Error fetching course ${id} from backend:`, error.message);
      try {
        const fallback = await import('../data/frontendcourses.js');
        const courses = fallback.default || [];
        return courses.find((c) => String(c._id) === String(id) || String(c.id) === String(id)) || null;
      } catch {
        return null;
      }
    }
  },

  // Create course (Admin)
  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Update course (Admin)
  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  // Delete course (Admin)
  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Lessons
  async getLessons(courseId) {
    const response = await api.get(`/course/lessons/${courseId}`);
    return response.data;
  },

  async addLesson(courseId, lessonData) {
    const response = await api.post(`/course/addlessons/${courseId}`, lessonData);
    return response.data;
  },

  async updateLesson(courseId, lessonData) {
    const response = await api.put(`/course/updatelessons/${courseId}`, lessonData);
    return response.data;
  },

  async deleteLesson(courseId, lessonId) {
    const response = await api.delete(`/course/deletelessons/${courseId}/${lessonId}`);
    return response.data;
  },

  // Students
  async getStudents() {
    const response = await api.get('/course/getstudents');
    return response.data;
  }
};

export default courseService;
