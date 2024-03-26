import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function UpdateProfileIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "15"}
      height={IconHeight || "15"}
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M10.4806 2.9901L12.0902 4.59902M11.5157 1.5727L7.16315 5.92523C6.93826 6.1498 6.78488 6.43593 6.72235 6.74755L6.32031 8.76002L8.33279 8.35723C8.64439 8.29491 8.93015 8.14215 9.15511 7.91719L13.5076 3.56466C13.6384 3.43387 13.7422 3.2786 13.813 3.10771C13.8837 2.93681 13.9202 2.75366 13.9202 2.56868C13.9202 2.38371 13.8837 2.20055 13.813 2.02966C13.7422 1.85877 13.6384 1.7035 13.5076 1.5727C13.3768 1.44191 13.2216 1.33816 13.0507 1.26737C12.8798 1.19659 12.6966 1.16016 12.5117 1.16016C12.3267 1.16016 12.1435 1.19659 11.9726 1.26737C11.8017 1.33816 11.6465 1.44191 11.5157 1.5727V1.5727Z"
        stroke={IconColor || primaryColors?.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4 10.2797V12.5597C12.4 12.9628 12.2399 13.3494 11.9548 13.6345C11.6697 13.9195 11.2831 14.0797 10.88 14.0797H2.52C2.11687 14.0797 1.73025 13.9195 1.4452 13.6345C1.16014 13.3494 1 12.9628 1 12.5597V4.19969C1 3.79656 1.16014 3.40994 1.4452 3.12489C1.73025 2.83983 2.11687 2.67969 2.52 2.67969H4.8"
        stroke={IconColor || primaryColors?.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
