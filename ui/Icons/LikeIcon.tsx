import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function LikeIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "15"}
      height={IconHeight || "14"}
      viewBox="0 0 15 14"
      fill="none"
    >
      <path
        d="M7.66367 12.5337C7.66367 12.5337 0.955078 8.77688 0.955078 4.21504C0.955078 3.40859 1.23449 2.62705 1.74577 2.00339C2.25705 1.37973 2.96861 0.952469 3.7594 0.794312C4.55019 0.636154 5.37135 0.756864 6.08317 1.13591C6.79499 1.51495 7.3535 2.1289 7.66367 2.87332V2.87332C7.97385 2.1289 8.53235 1.51495 9.24418 1.13591C9.956 0.756864 10.7772 0.636154 11.5679 0.794312C12.3587 0.952469 13.0703 1.37973 13.5816 2.00339C14.0929 2.62705 14.3723 3.40859 14.3723 4.21504C14.3723 8.77688 7.66367 12.5337 7.66367 12.5337Z"
        stroke={IconColor || primaryColors?.greyPurple}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
