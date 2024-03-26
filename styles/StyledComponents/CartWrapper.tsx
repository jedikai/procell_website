import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CartWrapper = styled(Box)`
  &.cmn_gap {
    @media (max-width: 899px) {
      padding: 60px 0;
    }
    @media (max-width: 599px) {
      padding: 40px 0;
    }
  }

  .cart_left {
    .no_found {
      text-align: center;
    }
    .animation {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* width: calc(100% - 415px); */
    .cart_filter {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      flex-wrap: wrap;
      a {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 400;
        color: ${primaryColors.black};
        opacity: 0.6;
        svg {
          margin-right: 6px;
        }
        @media (max-width: 599px) {
          width: 100%;
          margin-bottom: 15px;
        }
      }
      .sort_by {
        margin-left: auto;
        @media (max-width: 599px) {
          margin-left: 0;
          right: auto;
          width: 100%;
          justify-content: space-between;
        }
        .MuiInputBase-root {
          @media (max-width: 599px) {
            max-width: 220px;
          }
        }
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
            margin-right: 5px;
          }
        }
      }
    }
    .cart_banner {
      border-radius: 5px;
      padding: 18px 18px 24px 34px;
      width: 100%;
      background-color: ${primaryColors.banner_bg};
      margin-bottom: 25px;
      p {
        font-size: 15px;
        font-weight: 500;
        color: ${primaryColors.text_purple};
      }
    }
  }
  .cart_right {
    .MuiPaper-root {
      @media (max-width: 599px) {
        padding: 25px 15px;
      }
      .cardtype {
        .cardtypeCheckbox {
          @media (max-width: 599px) {
            height: 60px !important;
            width: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }
`;
