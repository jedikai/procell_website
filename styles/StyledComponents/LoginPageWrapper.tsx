import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const LoginPageWrapper = styled(Box)`
  &.forget_wrapper {
    margin: auto;
  }
  .phone_num_wrap {
    justify-content: space-between;
    flex-wrap: wrap;
    .autocomplete_wrap {
      width: 49%;

      @media (max-width: 479px) {
        width: 100%;
        margin: 0 0 15px;
      }
      .MuiAutocomplete-root {
        max-width: none;
        width: 100%;
      }
    }
    .autocomplete_right {
      width: 49%;
      @media (max-width: 479px) {
        width: 100%;
      }
    }
  }
  .wrapper {
    text-align: center;
    padding-bottom: 20px;
    img {
      margin-bottom: 28px;
      @media (max-width: 599px) {
        margin-bottom: 30px;
        width: 120px;
        height: 45px;
      }
      @media (max-width: 375px) {
        margin-bottom: 15px;
        width: 100px;
        height: 35px;
      }
    }
    .form_body {
      h4 {
        span {
          font-size: inherit;
          font-weight: inherit;
          font-family: inherit;
          color: ${primaryColors.text_purple};
        }
        @media (max-width: 899px) {
          font-size: 24px;
          margin-bottom: 10px;
        }
        @media (max-width: 599px) {
          font-size: 20px;
        }
        @media (max-width: 375px) {
          font-size: 18px;
          margin-bottom: 8px;
        }
      }
      p {
        @media (max-width: 899px) {
          font-size: 14px;
          margin-bottom: 20px;
        }
        @media (max-width: 375px) {
          margin-bottom: 10px;
        }
      }

      .input_wrap {
        .MuiFormControl-root {
          :not(:last-child) {
            margin-bottom: 15px;
          }
          .MuiInputBase-root {
            @media (max-width: 899px) {
              min-width: auto;
            }
            input {
              @media (max-width: 599px) {
                padding: 7px 0;
              }
            }
            .MuiInputAdornment-root {
            }
          }
        }
      }

      .forgot_pass {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 36px;
        @media (max-width: 899px) {
          margin-bottom: 20px;
        }
        .rememberMewrap {
          display: flex;
          align-items: center;
          p {
            color: ${primaryColors.text_black2};
            line-height: 1.2;
            letter-spacing: 0.3px;
            text-transform: capitalize;
            opacity: 0.6;
          }
        }

        .MuiSwitch-switchBase {
          &.Mui-checked {
            padding: 9px 6px 8px 6px;
            color: ${primaryColors.text_purple};
            opacity: 1;
          }
        }
        .MuiSwitch-root {
          width: auto;
          align-items: center;
          padding: 4px 6px 8px 6px;
        }
        .Mui-checked {
          &.MuiSwitch-track {
            background-color: ${primaryColors.text_purple} !important;
            opacity: 1;
          }
          .MuiSwitch-thumb {
            background: ${primaryColors.white};
          }
          .MuiSwitch-track {
            background: ${primaryColors.primary} !important;
          }
        }
        .MuiSwitch-track {
          height: 20px;
          width: 40px;
          background: ${primaryColors.white};
          border-radius: 36px;
          opacity: 1;
        }
        .Mui-checked {
          + .MuiSwitch-track {
            background: ${primaryColors.text_purple};
          }
        }
        .MuiSwitch-thumb {
          width: 16px;
          height: 16px;
          color: ${primaryColors.text_purple};
          /* color: #2196f3; */
        }
        a {
          text-decoration: none;
          text-transform: capitalize;
          color: ${primaryColors.primary};
          font-family: Roboto;
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          text-transform: capitalize;
          &:hover {
            color: ${primaryColors.black};
          }
          @media (max-width: 899px) {
            font-size: 14px;
          }
        }
      }
    }

    .radio_btn_grp {
      margin-bottom: 30px;
      @media (max-width: 599px) {
        margin-bottom: 20px;
      }
      .MuiFormControl-root {
        display: block;
        .MuiFormLabel-root {
          max-width: 360px;
          text-align: left;
          font-size: 16px;
          font-weight: 400;
          opacity: 0.6;
          display: block;
          letter-spacing: 0.3px;
          margin-bottom: 10px;
          text-transform: capitalize;
          color: ${primaryColors.text_black2};
          @media (max-width: 599px) {
            font-size: 14px;
          }
        }

        .checkbox_wrapper {
          display: flex;
          justify-content: flex-start;
          &.checkbox-one {
            gap: 10px;
            svg {
              display: none;
              opacity: 0;
            }
          }
          .Mui-checked {
            .MuiSvgIcon-root {
              background-color: transparent;
              width: 20px;
              height: 20px;
            }
            svg {
              path {
                fill: ${primaryColors.primary};
              }
            }
          }
          .MuiSvgIcon-root {
            fill: ${primaryColors.white};
            background-color: ${primaryColors.white};
            width: 20px;
            height: 20px;
          }
          span {
            @media (max-width: 599px) {
              font-size: 14px;
            }
          }
        }
      }
    }

    .forget_page_p {
      max-width: 383px;
      margin: 0 auto 26px auto;
      color: ${primaryColors.form_text};
      text-align: center;
      font-size: 15px;
      line-height: 1.5;
    }

    .verified_box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 36px;
      @media (max-width: 899px) {
        margin-bottom: 20px;
      }

      img {
        margin-bottom: 0;
        margin-right: 13px;
        @media (max-width: 599px) {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
      p {
        font-weight: 400;
        font-size: 15px;
        color: ${primaryColors.text_purple};
        margin: 0;
      }
    }
    .btn_wrapper {
      button {
        @media (max-width: 899px) {
          margin-bottom: 22px;
        }
        @media (max-width: 599px) {
          padding: 10px;
        }
        p {
          text-transform: capitalize;
        }
      }
    }
  }
  .phone_num_wrap {
    margin-bottom: 15px;
    flex-direction: row;
    .MuiFormControl-root {
      .MuiInputBase-root {
        min-width: auto;
      }
    }
    .MuiAutocomplete-root {
      max-width: 130px;
      margin-right: 10px;
      @media (max-width: 389px) {
        max-width: 87px;
      }
      .MuiOutlinedInput-notchedOutline {
        display: none;
      }
      .MuiInputBase-root {
        border-radius: 10px;
        height: 50px;

        background-color: ${primaryColors.white};
        @media (max-width: 599px) {
          height: 47px;
        }
        @media (max-width: 389px) {
          padding-right: 15px;
        }
        input {
          padding: 0 !important;
          color: ${primaryColors?.black};

          &::placeholder {
            color: ${primaryColors?.mainFontColor};
            opacity: 1;
          }
        }
      }
    }
  }
`;
