import { CustomIconProps } from "@/interface/icons.interface";

const DeleteIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "23"}
      height={IconHeight || "25"}
      viewBox="0 0 23 25"
      fill="none"
    >
      <path
        d="M18.9638 9.58789L17.253 23.2744H5.27722L3.56641 9.58789"
        stroke={IconColor || "#EC0000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6.16797H21.5298"
        stroke={IconColor || "#EC0000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.92188 5.67053V2.71082C6.92188 2.25708 7.10212 1.82193 7.42296 1.50109C7.7438 1.18025 8.17896 1 8.63269 1H13.7651C14.2189 1 14.654 1.18025 14.9749 1.50109C15.2957 1.82193 15.476 2.25708 15.476 2.71082V6.13246"
        stroke={IconColor || "#EC0000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
