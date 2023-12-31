import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "react-query";
import { RESULT_LIST } from "../query-keys/resultQuery.keys";

const getResultList = async (apiUrl: string) => {
  const res = await axiosInstance.get(
    apiUrl
    // `https://graph.instagram.com/v12.0/me/media?fields=id,username,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${process.env.NEXT_AUTHORIZATION_INSTAGRAM_ACCESS_TOKEN}`
    // `https://graph.facebook.com/v3.2/6800647433345096?fields=business_discovery.username(rozenworld){followers_count,media_count,media{comments_count,like_count}}&access_token=${process.env.NEXT_AUTHORIZATION_INSTAGRAM_ACCESS_TOKEN}`
  );
  return res;
};

export const useResultList = (
  apiUrl: string = "",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([RESULT_LIST], () => getResultList(apiUrl), {
    onSuccess,
    onError,
    enabled: false,
    select: (data) => data?.data ?? {}
  });
