/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const QuatationMessageWrapper = styled(Box)`
  border-radius: 10px;
  background: ${primaryColors.white};
  box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
  .QuatationDetailbox {
    padding: 35px 35px;
    margin-top: 38px;
    @media (max-width: 599px) {
      padding: 16px;
    }
    h4 {
      color: ${primaryColors.black};
      font-size: 25px;
      font-weight: 400;
      line-height: 1;
      text-transform: lowercase;
      margin-bottom: 18px;
      @media (max-width: 599px) {
        font-size: 20px;
        margin-bottom: 12px;
      }
    }
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      margin: 0;
    }
    .inputmessagefield {
      position: relative;
      padding-top: 18px;
      .MuiInputBase-root {
        padding: 0;
        border-radius: 10px;
        border: 1px solid ${primaryColors.inputBorder};
        background: ${primaryColors.white};
        .MuiInputBase-input {
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
        }
        textarea {
          height: 57px !important;
          padding: 20px 20px 20px 26px;
        }
        fieldset {
          display: none;
        }
        .MuiInputAdornment-root {
          display: none;
        }
      }

      .inputmessageButton {
        position: absolute;
        bottom: 10px;
        right: 8px;
        > button {
          margin-right: 7px;
        }
        button {
          background-color: #ededed;
          border: 8px;
          min-height: 39px;
          min-width: 39px;
          align-items: center;
          justify-content: center;
          span {
            display: inline-block;
            line-height: 1;
          }
          :hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
`;
