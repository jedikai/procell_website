import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

const GreenStarIcon = ({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "27"}
      height={IconHeight || "25"}
      viewBox="0 0 27 25"
      fill="none"
    >
      <path
        d="M13.5 18.8019L19.0095 17.4057L21.3114 24.5L13.5 18.8019ZM26.1793 9.63208H16.4812L13.5 0.5L10.5189 9.63208H0.820801L8.66986 15.2925L5.68872 24.4245L13.5378 18.7641L18.368 15.2925L26.1793 9.63208Z"
        fill={IconColor || primaryColors.deepGreen}
      />
    </svg>
  );
};

export default GreenStarIcon;
