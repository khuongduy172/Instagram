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

interface ICreateCommentRequest {
  statusId: string;
  content: string;
}

const postComment = async (data: ICreateCommentRequest) => {
  return await axiosInstance.post(`/Status/${data.statusId}/comment`, data);
};

const getStatusCommentByPage = async (page: number, statusId: string) => {
  return await axiosInstance.get(
    `/Status/${statusId}/comment?PageNumber=${page}&PageSize=8`,
  );
};

export {
  postStatus,
  getStatus,
  viewStatus,
  deleteStatus,
  postComment,
  getStatusCommentByPage,
};
