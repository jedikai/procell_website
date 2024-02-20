import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function DefaultFileIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={IconWidth || "13"}
      height={IconHeight || "13"}
      x="0"
      y="0"
      viewBox="0 0 512 512"
    >
      <g>
        <path
          d="M330 150c-19.299 0-35-15.701-35-35V0H116C85.673 0 61 24.673 61 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55V150zM143 360h72.72c8.284 0 15 6.716 15 15s-6.716 15-15 15H143c-8.284 0-15-6.716-15-15s6.716-15 15-15zm-15-65c0-8.284 6.716-15 15-15h220c8.284 0 15 6.716 15 15s-6.716 15-15 15H143c-8.284 0-15-6.716-15-15zm235-95c8.284 0 15 6.716 15 15s-6.716 15-15 15H143c-8.284 0-15-6.716-15-15s6.716-15 15-15z"
          fill={IconColor || primaryColors.text_purple}
          opacity="1"
          data-original={IconColor || primaryColors.text_purple}
        ></path>
        <path
          d="M325 115c0 2.757 2.243 5 5 5h114.314a54.866 54.866 0 0 0-10.515-13.732l-96.423-91.222a55.137 55.137 0 0 0-12.375-8.825V115z"
          fill={IconColor || primaryColors.text_purple}
          opacity="1"
          data-original={IconColor || primaryColors.text_purple}
        ></path>
      </g>
    </svg>
  );
}
