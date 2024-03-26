/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LinearProgressWithLabelWrapper = styled(Box)`
    
  .progress_bar {
    /* border: 3px solid blue; */
    .container {
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
    margin-top: 50px;
    white-space: nowrap;
    
  }
`