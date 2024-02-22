import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function ExcelIcon({
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
      viewBox="0 0 791.454 791.454"
    >
      <g>
        <path
          fill={IconColor || primaryColors.text_purple}
          fill-rule="evenodd"
          d="M202.63 0h264.877l224.149 233.97v454.364c0 56.904-45.927 103.12-102.831 103.12H202.63c-56.615 0-102.831-46.216-102.831-103.12V102.831C99.798 46.216 146.015 0 202.63 0z"
          clip-rule="evenodd"
          opacity="1"
          data-original={IconColor || primaryColors.text_purple}
        ></path>
        <g fill="#fff">
          <path
            fill-rule="evenodd"
            d="M467.218 0v231.948h224.438z"
            clip-rule="evenodd"
            opacity="1"
            fill="#ffffff302"
            data-original="#ffffff302"
          ></path>
          <path
            d="M345.9 576.26h-38.417l-26.285-44.194-26.286 44.194h-38.706l45.639-76.835-40.15-66.725H260.4l20.797 34.662 20.508-34.662h38.706l-39.862 67.014zm13.576 0V432.7h36.684v112.363h62.392v31.196h-99.076zm159.735 1.733c-14.443 0-27.152-4.622-38.128-13.576-10.688-8.666-16.753-19.642-17.62-32.64l31.485-9.243c.867 6.932 3.755 12.998 8.666 17.62 5.199 4.622 10.976 6.932 17.331 6.932 5.199 0 9.532-1.155 12.998-3.466 3.177-2.311 4.91-5.488 4.91-9.243 0-3.177-1.444-5.777-4.044-8.088-2.6-2.022-6.066-3.755-10.11-5.199s-8.954-2.889-13.865-4.044c-5.199-1.444-10.399-3.177-15.309-5.488-5.199-2.022-9.821-4.622-13.865-7.799-4.333-2.889-7.51-7.221-10.11-12.71-2.6-5.199-4.044-11.554-4.044-18.775 0-11.843 4.91-21.664 15.02-29.463 10.11-8.088 22.242-11.843 36.395-11.843 14.154 0 26.574 3.466 36.973 10.11 10.399 6.932 17.042 15.887 19.642 26.863l-32.929 13.865c-1.444-6.066-4.333-10.976-8.377-14.731-4.044-3.466-9.243-5.488-15.309-5.488-4.622 0-8.088 1.155-10.976 2.889-2.6 1.733-3.755 4.333-3.755 7.51 0 2.889 1.733 5.488 5.199 7.51 3.466 1.733 8.088 3.177 13.287 4.044s10.976 2.311 17.042 4.333c6.355 2.311 11.843 4.622 17.331 7.799 5.199 2.889 9.532 7.799 12.998 14.154 3.755 6.644 5.488 14.443 5.488 23.397 0 13.287-5.199 24.264-15.598 32.351s-23.972 12.419-40.726 12.419z"
            fill="#ffffff"
            opacity="1"
            data-original="#ffffff"
          ></path>
        </g>
      </g>
    </svg>
  );
}