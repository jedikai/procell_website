import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "react-query";

const trackUser = async (body: object) => {
    const res = await axiosInstance.post(endpoints.app.track_user, body);
    return res;
  };
  
  export const useTrackUser = () => useMutation(trackUser);