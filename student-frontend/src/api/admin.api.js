import api from './axios';

export const getAllEnrollments = async () => {
  const res = await api.get('/admin/enrollments');
  return res.data;
};
