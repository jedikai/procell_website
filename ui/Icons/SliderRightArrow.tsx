import { CustomIconProps } from "@/interface/icons.interface";
import React from "react";

export default function SliderRightArrow({ IconColor, IconWidth, IconHeight }: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "16"}
      height={IconHeight || "16"}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L9.34315 15.0711C8.95262 15.4616 8.31946 15.4616 7.92893 15.0711C7.53841 14.6805 7.53841 14.0474 7.92893 13.6569L13.5858 8L7.92893 2.34315C7.53841 1.95262 7.53841 1.31946 7.92893 0.928932C8.31946 0.538408 8.95262 0.538408 9.34315 0.928932L15.7071 7.29289ZM0 7L15 7V9L0 9L0 7Z"
        fill={IconColor || "#543795"}
      />
    </svg>
  );
}
