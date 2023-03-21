import axiosInstance from './axiosInstance';

const postLogin = async (data: any) => {
  return await axiosInstance
    .post('/Auth/login', data)
    .then((response: any) => {
      return response;
    })
    .catch(error => {
      return {success: false, error: error};
    });
};

const postRegister = async (data: any) => {
  return await axiosInstance.post('/Auth/register', data);
};

export {postLogin, postRegister};
