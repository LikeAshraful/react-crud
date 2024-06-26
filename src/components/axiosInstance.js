import axios from 'axios';

// Create an instance of axios with custom config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default axiosInstance;
