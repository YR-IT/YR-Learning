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

  // Get single course by ID or slug
  async getCourseById(id) {
    try {
      const response = await api.get(`/courses/${encodeURIComponent(id)}`);
      if (response?.data) return response.data;
    } catch (error) {
      console.warn(`Direct fetch for course "${id}" failed, trying live catalog:`, error.message);
    }

    // Try fetching live courses from backend
    try {
      const allLiveCourses = await this.getAllCourses();
      if (Array.isArray(allLiveCourses) && allLiveCourses.length > 0) {
        const cleanId = String(id).toLowerCase().replace(/[^a-z0-9]/g, '');
        const match = allLiveCourses.find((c) => {
          const cId = String(c._id || c.id || '').toLowerCase();
          const cSlug = String(c.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const cTitle = String(c.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          return (
            cId === String(id).toLowerCase() ||
            cSlug === cleanId ||
            cTitle === cleanId ||
            (cleanId.includes('uiux') && (cSlug.includes('uiux') || cTitle.includes('uiux'))) ||
            (cleanId.startsWith('ui') && cleanId.includes('ux') && (cSlug.includes('uiux') || cTitle.includes('uiux'))) ||
            (cleanId.includes('seo') && (cSlug.includes('marketing') || cTitle.includes('marketing'))) ||
            (cleanId.includes('marketing') && (cSlug.includes('marketing') || cTitle.includes('marketing'))) ||
            (cleanId.includes('web') && (cSlug.includes('web') || cTitle.includes('web'))) ||
            (cleanId.includes('machine') && (cSlug.includes('machine') || cTitle.includes('machine'))) ||
            (cleanId.includes('data') && cleanId.includes('science') && (cSlug.includes('science') || cTitle.includes('science'))) ||
            ((cleanId.includes('java') || cleanId.includes('dsa') || cleanId.includes('structure')) && (cSlug.includes('java') || cTitle.includes('java')))
          );
        });
        if (match) return match;
      }
    } catch (allErr) {
      console.warn('All-courses lookup failed:', allErr.message);
    }

    // Offline fallback only when backend is unreachable
    try {
      const fallback = await import('../data/frontendcourses.js');
      const courses = fallback.default || [];
      const cleanId = String(id).toLowerCase().replace(/[^a-z0-9]/g, '');
      return courses.find((c) => {
        const cId = String(c._id || c.id || '').toLowerCase();
        const cSlug = String(c.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return (
          cId === String(id).toLowerCase() ||
          cSlug === cleanId ||
          (cleanId.includes('uiux') && (cSlug.includes('uiux') || cSlug.includes('ui'))) ||
          (cleanId.startsWith('ui') && cleanId.includes('ux') && cSlug.includes('ui')) ||
          (cleanId.includes('seo') && cSlug.includes('digital-marketing'))
        );
      }) || null;
    } catch {
      return null;
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
