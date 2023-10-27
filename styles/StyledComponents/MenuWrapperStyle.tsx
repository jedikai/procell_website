import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";

export const MenuWrapperStyle = styled(Menu)`
  &.user_menu {
    .MuiPaper-root {
      min-width: 250px;
      border-radius: 5px;
      background: ${primaryColors?.white};
      box-shadow: 0px 11px 36px 0px rgba(0, 0, 0, 0.13);
      ul {
        padding: 0 14px;
        li {
          background-color: transparent;
          color: ${primaryColors?.icondarkColor};
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.112px;
          text-transform: capitalize;
          padding: 16px 0;
          margin: 6px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          &:last-child {
            border: 0;
            
          }
          &:first-child {
            
          }
          &:hover {
            background-color: transparent;
            color: ${primaryColors?.primary};
            svg {
              path {
                fill: ${primaryColors?.primary};
              }
            }
          }
          svg {
            margin-right: 13px;
          }
        }
      }
    }
  }
`;
