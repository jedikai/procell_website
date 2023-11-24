import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CardItemCardWrapper = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 20px;
    @media (max-width: 599px) {
      margin-bottom: 10px;
    }
  }
  .cart_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: ${primaryColors.white};
    border-radius: 10px;
    -webkit-box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    padding: 8px;
    flex-wrap: wrap;

    .img_wrapper {
      width: 84px;
      height: 84px;
      background-color: ${primaryColors.sliderBackColor};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px;
      margin-right: 15px;
      @media (max-width: 899px) {
        width: 70px;
        height: 70px;
      }
      @media (max-width: 899px) {
        width: 50px;
        height: 50px;
      }
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
      font-family: "Roboto";
      max-width: 227px;
      width: 40%;
      @media (max-width: 899px) {
        max-width: calc(100% - 70px);
        width: 100%;
      }
    }
  }

  .rgt_sec {
    margin-left: auto;
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 899px) {
      width: 100%;
      margin-top: 15px;
    }

    .price {
      font-size: 15px;
      font-weight: 700;
      color: ${primaryColors.black};
      margin-bottom: 0;
    }
    .item_count_wrapper {
      display: flex;
      align-items: center;
      button {
        color: ${primaryColors.textDisabled};
        padding: 0;
        min-width: auto;
        font-size: 20px;
        height: auto;
        line-height: 0.5;
        font-weight: 400;
        :hover {
          color: ${primaryColors.black};
          background: none;
        }
        @media (max-width: 899px) {
          min-width: 30px;
        }
      }

      .input_wrap {
        width: 32px;
        margin: 0 14px;

        .MuiInputAdornment-root {
          display: none;
        }
        .MuiFormControl-root {
          .MuiInputBase-adornedEnd {
            padding: 0px;
            min-width: auto !important;
          }
          input {
            padding: 3.5px;
            text-align: center;
          }
        }
      }
    }
    .delete_item {
      padding: 0 26px;
      border-left: 1px solid ${primaryColors.border_primary};
      @media (max-width: 599px) {
        padding: 0 10px;
      }
      button {
        padding: 0;
        min-width: auto;
        :hover {
          background: none;
        }
      }
    }
  }
`;
