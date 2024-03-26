// import axiosInstance from "@/api/axiosInstance";
// import axiosInstance from "@/api/axiosInstance";
import axiosInstance from "@/api/axiosInstance";
import { baseUrlApi, endpoints } from "@/api/endpoints";
import axios from "axios";
import { useMutation } from "react-query";

// const axiosInstance = axios.create({
//   baseURL: baseUrlApi,
//   withCredentials: true // Include credentials (cookies)
// });

const logoutPost = async (payload: object) => {
  const { body, options }: any = payload ?? {};
  console.log("session_id", options);
  // const res = await axiosInstance.post(endpoints.app.logout, body, options);
  const res = await axiosInstance.post(endpoints.app.logout);
  return res;
};

export const useLogout = () => useMutation(logoutPost);
