import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function SaveIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "11"}
      height={IconHeight || "14"}
      viewBox="0 0 11 14"
      fill="none"
    >
      <path
        d="M9.66122 13.0704L5.36772 10.3869L1.07422 13.0704V1.26325C1.07422 1.12091 1.13076 0.984403 1.23141 0.883755C1.33206 0.783106 1.46857 0.726562 1.61091 0.726563H9.12453C9.26687 0.726563 9.40338 0.783106 9.50403 0.883755C9.60468 0.984403 9.66122 1.12091 9.66122 1.26325V13.0704Z"
        stroke={IconColor || primaryColors?.greyPurple}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
