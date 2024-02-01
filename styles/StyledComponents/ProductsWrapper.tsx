/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const ProductsWrapper = styled(Box)`
  .no_pr_text {
    text-align: center;
    margin-top: 50px;
    font-size: 24px;
    font-weight: 500;
    color: ${primaryColors.primary};
  }
  .product_hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    h3 {
      text-transform: uppercase;
      @media (max-width: 1199px) {
        font-size: 30px;
      }
      @media (max-width: 899px) {
        margin-bottom: 20px;
      }
    }
  }

  .product_hdr_rgt {
    display: flex;
    align-items: center;
    margin: 10px 0;
    @media (max-width: 899px) {
      flex-wrap: wrap;
      width: 100%;
      justify-content: end;
    }
    > .MuiBox-root {
      @media (max-width: 899px) {
        width: 100%;
      }
    }
    .search_wrapper {
      margin-bottom: 0;
      @media (max-width: 899px) {
        width: 100%;
        margin-top: 15px;
      }
      h3 {
        display: none;
      }
      .form_group {
        .MuiInputBase-root {
          background-color: ${primaryColors.white};
          border-radius: 5px;
          border: 1px solid ${primaryColors.colore6eff8};
          padding: 17.5px 20px;
          @media (max-width: 1199px) {
            min-height: 50px;
            padding: 9px 20px;
          }
          .MuiInputBase-input {
            border: 0;
          }
        }
      }
    }
    h6 {
      color: ${primaryColors.black};
      font-family: Roboto;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.4px;
      margin-right: 25px;
      @media (max-width: 1199px) {
        margin-right: 15px;
      }
    }
    .select-box {
      margin-right: 15px;
      @media (max-width: 899px) {
        width: auto;
        margin-right: 0;
      }
      .MuiInputBase-root {
        min-height: 60px;
        @media (max-width: 1199px) {
          min-height: 50px;
        }
      }
    }
  }
  .product_btm {
    border-radius: 10px;
    border: 1px solid ${primaryColors.colore6eff8};
    background: ${primaryColors.white};
    padding: 17px;
    margin-top: 50px;
    @media (max-width: 1199px) {
      margin-top: 30px;
    }
  }

  .product_mdl {
    padding: 40px 0 20px;
  }
`;
