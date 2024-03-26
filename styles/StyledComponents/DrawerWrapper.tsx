/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const DrawerWrapper = styled(Box)`
  padding-top: 10px;

  .headerDrawer {
    padding: 15px;
    text-align: left;
    .headerLogo {
      width: 100px;
      display: inline-block;
      font-size: 0;
      margin-bottom: 15px;

      img {
        width: 100%;
      }
    }
    ul {
      li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 15px 5px 15px 0;
        a {
          display: inline-block;
          text-decoration: none;
          color: ${primaryColors.mainFontColor};
          transition: 0.5s ease-in-out;
          &:hover {
            color: ${primaryColors.primary};
          }
          &.draweractive {
            color: ${primaryColors.primary};
          }
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
  button {
    padding: 10px 20px;
    margin: 0 auto;
    min-width: 150px;
  }
  .DrawerCloseBtn {
    position: absolute;
    top: 28px;
    right: 12px;
    width: 27px;
    border-radius: 100%;
    button {
      padding: 5px;
      min-width: auto;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.17);
      svg {
        width: 12px;
        height: 12px;
      }
      &:hover {
        background-color: ${primaryColors.primary};
      }
    }
  }
`;
