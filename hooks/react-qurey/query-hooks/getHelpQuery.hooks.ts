import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { GET_HELP_REASON_LIST } from "../query-keys/getHelpQuery.keys";

const getHelpReasonList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_help_reason}`);
  return res;
};

export const useHelpReasonList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_HELP_REASON_LIST], getHelpReasonList, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });
// get_help_submit

const getHelpSubmit = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.get_help_submit, body);
  return res;
};

export const useGetHelpSubmit = () => useMutation(getHelpSubmit);

const getHelpCeoSubmit = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.get_help_ceo_submit, body);
  return res;
};

export const useGetHelpCeoSubmit = () => useMutation(getHelpCeoSubmit);