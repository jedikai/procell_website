import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const QuizWrapper = styled(Box)``;
export const QizBlockWrapper = styled(Box)`
  padding: 50px 30px;
  border-radius: 10px;
  background: ${primaryColors?.white};
  box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
  h5 {
    color: ${primaryColors?.text_purple};
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-bottom: 15px;
  }
  h4 {
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
  }
  .answer_block {
    margin-top: 40px;
    > p {
      color: ${primaryColors?.color5e5a5a};
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
`;
