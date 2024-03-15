import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  GET_INVOICE_DOWNLOAD,
  GET_INVOICE_LIST,
  GET_MANAGE_COMMUNICATION_DATA,
  GET_PROFILE_DETAILS,
  GET_PURCHASE_LIST,
  GET_QUOTATION_LIST,
  GET_SALES_LIST
} from "../query-keys/dashboardQuery.keys";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

// <------------------------------ PROFILE SECTION APIS------------------------------>
const getProfileDetails = async () => {
  const res = await axiosInstance.get(endpoints.app.profile_details);
  return res;
};

export const useProfileDetails = (
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false
) =>
  useQuery([GET_PROFILE_DETAILS], getProfileDetails, {
    onSuccess,
    onError,
    enabled,
    retry: false,
    select: (data) => data?.data?.data ?? []
  });

const updateProfile = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.update_profile, body);
  return res;
};

export const useUpdateProfile = () => useMutation(updateProfile);

const deleteProfile = async (body: object) => {
  const res = await axiosInstance.delete(endpoints.app.delete_profile, body);
  return res;
};

export const useDeleteProfile = () => useMutation(deleteProfile);

// <------------------------------ QUATATION SECTION APIS------------------------------>
const getQuotationList = async (page: number, type: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.quotation_list}/page/${page}?sortby=${type}`
  );
  return res;
};

export const useQuotationList = (
  page: number = 1,
  type: string = "date",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery(
    [GET_QUOTATION_LIST, page, type],
    () => getQuotationList(page, type),
    {
      onSuccess,
      onError,
      select: (data) => data?.data?.data ?? []
    }
  );
// <------------------------------ SALES SECTION APIS------------------------------>
const getSalesList = async (page: number, type: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.sales_list}/page/${page}?sortby=${type}`
  );
  return res;
};

export const useSalesList = (
  page: number = 1,
  type: string = "date",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_SALES_LIST, page, type], () => getSalesList(page, type), {
    onSuccess,
    onError,
    enabled: false,
    select: (data) => data?.data?.data ?? []
  });

  const orderListSearch = async (body: object) => {
    const res = await axiosInstance.post(endpoints.app.sales_list_serach, body);
    return res;
  };
  
  export const useOrderListSearch = () => useMutation(orderListSearch);
// <------------------------------ INVOICE SECTION APIS ------------------------------>
const getInvoiceList = async (page: number, type: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.invoice_list}/page/${page}?sortby=${type}`
  );
  return res;
};

export const useInvoiceList = (
  page: number = 1,
  type: string = "date",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_INVOICE_LIST, page, type], () => getInvoiceList(page, type), {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });
// <------------------------------ INVOICE DOWNLOAD SECTION APIS ------------------------------>
const getInvoiceDownload = async (id: number | string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.download_invoice}/${id}`
  );
  return res;
};

export const useInvoiceDownload = (
  id: number | string,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_INVOICE_DOWNLOAD, id], () => getInvoiceDownload(id), {
    onSuccess,
    onError
    // select: (data) => data?.data?.data ?? []
  });

// <------------------------------ PURCHASE SECTION APIS------------------------------>
const getPurchaseList = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.purchase_list}?sortby=date`
  );
  return res;
};

export const usePurchaseList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_PURCHASE_LIST], getPurchaseList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

// <------------------------------ CHANGE PASSWORD APIS------------------------------>
const changePassword = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.change_password, body);
  return res;
};

export const useChangePassword = () => useMutation(changePassword);

const getMannageCommunicationData = async () => {
  const res = await axiosInstance.get(
    endpoints.app.get_manage_communication_data
  );
  return res;
};

export const useMannageCommunicationData = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_MANAGE_COMMUNICATION_DATA], getMannageCommunicationData, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const updateMannageCommunication = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints.app.get_manage_communication_data,
    body
  );
  return res;
};

export const useUpdateMannageCommunication = () =>
  useMutation(updateMannageCommunication);
