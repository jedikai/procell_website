import { CustomIconProps } from "@/interface/icons.interface";

const ArrowRightIcon = ({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "29"}
      height={IconHeight || "8"}
      viewBox="0 0 29 8"
      fill="none"
    >
      <path
        d="M28.3536 4.35355C28.5488 4.15829 28.5488 3.84171 28.3536 3.64644L25.1716 0.464464C24.9763 0.269202 24.6597 0.269202 24.4645 0.464464C24.2692 0.659726 24.2692 0.976309 24.4645 1.17157L27.2929 4L24.4645 6.82842C24.2692 7.02369 24.2692 7.34027 24.4645 7.53553C24.6597 7.73079 24.9763 7.73079 25.1716 7.53553L28.3536 4.35355ZM4.37114e-08 4.5L28 4.5L28 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
        fill={IconColor || "#fff"}
      />
    </svg>
  );
};

export default ArrowRightIcon;
