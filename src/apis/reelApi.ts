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

const viewReels = async (id: string) => {
  return await axiosInstance.post(`/Reel/${id}/view`);
};

const getUserReels = async (id: string) => {
  return await axiosInstance.get(`/Reel/user/${id}`);
};

const deleteReel = async (id: string) => {
  return await axiosInstance.delete(`/Reel/${id}`);
};

export { postReels, getReels, viewReels, getUserReels, deleteReel };
