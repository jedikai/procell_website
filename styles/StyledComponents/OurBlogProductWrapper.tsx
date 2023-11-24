/* eslint-disable mui-path-imports/mui-path-imports */

import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const OurBlogProductWrapper = styled(Box)`
  padding: 12px 12px 35px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: ${primaryColors.white};
  /* max-width: 271px; */
  @media (max-width: 1199px) {
    max-width: 100%;
    padding: 10px 10px 20px;
    height: 100%;
  }

  .blogpostImg {
    height: 224px;
    width: 100%;
    display: inline-block;
    margin-bottom: 18px;
    @media (max-width: 1199px) {
      height: auto;
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .blogdates {
    margin-bottom: 12px;
    P {
      margin: 0 0 0 10px;
      color: ${primaryColors.primary};
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      text-transform: capitalize;
    }
  }
  .blogTitleHeader {
    display: inline-block;
    h3 {
      color: ${primaryColors.black};
      font-family: Roboto;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.3;
      text-transform: capitalize;
      transition: 0.5s ease-in-out;
      &:hover {
        color: ${primaryColors.primary};
      }
    }
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }
`;
