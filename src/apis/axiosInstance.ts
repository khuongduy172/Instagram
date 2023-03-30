import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  // baseURL: 'https://dfd6-113-161-77-200.ap.ngrok.io/api',
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
  async function (error) {
    console.log(error);
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const body = {
        token: await AsyncStorage.getItem('accessToken'),
        refreshToken: await AsyncStorage.getItem('refreshToken'),
      };
      const result = await axiosInstance.post<any, AuthResponse>(
        '/Auth/refresh',
        body,
      );
      if (result?.token) {
        await AsyncStorage.setItem('accessToken', result.token);
        await AsyncStorage.setItem('refreshToken', result.refreshToken);
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.token}`,
        };
        console.log('refetch');
        return axios(config);
      } else {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
