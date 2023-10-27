import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "react-query";

// CONSUMER SIGN UP
const consumerSignUp = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.consumer_signup, body);
  return res;
};

export const useConsumerSignUp = () => useMutation(consumerSignUp);


// PRACTITIONER SIGN UP 
const practitionerSignUp = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.practitioner_signup, body);
  return res;
};

export const usePractitionerSignUp = () => useMutation(practitionerSignUp);
