/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import { primaryColors } from "@/themes/_muiPalette";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/system";

import React, { forwardRef } from "react";
import PasswordHideicon from "../Icons/PasswordHideIcon";
import ShowPasswordIcon from "../Icons/ShowPasswordIcon";

const InputWrap = styled(TextField as any)`
  &.border_none {
    /* background-color: red !important; */
    .MuiInputBase-adornedEnd {
      border: none !important;
      max-height: 50px;
    }
  }

  &.border_round {
    .MuiInputBase-adornedEnd {
      border-radius: 60px;

      &.MuiInputBase-multiline {
        border-radius: 20px;
      }
    }
  }
  .MuiInputBase-adornedEnd {
    height: auto;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
    color: var(--white);
    border-radius: 10px;
    padding: 6.5px 20px;
    border: 1px solid ${primaryColors?.inputBorder};
    background: ${primaryColors?.white};
    /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06); */
    /* min-width: 300px; */
    @media (max-width: 1199px) {
      min-width: auto;
    }
    @media (max-width: 600px) {
      padding: 5px 10px;
    }

    input[type="text"],
    input[type="email"],
    input[type="url"],
    input[type="password"],
    input[type="search"],
    input[type="number"],
    input[type="tel"],
    input[type="range"],
    input[type="date"],
    input[type="month"],
    input[type="week"],
    input[type="time"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="color"],
    textarea {
      color: ${primaryColors?.textPrimaryColor};
      border: 0;
      padding-left: 0;
      &::placeholder {
        color: ${primaryColors?.inputText};
        opacity: 1;
      }
      &:focus {
        border: 0;
        background: transparent;
      }
    }
    textarea {
      padding: 20px 10px 20px 20px;
      @media (max-width: 600px) {
        padding: 15px 5px;
      }
    }
    &.Mui-error {
      input[type="text"],
      input[type="email"],
      input[type="url"],
      input[type="password"],
      input[type="search"],
      input[type="number"],
      input[type="tel"],
      input[type="range"],
      input[type="date"],
      input[type="month"],
      input[type="week"],
      input[type="time"],
      input[type="datetime"],
      input[type="datetime-local"],
      input[type="color"],
      textarea {
        border-color: ${primaryColors?.errorMain};
      }
    }
    .MuiOutlinedInput-notchedOutline {
      display: none;
      /* border-color: var(--primaryD3D7DF); */
    }
    #outlined-adornment-password {
      border: 0;
      padding: 0;
      height: 39px;
      font-size: 16px;
      &::placeholder {
        color: ${primaryColors?.mainFontColor};
        opacity: 1;
      }
    }
    button {
      background-color: transparent;
      color: var(--textPrimaryColor);
      padding: 0;
      &:focus {
        background-color: transparent;
        color: var(--textPrimaryColor);
      }
      &:hover {
        background-color: transparent;
        color: var(--textPrimaryColor);
      }
      img {
        position: static !important;
        transform: inherit !important;
        top: 0;
        left: 0;
        width: 20px;
      }
      svg {
        font-size: 20px;
      }
    }
  }
`;

type InputFieldCommonProps = StandardTextFieldProps & {
  isPassword?: boolean;
  adorMentIcon?: JSX.Element;
  style2?: boolean;
  style3?: boolean;
  disabled?: boolean;
  defaultValues?: string;
  pattern?: string;
};

const InputFieldCommon = forwardRef<HTMLInputElement, InputFieldCommonProps>(
  (
    {
      isPassword = false,
      adorMentIcon,
      style2,
      style3,
      disabled,
      defaultValues,
      ...others
    },
    ref
  ) => {
    console.log(
      "value",
      others?.placeholder ?? "no placeholder",
      others?.value ?? "no value"
    );
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
    return (
      <InputWrap
        fullWidth
        variant="outlined"
        disabled={disabled}
        defaultValues={defaultValues}
        {...others}
        type={isPassword ? (showPassword ? "text" : "password") : others?.type}
        className={
          style2
            ? "border_none"
            : style3
            ? "border_round"
            : isPassword
            ? "has_password"
            : ""
        }
        InputProps={{
          inputRef: ref,

          endAdornment: isPassword ? (
            <InputAdornment position="end" tabIndex={-1}>
              <IconButton
                tabIndex={-1}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disableRipple
              >
                {showPassword ? <ShowPasswordIcon /> : <PasswordHideicon />}
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end" tabIndex={-1}>
              <IconButton
                tabIndex={-1}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disableRipple
              >
                {/* <SearchRoundedIcon/> */}
                {adorMentIcon}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
);

export default InputFieldCommon;
