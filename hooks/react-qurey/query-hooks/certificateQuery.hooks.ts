import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { GET_CERTIFICATES } from "../query-keys/certificateQuery.keys";

const getCertificateList = async () => {
  const res = await axiosInstance.get(endpoints.app.certificate_list);
  return res;
};

export const useCertificateList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CERTIFICATES], getCertificateList, {
    onSuccess,
    onError,
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data?.data ?? {}
  });
