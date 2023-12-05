import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CartItemsWrapper = styled(Box)`
  width: 100%;
  box-shadow: none;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 20px;
  background: linear-gradient(
    135deg,
    rgba(84, 55, 149, 0.06) 0%,
    rgba(84, 55, 149, 0.06) 6%,
    rgba(22, 166, 223, 0.06) 83%,
    rgba(22, 166, 223, 0.06) 100%
  );
  @media (max-width: 599px) {
    padding: 15px;
  }

  .card_header {
    padding: 0 0 12px;
    border-bottom: 1px solid ${primaryColors.border_primary};
    margin-bottom: 24px;
    p {
      margin-bottom: 0;
      font-size: 18px;
      font-weight: 700;
      color: ${primaryColors.black};
    }
  }

  .items_list_item {
    margin: 0 -6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    @media (max-width: 899px) {
      margin-bottom: 15px;
    }
    .img_wrapper {
      max-width: 84px;
      width: 100%;
      max-height: 84px;
      height: 100%;
      background-color: ${primaryColors.white};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      margin-right: 16px;
      @media (max-width: 899px) {
        margin-right: 5px;
        max-width: 70px;
        max-height: 70px;
      }
      @media (max-width: 599px) {
        max-width: 50px;
        max-height: 50px;
      }
    }
    p {
      font-size: 13px;
      font-weight: 500;
      color: ${primaryColors.black};
      margin-bottom: 0;
      padding: 0 10px;
      @media (max-width: 599px) {
        padding: 0 5px;
      }
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }
  }
  .item_count_wrapper {
    display: flex;
    margin-left: auto;
    button {
      color: ${primaryColors.textDisabled};
      padding: 0 10px;
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
    }

    .input_wrap {
      width: 52px;
      margin: 0 14px;

      .MuiFormControl-root {
        .MuiInputAdornment-root {
          margin-left: 0;
          width: 0;
        }
        .MuiInputBase-adornedEnd {
          padding: 0;
          min-width: auto !important;
          background-color: transparent;
        }
        input {
          padding: 3.5px;
          text-align: center;
        }
      }
    }
  }
`;
