import axiosInstance from './axiosInstance';

const postStatus = async (data: any) => {
  return await axiosInstance.post('/Status', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getStatus = async () => {
  return await axiosInstance.get('/Status/home?PageNumber=4&PageSize=6');
};

export { postStatus, getStatus };
