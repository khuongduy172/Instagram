import axiosInstance from './axiosInstance';

const postStory = async (data: any) => {
  return await axiosInstance.post('/Story', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { postStory };
