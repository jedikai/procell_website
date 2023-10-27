import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { CLINICAL_STUDY_LIST } from "../query-keys/clinicalStudyQuery.keys";

const getClinicalStudyList = async () => {
    const res = await axiosInstance.get(
      `${endpoints.app.clinical_study}`
    );
    return res;
  };
  
  export const useClinicalStudyList = (
    onSuccess: any = () => {},
    onError: any = () => {}
  ) =>
    useQuery([CLINICAL_STUDY_LIST],getClinicalStudyList, {
      onSuccess,
      onError,
      select: (data) => data?.data?.data ?? []
    });