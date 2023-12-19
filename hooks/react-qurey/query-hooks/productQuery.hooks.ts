import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useInfiniteQuery, useQuery } from "react-query";
import { PRODUCT_DETAILS, PRODUCT_LIST } from "../query-keys/productQuery.keys";

const getProductList = async (pageIndex: number, sort: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.product_list}/page/${pageIndex}${sort ? `?${sort}` : ""}`
  );
  return res;
};

export const useProductList = (
  page: number,
  sort: string,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([PRODUCT_LIST, page, sort], () => getProductList(page, sort), {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? [],
    keepPreviousData: true
  });

const getFeaturedProductList = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.product_list}/page/1`
  );
  return res;
};

export const useFeaturedProductList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([PRODUCT_LIST], getFeaturedProductList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data?.products_info ?? [],
  });

const getProductDetails = async (pageId: string | number) => {
  const res = await axiosInstance.get(
    `${endpoints.app.product_details}/?product_tmpl_id=${pageId}`
  );
  return res;
};

export const useProductDetails = (
  pageId: string | number,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([PRODUCT_DETAILS, pageId], () => getProductDetails(pageId), {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? [],
    keepPreviousData: true
  });
