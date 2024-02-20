import { endpoints } from "@/api/endpoints";
import axios from "axios";
import { useQuery } from "react-query";
import {
  SCIENCE_BLOGS_DETAILS,
  SCIENCE_BLOG_LIST,
  SCIENCE_BLOG_LIST_SEARCH_WISE,
  SCIENCE_CATEGORIES_LIST,
  SCIENCE_POPULAR_POST_LIST
} from "../query-keys/scienceQuery.keys";
import axiosInstance from "@/api/axiosInstance";

//   <------------------ CATEGORIES LIST ------------------->
const getScienceCategoriesList = async () => {
  const res = await axios.get(endpoints.app.science_categories_list);
  return res;
};

export const useScienceCategoriesList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCIENCE_CATEGORIES_LIST], getScienceCategoriesList, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });
//   <------------------ SCIENCE BLOG LIST ------------------->
const getScienceBlogList = async (id: any) => {
  const res = await axios.get(
    `${endpoints.app.science_blog_list}${id ? `?new-topics=${id}` : "?_embed="}`
  );
  return res;
};

export const useScienceBlogList = (
  id: number | string,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCIENCE_BLOG_LIST, id], () => getScienceBlogList(id), {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data ?? []
  });

const getScienceBlogList_new = async () => {
  const res = await axiosInstance.get(
    endpoints.app.science_blog_list_new
  );
  return res;
};

export const useScienceBlogList_new = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCIENCE_BLOG_LIST], getScienceBlogList_new, {
    onSuccess,
    onError,
    // enabled: false,
    select: (data) => data?.data?.data ?? []
  });
//   <------------------ SCIENCE BLOG LIST SEARCH WISE------------------->
const getScienceBlogListSearchWise = async (searchedText: any) => {
  const res = await axios.get(
    `${endpoints.app.science_blog_list_search_wise}${
      searchedText ? `search-post?search_title=${searchedText}` : "?_embed="
    }`
  );
  return res;
};

export const useScienceBlogListSearchWise = (
  searchedText: string,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery(
    [SCIENCE_BLOG_LIST_SEARCH_WISE, searchedText],
    () => getScienceBlogListSearchWise(searchedText),
    {
      onSuccess,
      onError,
      enabled,
      select: (data) => data?.data ?? []
    }
  );
//   <------------------ SCIENCE POPULAR BLOG LIST ------------------->
const getPopularPostList = async () => {
  const res = await axios.get(`${endpoints.app.science_popular_post_list}`);
  return res;
};

export const usePopularPostList = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCIENCE_POPULAR_POST_LIST], getPopularPostList, {
    onSuccess,
    onError,
    select: (data) => data?.data ?? []
  });
//   <------------------ SCIENCE DETAILS LIST ------------------->
const getScienceBlogDetails = async (id: any) => {
  const res = await axios.get(
    `${endpoints.app.science_blog_details}${id ? `science-posts-details?post_id=${id}` : ""}`
  );
  return res;
};

export const useScienceBlogDetails = (
  id: number | string,
  enabled: boolean = false,
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([SCIENCE_BLOGS_DETAILS, id], () => getScienceBlogDetails(id), {
    onSuccess,
    onError,
    enabled,
    select: (data) => data?.data ?? []
  });
