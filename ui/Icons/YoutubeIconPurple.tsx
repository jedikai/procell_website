import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";
import React from "react";

export default function YoutubeIconPurple({ IconColor, IconWidth, IconHeight }: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "18"}
      height={IconHeight || "13"}
      viewBox="0 0 18 13"
      fill="none"
    >
      <path
        d="M7.53125 4.90234V8.09768L10.0879 6.50001L7.53125 4.90234Z"
        fill={IconColor || primaryColors?.text_purple}
      />
      <path
        d="M2.5 13H14.5667C15.9451 13 17.0667 11.8784 17.0667 10.5V2.5C17.0667 1.12157 15.9451 0 14.5667 0H2.5C1.12157 0 0 1.12157 0 2.5V10.5C0 11.8784 1.12157 13 2.5 13ZM6.53333 4C6.53338 3.91071 6.5573 3.82306 6.60263 3.74613C6.64796 3.6692 6.71305 3.6058 6.79113 3.5625C6.94837 3.4746 7.14417 3.479 7.29847 3.57617L11.2985 6.07617C11.3703 6.12111 11.4296 6.18359 11.4707 6.25773C11.5118 6.33187 11.5333 6.41524 11.5333 6.5C11.5333 6.58476 11.5118 6.66813 11.4707 6.74227C11.4296 6.81641 11.3703 6.87889 11.2985 6.92383L7.29847 9.42383C7.21901 9.47366 7.12712 9.50006 7.03333 9.5C6.94983 9.5 6.86633 9.479 6.79113 9.4375C6.71305 9.3942 6.64796 9.3308 6.60263 9.25387C6.5573 9.17694 6.53338 9.08929 6.53333 9V4Z"
        fill={IconColor || primaryColors?.text_purple}
      />
    </svg>
  );
}
