import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'http://10.0.2.2:80/api',
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
