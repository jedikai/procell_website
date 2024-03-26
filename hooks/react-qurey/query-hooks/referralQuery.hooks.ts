import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  CUSTOM_REFERRAL,
  PERSONAL_REFERRAL,
  SCHOOL_REFERRAL
} from "../query-keys/referralQuery.keys";

// <---------------------------- PERSONAL REFERRAL --------------------------------------->
const getPersonalReferralIsValid = async (name: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.personal_referral}${!!name ? `/${name}` : ""}`
  );
  return res;
};

export const usePersonalReferralIsValid = (
  name: any = "",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([PERSONAL_REFERRAL], () => getPersonalReferralIsValid(name), {
    onSuccess,
    onError,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const submitPersonalReferral = async (payload: object) => {
  const { name, body }: any = payload ?? {};
  const res = await axiosInstance.post(
    `${endpoints.app.personal_referral}${!!name ? `/${name}` : ""}`,
    body
  );
  return res;
};

export const useSubmitPersonalReferral = () =>
  useMutation(submitPersonalReferral);

// <---------------------------- CUSTOM REFERRAL --------------------------------------->

const getCustomReferralIsValid = async (name: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.custom_referral}${!!name ? `/${name}` : ""}`
  );
  return res;
};

export const useCustomReferralIsValid = (
  name: any = "",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([CUSTOM_REFERRAL], () => getCustomReferralIsValid(name), {
    onSuccess,
    onError,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const submitCustomReferral = async (payload: object) => {
  const { name, body }: any = payload ?? {};
  const res = await axiosInstance.post(
    `${endpoints.app.custom_referral}${!!name ? `/${name}` : ""}`,
    body
  );
  return res;
};

export const useSubmitCustomReferral = () => useMutation(submitCustomReferral);

// <---------------------------- SCHOOL REFERRAL --------------------------------------->

const getSchoolReferralIsValid = async (name: any, id: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.school_referral}${!!name && !!id ? `/${id}/${name}` : ""}`
  );
  return res;
};

export const useSchoolReferralIsValid = (
  name: any = "",
  id: any = "",
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCHOOL_REFERRAL], () => getSchoolReferralIsValid(name, id), {
    onSuccess,
    onError,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const submitSchoolReferral = async (payload: object) => {
  const { name, id, body }: any = payload ?? {};
  const res = await axiosInstance.post(
    `${endpoints.app.school_referral}${!!name && !!id ? `/${id}/${name}` : ""}`,
    body
  );
  return res;
};

export const useSubmitSchoolReferral = () => useMutation(submitSchoolReferral);
