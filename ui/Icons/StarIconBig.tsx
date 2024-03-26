import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

const StarIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "20"}
      height={IconHeight || "21"}
      viewBox="0 0 40 41"
      fill="none"
    >
      <path
        d="M40 0.5H0V40.5H40V0.5Z"
        fill={IconColor || primaryColors?.deepGreen}
      />
      <path
        d="M19.9995 27.4583L26.0828 25.9167L28.6245 33.75L19.9995 27.4583ZM33.9995 17.3333H23.2912L19.9995 7.25L16.7078 17.3333H5.99951L14.6662 23.5833L11.3745 33.6667L20.0412 27.4167L25.3745 23.5833L33.9995 17.3333Z"
        fill="white"
      />
    </svg>
  );
};

export default StarIcon;
