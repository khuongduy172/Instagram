import axiosInstance from './axiosInstance';

const postReels = async (data: any) => {
  return await axiosInstance.post('/Reel', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getReels = async () => {
  return await axiosInstance.get('/Reel');
};

export { postReels, getReels };
