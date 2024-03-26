import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function MoonIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "30"}
      height={IconHeight || "30"}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M15.0369 29.6653C6.93675 29.6875 0.352265 23.1389 0.330134 15.0388C0.308003 6.9387 6.85645 0.354217 14.9566 0.332086C17.4609 0.325254 19.9252 0.959734 22.1148 2.17508L24.0129 3.22862L22.1258 4.30417C16.5564 7.46645 14.6051 14.5449 17.7674 20.1143C18.9848 22.2584 20.854 23.9587 23.1036 24.9683L25.0848 25.8618L23.2918 27.084C20.8651 28.7606 17.9864 29.6607 15.0369 29.6653ZM15.0369 2.77641C8.28672 2.77641 2.81463 8.24849 2.81463 14.9986C2.81463 21.7488 8.28672 27.2209 15.0369 27.2209C16.7912 27.2212 18.5243 26.8382 20.1152 26.0989C13.6479 21.8287 11.8669 13.1243 16.1371 6.65698C16.9354 5.44789 17.9162 4.36975 19.0445 3.46091C17.7576 3.00529 16.4021 2.77377 15.0369 2.77641ZM23.9591 12.1875L25.3854 15.039L26.813 12.1875L29.6644 10.7612L26.813 9.33364L25.3867 6.48218L23.9591 9.33364L21.1089 10.76L23.9591 12.1875ZM28.4813 21.1098C27.8063 21.1098 27.259 21.657 27.259 22.332C27.259 23.007 27.8063 23.5543 28.4813 23.5543C29.1563 23.5543 29.7035 23.007 29.7035 22.332C29.7035 21.657 29.1563 21.1098 28.4813 21.1098ZM21.148 16.2209C20.473 16.2209 19.9257 16.7681 19.9257 17.4431C19.9257 18.1181 20.473 18.6654 21.148 18.6654C21.823 18.6654 22.3702 18.1181 22.3702 17.4431C22.3702 16.7681 21.823 16.2209 21.148 16.2209Z"
        fill={IconColor || primaryColors?.deepBlue}
      />
    </svg>
  );
}
