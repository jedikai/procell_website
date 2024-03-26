import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { REP_VERIFICATION_TOKEN } from "../query-keys/verifyRepQuery.keys";

const getRepVerificationToken = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.rep_verification_token}`
  );
  return res;
};

export const useRepVerificationToken = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([REP_VERIFICATION_TOKEN], getRepVerificationToken, {
    onSuccess,
    onError,
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.client_key ?? ""
  });

const verifyToken = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.verify_token, body);
  return res;
};

export const useVerifyToken = () => useMutation(verifyToken);
