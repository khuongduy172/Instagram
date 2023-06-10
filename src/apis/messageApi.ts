import axiosInstance from './axiosInstance';

const getMessages = async (page: number, userId: string) => {
  return await axiosInstance.get(
    `/Message/user/${userId}?PageNumber=${page}&PageSize=15`,
  );
};

const sendMessage = async (data: any) => {
  return await axiosInstance.post('/Message', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getUserMessageList = async () => {
  return await axiosInstance.get(`/Message/list`);
};

export { getMessages, sendMessage, getUserMessageList };
