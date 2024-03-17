import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  DELIVERY_ADDRESS_LIST,
  DELIVERY_METHODS_LIST
} from "../query-keys/checkoutQuery.keys";

// <------------------------------ GET DELIVERY METHODS APIS ------------------------------>
const getDeliveryMethodsList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.delivery_method_list}`);
  return res;
};

export const useDeliveryMethodsList = (
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean = false
) =>
  useQuery([DELIVERY_METHODS_LIST], getDeliveryMethodsList, {
    onSuccess,
    onError,
    enabled,
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
  const res = await axiosInstance.post(
    endpoints.app.update_shipping_mode,
    body
  );
  return res;
};

export const useUpdateDeleveryMode = () => useMutation(updateDeleveryMode);

// <------------------------------ GET DELIVERY ADDRESS APIS ------------------------------>
const getAddressList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.checkout_address_list}`);
  return res;
};

export const useAddressList = (
  onSuccess: any = () => {},
  onError: any = () => {},
) =>
  useQuery([DELIVERY_ADDRESS_LIST], getAddressList, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? {}
  });
// <------------------------------ ADDRESS SAVE APIS ------------------------------>

const saveAddress = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.address_save, body);
  return res;
};

export const useSaveAddresss = () => useMutation(saveAddress);

// <------------------------------ EDIT ADDRESS APIS ------------------------------>

const editAddress = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.edit_address, body);
  return res;
};

export const useEditAddress = () => useMutation(editAddress);
// <------------------------------ CREATE ADDRESS APIS ------------------------------>

const createAddress = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.create_address, body);
  return res;
};

export const useCreateAddress = () => useMutation(createAddress);

// <------------------------------ DELETE ADDRESS APIS ------------------------------>

const deleteAddress = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.delete_address, body);
  return res;
};

export const useDeleteAddress = () => useMutation(deleteAddress);

// <------------------------------ MARK AS DEFAULT ADDRESS APIS ------------------------------>

const markAsDefaultAddress = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.mark_as_default_address, body);
  return res;
};

export const useMarkAsDefaultAddress = () => useMutation(markAsDefaultAddress);