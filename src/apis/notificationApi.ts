import axiosInstance from './axiosInstance';

const getNoti = async (page: number) => {
  return await axiosInstance.get(`/Noti?PageNumber=${page}&PageSize=10`);
};

const readNoti = async (id: string) => {
  return await axiosInstance.put(`/Noti/${id}/read`);
};

export { getNoti, readNoti };
