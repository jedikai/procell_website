/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LinearProgressWrapper = styled(Box)`
  margin: 78px 0;

  @media (max-width: 1199px) {
    margin: 50px 0;
  }
  .progress_bar {
    /* border: 3px solid blue; */
    .container {
      padding: 0;
      background-color: #efefef;
      border-radius: 50px;
      > div {
        background: linear-gradient(
          90deg,
          #543795 0%,
          #16a6df 97.59%
        ) !important;
      }
    }
  }

  .label {
    color: ${primaryColors.primary};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    margin-top: 30px;
  }
`;
