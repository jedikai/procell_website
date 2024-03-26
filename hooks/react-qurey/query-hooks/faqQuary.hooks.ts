import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { CLINICAL_STUDY_LIST } from "../query-keys/clinicalStudyQuery.keys";
import { FAQ_LIST } from "../query-keys/faqQuary.keys";

const getFAQList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.faq_list}`);
  return res;
};

export const useFAQList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([FAQ_LIST], getFAQList, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });
