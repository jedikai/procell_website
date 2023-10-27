import { useMutation, useQuery } from "react-query";
import {
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
  onError: any = () => {}
) =>
  useQuery([GET_PROFILE_DETAILS], getProfileDetails, {
    onSuccess,
    onError,
    enabled: false,
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
const getQuotationList = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.quotation_list}?sortby=date`
  );
  return res;
};

export const useQuotationList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_QUOTATION_LIST], getQuotationList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });
// <------------------------------ SALES SECTION APIS------------------------------>
const getSalesList = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.sales_list}?sortby=date`
  );
  return res;
};

export const useSalesList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_SALES_LIST], getSalesList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
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
