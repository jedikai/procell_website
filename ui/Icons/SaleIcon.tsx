import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function SaleIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "15"}
      height={IconHeight || "18"}
      viewBox="0 0 15 18"
      fill="none"
    >
      <path
        d="M12.4637 0.483924C12.291 0.185429 11.9696 0 11.625 0H8.02344V4.26018H14.6478L12.4637 0.483924Z"
        fill={IconColor || primaryColors?.icondarkColor}
      />
      <path
        d="M7.01422 0H3.37865C3.03336 0 2.71199 0.185765 2.53934 0.484933L0.363281 4.26018H7.01419V0H7.01422Z"
        fill={IconColor || primaryColors?.icondarkColor}
      />
      <path
        d="M0 5.26953V16.0369C0 16.6915 0.532737 17.2239 1.18729 17.2239H13.8127C14.4673 17.2239 15 16.6915 15 16.0369V5.26953H0ZM9.79145 9.79759L7.18061 12.4084C7.08201 12.507 6.95276 12.5565 6.82355 12.5565C6.69433 12.5565 6.56509 12.507 6.46682 12.4084L5.24286 11.1848C5.046 10.9879 5.046 10.6682 5.24286 10.471C5.44007 10.2738 5.75979 10.2738 5.95699 10.471L6.82358 11.3379L9.07769 9.0838C9.27489 8.8866 9.59462 8.8866 9.79148 9.0838C9.98869 9.281 9.98869 9.60039 9.79145 9.79759Z"
        fill={IconColor || primaryColors?.icondarkColor}
      />
    </svg>
  );
}
