import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function ClockIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "13"}
      height={IconHeight || "13"}
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M8.81565 7.64573L7.00309 6.28632V3.51717C7.00309 3.23873 6.77802 3.01367 6.49959 3.01367C6.22116 3.01367 5.99609 3.23873 5.99609 3.51717V6.53809C5.99609 6.69668 6.07062 6.84623 6.19749 6.94089L8.21143 8.45135C8.29834 8.51681 8.40421 8.55216 8.51302 8.55205C8.66658 8.55205 8.81763 8.48307 8.91632 8.35015C9.08352 8.12808 9.0382 7.8124 8.81565 7.64573Z"
        fill={IconColor || primaryColors?.black}
      />
      <path
        d="M6.5 0C2.91568 0 0 2.91568 0 6.5C0 10.0843 2.91568 13 6.5 13C10.0843 13 13 10.0843 13 6.5C13 2.91568 10.0843 0 6.5 0ZM6.5 11.993C3.47153 11.993 1.00697 9.52847 1.00697 6.5C1.00697 3.47153 3.47153 1.00697 6.5 1.00697C9.52897 1.00697 11.993 3.47153 11.993 6.5C11.993 9.52847 9.52847 11.993 6.5 11.993Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
}
