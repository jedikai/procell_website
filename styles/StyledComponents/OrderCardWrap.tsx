import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";

export const OrderCardWrap = styled(Stack)`
  border-radius: 10px;

  background: ${primaryColors?.white};

  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
  .left_block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    @media (max-width: 599px) {
      width: 100%;
    }
    > figure {
      margin-right: 19px;
    }

    @media (max-width: 1199px) {
      margin-bottom: 15px;
    }
    figure {
      width: 92px;
      height: 101px;
      background-color: ${primaryColors.sliderBackColor};
      justify-content: center;
      display: flex;
      align-items: center;
      margin-right: 19px;
    }
    .product_details {
      max-width: 193px;
      h5 {
        color: ${primaryColors?.black};
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        margin-bottom: 10px;
      }
      p {
        color: ${primaryColors?.darkblack};
        font-size: 15px;
        font-weight: 800;
        text-transform: capitalize;
      }
      .price {
        margin: 0 0 5px !important;
      }
    }
    .MuiAvatarGroup-root {
      margin-right: 25px;
      position: relative;
      flex-direction: row;
      @media (max-width: 599px) {
        width: 100%;
      }
      @media (max-width: 479px) {
        margin-right: 0;
        margin-bottom: 25px;
      }

      .MuiAvatar-colorDefault {
        background: rgba(0, 0, 0, 0.5);
        border-color: transparent;
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
      }

      .MuiAvatar-root {
        margin-right: -16px;
        border: 1px solid ${primaryColors?.primary};
      }
    }

    .invoice_chip {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      border-radius: 6px;
      background: ${primaryColors?.lightPurple};
      height: 35px;
      cursor: pointer;

      .MuiChip-label {
        color: ${primaryColors?.text_purple};
        font-family: Roboto;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .deliver_chip {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      border-radius: 6px;
      background: ${primaryColors?.lightGreen};
      height: 35px;
      .MuiChip-label {
        color: ${primaryColors?.mintGreen};
        font-family: Roboto;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }

  .rgt_block {
    @media (max-width: 599px) {
      width: 100%;
    }
    .order_id {
      margin-bottom: 10px;
      font-size: 13px;
      line-height: 1.2;
      .order_idText {
        font-family: Roboto;
        color: ${primaryColors.mainFontColor};
        font-size: inherit;
        font-weight: 600;
        line-height: inherit;
      }
    }

    .date {
      display: flex;
      align-items: center;
      line-height: 1;
      justify-content: flex-end;
      @media (max-width: 1199px) {
        justify-content: flex-start;
      }
      .ico {
        font-size: 0;
        line-height: 0;
        margin-right: 5px;
      }
    }
    p {
      color: ${primaryColors.mainFontColor};
      font-size: 13px;
      line-height: 1.2;
      text-align: right;
      @media (max-width: 1199px) {
        text-align: left;
      }
      span {
        display: inline-block;
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: 400;
      }
    }
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      li {
        width: auto;
        display: block;
        .MuiChip-root {
          svg {
            margin-left: 13px;
          }
        }
        &:not(:last-child) {
          margin-right: 10px;

          @media (max-width: 399px) {
            margin-bottom: 10px;
            margin-right: 0;
          }
        }
        @media (max-width: 399px) {
          width: 100%;
        }
      }
    }
  }

  .btm_block {
    padding-top: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        width: auto;
        @media (max-width: 1199px) {
          margin-bottom: 15px;
        }
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
    .invoice_chip {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      border-radius: 6px;
      background: ${primaryColors?.lightPurple};
      height: 35px;
      padding-left: 11px !important;
      cursor: pointer;
      .MuiChip-label {
        color: ${primaryColors?.text_purple};
        font-family: Roboto;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .deliver_chip {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      border-radius: 6px;
      background: ${primaryColors?.lightGreen};
      height: 35px;
      .MuiChip-label {
        color: ${primaryColors?.mintGreen};
        font-family: Roboto;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
`;
