import axiosInstance from './axiosInstance';

const postReels = async (data: any) => {
  return await axiosInstance.post('/Reel', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { postReels };
