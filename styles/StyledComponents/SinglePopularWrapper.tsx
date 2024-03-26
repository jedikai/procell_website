/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const SinglePopularWrapper = styled(Box)`
  .date_box {
    display: flex;
    align-items: center;
    p {
      color: ${primaryColors.primary};
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      margin-left: 10px;
    }
  }
  .single_card {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: ${primaryColors.white};
    padding: 20px;
    margin-bottom: 20px;
    @media (max-width: 1199px) {
      padding: 15px 10px;
    }
    h4 {
      color: ${primaryColors.black};
      font-family: Roboto;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      text-transform: capitalize;
      margin-bottom: 15px;
      transition: all 0.4s;
    }
    a {
      &:hover {
        h4 {
          color: ${primaryColors.primary};
        }
      }
    }
  }
`;
