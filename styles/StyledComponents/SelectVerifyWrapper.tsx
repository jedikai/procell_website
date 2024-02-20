import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const SelectVerifyWrapper = styled(Box)`
  .select_text {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 25px;
    color: ${primaryColors.black};
  }
  .btn_holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      min-width: 330px;
      @media (max-width: 599px) {
        min-width: auto;
        width: 100%;
      }
      &:not(:last-child) {
        margin: 0 0 15px;
      }
    }
  }
`;
