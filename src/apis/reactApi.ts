import axiosInstance from './axiosInstance';

const postReact = async (id: string) => {
  return await axiosInstance.post(`/Status/${id}/react`);
};

export { postReact };
