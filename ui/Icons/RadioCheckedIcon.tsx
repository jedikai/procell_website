import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function RadioCheckedIcon({
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
      <circle
        cx="8.5"
        cy="8.5"
        r="8"
        stroke={IconColor || primaryColors?.radioBackcolor}
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="5.5"
        fill={IconColor || primaryColors?.text_purple}
      />
    </svg>
  );
}
