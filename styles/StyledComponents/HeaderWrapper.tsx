import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HeaderWrap = styled(Box)`
  background: ${primaryColors.white};
  border-bottom: 1px solid #e6e6e6;
  .MuiToolbar-root {
    min-height: auto;
    padding: 0;
    .MuiButtonBase-root {
      margin-right: 4px;
    }
    @media (max-width: 899px) {
    }
  }
  .hdr_rgt {
    .menu_btn {
      display: none;
      background: transparent;
      padding: 0;
      border-radius: 0;
      margin-right: 10px;
      @media (max-width: 899px) {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 22px;
          height: 22px;
        }
      }
      :hover {
        /* background: none; */
      }
    }
    margin-left: 20px;
    display: flex;
    align-items: center;
    @media (max-width: 899px) {
      margin-left: auto;
    }
    button {
      padding: 11px 42px;
      min-width: auto;
      @media (max-width: 1199px) {
        padding: 10px 30px;
      }
      @media (max-width: 899px) {
        padding: 0px 10px;
      }

      @media (max-width: 599px) {
        /* display: none; */
        margin-left: 16px;
      }
    }
    .MuiBadge-badge {
      right: 0;
      top: 3px;

      min-width: 10px;
      height: 22px;
      width: 22px;
      color: ${primaryColors.white};
      @media (max-width: 599px) {
        right: 2px;
        top: 5px;
        width: 17px;
        height: 17px;
      }
    }
    .cart_icon {
      margin-right: 18px;
      cursor: pointer;

      @media (max-width: 599px) {
        margin: 0;
        width: 21px;
      }
    }
  }

  .headerContainer {
    background-color: transparent !important;
    padding: 20px 0;
    transition: all 0.4s;
    @media (max-width: 1199px) {
      padding: 10px 0 15px 0;
    }
    @media (max-width: 599px) {
      padding: 9px 0 11px 0;
    }
  }

  .headerLogo {
    width: 120px;
    display: inline-block;
    transition: all 0.4s;
    line-height: 0;
    @media (max-width: 1199px) {
      width: 100px;
    }
    @media (max-width: 899px) {
      width: 90px;
      margin-right: 0;
    }
    @media (max-width: 599px) {
      width: 80px;
    }
    img {
      width: 100%;
    }
  }
  .navbar {
    margin-left: auto;
    a {
      margin-right: 30px;
      display: inline-block;
      color: ${primaryColors.secondaryFont};
      font-size: 15px;
      @media (max-width: 1199px) {
        margin-right: 14px;
        font-size: 14px;
      }
      @media (max-width: 899px) {
        margin-right: 20px;
        font-size: 13px;
      }
      @media (max-width: 599px) {
        margin-right: 15px;
      }

      &:hover {
        color: ${primaryColors.text_purple};
      }
      &:last-child {
        margin-right: 0;
      }
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: ${primaryColors.text_purple};
      }
    }
  }

  .user_btn {
    min-width: auto;
    background: linear-gradient(
          ${primaryColors?.white},
          ${primaryColors?.white}
        )
        padding-box,
      linear-gradient(
          279deg,
          ${primaryColors?.primary1} -7.77%,
          ${primaryColors?.primary} 109.39%
        )
        border-box;
    border-radius: 50px;
    border: 1px solid transparent;
    padding: 6px 6px 6px 6px !important;
    /* @media (max-width: 599px) {
      padding: 6px 6px 6px 6px !important;
      img {
        margin-right: 0px !important;
      }
    } */
    img {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 0px;
      @media (max-width: 375px) {
        width: 30px;
        height: 30px;
      }
    }
    .MuiTypography-root {
      color: ${primaryColors?.userBtnColor};
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.26px;
    }
    .MuiButton-endIcon {
      margin-left: 6px;
      > * {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .login_btn {
    @media (max-width: 899px) {
      width: 28px;
      height: 28px;
      padding: 11px !important;
      min-width: auto;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;
