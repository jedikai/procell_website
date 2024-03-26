import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function MesaageIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "14"}
      height={IconHeight || "15"}
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M1.43429 10.917C0.635219 9.56886 0.355715 7.9754 0.648247 6.43577C0.94078 4.89614 1.78523 3.51624 3.02307 2.5551C4.26091 1.59397 5.80701 1.11771 7.37112 1.21573C8.93522 1.31375 10.4098 1.97932 11.5179 3.08747C12.6261 4.19563 13.2916 5.67017 13.3897 7.23427C13.4877 8.79838 13.0114 10.3445 12.0503 11.5823C11.0892 12.8202 9.70925 13.6646 8.16962 13.9571C6.62999 14.2497 5.03653 13.9702 3.68838 13.1711V13.1711L1.46112 13.8017C1.36987 13.8284 1.27312 13.83 1.18101 13.8065C1.0889 13.7829 1.00483 13.735 0.937599 13.6678C0.870371 13.6006 0.822465 13.5165 0.798904 13.4244C0.775342 13.3323 0.776992 13.2355 0.803681 13.1443L1.43429 10.917Z"
        stroke={IconColor || primaryColors?.greyPurple}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
