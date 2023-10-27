import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const EditSettingWrapper = styled(Box)`
  .each_block {
    padding: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border: 0;
      padding-bottom: 0;
    }
    @media (max-width: 599px) {
      padding: 15px;
    }
    h4 {
      font-size: 25px;
      line-height: 1;
      margin-bottom: 35px;
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
      }

      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
  }
  .auth_para {
    display: flex;
    align-items: center;
    color: ${primaryColors?.inputText};
    font-size: 14px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
  }
`;
