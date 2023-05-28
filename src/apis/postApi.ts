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

const viewStatus = async (id: string) => {
  return await axiosInstance.post(`/Status/${id}/view`);
};

const deleteStatus = async (id: string) => {
  return await axiosInstance.delete(`/Status/${id}`);
};

export { postStatus, getStatus, viewStatus, deleteStatus };
