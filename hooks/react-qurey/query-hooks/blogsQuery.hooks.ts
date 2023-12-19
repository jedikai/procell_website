import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import {
  BLOGS_DETAILS,
  BLOGS_LIST,
  BLOG_COUNT,
  CREATE_SESSION_ID,
  RELATED_BLOGS_LIST
} from "../query-keys/blogsQuery.keys";
import axios from "axios";

//   <------------------ BLOG LIST ------------------->
const getBlogsList = async (id: number | string | undefined) => {
  const res = await axios.get(
    `${endpoints.app.blog_list}${id ? `?categories=${id}` : ""}`
  );
  return res;
};

export const useBlogsList = (
  id?: number | string | undefined,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([BLOGS_LIST, id], () => getBlogsList(id), {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });
//   <------------------ CATEGORIES LIST ------------------->
const getCategoriesList = async () => {
  const res = await axios.get(endpoints.app.categories_list);
  return res;
};

export const useCategoriesList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([BLOGS_LIST], getCategoriesList, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });
//   <------------------ BLOG DETAILS LIST ------------------->
const getBlogDetails = async (id: any) => {
  const res = await axios.get(
    `${endpoints.app.blog_details}${id ? `?post_id=${id}` : ""}`
  );
  return res;
};

export const useBlogDetails = (
  id: number | string,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([BLOGS_DETAILS, id], () => getBlogDetails(id), {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data ?? []
  });
//   <------------------ RELATED BLOG LIST ------------------->
const getRelatedBlogList = async (id: any) => {
  const res = await axios.get(
    `${endpoints.app.related_post}${id ? `?post_id=${id}` : ""}`
  );
  return res;
};

export const useRelatedBlogList = (
  id: number | string,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([RELATED_BLOGS_LIST, id], () => getRelatedBlogList(id), {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data ?? []
  });
//   <------------------ BLOG COUNT ------------------->
const getBlogCount = async (id: any) => {
  const res = await axios.get(
    `${endpoints.app.blog_count}${
      id ? `popular-post-view-count?post_id=${id}` : ""
    }`
  );
  return res;
};

export const useBlogCount = (
  id: number | string,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([BLOG_COUNT, id], () => getBlogCount(id), {
    onSuccess,
    onError,
    enabled
    // select: (data) => data?.data ?? []
  });
//   <------------------ CREATE SESSION ID ------------------->
const getSessionId = async () => {
  const res = await axiosInstance.get(endpoints.app.create_session_id);
  return res;
};

export const useCreateSessionId = (
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([CREATE_SESSION_ID], getSessionId, {
    onSuccess,
    onError,
    enabled
    // select: (data) => data?.data ?? []
  });
