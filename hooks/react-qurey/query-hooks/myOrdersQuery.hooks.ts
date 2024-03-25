import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { MY_ORDER_LIST } from "../query-keys/myOrdersQuery.keys";

const getMyOrderListList = async (
  page: string | number,
  sortby: string | number
) => {
  const res = await axiosInstance.get(
    `${endpoints.app.my_order_list}${page ? `/${page}` : ""}${
      sortby ? sortby : ""
    }`
  );
  return res;
};

export const useMyOrderListList = (
  page: string | number,
  sortby: string | number,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery(
    [MY_ORDER_LIST, page, sortby],
    () => getMyOrderListList(page, sortby),
    {
      onSuccess,
      onError,
      refetchOnWindowFocus: false,
      select: (data) => data?.data?.data ?? []
    }
  );
