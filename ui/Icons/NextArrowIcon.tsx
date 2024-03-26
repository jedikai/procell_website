import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function NextArrowIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "6"}
      height={IconHeight || "9"}
      viewBox="0 0 6 9"
      fill="none"
    >
      <path
        d="M1.7225 0.4425C1.9125 0.4425 2.1025 0.512501 2.2525 0.662501L5.7825 4.1925C6.0725 4.4825 6.0725 4.9625 5.7825 5.2525L2.2525 8.7825C1.9625 9.0725 1.4825 9.0725 1.1925 8.7825C0.9025 8.4925 0.9025 8.0125 1.1925 7.7225L4.1925 4.7225L1.1925 1.7225C0.902499 1.4325 0.902499 0.952501 1.1925 0.662501C1.3325 0.512501 1.5225 0.4425 1.7225 0.4425Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
}
