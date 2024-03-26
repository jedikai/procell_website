import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function WarningIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "13"}
      height={IconHeight || "12"}
      viewBox="0 0 13 12"
      fill="none"
    >
      <path
        d="M12.4696 9.1823L7.9712 0.913156C7.24847 -0.303577 5.48665 -0.305194 4.76294 0.913156L0.264803 9.1823C-0.474027 10.4256 0.420473 12 1.86856 12H10.8654C12.3123 12 13.2084 10.4269 12.4696 9.1823ZM6.36707 10.5077C5.95575 10.5077 5.62093 10.1729 5.62093 9.76157C5.62093 9.35025 5.95575 9.01543 6.36707 9.01543C6.7784 9.01543 7.11321 9.35025 7.11321 9.76157C7.11321 10.1729 6.7784 10.5077 6.36707 10.5077ZM7.11321 7.52315C7.11321 7.93447 6.7784 8.26929 6.36707 8.26929C5.95575 8.26929 5.62093 7.93447 5.62093 7.52315V3.79244C5.62093 3.38112 5.95575 3.0463 6.36707 3.0463C6.7784 3.0463 7.11321 3.38112 7.11321 3.79244V7.52315Z"
        fill={IconColor || primaryColors?.inputText}
      />
    </svg>
  );
}
