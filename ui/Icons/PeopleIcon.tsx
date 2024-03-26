import { CustomIconProps } from "@/interface/icons.interface";
import React from "react";

const PeopleIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "14"}
      height={IconHeight || "18"}
      viewBox="0 0 14 18"
      fill="none"
    >
      <path
        d="M7 8.5C9.34721 8.5 11.25 6.59721 11.25 4.25C11.25 1.90279 9.34721 0 7 0C4.65279 0 2.75 1.90279 2.75 4.25C2.75 6.59721 4.65279 8.5 7 8.5Z"
        fill={IconColor || "#543795"}
      />
      <path
        d="M7 9.91797C3.4808 9.92189 0.628918 12.7738 0.625 16.293C0.625 16.6842 0.942123 17.0013 1.33332 17.0013H12.6666C13.0578 17.0013 13.375 16.6842 13.375 16.293C13.3711 12.7738 10.5192 9.92185 7 9.91797Z"
        fill={IconColor || "#543795"}
      />
    </svg>
  );
};

export default PeopleIcon;
