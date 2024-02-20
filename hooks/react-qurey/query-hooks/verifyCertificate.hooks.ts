import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "react-query";

const verifyCertificate = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.verify_certificate, body);
  return res;
};

export const useVerifyCertificate = () => useMutation(verifyCertificate);
