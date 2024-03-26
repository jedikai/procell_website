import styled from "@emotion/styled";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import { Box } from "@mui/material";

export const MoreBlogsWrapper = styled(Box)`
  .heading {
    font-size: 40px;
    text-transform: uppercase;
    margin: 0 0 30px;
    text-align: center;
    font-weight: 400;
    @media (max-width: 599px) {
      font-size: 24px;
    }
  }
  .blogpostImg {
  }
`;
