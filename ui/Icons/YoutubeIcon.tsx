import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

const YoutubeIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "15"}
      height={IconHeight || "10"}
      viewBox="0 0 15 10"
      fill="none"
    >
      <path
        d="M13.9882 1.56476C13.8236 0.952886 13.3412 0.470562 12.7294 0.305801C11.6117 -2.12825e-08 7.14105 0 7.14105 0C7.14105 0 2.67055 0 1.55291 0.294219C0.952886 0.458802 0.458713 0.952997 0.294129 1.56476C0 2.68231 0 5.00002 0 5.00002C0 5.00002 0 7.32938 0.294129 8.43525C0.458869 9.04703 0.941125 9.52937 1.55299 9.69411C2.68231 10 7.14123 10 7.14123 10C7.14123 10 11.6117 10 12.7294 9.70578C13.3412 9.54111 13.8236 9.05879 13.9883 8.44701C14.2824 7.32936 14.2824 5.01176 14.2824 5.01176C14.2824 5.01176 14.2941 2.68229 13.9882 1.56476ZM5.71767 7.14116V2.85881L9.43526 4.99998L5.71767 7.14116Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
};

export default YoutubeIcon;
