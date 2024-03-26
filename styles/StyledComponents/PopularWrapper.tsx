/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const PopularWrapper = styled(Box)`
  margin-bottom: 40px;
  .popular_wrapper {
    h3 {
      color: ${primaryColors.black};
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
`;
