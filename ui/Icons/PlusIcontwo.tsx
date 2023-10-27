import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function PlusIconTwo({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "9"}
      height={IconHeight || "9"}
      viewBox="0 0 9 9"
      fill="none"
    >
      <path
        d="M8.54994 4.04999H4.95001V0.44997C4.95001 0.201635 4.74838 0 4.49996 0C4.25162 0 4.04999 0.201635 4.04999 0.44997V4.04999H0.44997C0.201635 4.04999 0 4.25162 0 4.49996C0 4.74838 0.201635 4.95001 0.44997 4.95001H4.04999V8.54994C4.04999 8.79837 4.25162 9 4.49996 9C4.74838 9 4.95001 8.79837 4.95001 8.54994V4.95001H8.54994C8.79837 4.95001 9 4.74838 9 4.49996C9 4.25162 8.79837 4.04999 8.54994 4.04999Z"
        fill={IconColor || primaryColors?.black}
      />
    </svg>
  );
}
