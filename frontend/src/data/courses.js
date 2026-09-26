import courseService from '../services/courseService';

const getCourses = async () => {
  try {
    return await courseService.getAllCourses();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export { getCourses };
export default getCourses;