import api from './axios';

export const enrollCourse = async (courseId) => {
  const res = await api.post('/enrollments', { courseId });
  return res.data;
};

export const getMyEnrollments = async () => {
  const res = await api.get('/enrollments/my');
  return res.data;
};
