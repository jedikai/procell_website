import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ResourceWrapper = styled(Box)`
  .main_heading {
    text-align: center;
    margin: 0 0 40px;
    @media (max-width: 899px) {
      font-size: 20px;
      margin: 0 0 20px;
    }
  }
  .resource_cards {
    .photo_wrap {
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #e1e1e1;
      background: ${primaryColors.white};
      figure {
        width: 160px;
        height: 160px;
        border-radius: 10px;
        border: 1px solid #e1e1e1;
        background: ${primaryColors.white};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 479px) {
          width: 100%;
          margin: 0 0 15px;
        }
        img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
      .right {
        width: calc(100% - 160px);
        padding-left: 30px;
        @media (max-width: 479px) {
          width: 100%;
          padding-left: 0;
          text-align: center;
        }
        button {
          @media (max-width: 479px) {
            margin: 0 auto;
          }
        }
        .name {
          color: ${primaryColors.text_purple};
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px;
        }
      }
    }
  }
`;
