import axiosInstance from './axiosInstance';

interface IPostFollowRequest {
  userId: string;
}

const postFollow = async (data: IPostFollowRequest) => {
  return await axiosInstance.post('/Follow', data);
};

const postUnFollow = async (data: IPostFollowRequest) => {
  return await axiosInstance.post('/Follow/unfollow', data);
};

export { postFollow, postUnFollow };
