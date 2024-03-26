import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

const TwitterIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "14"}
      height={IconHeight || "14"}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M8.3319 5.92804L13.5437 0H12.3087L7.78327 5.14724L4.16883 0H0L5.46574 7.78354L0 14H1.2351L6.01406 8.56434L9.83117 14H14L8.3316 5.92804H8.3319ZM6.64026 7.85211L6.08647 7.07705L1.68013 0.909771H3.57717L7.13314 5.88696L7.68693 6.66202L12.3093 13.1316H10.4122L6.64026 7.85241V7.85211Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
};

export default TwitterIcon;
