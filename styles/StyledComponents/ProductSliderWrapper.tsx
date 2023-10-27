/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ProductSliderWrapper = styled(Box)`
  height: 100%;
  .productSliderbox {
    padding: 28px 28px 32px 28px;
    background-color: ${primaryColors.sliderBackColor};
    text-align: center;
    border-radius: 10px;
    height: 100%;
    min-height: 420px;
    @media (max-width: 1199px) {
      padding: 25px 28px 32px 28px;
    }
    @media (max-width: 1199px) {
      padding: 20px 15px;
    }

    figure {
      height: 231px;
      margin-bottom: 23px;
      font-size: 0;
      line-height: 0;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
    }
    .slidertitletext {
      padding-top: 23px;
      border-top: 1px solid ${primaryColors.borderColor};

      h4 {
        color: ${primaryColors.black};
        font-size: 16px;
        font-weight: 600;
        line-height: 1.3;
        text-transform: capitalize;
        font-family: Roboto;
        margin-bottom: 10px;
        transition: all 0.4s;

        &:hover {
          color: ${primaryColors.primary};
        }
      }
    }
  }
`;
