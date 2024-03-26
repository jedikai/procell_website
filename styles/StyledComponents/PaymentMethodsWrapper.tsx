/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const PaymentMethodsWrapper = styled(Box)`
  .cardtype {
    margin-bottom: 38px;
    h4 {
      color: ${primaryColors.black};
      font-size: 25px;
      font-weight: 400;
      line-height: 1.7;
      text-transform: lowercase;
      margin-bottom: 34px;
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
  }
  .cardDetails {
    h4 {
      color: ${primaryColors.black};
      font-size: 25px;
      font-weight: 400;
      line-height: 1.7;
      text-transform: lowercase;
      margin-bottom: 32px;
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
    .MuiFormControl-root {
      .MuiInputBase-root {
        min-height: 50px;
      }
    }
  }

  .paymentSubmitBtn {
    margin-top: 30px;
    button {
      min-width: 275px;
      margin: 0 auto;

      @media (max-width: 375px) {
        min-width: 100%;
      }
      span{
        color: ${primaryColors.white};
font-family: Roboto;
font-size: 14px;
font-weight: 600;
line-height:1.7;
text-transform: capitalize;
      }
    }
  }
`;
