import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const AddedEntryCardWrapper = styled(Box)`
  position: relative;

  &.added_entry_card {
    border-radius: 10px;
    border: 1px solid ${primaryColors.inputBorder};
    padding: 14px;
    .image_box {
      position: relative;
      display: flex;
      img {
        width: 50% !important;
        height: 300px;
        object-fit: cover;
        &.noimg_foundWrap{
          width: 100% !important;
        }
      }

      &:hover {
        .eidt_delete {
          opacity: 1;
          top: 50%;
        }
      }
      .eidt_delete {
        transition: all 0.3s ease-in-out 0s;

        position: absolute;
        z-index: 9;
        padding: 10px 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        top: 52%;
        opacity: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        button {
          width: 40px;
          height: 40px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background: #16a6df;
          padding: 0;
          min-width: auto;
          &.view_btn {
            svg {
              fill: #fff;
            }
          }
          &:hover {
            background: #000;
          }
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
      margin: 0 0 10px;
      img {
        width: 100%;
        display: block;
        line-height: 0;
        font-size: 0;
      }
    }
    .card_btm {
      p {
        margin: 0;
        &.date {
          display: flex;
          align-items: center;
          color: ${primaryColors.primary};
          font-size: 16px;
          font-weight: 500;
          @media (max-width: 1199px) {
            font-size: 14px;
          }
          .ico {
            margin: 0 4px 0 0;
            line-height: 1;
          }
        }
        &.rght_text {
          color: ${primaryColors.mainFontColor};
          font-size: 16px;
          font-weight: 600;
          @media (max-width: 1199px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
