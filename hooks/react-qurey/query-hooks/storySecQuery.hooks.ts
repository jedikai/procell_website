import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "react-query";
import { GET_IMAGE_COMPRESSION_DATA, GET_STORY_SECTION_DATA, GET_TREATMENT_VIDEO_DATA } from "../query-keys/storySecQuery.keys";

const getStorySecData = async () => {
  const res = await axiosInstance.get(`${endpoints.app.story_section_data}`);
  return res;
};

export const useStorySecData = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_STORY_SECTION_DATA], getStorySecData, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });
const getTreatmentVideoData = async () => {
  const res = await axiosInstance.get(`${endpoints.app.treatment_video_data}`);
  return res;
};

export const useTreatmentVideoData = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_TREATMENT_VIDEO_DATA], getTreatmentVideoData, {
    onSuccess,
    onError,
    select: (data) => data?.data?.data ?? []
  });
const getImageCompressionData = async () => {
  const res = await axiosInstance.get(endpoints.app.image_comparision_data);
  return res;
};

export const useImageCompressionData = (
  onSuccess: any = () => {},
  onError: any = () => {}
) =>
  useQuery([GET_IMAGE_COMPRESSION_DATA], getImageCompressionData, {
    onSuccess,
    onError,
    // select: (data) => data?.data?.data ?? []
  });
