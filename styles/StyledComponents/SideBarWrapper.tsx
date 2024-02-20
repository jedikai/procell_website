import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const SideBarWrapper = styled(Box)`
  width: 324px;
  min-height: 100%;
  transition: all 0.3s ease-in;
  @media (max-width: 899px) {
    position: fixed;
    right: -324px;
    z-index: 1;
    background: #fff;
    overflow-y: auto;
    border-radius: 10px;
    /* top: 155px; */
    top: 0;
  }
  @media (max-width: 599px) {
    width: 280px;
  }
  &.showSidebar {
    @media (max-width: 899px) {
      /* top: 155px; */
      right: 0px;
      height: calc(100vh);
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .sidebar_inner {
    border-radius: 10px;
    background: linear-gradient(
      117deg,
      rgba(84, 55, 149, 0.06) 0.74%,
      rgba(22, 166, 223, 0.06) 113.65%
    );
    padding: 35px 17px;
    min-height: 100%;

    @media (max-width: 899px) {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .avatr_img {
    width: 76px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    overflow: hidden;
    margin: 0 auto 12px auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .sidebar_upper {
    text-align: center;
    padding-bottom: 59px;
    border-bottom: 1px solid rgba(84, 55, 149, 0.15);
    position: relative;
    h4 {
      color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 20px;
      font-weight: 600;
      text-transform: capitalize;
    }
    p {
      font-size: 13px;
      text-transform: capitalize;
      margin: 0;
    }
    .upload_linkWrap {
      position: absolute;
      bottom: 31px;
      right: 0;
      left: 0;
      margin: 0 auto;
      input[type="file"] {
        position: absolute;
        appearance: none;
        left: 0;
        top: 0;
        font-size: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .upload_link {
        color: ${primaryColors?.black};
        font-family: Roboto;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        text-transform: capitalize;
        padding: 0;
        min-width: auto;
        transition: all 0.2s ease;
        svg {
          margin-right: 8px;
          transition: all 0.2s ease;
        }
        &:hover {
          background-color: transparent;
          color: ${primaryColors?.primary};
          svg {
            path {
              stroke: ${primaryColors?.primary};
            }
          }
        }
      }
    }
  }
  .sidebar_btm {
    padding-top: 26px;

    padding-right: 5px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      background: #f9f9f9;
      border-radius: 44px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background: #329691;
      border-radius: 44px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #329691;
    }
    .sub_nav {
      margin: 10px 0 0 0;
      padding-left: 35px;

      li {
        position: relative;

        &:not(:last-child) {
          margin-bottom: 24px;
        }
        a {
          padding: 0;
          color: ${primaryColors.mainFontColor};
          font-size: 14px;
          font-weight: 400;
          padding-left: 12px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 6px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #d9d9d9;
          }
          &.active {
            color: ${primaryColors.icondarkColor};
            background-color: transparent;
            &:before {
              background-color: ${primaryColors.icondarkColor};
            }
          }
          &:hover {
            background-color: transparent;
            color: ${primaryColors.icondarkColor};
          }
        }
      }
    }
    .MuiAccordion-root {
      border-radius: 0;
      background-color: transparent;
      box-shadow: none;
      .MuiAccordionSummary-root {
        padding: 18px 20px;
        background-color: transparent;
        min-height: auto;
        border-radius: 50px;
        &:hover {
          background-color: ${primaryColors.primary};
          .MuiAccordionSummary-content {
            color: #fff;

            svg {
              fill: #fff;
              path {
                fill: #fff;
              }
            }
          }
        }
        .MuiAccordionSummary-content {
          margin: 0;
          color: ${primaryColors.icondarkColor};
          font-size: 16px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: 0.112px;
          text-transform: capitalize;
          border-radius: 50px;
          span {
            margin-right: 15px;
            font-size: 0;
            line-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    ul {
      li {
        width: 100%;
        display: block;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        .logoutbtn {
          padding: 18px 20px;
          min-width: 100%;
          justify-content: flex-start;
          border-radius: 50px;
          @media (max-width: 599px) {
            padding: 12px 15px;
            font-size: 14px;
          }
          span {
            display: inline-block;
            color: ${primaryColors?.icondarkColor};
            font-family: Roboto;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: 0.112px;
            text-transform: capitalize;
            margin-left: 15px;
            @media (max-width: 599px) {
              font-size: 14px;
            }
          }
          &:hover {
            color: ${primaryColors?.white};
            background-color: ${primaryColors?.primary};

            svg {
              fill: ${primaryColors?.white};
              path {
                fill: ${primaryColors?.white};
              }
            }
            span {
              color: ${primaryColors?.white};
            }
          }
        }
        a {
          display: flex;
          justify-content: flex-start;
          align-content: center;
          color: ${primaryColors?.icondarkColor};
          font-family: Roboto;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: 0.112px;
          text-transform: capitalize;
          padding: 18px 20px;
          border-radius: 50px;
          background-color: transparent;
          @media (max-width: 599px) {
            padding: 12px 15px;
            font-size: 14px;
          }

          span {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
          }
          &.active {
            color: ${primaryColors?.white};
            background-color: ${primaryColors?.primary};
          }
          &:hover {
            color: ${primaryColors?.white};
            background-color: ${primaryColors?.primary};
            span {
              svg {
                fill: ${primaryColors?.white};
                path {
                  fill: ${primaryColors?.white};
                }
              }
            }
          }
        }
      }
    }
  }
`;
