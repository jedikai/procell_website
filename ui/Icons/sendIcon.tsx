import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function SendIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "17"}
      height={IconHeight || "17"}
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M3.917 14.085H7.68612L10.1783 16.5744C10.3123 16.709 10.4715 16.8159 10.6469 16.8888C10.8223 16.9618 11.0103 16.9993 11.2003 16.9993C11.3253 16.9991 11.4497 16.9832 11.5707 16.9519C11.8152 16.8901 12.0391 16.7651 12.2199 16.5893C12.4007 16.4135 12.5319 16.1931 12.6004 15.9504L16.9963 1.00071L3.917 14.085ZM2.90142 13.0935L15.9928 0L1.05368 4.40581C0.810436 4.47498 0.589503 4.60656 0.412802 4.78747C0.236101 4.96839 0.109773 5.19236 0.0463517 5.43717C-0.0170699 5.68198 -0.0153809 5.93912 0.0512509 6.18308C0.117883 6.42703 0.247142 6.64933 0.426204 6.82791L2.90142 9.301V13.0935Z"
        fill={IconColor || primaryColors?.text_purple}
      />
    </svg>
  );
}
