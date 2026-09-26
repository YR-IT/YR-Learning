import api from './api';

export const submitEnrollment = async (enrollmentData) => {
  const response = await api.post('/enrollments', enrollmentData);
  return response.data;
};

export const getEnrollments = async (params = {}) => {
  const response = await api.get('/enrollments', { params });
  return response.data;
};

export const getEnrollmentById = async (id) => {
  const response = await api.get(`/enrollments/${id}`);
  return response.data;
};

export const updateEnrollmentStatus = async (id, status) => {
  const response = await api.patch(`/enrollments/${id}/status`, { status });
  return response.data;
};

export const deleteEnrollment = async (id) => {
  const response = await api.delete(`/enrollments/${id}`);
  return response.data;
};

export default {
  submitEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
};
