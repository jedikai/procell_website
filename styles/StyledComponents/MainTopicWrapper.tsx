/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const MainTopicWrapper = styled(Box)`

  .topic_wrpp {
    h3 {
      color: ${primaryColors.black};
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    ul {
      margin-top: 40px;
    }
    li {
      border-bottom: 1px solid ${primaryColors.colorF0F0F0};
      padding-bottom: 15px;
      margin-bottom: 15px;
      a {
        color: ${primaryColors.black};
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        text-transform: capitalize;
        &:hover {
          color: ${primaryColors.primary};
        }
      }

      &:last-child {
        margin-bottom: 0;
        border: 0;
      }
    }
  }
`;
