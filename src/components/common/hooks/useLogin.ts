// //how to use AsyncStorage in with react query in authentication
// //
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useMutation, useQueryClient} from 'react-query';
// import { postLogin } from '../../../apis/userApi';

// const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async (data: any) => {
//       return await axiosInstance
//         .post('/Auth/login', data)
//         .then((response: any) => {
//           return response;
//         })
//         .catch(error => {
//           return {success: false, error: error};
//         });
//     },
//     {
//       onSuccess: async (data: any) => {
//         await AsyncStorage.setItem('accessToken', data.accessToken);
//         await AsyncStorage.setItem('refreshToken', data.refreshToken);
//         queryClient.invalidateQueries('user');
//       },
//     },
//   );
// };

// export default useLogin;
// //
