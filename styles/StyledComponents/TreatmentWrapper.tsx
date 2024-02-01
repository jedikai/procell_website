/* eslint-disable mui-path-imports/mui-path-imports */

import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const TreatmentWrapper = styled(Box)`
  @media (max-width: 1199px) {
    padding-top: 30px;
  }
  /* padding-top: 100px; */
  padding-bottom: 100px;
  @media (max-width: 1199px) {
    /* padding-top: 80px; */
    padding-bottom: 80px;
  }
  @media (max-width: 899px) {
    /* padding-top: 70px; */
    padding-bottom: 70px;
  }
  @media (max-width: 599px) {
    /* padding-top: 50px; */
    padding-bottom: 50px;
  }
  .sec_title {
    margin-bottom: 70px;
    @media (max-width: 599px) {
      margin-bottom: 30px;
    }
    h3 {
      font-size: 66px;
      @media (max-width: 899px) {
        font-size: 40px;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
      span {
        font-size: 80px;
        display: block;
        line-height: inherit;
        color: inherit;
        font-family: inherit;
        @media (max-width: 1199px) {
          font-size: 60px;
        }
        @media (max-width: 899px) {
          font-size: 40px;
        }
        @media (max-width: 599px) {
          font-size: 30px;
        }
      }
    }
  }
  .slider_wrap {
    .slick_btm {
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 26px 74px 0px rgba(0, 0, 0, 0.04);
      padding: 40px;
      max-width: 1050px;
      margin: -70px auto 0;
      @media (max-width: 1199px) {
        max-width: 800px;
        margin: -170px auto 0;
        padding: 30px;
      }
      @media (max-width: 899px) {
        max-width: 500px;
        margin: -240px auto 0;
        padding: 20px;
      }
      @media (max-width: 599px) {
        max-width: 90%;
        margin: -72px auto 0;
        padding: 10px;
      }

      .slick-arrow {
        width: 30px;
        height: 30px;
        display: inline-flex;
        z-index: 100;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid ${primaryColors.text_purple};
        z-index: 1;
        @media (max-width: 599px) {
          width: 30px;
          height: 30px;
        }
        &:hover {
          background: ${primaryColors.text_purple};
          &:before {
            filter: brightness(0) invert(1);
          }
        }
        &:before {
          width: 50%;
          height: 50%;
          display: inline-block;
          content: "";
          transition: all 0.3s ease-in-out 0s;
        }
        &.slick-prev {
          left: 5px;

          &:before {
            background: url("/assets/images/arrow_prev.svg") no-repeat center
              center;
            background-size: 100%;
          }
          @media (max-width: 599px) {
            left: -32px;
          }
        }
        &.slick-next {
          right: 5px;
          &:before {
            background: url("/assets/images/arrow_next.svg") no-repeat center
              center;
            background-size: 100%;
          }
          @media (max-width: 599px) {
            right: -32px;
          }
        }
      }
      .slick-dots {
        text-align: start;
        bottom: 10px;
        text-align: center;
        width: 95%;
        border-radius: 30px;
        background: ${primaryColors.sliderbuttongray};
        height: 2px;
        margin: 0 auto;
        left: 10px;
        @media (max-width: 599px) {
          display: block !important;
        }
        li {
          width: calc(100% / 4);
          height: 2px;
          display: inline-flex;
          bottom: 16px;

          margin: 0;
          @media (max-width: 599px) {
            width: calc(100% / 4) !important;
            height: 2px !important;
          }

          button {
            width: 100%;
            height: 100%;
            background: ${primaryColors.sliderBackColor};
            line-height: 0px;
            background: transparent;
            border-radius: 100%;
            margin: auto;
            margin: 0;
            padding: 0;

            &::before {
              display: none;
            }
          }
          &.slick-active {
            button {
              opacity: 1;
              background: ${primaryColors.slideractive};
              width: 100%;
              border-radius: 8px;
              &::before {
                display: none;
              }
            }
          }
        }
      }

      .slick-slide {
        padding: 0 14px;
      }
      .each_box {
        height: 148px;
        @media (max-width: 899px) {
          padding: 10px;
        }
        @media (max-width: 599px) {
          padding: 4px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          cursor: pointer;

          @media (max-width: 599px) {
            border-radius: 5px;
            height: 84px;
          }
        }
      }
    }
    .slick-dots {
      text-align: start;
      bottom: 90px;
      text-align: center;

      @media (max-width: 599px) {
        display: none !important;
      }
      li {
        width: 10px;
        height: 10px;
        margin: 0 2px;
        button {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          line-height: 10px;
          border-radius: 100%;
          margin: auto;

          &::before {
            display: none;
          }
        }
        &.slick-active {
          width: 24px;
          button {
            opacity: 1;
            background: rgba(255, 255, 255, 1);
            width: 24px;
            border-radius: 8px;
            &::before {
              display: none;
            }
          }
        }
      }
    }

    .main_product {
      height: 620px;
      position: relative;
      @media (max-width: 1199px) {
        height: 566px;
      }
      @media (max-width: 899px) {
        height: 466px;
      }
      @media (max-width: 599px) {
        height: 366px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        @media (max-width: 599px) {
          min-height: 385px;
        }
      }
      .overlay {
        position: absolute;
        bottom: 0;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
      .play_btn {
        position: absolute;
        left: 50%;
        top: 50%;
        min-width: auto;
        transform: translate(-50%, -50%);
        &:hover {
          background-color: transparent;
        }
        @media (max-width: 1199px) {
          top: 35%;
          svg {
            width: 100px;
          }
        }
        @media (max-width: 899px) {
          top: 40%;
          svg {
            width: 86px;
          }
        }
      }
    }
    .slider_wrap {
      .slick-dots {
        text-align: start;
        bottom: 120px;
        text-align: center;
        li {
          width: 16px;
          height: 14px;
          button {
            border: 1px solid rgba(255, 255, 255, 0.5);
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
            line-height: 10px;
            background: transparent;
            border-radius: 100%;
            margin: auto;

            &::before {
              display: none;
            }
          }
          &.slick-active {
            button {
              opacity: 1;
              background: rgb(255, 255, 255);
              width: 24px;
              border-radius: 8px;
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;
