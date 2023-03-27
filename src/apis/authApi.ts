import axiosInstance from './axiosInstance';

interface AuthResponse {
  userId: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

const postLogin = async (data: any) => {
  return await axiosInstance
    .post('/Auth/login', data)
    .then((response: any) => {
      return response;
    })
    .catch(error => {
      return { success: false, error: error };
    });
};

interface ExternalLoginBody {
  provider: string;
  idToken: string;
}

const postExternalLogin = async (data: ExternalLoginBody) => {
  return await axiosInstance.post<ExternalLoginBody, AuthResponse>(
    '/Auth/external-login',
    data,
  );
};

const postRegister = async (data: any) => {
  return await axiosInstance.post('/Auth/register', data);
};

export { postLogin, postRegister, postExternalLogin };
export type { AuthResponse, ExternalLoginBody };
