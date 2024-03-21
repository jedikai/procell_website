import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  GET_COUNTRY_LIST,
  GET_LANGUAGE_LIST,
  GET_STATE_LIST,
  PRACTTITIONER_MAP
} from "../query-keys/contactUsQuery.keys";

const getCountryList = async (body: object) => {
  const res = await axiosInstance.get(endpoints.app.country_list, body);
  return res;
};

export const useCountryList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_COUNTRY_LIST], getCountryList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getStateList = async (id: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.state_list}?country_id=${id}`
  );
  return res;
};

export const useStateList = (
  enabled: boolean = false,
  id: string,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_STATE_LIST, id], () => getStateList(id), {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data?.data ?? []
  });

const getLanguageList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.language}`);
  return res;
};

export const useLanguageList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_LANGUAGE_LIST], getLanguageList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const contactUsPost = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.contact_us, body);
  return res;
};

export const useContactUs = () => useMutation(contactUsPost);

const getPractitionersMap = async () => {
  const res = await axiosInstance.get(`${endpoints.app.practitioners_map}`);
  return res;
};

export const usePractitionersMap = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([PRACTTITIONER_MAP], getPractitionersMap, {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data ?? {}
  });
