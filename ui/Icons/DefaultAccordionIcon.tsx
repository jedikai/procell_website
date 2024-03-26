import { CustomIconProps } from "@/interface/icons.interface";
import React from "react";

export default function DefaultAccordionIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "18"}
      height={IconHeight || "18"}
      viewBox="0 0 18 18"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" stroke={ IconColor || "#CCC"} />
    </svg>
  );
}
