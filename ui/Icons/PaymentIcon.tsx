import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function PaymentIcon({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "17"}
      height={IconHeight || "16"}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0492 0.0038971C9.71071 -0.0189851 9.37307 0.0592759 9.07917 0.228735L5.56313 2.25656H12.2141L11.4046 0.851858C11.265 0.610704 11.0685 0.407367 10.8322 0.259569C10.596 0.11177 10.3271 0.0239964 10.0492 0.0038971ZM1.70234 3.38931C1.25192 3.39156 0.820547 3.57134 0.501842 3.88965C0.183138 4.20795 0.00281313 4.63909 0 5.08952V14.1558C0 15.0873 0.770873 15.8539 1.70234 15.8539H14.1648C14.615 15.8522 15.0464 15.6729 15.3652 15.3549C15.6839 15.037 15.8643 14.6061 15.8671 14.1558V12.4535H13.0299C11.4732 12.4535 10.2012 11.1794 10.2012 9.62268C10.2012 8.06594 11.4732 6.78972 13.0299 6.78972H15.8671V5.09166C15.8643 4.64124 15.684 4.21009 15.3653 3.89179C15.0466 3.57348 14.6152 3.3937 14.1648 3.39146L1.70234 3.38931ZM13.0299 7.92462C12.0856 7.92462 11.334 8.67622 11.334 9.62268C11.334 10.5691 12.0856 11.3186 13.0299 11.3186H16.4324C16.5072 11.3206 16.5815 11.3075 16.651 11.28C16.7205 11.2525 16.7837 11.2111 16.8367 11.1585C16.8898 11.1058 16.9316 11.043 16.9596 10.9737C16.9877 10.9044 17.0014 10.8302 16.9999 10.7554V8.48993C17.0014 8.4151 16.9877 8.34076 16.9596 8.27137C16.9316 8.20198 16.8898 8.13898 16.8368 8.08616C16.7838 8.03335 16.7206 7.99181 16.6511 7.96404C16.5817 7.93628 16.5073 7.92287 16.4324 7.92462H13.0299ZM13.032 9.05523C13.1825 9.05523 13.3269 9.11502 13.4333 9.22143C13.5397 9.32785 13.5995 9.47218 13.5995 9.62268C13.5995 9.77318 13.5397 9.91751 13.4333 10.0239C13.3269 10.1303 13.1825 10.1901 13.032 10.1901C12.8815 10.1901 12.7372 10.1303 12.6308 10.0239C12.5244 9.91751 12.4646 9.77318 12.4646 9.62268C12.4646 9.47218 12.5244 9.32785 12.6308 9.22143C12.7372 9.11502 12.8815 9.05523 13.032 9.05523Z"
        fill={IconColor || primaryColors?.icondarkColor}
      />
    </svg>
  );
}
