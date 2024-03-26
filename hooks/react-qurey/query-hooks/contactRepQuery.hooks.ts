import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { GET_CONTACT_REP } from "../query-keys/contactRep.keys";

const getContactRep = async () => {
  const res = await axiosInstance.get(`${endpoints.app.contact_rep}`);
  return res;
};

export const useContactRep = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CONTACT_REP], getContactRep, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    select: (data) => (data?.data?.data ? data?.data?.data[0] : {})
  });
