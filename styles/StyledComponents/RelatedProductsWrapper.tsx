/* eslint-disable mui-path-imports/mui-path-imports */
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const RelatedProductsWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &:after {
    opacity: 0.12;
    background: linear-gradient(117deg, #543795 0.74%, #16a6df 113.65%);
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .products_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;
    flex-wrap: wrap;
    @media (max-width:899px) {
      margin-bottom: 30px;
    }
    @media (max-width:599px) {
      margin-bottom: 20px;
    }
    h3 {
      text-transform: uppercase;
      @media (max-width:899px) {
        font-size: 30px;
      }
      @media (max-width:599px) {
        font-size: 25px;
        width: 100%;
        margin-bottom: 15px;
      }
    
    }
  }
  .products_slider {
    .MuiContainer-root {
      max-width: 100%;
      padding: 0;
    }
    .product_area {
      width: calc(100% - (50% - (1170px / 2)));
      margin-left: auto;
      padding-left: 10px;
      .product_slider_btm {
        margin-right: -200px;
        @media (max-width:599px) {
          margin:0;
        }
        .slick-slide {
          padding: 0 17px;

        }
        .slick-slider {
          margin: 0 -17px;
          @media (max-width:599px) {
          margin:0;
        }
        }
      }
      @media (max-width:599px) {
        width: 100%;
        padding: 0 20px;
      }
    }
  }
  .slick_btn {
    @media (max-width:599px) {
      width: 100%;
      
      
    }
    button {
      min-width: auto;
      margin: 0 10px;
      &:hover {
        background-color: transparent;
        filter: grayscale(100);
      }
    }
    
  }
`;
