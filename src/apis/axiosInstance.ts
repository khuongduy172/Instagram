import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from './authApi';
import store from '../redux/store';
import { setLoggedIn } from '../redux/authSlice';

const axiosInstance = axios.create({
  // baseURL: 'https://83ba-123-21-33-87.ngrok-free.app/api',
  baseURL: 'http://192.168.218.32/api',
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    const token = await AsyncStorage.getItem('accessToken');

    // console.log('token: ', token);
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
      try {
        config.sent = true;

        const body = {
          token: await AsyncStorage.getItem('accessToken'),
          refreshToken: await AsyncStorage.getItem('refreshToken'),
        };

        if (!body.token || !body.refreshToken) {
          console.log('body: ', body);
          store.dispatch(setLoggedIn(false));
          return Promise.reject(error);
        }

        const result = await axiosInstance.post<any, AuthResponse>(
          '/Auth/refresh',
          body,
        );
        if (result?.token) {
          await AsyncStorage.setItem('accessToken', result.token);
          await AsyncStorage.setItem('refreshToken', result.refreshToken);
          await AsyncStorage.setItem('currentUserId', result.userId);
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result?.token}`,
          };
          console.log('refetched');
          return axios(config);
        } else {
          console.log("Can't refresh token");
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('currentUserId');
          store.dispatch(setLoggedIn(false));
        }
      } catch (error) {
        console.log(error);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('currentUserId');
        store.dispatch(setLoggedIn(false));
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
