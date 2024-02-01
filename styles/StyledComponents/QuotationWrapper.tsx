/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const QuotationWrapper = styled(Box)`
  .quotationHeader {
    margin-bottom: 28px;
    flex-wrap: wrap;
    @media (max-width: 599px) {
      justify-content: flex-start;
      h4 {
        width: 100%;
      }
    }
    h4 {
      color: ${primaryColors.black};
      font-size: 25px;
      line-height: 1.7;
      text-transform: lowercase;
      @media (max-width:1199px) {
        font-size:22px
      }
      @media (max-width:899px) {
        font-size:20px
      }
    }
    .quotationshort {
      justify-content: flex-start;
      p {
        min-width: 100px;
        margin: 0 26px 0 0;
        text-align: right;
        color: ${primaryColors.black};
        font-size: 13px;
        line-height: 1.2;
        letter-spacing: 0.4px;
        @media (max-width: 599px) {
          text-align: left;
        }
        @media (max-width: 375px) {
          min-width: 60px;
        }
      }
      .orderDataSelect {
        .MuiInputBase-root {
          @media (max-width:1199px) {
       min-width: 135px;
      }
        
        .MuiSelect-select {
          color: ${primaryColors.liteshadowGray};
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0.4px;
        }
      }
      }
    }
  }
  .tableWrapper {
    border-radius: 10px;
    border: 1px solid ${primaryColors.inputBorder};
    background: ${primaryColors.white};
    padding: 14px 15px 27px 15px;

    .valid_until{
      @media(max-width: 899px){
        display: none;
      }
    }
  }
`;
