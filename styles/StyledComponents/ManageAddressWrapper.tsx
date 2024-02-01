import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ManageAddressWrapper = styled(Box)`
  .heading {
    font-size: 25px;
    margin: 0 0 30px;
    font-weight: 400;
    @media (max-width: 599px) {
      font-size: 20px;
      margin: 0 0 25px;
    }
  }

  .manage_address_wrap {
    .add_address {
      padding: 32px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: linear-gradient(
        117deg,
        rgba(84, 55, 149, 0.12) 0.74%,
        rgba(22, 166, 223, 0.12) 113.65%
      );
      a {
        display: block;
        .ico {
          display: block;
          margin: 0 0 8px;
          text-align: center;
        }
        .add_text {
          text-align: center;
          color: ${primaryColors.black};
          font-weight: 400;
          font-size: 18px;
          text-transform: capitalize;
        }
      }
    }

    .address_block {
      border-radius: 10px;
      background: linear-gradient(
        117deg,
        rgba(84, 55, 149, 0.12) 0.74%,
        rgba(22, 166, 223, 0.12) 113.65%
      );
      padding: 32px 25px;
      .address_left {
        width: 60%;
        @media (max-width: 599px) {
          width: 100%;
        }
        .address_top {
          display: flex;

          align-items: center;
          .MuiChip-root {
            padding: 7px;
            border-radius: 5px;
            background: ${primaryColors.primary};
            color: ${primaryColors.white};
            font-size: 12px;
            font-weight: 400;
            height: auto;

            .MuiChip-label {
              padding: 0;
              line-height: 1;
            }
          }
          .name_text {
            margin: 0 8px 0 0;
            color: ${primaryColors.black};
            font-weight: 500;
            font-size: 14px;
            text-transform: capitalize;
          }
        }

        .btm_text {
          color: ${primaryColors.mainFontColor};
          font-size: 15px;
          font-weight: 400;
        }
      }
      .action_right {
        width: 40%;
        padding-left: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        @media (max-width: 599px) {
          width: 100%;
          padding-left: 0;
          margin-top: 10px;
        }
        button {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: ${primaryColors.white};
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: auto;
          padding: 0;

          &:not(:last-child) {
            margin-right: 8px;
          }
        }
      }

      .address_btm_block {
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        p {
          b {
            color: ${primaryColors.primary};
            font-weight: 500;
            display: block;
          }
        }
      }
    }
  }
`;
