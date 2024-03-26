/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ScienceCardWrapper = styled(Box)`
  .card_wrapper {
    figure {
      height: 375px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    h4 {
      color: ${primaryColors.black};
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      text-transform: capitalize;
      margin-bottom: 20px;
      @media (max-width: 599px) {
        margin-bottom: 10px;
      }
    }
    a {
      color: ${primaryColors.primary};
      text-decoration: underline;
      h4 {
        color: ${primaryColors.primary};
      }
      &:hover {
      }
      svg {
        margin-left: 5px;
        transition: all 0.4s;
      }
      &:hover {
        color: ${primaryColors.text_purple};
        svg {
          transform: translateX(10px);
        }
      }
    }
  }
`;
