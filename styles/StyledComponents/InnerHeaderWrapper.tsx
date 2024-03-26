/* eslint-disable mui-path-imports/mui-path-imports */

import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const InnerHeaderWrapper = styled(Box)`
  .innerHeadersection {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 54px 0 66px 0;
    position: relative;
    z-index: 1;
    @media (max-width: 899px) {
      padding: 40px 0;
    }
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff8d;
      z-index: -1;
    }

    h3 {
      color: ${primaryColors.black};
      text-align: center;
      font-size: 47px;
      font-weight: 700;
      line-height: 1.5;
      text-transform: uppercase;
      margin-bottom: 12px;
      @media (max-width: 899px) {
        font-size: 35px;
        line-height: 1.2;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
      @media (max-width: 479px) {
        font-size: 24px;
      }
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        width: auto;
        margin-right: 9px;
        color: ${primaryColors.black};
        font-size: 16px;
        font-weight: 400;
        line-height: 1.2;
        &:last-child {
          margin-right: 0px;
        }
        a {
          display: inline-block;
          color: inherit;
          font-size: inherit;
          font-weight: inherit;
          &:hover {
            color: ${primaryColors.primary};
          }
        }
      }
    }
  }
`;
