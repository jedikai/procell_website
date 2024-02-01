import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import {
  GET_RECOURCES_PRACTITIONER,
  GET_RECOURCES_PRACTITIONER_BY_ID,
  GET_RECOURCES_REP,
  GET_RECOURCES_REP_BY_ID
} from "../query-keys/recourcesQuery.keys";

const getRecourcesPrac = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_recources_prac}`);
  return res;
};

export const useRecourcesPrac = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_RECOURCES_PRACTITIONER], getRecourcesPrac, {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getRecourcesPracById = async (id: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_recources_prac_cat}${id ? `/${id}` : ""}`
  );
  return res;
};

export const useRecourcesPracById = (
  id: any,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_RECOURCES_PRACTITIONER_BY_ID], () => getRecourcesPracById(id), {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getRecourcesRep = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_recources_rep}`);
  return res;
};

export const useRecourcesRep = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_RECOURCES_REP], getRecourcesRep, {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getRecourcesRepById = async (id: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_recources_rep_cat}${id ? `/${id}` : ""}`
  );
  return res;
};

export const useRecourcesRepById = (
  id: any,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_RECOURCES_REP_BY_ID], () => getRecourcesRepById(id), {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });
