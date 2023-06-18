import axiosInstance from './axiosInstance';

const getNoti = async (page: number) => {
  return await axiosInstance.get(`/Noti?PageNumber=${page}&PageSize=10`);
};

export { getNoti };
