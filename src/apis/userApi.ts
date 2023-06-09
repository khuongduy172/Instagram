import axiosInstance from './axiosInstance';

interface UserResponse {
  id: string;
  email: string;
  bio: string;
  name: string;
  username: string;
  avatar: string;
  dayOfBirth: Date;
  gender: string;
  phone: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isOwner: boolean;
  followStatus: string;
  followers: { userId: string; followerId: string }[];
  followings: { userId: string; followerId: string }[];
}

interface UserEdit {
  name: string;
  username: string;
  bio: string;
}

const getUserOwner = async () => {
  return await axiosInstance.get<UserResponse, any>('/User/me');
};

const getUserById = async (userId: string) => {
  return await axiosInstance.get<UserResponse, any>(`/User/${userId}`);
};

interface SearchUserResponse {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  followers: { userId: string; followerId: string }[];
}

const searchUser = async (keyword: string) => {
  return await axiosInstance.get<SearchUserResponse[], any>(
    `/User/search?keyword=${keyword}`,
  );
};

const editUserOwner = async (data: any) => {
  return await axiosInstance.put<UserEdit, any>('/User', data);
};

const updateUserImage = async (data: any) => {
  return await axiosInstance.post('/User/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export {
  getUserOwner,
  editUserOwner,
  updateUserImage,
  getUserById,
  searchUser,
};
export type { UserResponse, SearchUserResponse };
