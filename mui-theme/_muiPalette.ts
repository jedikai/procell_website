/* eslint-disable mui-path-imports/mui-path-imports */
//  MUI pallete colors will be listed here

import { PaletteMode, PaletteOptions } from "@mui/material";

export const primaryColors = {
  primary: "#16A6DF",
  primary1: "#C2A6F4",


  primary_600: "#5871D0",
  secondary: "rgba(0, 0, 0, 0.31)",
  secondaryBorder: "#F380A5",
  info: "#7CD1D2",
  infoBorder: "#67C1C2",
  disabledBg: "#BFBFBF",
  textDisabled: "#8F98A8",
  errorMain: "#EB4444",
  errorLight: "#FFECF2",
  white: "#fff",
  black: "#000",
  bodyColor: "#F4F6F8",
  mainFontColor: "#848484",
  textPrimaryColor: "#070707",
  borderprimary: "rgba(0, 0, 0, 0.17)",
  border_primary: "rgba(0, 0, 0, 0.17)",
  warning_color: "#FFEFD7",
  success_color: "#D4FEFF",
  text_success: "#3C8183",
  warning_text: "#6F4F1F",
  deepGreen: "#219653",
  // lightGreen: "#D4FEFF",
  danger_text: "#9B3858",
  warningMain: "rgba(255, 167, 33, 1)",
  pendingColor: "#FFEFD7",
  pendingTextColor: "#6F4F1F",
  textDanger: "#9B3858",
  dangerColor: "#FFECF2",

  grey_background: "#DBDBDB",
  // borderprimary:"#DBE0E8",
  chipErrorBg: "#FFECF2",
  chipErrorText: "#9B3858",
  cardShadow: "#070707",
  tableshadow: "rgba(7, 7, 7, 0.06)",
  secondaryFont: "#4D4E4E",
  tertiaryFont: "#585858",
  footer_text: "#1B1B1B",

  cardBackColor: "#d9d0eb",
  text_purple: "#543795",
  sliderBackColor: "#F9F9F9",
  borderColor: "#D8D8D8",

  light_grey: "#C2C2C2",
  icondarkColor: "#252525",
  inputBorder: "#E1E1E1",
  inputText: "#8C929E",
  purple_background: "#F0EDF5",
  grey_text: "#263238",
  text_black2: "#1A1A1A",
  form_text: "#878E95",

  colorF5F5F5: "#F5F5F5",
  colorF0F0F0: "#F0F0F0",
  darkblack: "#1d1d1d",
  lightPurple: "rgba(84, 55, 149, 0.08)",
  lightGreen: "rgba(55, 197, 115, 0.15)",
  mintGreen: "#37C573",
  tablered: "#EC0000",
  tableyellow: "#F90",
  tablegreen: "#37C573",
  bordergray: "#E6E6E6",
  colore6eff8: "#e6eff8",
  liteskyblue: "#dcf5ff",
  liteshadowGray: "#8c8c8c",
  borderlight: "#E6EFF8",
  cancelRed: "#FF3434",
  radioBackcolor: "#BEBEBE",
  gray_background: "#AEAEAE",
  Alart_color: "#DF6A16",
  color353D4A: "#353D4A",
  selectGrey: "#8c8c8c",
  deepBlue: "#0A2540",
  banner_bg: "rgba(84, 55, 149, 0.05)",
  greyPurple: "#797596",
  lightGreytxt: "#b5b9c1",
  color313131:"#313131",
  userBtnColor: "#1c1b1f",
  bordershadowcolor:"#ccc",
  slideractive:"#C5C5C5",
  sliderbuttongray:"#EDEDED",
  shadowGray:"#B8B8B8",
  textBoldgray:"#555",
  minusgray:"rgba(0, 0, 0, 0.71)",
 
};

export const pallete = (mode: PaletteMode): PaletteOptions => {
  return {
    mode,
    background: {
      default: mode === "light" ? "#f5f8fa" : "#000",
      paper: mode === "light" ? "#fff" : "#000"
    },
    //global
    primary: {
      main: primaryColors.primary,
      dark: primaryColors.primary_600
    },
    secondary: {
      main: primaryColors.secondary
    },
    info: {
      main: primaryColors.info
    },
    error: {
      main: primaryColors.errorMain
    },
    warning: {
      main: primaryColors.warningMain
    },

    text: {
      primary: primaryColors.disabledBg
    },
    common: {
      black: primaryColors.black,
      white: primaryColors.white
    }
  };
};
