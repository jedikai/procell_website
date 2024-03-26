import { CustomIconProps } from "@/interface/icons.interface";
import { primaryColors } from "@/themes/_muiPalette";

export default function MailBoxIcon({
    IconColor,
    IconWidth,
    IconHeight
}: CustomIconProps) {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={IconWidth || "20"} height={IconHeight || "20"} x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className=""><g><path d="m331.756 277.251-42.881 43.026c-17.389 17.45-47.985 17.826-65.75 0l-42.883-43.026L26.226 431.767C31.959 434.418 38.28 436 45 436h422c6.72 0 13.039-1.58 18.77-4.232L331.756 277.251z" fill={IconColor || primaryColors?.icondarkColor} opacity="1" data-original="#000000" className="" /><path d="M467 76H45c-6.72 0-13.041 1.582-18.772 4.233l164.577 165.123c.011.011.024.013.035.024a.05.05 0 0 1 .013.026l53.513 53.69c5.684 5.684 17.586 5.684 23.27 0l53.502-53.681s.013-.024.024-.035c0 0 .024-.013.035-.024L485.77 80.232C480.039 77.58 473.72 76 467 76zM4.786 101.212C1.82 107.21 0 113.868 0 121v270c0 7.132 1.818 13.79 4.785 19.788l154.283-154.783L4.786 101.212zM507.214 101.21 352.933 256.005 507.214 410.79C510.18 404.792 512 398.134 512 391V121c0-7.134-1.82-13.792-4.786-19.79z" fill={IconColor || primaryColors?.icondarkColor} opacity="1" data-original={IconColor || primaryColors?.icondarkColor} className="" /></g></svg>
    )
}
