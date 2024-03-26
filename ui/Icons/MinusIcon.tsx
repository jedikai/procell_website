import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function MinusIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "9"}
      height={IconHeight || "1"}
      viewBox="0 0 9 1"
      fill="none"
    >
      <path
        d="M0.534175 5.96046e-08H8.45958C8.53055 5.96046e-08 8.60083 0.0129341 8.66641 0.0380641C8.73198 0.063194 8.79156 0.100027 8.84174 0.146461C8.89192 0.192894 8.93173 0.248018 8.95888 0.308684C8.98604 0.369351 9.00001 0.434372 9 0.500034C9.00001 0.565693 8.98604 0.630711 8.95888 0.691373C8.93173 0.752036 8.89192 0.807155 8.84174 0.853583C8.79155 0.900011 8.73197 0.936838 8.6664 0.961961C8.60083 0.987083 8.53055 1.00001 8.45958 1H0.534175C0.391931 0.998461 0.256078 0.945105 0.156079 0.851504C0.0560807 0.757903 0 0.631604 0 0.5C0 0.368396 0.0560807 0.242097 0.156079 0.148496C0.256078 0.0548955 0.391931 0.00153929 0.534175 5.96046e-08Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
}
