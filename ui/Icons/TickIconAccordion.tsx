import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function TickIconAccordion({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "21"}
      height={IconHeight || "18"}
      viewBox="0 0 21 18"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" stroke="#313131" />
      <path
        d="M11.1267 13.1846C11.051 13.2607 10.961 13.3211 10.8618 13.3623C10.7627 13.4036 10.6564 13.4248 10.5491 13.4248C10.4417 13.4248 10.3354 13.4036 10.2363 13.3623C10.1372 13.3211 10.0472 13.2607 9.97146 13.1846L5.3588 8.57109C5.12906 8.34128 5 8.02963 5 7.70468C5 7.37973 5.12906 7.06808 5.3588 6.83828L5.9364 6.26067C6.16621 6.03093 6.47786 5.90187 6.80281 5.90187C7.12776 5.90187 7.43941 6.03093 7.66922 6.26067L10.5491 9.14052L18.3308 1.3588C18.5606 1.12906 18.8722 1 19.1972 1C19.5221 1 19.8338 1.12906 20.0636 1.3588L20.6412 1.9364C20.8709 2.16621 21 2.47786 21 2.80281C21 3.12776 20.8709 3.43941 20.6412 3.66922L11.1267 13.1846Z"
        fill="url(#paint0_linear_915_57)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_915_57"
          x1="19"
          y1="1.5"
          x2="3.5"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={IconColor || primaryColors.primary} />
          <stop offset="1" stopColor={IconColor || primaryColors.text_purple} />
        </linearGradient>
      </defs>
    </svg>
  );
}
