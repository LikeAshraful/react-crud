
import axiosInstance from './components/axiosInstance';

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (!token) {
        throw new Error('Not authenticated');
    }        
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error('Not authenticated');
  }
};
