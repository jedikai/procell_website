import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

const MailIcon = ({ IconColor, IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "19"}
      height={IconHeight || "14"}
      viewBox="0 0 19 14"
      fill="none"
    >
      <path
        d="M16.7277 0.85H2.51552C1.59893 0.85 0.85 1.59555 0.85 2.51552V11.6086C0.85 12.529 1.59942 13.2742 2.51552 13.2742H16.7277C17.6443 13.2742 18.3932 12.5286 18.3932 11.6086V2.51552C18.3932 1.59531 17.6439 0.85 16.7277 0.85ZM3.10954 2.16035H16.1337L9.90687 8.4075C9.90687 8.40751 9.90686 8.40751 9.90686 8.40752C9.84213 8.47243 9.73732 8.51202 9.62164 8.51203C9.50597 8.51204 9.40114 8.47248 9.33638 8.40751L3.10954 2.16035ZM6.14524 7.06208L2.16035 11.0599V3.06422L6.14524 7.06208ZM10.8349 9.33257L12.173 7.99018L16.1337 11.9638H3.10954L7.0703 7.99015L8.40835 9.33257C9.05884 9.98518 10.1847 9.98491 10.8349 9.33258L10.7287 9.22668L10.8349 9.33257ZM17.0829 3.06422V11.0599L13.098 7.06208L17.0829 3.06422Z"
        fill={IconColor || primaryColors?.text_purple}
        stroke={IconColor || primaryColors?.text_purple}
        strokeWidth="0.3"
      />
    </svg>
  );
};

export default MailIcon;
