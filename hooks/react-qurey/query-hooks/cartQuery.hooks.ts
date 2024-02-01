import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import {
  CART_LIST,
  CART_LIST_WITH_AUTHORIZATION
} from "../query-keys/cartQuery.keys";
import { useMutation, useQuery } from "react-query";

const getCartList = async () => {
  const res = await axiosInstance.get(endpoints.app.cart_list);
  return res;
};

export const useCartList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([CART_LIST], getCartList, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data?.data ?? []
  });
//   <------------------ CART LIST WITH AUTHORIZATION.NET CRED ------------------->

const getCartListWithAuthCred = async (tractUserActivityParams: string) => {
  const res = await axiosInstance.get(
    `${endpoints.app.user_trac_with_cartlist_count}${tractUserActivityParams}`
  );
  return res;
};

export const useCartListWithAuthCred = (
  tractUserActivityParams: string,
  onSuccess: any = () => {},
  onError: any = () => {},
  enabled: boolean
) =>
  useQuery(
    [CART_LIST_WITH_AUTHORIZATION],
    () => getCartListWithAuthCred(tractUserActivityParams),
    {
      onSuccess,
      onError,
      enabled,
      select: (data) => data?.data?.data ?? {}
    }
  );

//   <------------------ DELETE ITEMS FROM CART LIST ------------------->
const deleteItem = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints.app.delete_item_from_cart,
    body
  );
  return res;
};

export const useDeleteItem = () => useMutation(deleteItem);

//   <------------------ ADD ITEMS TO CART LIST ------------------->
const addItem = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.add_item_to_cart, body);
  return res;
};

export const useAddItem = () => useMutation(addItem);

//   <------------------ UPDATE QUANTITY OF ITEMS TO CART LIST ------------------->
const updateItemQuantity = async (body: object) => {
  const res = await axiosInstance.post(
    endpoints.app.update_cart_item_quantity,
    body
  );
  return res;
};

export const useUpdateItemQuantity = () => useMutation(updateItemQuantity);
