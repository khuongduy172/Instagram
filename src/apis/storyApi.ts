import axiosInstance from './axiosInstance';

const postStory = async (data: any) => {
  return await axiosInstance.post('/Story', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getStory = async () => {
  return await axiosInstance.get(`/Story`);
};

export { postStory, getStory };
