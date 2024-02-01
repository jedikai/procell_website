import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const FooterWrap = styled(Box)`
  /* border-top: 1px solid ${primaryColors.borderprimary}; */
  background: url(${assest.blurPng});
  background-repeat: no-repeat;
  background-position: 100% 100%;
  padding-top: 45px;
  @media (max-width: 599px) {
    padding-top: 30px;
  }
  .ftr-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 45px;
    @media (max-width: 1199px) {
      justify-content: center;
      margin: 8px 0;
      flex-wrap: wrap;
    }
    @media (max-width: 599px) {
      justify-content: center;
      margin: 8px 0 20px;
      flex-wrap: wrap;
    }
    li {
      width: auto;
      margin-right: 35px;
      @media (max-width: 899px) {
        margin: 0 17px;
      }
      @media (max-width: 599px) {
        margin: 0 10px 10px;
      }
      &:last-child {
        margin-right: 0;

        @media (max-width: 899px) {
          margin-right: 17px;
        }
      }
      a {
        font-weight: 400;
        font-size: 15px;
        color: ${primaryColors.footer_text};
        text-transform: capitalize;

        @media (max-width: 599px) {
          font-size: 16px;
        }
        :hover {
          color: ${primaryColors.primary};
        }
        &.active {
          color: ${primaryColors.primary};
        }
      }
    }
  }
  .ftr-logo {
    /* margin-right: 28px; */
    margin-bottom: 48px;
    line-height: 0;
    @media (max-width: 1199px) {
      max-width: 180px;
      margin: 0 auto;
    }

    @media (max-width: 599px) {
      max-width: 121px;
      margin-bottom: 26px;
    }
  }
  .social-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 35px;

    @media (max-width: 1199px) {
      justify-content: center;
      margin-left: 0px;
      margin-bottom: 15px;
    }
    @media (max-width: 599px) {
      justify-content: center;
      margin-left: 0px;
      margin-bottom: 40px;
    }
    li {
      width: auto;
      margin-right: 20px;

      a {
        background-color: ${primaryColors.grey_background};
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 599px) {
          width: 30px;
          height: 30px;
        }
        :hover {
          background-color: ${primaryColors.textDisabled};
        }
        svg {
          width: 14px;
        }
      }
      &:last-child {
        margin: 0;
      }
    }
  }

  .copy {
    /* margin-left: auto; */

    font-size: 14px;
    color: ${primaryColors.footer_text};
    @media (max-width: 599px) {
      font-size: 14px;
      margin-top: 26px;
    }
    margin-bottom: 0;
  }
  .ftr-wrapper {
    text-align: center;
    margin: 0 auto;
    @media (max-width: 1199px) {
      display: block;
      text-align: center;
    }
  }

  .footer_btm {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    @media (max-width: 899px) {
      justify-content: center;
    }
    @media (max-width: 599px) {
      justify-content: center;
      align-items: center;
    }
    > p {
      a {
        margin-left: 5px;
        color: inherit;
        text-decoration: underline;
        &:hover {
          color: ${primaryColors.primary};
        }
      }
      @media (max-width: 899px) {
        margin-bottom: 10px;
        order: 1;
      }
      @media (max-width: 599px) {
        margin: 10px 0 0;
      }
    }
  }
  .footer_link_stack {
    @media (max-width: 899px) {
      order: 0;
    }
    @media (max-width: 599px) {
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
  .footer_links {
    @media (max-width: 374px) {
      width: 100%;
      justify-content: center;
      margin-top: 5px;
    }
    :not(:last-child) {
      margin-right: 80px;
      @media (max-width: 899px) {
        margin-right: 30px;
      }
      @media (max-width: 599px) {
        margin-right: 20px;
      }
      @media (max-width: 374px) {
        margin: 0;
      }
    }
    display: flex;
    align-items: center;

    svg {
      margin-right: 22px;
      @media screen {
        margin-right: 12px;
        width: 14px;
      }
    }
    a {
      font-size: 15px;
      color: ${primaryColors.footer_text};
      font-weight: 400;
      @media (max-width: 599px) {
        font-size: 14px;
      }
      :hover {
        color: ${primaryColors.primary};
      }
    }
  }

  .footer_btm_wrapper {
    border-top: 1px solid ${primaryColors.borderprimary};
    padding: 24px 0;
  }
`;
