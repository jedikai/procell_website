/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ProductLeftWrap = styled(Box)`
  .main_product {
    .zoom_img {
      height: 550px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 899px) {
        height: auto;
      }
     

      .iiz__img {
        mix-blend-mode: multiply;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .iiz__close {
    z-index: 9;
  }
  .pro_lft_wrap {
    background-color: ${primaryColors.sliderBackColor};
    position: relative;
    z-index: 1;
    padding: 16px 21px 80px 0;
    @media (max-width: 899px) {
      padding: 30px 20px 35px;
    }
   
    &:after {
      position: absolute;
      content: "";
      left: -5000px;
      right: inherit;
      width: 5000px;
      background-color: ${primaryColors.sliderBackColor};
      top: 0;
      height: 100%;
      z-index: -1;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  .slick-dots {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    bottom: -60px;
    background: transparent;
    @media (max-width: 899px) {
      bottom: -35px;
    }
    li {
      width: 10px;
      &.slick-active {
        button {
          &::before {
            opacity: 1;
            background: ${primaryColors.black};
          }
        }
      }
      button {
        width: auto;
        height: auto;
        &::before {
          width: 10px;
          height: 10px;
          background: transparent;
          font-size: 0;
          border-radius: 100%;
          border: 1px solid ${primaryColors.light_grey};
          opacity: 1;
        }
        &:hover {
          background: transparent;
        }
      }
    }
  }
`;
