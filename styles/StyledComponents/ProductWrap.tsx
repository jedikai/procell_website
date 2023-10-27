/* eslint-disable mui-path-imports/mui-path-imports */
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ProductWrap = styled(Box)`
  padding-bottom: 100px;
  @media (max-width:899px) {
    padding-bottom: 70px;
  }
  @media (max-width:599px) {
    padding-bottom: 50px;
  }
`;
