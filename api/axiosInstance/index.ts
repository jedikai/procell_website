import {
  globalCatchSucess,
  globalCatchWarning
} from "@/lib/functions/_helpers.lib";
import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { baseUrlApi, sucessNotificationEndPoints } from "../endpoints";
// import { refreshAccessToken } from "../functions/user.api";
import { BaseApiResponse } from "@/interface/common.interface";

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const cookies = parseCookies();
  config.params = config.params || {};
  // const sessionId = cookies?.access_token;
  // console.log(sessionId);
  // if (!!sessionId) {
  //   config.params["session_id"] = sessionId;
  // }

  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // only show success notification on this routes

    if (sucessNotificationEndPoints.includes(res.config.url as string)) {
      if (res?.data?.status !== 200) {
        globalCatchWarning(res);
      } else {
        globalCatchSucess(res);
      }
    }

    return res;
  },
  async (error: AxiosError<BaseApiResponse>) => {
    const originalRequest = error.config;

    return Promise.reject(error);
  }
);

export default axiosInstance;
