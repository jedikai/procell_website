/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ClinicalWrapper = styled(Box)`
  .clinic_outr {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: ${primaryColors.white};
    padding: 50px 45px;
    margin-bottom: 40px;
    @media (max-width: 1199px) {
      padding: 30px 20px;
    }
    @media (max-width: 599px) {
      padding: 20px 15px;
    }
    h3 {
      color: ${primaryColors.black};
      font-size: 35px;
      font-weight: 400;
      line-height: 1.2;
      text-transform: lowercase;
      margin-bottom: 25px;
      @media (max-width: 1199px) {
        font-size: 30px;
      }
      @media (max-width: 899px) {
        font-size: 24px;
        margin-bottom: 15px;
      }
    }
    h4 {
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      text-transform: capitalize;
      color: ${primaryColors.black};
      margin-bottom: 40px;
      @media (max-width: 1199px) {
        margin-bottom: 20px;
      }
    }
    h6 {
      color: ${primaryColors.mainFontColor};
      font-family: Roboto;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    p {
      margin: 0;
    }
    button {
      span {
        color: ${primaryColors.white};
        font-family: Roboto;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.7;
        text-transform: capitalize;
      }
    }
  }
`;
