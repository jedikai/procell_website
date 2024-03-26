import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function SentIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "15"}
      height={IconHeight || "16"}
      viewBox="0 0 15 16"
      fill="none"
    >
      <path
        d="M13.8101 1.45686L1.30531 4.97887C1.19886 5.00797 1.10397 5.06918 1.03357 5.15416C0.963162 5.23914 0.920666 5.34376 0.911866 5.45376C0.903066 5.56376 0.928389 5.6738 0.984388 5.76889C1.04039 5.86398 1.12434 5.9395 1.2248 5.98516L6.96736 8.70214C7.07985 8.75423 7.17019 8.84458 7.22229 8.95707L9.93927 14.6996C9.98493 14.8001 10.0604 14.884 10.1555 14.94C10.2506 14.996 10.3607 15.0214 10.4707 15.0126C10.5807 15.0038 10.6853 14.9613 10.7703 14.8909C10.8552 14.8205 10.9165 14.7256 10.9456 14.6191L14.4676 2.1143C14.4943 2.02305 14.4959 1.9263 14.4723 1.83419C14.4488 1.74208 14.4009 1.658 14.3337 1.59077C14.2664 1.52355 14.1824 1.47564 14.0902 1.45208C13.9981 1.42852 13.9014 1.43017 13.8101 1.45686V1.45686Z"
        stroke={IconColor || primaryColors?.greyPurple}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.14258 8.78033L10.1749 5.74805"
        stroke={IconColor || primaryColors?.greyPurple}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
