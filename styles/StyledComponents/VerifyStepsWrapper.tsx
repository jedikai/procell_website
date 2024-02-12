import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const VerifyStepsWrapper = styled(Box)`
  .verify_text {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    color: ${primaryColors.black};
    margin: 0 auto 20px;
    max-width: 650px;
    @media (max-width: 599px) {
      font-size: 17px;
    }
  }
  .btn_holder {
    display: flex;
    justify-content: center;
    button {
      min-width: 330px;
      @media (max-width: 599px) {
        min-width: auto;
        width: 100%;
      }
    }
  }
  .input_group {
    margin: 0 auto 30px;
    @media (max-width: 599px) {
      max-width: none !important;
    }
    &.copy_group {
      .MuiOutlinedInput-root {
        padding-right: 3px;
      }
      .MuiInputAdornment-root {
        .MuiButtonBase-root {
          width: 40px;
          height: 42px;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          background-color: rgba(45, 166, 225, 0.1);
        }
      }
    }
    .MuiOutlinedInput-root {
      min-width: auto;
    }
  }

  .verify_rep_2 {
    .input_group {
      max-width: 252px;
    }
    .btn_holder {
      display: flex;
      justify-content: center;
      button {
        min-width: 152px;
      }
    }
  }
  .verify_rep_3 {
    .input_group {
      max-width: 330px;
    }
  }

  .verify_cer_1 {
    .input_group {
      max-width: 330px;
    }
  }

  .err_text {
    padding-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 400;
    color: ${primaryColors.colorEC3030};
    @media (max-width: 599px) {
      font-size: 10px;
    }
    .ico {
      font-size: 0;
      line-height: 0;
      margin-right: 5px;
    }
  }
  .protect_text {
    padding-top: 10px;
    text-align: center;
    margin-bottom: 0;
    color: ${primaryColors.black};
    @media (max-width: 599px) {
      font-size: 12px;
    }
    a {
      color: ${primaryColors.colorACA6F1};
    }
  }

  .pr_details {
    padding: 30px;
    min-height: 85px;
    justify-content: center;
    background: linear-gradient(
      116.66deg,
      rgba(84, 55, 149, 0.12) 0.74%,
      rgba(22, 166, 223, 0.12) 113.65%
    );
    border-radius: 10px;
    @media (max-width: 1199px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 599px) {
      padding: 15px;
    }
    .pr_block {
      max-width: 33%;
      padding-right: 80px;
      padding-left: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${primaryColors.black};
      @media (max-width: 1199px) {
        max-width: none;
        width: 100%;
        padding: 0 0 15px;
      }
      @media (max-width: 599px) {
        font-size: 14px;
      }
      span {
        font-weight: 500;
        color: ${primaryColors.text_purple};
        margin-right: 10px;
      }
      &:not(:last-child) {
        border-right: 1px solid ${primaryColors.colorC9C4C4};
        @media (max-width: 1199px) {
          border: none;
        }
      }
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
        padding-left: 100px;
        @media (max-width: 1199px) {
          padding-left: 0;
          padding-bottom: 0;
        }
      }
    }
  }
`;
