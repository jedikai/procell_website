import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { USER_LOG_IN } from "../query-keys/loginQuery.keys";

// const userLogin = async (body: object) => {
//   const res = await axiosInstance.post(endpoints.app.user_login, body);
//   return res;
// };

// export const useUserLogin = () =>
//   useMutation(userLogin);

// const userLogin = async (body: object) => {
//   const res = await axiosInstance.get(endpoints.app.user_login, body);
//   return res;
// };

// export const useUserLogin = (
//   payload: object = {},
//   enabled: boolean = false,
//   onSuccess: any = () => {},
//   onError: any = () => {}
// ) =>
//   useQuery([USER_LOG_IN], () => userLogin(payload), {
//     onSuccess,
//     onError,
//     enabled,
//     refetchOnWindowFocus: false
//     // select: (data) => data?.data?.data ?? []
//   });

const userLogin = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.user_login, body);
  return res;
};

export const useUserLogin = () => useMutation(userLogin);

const resetPassword = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.reset_password, body);
  return res;
};

export const useResetPassword = () => useMutation(resetPassword);
