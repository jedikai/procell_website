import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

const InstagramIcon = ({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "13"}
      height={IconHeight || "12"}
      viewBox="0 0 13 12"
      fill="none"
    >
      <path
        d="M9.53516 0H3.53516C1.8853 0 0.535156 1.34956 0.535156 3V9C0.535156 10.6499 1.8853 12 3.53516 12H9.53516C11.185 12 12.5352 10.6499 12.5352 9V3C12.5352 1.34956 11.185 0 9.53516 0ZM6.53516 8.4999C5.15425 8.4999 4.03511 7.38029 4.03511 6C4.03511 4.61909 5.15425 3.49995 6.53516 3.49995C7.91545 3.49995 9.03521 4.61909 9.03521 6C9.03521 7.38029 7.91545 8.4999 6.53516 8.4999ZM9.7852 3.49995C9.37059 3.49995 9.03521 3.16409 9.03521 2.74995C9.03521 2.33581 9.37059 1.99995 9.7852 1.99995C10.1998 1.99995 10.5352 2.33581 10.5352 2.74995C10.5352 3.16409 10.1998 3.49995 9.7852 3.49995Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
};

export default InstagramIcon;
