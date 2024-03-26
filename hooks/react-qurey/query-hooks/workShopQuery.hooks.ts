import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { WORKSHOP_LIST } from "../query-keys/workShopQuery.keys";

const getWorkshopList = async () => {
    const res = await axiosInstance.get(
      `${endpoints.app.workshop_list}`
    );
    return res;
  };
  
  export const useWorkshopList = (
    onSuccess: any = () => {},
    onError: any = () => {}
  ) =>
    useQuery([WORKSHOP_LIST],getWorkshopList, {
      onSuccess,
      onError,
      refetchOnWindowFocus: false,
      select: (data) => data?.data?.data ?? []
    });