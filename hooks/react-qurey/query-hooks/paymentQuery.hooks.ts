import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  CARD_POLLING,
  GET_PAYMENT_RELATED_CREDS_AND_DATAS,
  ORDER_CONFIRM,
  PAYMENT_VALIDATE
} from "../query-keys/paymentQuery.keys";

const getPaymentCredAndData = async () => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_payment_cred_and_data}`
  );
  return res;
};

export const usePaymentCredAndData = (
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false
) =>
  useQuery([GET_PAYMENT_RELATED_CREDS_AND_DATAS], getPaymentCredAndData, {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data?.data ?? []
  });

const getCheckoutPaymentTransaction = async (payload: object) => {
  const { endPoint, body }: any = payload ?? {};
  const res = await axiosInstance.post(endPoint, body);
  return res;
};

export const useCheckoutPaymentTransaction = () =>
  useMutation(getCheckoutPaymentTransaction);

const pollingHandler = async () => {
  const res = await axiosInstance.get(`${endpoints.app.card_polling}`);
  return res;
};

export const usePollingCard = (
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false,
  refetchInterval: number = 2000
) =>
  useQuery([CARD_POLLING], pollingHandler, {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data ?? [],
    refetchInterval,
    refetchIntervalInBackground: true
  });

const paymentValidate = async (endpoints: string) => {
  const res = await axiosInstance.get(`${endpoints}`);
  return res;
};

export const usePaymentValidate = (
  endpoints: string,
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false
) =>
  useQuery([PAYMENT_VALIDATE], () => paymentValidate(endpoints), {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data?.data ?? []
  });

const orderConfirm = async () => {
  const res = await axiosInstance.get(`${endpoints.app.order_confirm}`);
  return res;
};

export const useOrderConfirm = (
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false
) =>
  useQuery([ORDER_CONFIRM], orderConfirm, {
    onSuccess,
    onError,
    enabled,
    // select: (data) => data?.data?.data ?? []
  });
