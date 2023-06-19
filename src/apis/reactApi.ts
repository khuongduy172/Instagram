import axiosInstance from './axiosInstance';

const postReact = async (id: string) => {
  return await axiosInstance.post(`/Status/${id}/react`);
};

const postReelReact = async (id: string) => {
  return await axiosInstance.post(`/Reel/${id}/react`);
};

export { postReact, postReelReact };
