import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function Mail2Icon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "21"}
      height={IconHeight || "16"}
      viewBox="0 0 21 16"
      fill="none"
    >
      <path
        d="M2.46094 16C1.91094 16 1.43994 15.804 1.04794 15.412C0.655939 15.02 0.460273 14.5493 0.460939 14V2C0.460939 1.45 0.656939 0.979002 1.04894 0.587002C1.44094 0.195002 1.91161 -0.000664969 2.46094 1.69779e-06H18.4609C19.0109 1.69779e-06 19.4819 0.196001 19.8739 0.588001C20.2659 0.980001 20.4616 1.45067 20.4609 2V14C20.4609 14.55 20.2649 15.021 19.8729 15.413C19.4809 15.805 19.0103 16.0007 18.4609 16H2.46094ZM10.4609 9L18.4609 4V2L10.4609 7L2.46094 2V4L10.4609 9Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
}
