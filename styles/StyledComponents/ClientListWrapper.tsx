import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ClientListWrapper = styled(Box)`
  .back_btn_holder {
    margin: 0 0 15px;
  }
  .btn_holder {
    margin: 0 0 30px;
  }

  .client_list {
    margin: 0 -15px;
    .client_col {
      margin: 0 0 30px;
      padding: 0 15px;
      width: 25%;
      .client_box {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 10px;
        background-color: ${primaryColors.white};
        box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
        padding: 15px;
        .image_box {
          font-size: 0;
          line-height: 0;
          margin: 0 0 15px 0;
          img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .right {
          width: calc(100% - 80px);
          padding-left: 0;
        }
        .text {
          font-size: 20px;
          font-weight: 700;
          color: ${primaryColors.primary};
          margin: 0 10px 0 0;
        }

        .btn_holder {
          margin: 0;
          display: flex;
          justify-content: flex-end;
          button {
            min-width: auto;
            padding: 0;

            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background-color: ${primaryColors.white};
            box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
            &:first-child {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
`;
