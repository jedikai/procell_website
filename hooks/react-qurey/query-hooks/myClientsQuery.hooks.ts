import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQuery } from "react-query";
import {
  GET_CLIENTS_DETAILS,
  GET_CLIENTS_ENTRIES,
  GET_CLIENTS_ENTRY_DETAILS,
  GET_CLIENTS_LIST
} from "../query-keys/myClientsQuery.keys";

const getMyClientsList = async () => {
  const res = await axiosInstance.get(`${endpoints.app.get_clients_list}`);
  return res;
};

export const useMyClientsListList = (
  enabled:boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CLIENTS_LIST], getMyClientsList, {
    enabled,
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const getClientEntries = async (id: number | string | undefined) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_client_entries}${!!id ? `?customer_id=${id}` : ""}`
  );
  return res;
};

export const useClientEntries = (
  id: number | string | undefined,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CLIENTS_ENTRIES, id], () => getClientEntries(id), {
    onSuccess,
    onError,
    enabled: !!id,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const deleteEntryImage = async (body: object) => {
  const res = await axiosInstance.delete(endpoints.app.delete_entry_image, {
    data: body
  });
  return res;
};

export const useDeleteEntryImage = () => useMutation(deleteEntryImage);

const deleteEntry = async (body: object) => {
  const res = await axiosInstance.delete(endpoints.app.delete_entry, {
    data: body
  });
  return res;
};

export const useDeleteEntry = () => useMutation(deleteEntry);

const addEntryImage = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.add_entry_image, body);
  return res;
};

export const useAddEntryImage = () => useMutation(addEntryImage);

const createEntry = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.create_entry, body);
  return res;
};

export const useCreateEntry = () => useMutation(createEntry);

const createClient = async (body: object) => {
  const res = await axiosInstance.post(endpoints.app.create_client, body);
  return res;
};

export const useCreateClient = () => useMutation(createClient);

const updateClient = async (body: object) => {
  const res = await axiosInstance.patch(endpoints.app.update_client, body);
  return res;
};

export const useUpdateClient = () => useMutation(updateClient);

const deleteClient = async (body: object) => {
  const res = await axiosInstance.delete(endpoints.app.delete_client, {
    data: body
  });
  return res;
};

export const useDeleteClient = () => useMutation(deleteClient);

const updateEntry = async (body: object) => {
  const res = await axiosInstance.patch(endpoints.app.update_entry, body);
  return res;
};

export const useUpdateEntry = () => useMutation(updateEntry);

const getClient = async (id: number | string | undefined) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_clients_details}${!!id ? `?customer_id=${id}` : ""}`
  );
  return res;
};

export const useClientDetails = (
  id: number | string | undefined,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CLIENTS_DETAILS, id], () => getClient(id), {
    onSuccess,
    onError,
    enabled,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data ?? []
  });

const getClientEntryDetails = async (id: number | string | undefined) => {
  const res = await axiosInstance.get(
    `${endpoints.app.get_client_entry_details}${!!id ? `?entry_id=${id}` : ""}`
  );
  return res;
};

export const useClientEntryDetails = (
  id: number | string | undefined,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_CLIENTS_ENTRY_DETAILS, id], () => getClientEntryDetails(id), {
    onSuccess,
    onError,
    enabled,
    refetchOnWindowFocus: false,
    select: (data) => (data?.data?.data ? data?.data?.data[0] : {})
  });
