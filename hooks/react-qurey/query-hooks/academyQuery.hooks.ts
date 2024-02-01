import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  GET_ACADEMY_INFO,
  GET_PRACTITIONER_ACADEMY_CONTENT,
  GET_PRACTITIONER_ACADEMY_CONTENT_ID,
  GET_REP_ACADEMY_CONTENT,
  GET_REP_ACADEMY_CONTENT_ID
} from "../query-keys/academyQuery.keys";

const getAcademyInfo = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_academy_info}`);
  return res;
};

export const useAcademyInfo = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_ACADEMY_INFO], getAcademyInfo, {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getPractitionerAcademyContent = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_practitioner_academy_content}`
  );
  return res;
};

export const usePractitionerAcademyContent = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_PRACTITIONER_ACADEMY_CONTENT], getPractitionerAcademyContent, {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getRepAcademyContent = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_rep_academy_content}`
  );
  return res;
};

export const useRepAcademyContent = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_REP_ACADEMY_CONTENT], getRepAcademyContent, {
    enabled,
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

const getRepAcademyContentById = async (id: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_rep_academy_content}${!!id ? `/${id}` : ""}`
  );
  return res;
};

export const useRepAcademyContentById = (
  id: any,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery(
    [GET_REP_ACADEMY_CONTENT_ID, id],
    () => getRepAcademyContentById(id),
    {
      enabled,
      onSuccess,
      onError,
      select: (data) => (data?.data?.data ? data?.data?.data[0] : {})
    }
  );

const getPractitionerAcademyContentById = async (id: any) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_practitioner_academy_content}${!!id ? `/${id}` : ""}`
  );
  return res;
};

export const usePractitionerAcademyContentById = (
  id: any,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery(
    [GET_PRACTITIONER_ACADEMY_CONTENT_ID, id],
    () => getPractitionerAcademyContentById(id),
    {
      enabled,
      onSuccess,
      onError,
      select: (data) => (data?.data?.data ? data?.data?.data[0] : {})
    }
  );

const markAsCompleteRep = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints.app.complete_rep_content,
    body
  );
  return res;
};

export const useMarkAsCompleteRep = () => useMutation(markAsCompleteRep);

const markAsCompletePractitioner = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints.app.complete_practitioner_content,
    body
  );
  return res;
};

export const useMarkAsCompletePractitioner = () =>
  useMutation(markAsCompletePractitioner);
