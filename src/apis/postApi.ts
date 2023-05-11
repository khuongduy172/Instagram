import axiosInstance from './axiosInstance';

const postStatus = async (data: any) => {
  return await axiosInstance.post('/Status', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getStatus = async () => {
  return await axiosInstance.get('/Status/home');
};

export { postStatus, getStatus };
