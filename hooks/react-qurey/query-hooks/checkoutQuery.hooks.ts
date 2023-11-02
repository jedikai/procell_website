import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { DELIVERY_METHODS_LIST } from "../query-keys/checkoutQuery.keys";

const getDeliveryMethodsList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.delivery_method_list}`);
  return res;
};
// <------------------------------ GET DELIVERY METHODS APIS ------------------------------>

export const useDeliveryMethodsList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([DELIVERY_METHODS_LIST], getDeliveryMethodsList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });

// <------------------------------ SHIPMENT RATE APIS ------------------------------>

const shipmentRate = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.shipment_rate, body);
  return res;
};

export const useShipmentRate = () => useMutation(shipmentRate);

// <------------------------------ CHECKOUT AMOUNT APIS ------------------------------>

const updateDeleveryMode = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.update_shipping_mode, body);
  return res;
};

export const useUpdateDeleveryMode = () => useMutation(updateDeleveryMode);