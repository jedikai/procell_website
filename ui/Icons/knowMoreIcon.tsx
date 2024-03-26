import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function KnowMoreIcon({
    IconColor,
    IconWidth,
    IconHeight
  }: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "30"}
      height={IconHeight || "8"}
      viewBox="0 0 30 8"
      fill="none"
    >
      <path
        d="M29.3536 4.35355C29.5488 4.15829 29.5488 3.84171 29.3536 3.64645L26.1716 0.464466C25.9763 0.269204 25.6597 0.269204 25.4645 0.464466C25.2692 0.659728 25.2692 0.976311 25.4645 1.17157L28.2929 4L25.4645 6.82843C25.2692 7.02369 25.2692 7.34027 25.4645 7.53553C25.6597 7.7308 25.9763 7.7308 26.1716 7.53553L29.3536 4.35355ZM0 4.5H29V3.5H0V4.5Z"
        fill={IconColor || primaryColors.text_purple}
      />
    </svg>
  );
}
