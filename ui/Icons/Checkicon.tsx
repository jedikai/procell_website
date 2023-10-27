/* eslint-disable react/no-unknown-property */
import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function Checkicon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "12"}
      height={IconHeight || "12"}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 0C2.6915 0 0 2.6915 0 6C0 9.3085 2.6915 12 6 12C9.3085 12 12 9.3085 12 6C12 2.6915 9.3085 0 6 0ZM5.9545 7.7095C5.76668 7.89575 5.51275 8.00005 5.24823 7.99958C4.98372 7.99912 4.73016 7.89392 4.543 7.707L3.152 6.359L3.8485 5.6405L5.245 6.994L8.1495 4.1435L8.8515 4.856L5.9545 7.7095Z"
       
        fill={IconColor || primaryColors?.text_purple}
      />
    </svg>
  );
}
