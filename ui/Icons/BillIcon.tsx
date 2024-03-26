import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function BillIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "17"}
      height={IconHeight || "21"}
      viewBox="0 0 17 21"
      fill="none"
    >
      <path
        d="M10.2 6.125V0.4025C10.9863 0.708168 11.7005 1.1824 12.2953 1.79375L15.2566 4.844C15.8512 5.45552 16.3122 6.19053 16.609 7H11.05C10.8246 7 10.6084 6.90781 10.449 6.74372C10.2896 6.57962 10.2 6.35706 10.2 6.125ZM17 9.17437V16.625C16.9986 17.7849 16.5505 18.8969 15.7537 19.7171C14.957 20.5372 13.8768 20.9986 12.75 21H4.25C3.12324 20.9986 2.04302 20.5372 1.24629 19.7171C0.44955 18.8969 0.00134968 17.7849 0 16.625V4.375C0.00134968 3.2151 0.44955 2.10311 1.24629 1.28294C2.04302 0.462772 3.12324 0.00138938 4.25 0L8.08775 0C8.2263 0 8.36315 0.011375 8.5 0.021V6.125C8.5 6.82119 8.76866 7.48887 9.24688 7.98116C9.7251 8.47344 10.3737 8.75 11.05 8.75H16.9796C16.989 8.89087 17 9.03175 17 9.17437Z"
        fill={IconColor || primaryColors?.icondarkColor}
      />
    </svg>
  );
}
