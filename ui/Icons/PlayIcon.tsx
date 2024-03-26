import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function PlayIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "134"}
      height={IconHeight || "134"}
      viewBox="0 0 134 134"
      fill="none"
    >
      <circle
        opacity="0.1"
        cx="67"
        cy="67"
        r="67"
        fill={IconColor || primaryColors?.white}
      />
      <circle
        opacity="0.2"
        cx="66.9999"
        cy="66.9999"
        r="53.289"
        fill={IconColor || primaryColors?.white}
        stroke="black"
        strokeWidth="7"
      />
      <path
        d="M91.0854 44.1437C84.816 37.8746 76.4806 34.4219 67.6145 34.4219C58.7485 34.4219 50.4131 37.8746 44.1437 44.1437C37.8746 50.4131 34.4219 58.7485 34.4219 67.6145C34.4219 76.4806 37.8746 84.816 44.1437 91.0854C50.4131 97.3545 58.7485 100.807 67.6145 100.807C76.4806 100.807 84.816 97.3545 91.0854 91.0854C97.3545 84.816 100.807 76.4806 100.807 67.6145C100.807 58.7485 97.3545 50.4131 91.0854 44.1437ZM67.6145 96.7009C51.5763 96.7009 38.5282 83.6528 38.5282 67.6145C38.5282 51.5763 51.5763 38.5282 67.6145 38.5282C83.6528 38.5282 96.7009 51.5763 96.7009 67.6145C96.7009 83.6528 83.6528 96.7009 67.6145 96.7009Z"
        fill={IconColor || primaryColors?.white}
      />
      <path
        d="M59.2051 80.4912L81.4991 67.6145L59.2051 54.7378V80.4912Z"
        fill={IconColor || primaryColors?.white}
      />
    </svg>
  );
}
