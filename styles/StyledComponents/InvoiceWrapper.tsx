import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

export const InvoiceWrapper = styled(Box)``;

export const InvoiceCardWrap = styled(Stack)`
  border-radius: 10px;
  border: 1px solid ${primaryColors?.inputBorder};
  background: ${primaryColors?.white};
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  .left_block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    }
  }
  .order_id {
    margin-bottom: 7px;
font-size: 13px;
line-height: 1.2;
    .order_idText{
      font-family: Roboto;
      color: ${primaryColors.mainFontColor};
font-size: inherit;
font-weight: 600;
line-height:inherit;
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
  .rgt_block {
    p{
      color: ${primaryColors.mainFontColor};
font-size: 13px;
line-height: 1.2;
text-align: right;
@media (max-width:1199px) {
  text-align:left;
}
span{
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
`;
