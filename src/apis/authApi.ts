import axiosInstance from './axiosInstance';

interface AuthResponse {
  userId: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

const postLogin = async (data: any) => {
  return await axiosInstance
    .post<any, AuthResponse>('/Auth/login', data)
    .then(response => {
      return response;
    })
    .catch(error => {});
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

const forgotPassword = async (email: string) => {
  return await axiosInstance.put('/Auth/password-reset', { email });
};

export { postLogin, postRegister, postExternalLogin, forgotPassword };
export type { AuthResponse, ExternalLoginBody };
