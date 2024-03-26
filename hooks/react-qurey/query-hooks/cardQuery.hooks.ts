import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { GET_CARD_LIST } from "../query-keys/cardQuery.keys";

const getCardList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_card_list}`);
  return res;
};

export const useCardList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CARD_LIST], getCardList, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const paymentTransaction = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.payment_transaction, body);
  return res;
};

export const usePaymentTransaction = () => useMutation(paymentTransaction);

const cardDelete = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.card_delete, body);
  return res;
};

export const useCardDelete = () => useMutation(cardDelete);

const authorizePayment = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.authorize_payment, body);
  return res;
};

export const useAuthorizePayment = () => useMutation(authorizePayment);
