import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const TreatMentSecWrapper = styled(Box)`
  background-image: url(${assest.blur_img}), url(${assest.blurPngFull});
  position: relative;
  background-repeat: no-repeat;
  background-position: -100% 80%, 110% 100%;
  @media (max-width: 899px) {
    background-position: 100% 8%, 0% 0;
    /* z-index: -1; */
  }
  @media (max-width: 599px) {
  }
  &.cmn_gap {
    @media (max-width: 899px) {
      padding: 78px 0 60px 0 !important;
    }
    @media (max-width: 599px) {
      padding: 40px 0 49px 0 !important;
    }
  }

  .shell1,
  .shell2,
  .shell3 {
    position: absolute;
  }
  .shell1 {
    top: 50px;
    left: -50px;
    opacity: 0.19;
    @media (max-width: 899px) {
      display: none;
    }
  }
  .shell2 {
    top: 50px;
    right: 200px;
    opacity: 0.5;

    filter: blur(1px);
    @media (max-width: 899px) {
      display: none;
    }
  }
  .shell3 {
    top: 200px;
    right: 50px;
    opacity: 0.19;
    @media (max-width: 899px) {
      display: none;
    }
  }
  .sec_title {
    text-align: center;
    margin-bottom: 80px;
    @media (max-width: 1199px) {
      margin-bottom: 70px;
    }
    @media (max-width: 899px) {
      margin-bottom: 60px;
    }
    @media (max-width: 599px) {
      margin-bottom: 30px;
    }
    h3 {
      font-size: 83px;
      color: ${primaryColors.black};
      @media (max-width: 1199px) {
        font-size: 80px;
      }
      @media (max-width: 899px) {
        font-size: 40px;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
      span {
        font-size: 66px;
        display: block;
        line-height: inherit;
        color: inherit;
        font-family: inherit;
        @media (max-width: 1199px) {
          font-size: 50px;
        }
        @media (max-width: 899px) {
          font-size: 30px;
        }
        @media (max-width: 599px) {
          font-size: 20px;
        }
        @media (max-width: 489px) {
          font-size: 16px;
        }
      }
    }
  }

  .compare_slider {
    .compare_top {
      position: relative;
    }
    @media (max-width: 1399px) {
      padding: 0 20px;
    }
    .slick-arrow {
      width: 40px;
      height: 40px;
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
        left: -40px;

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
        right: -40px;
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
  }
  .compare_sec {
    position: relative;
    img {
      height: 600px !important;
      object-fit: contain !important;
      object-position: center;
      @media (max-width: 599px) {
        height: 400px !important;
      }
    }
    ::before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      background: url("/assets/images/figure_back_crcl.png") no-repeat center;
      background-size: 100% 100%;
      width: 100%;
      height: 110%;
      @media (max-width: 899px) {
        background-size: cover;
        bottom: 69%;
        height: 50%;
      }
      @media (max-width: 499px) {
        bottom: 70%;
      }
    }
  }
  .before_btn,
  .after_btn {
    bottom: 15px;

    position: absolute;
    border-radius: 0;
    border: none;
    padding: 18px 46px;
    color: ${primaryColors.white};
    font-size: 16px;
    font-weight: 700;
    min-height: 48px;
    text-transform: uppercase;
    letter-spacing: 1.68px;
    opacity: 0.4;
    background: #000;
    transition: all ease-in 0.2s;
    :hover {
      background-color: ${primaryColors.black};
    }
    .MuiChip-label {
      @media (max-width: 899px) {
        padding-left: 0;
        padding-right: 0;
      }
    }
    @media (max-width: 899px) {
      padding: 17px 18px;
      font-size: 14px;
    }
    @media (max-width: 599px) {
      top: 90%;
      font-size: 12px;
      min-width: 81px;
      min-height: 36px;
      padding: 14px 10px;
    }
  }
  .before_btn {
    left: 0;
  }
  .after_btn {
    right: 0;
  }
  .compare_btm {
    flex-wrap: wrap;
    align-items: center;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: ${primaryColors?.white};
    padding: 48px 35px;

    @media (max-width: 899px) {
      padding: 22px 22px 28px 22px;
    }
    p {
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }

    .stack_lft {
      max-width: 70%;
      flex-basis: 70%;
      padding-right: 60px;
      border-right: 1px solid ${primaryColors.bordershadowcolor};
      @media (max-width: 1199px) {
        padding-right: 0;
        border: none;
        margin: 0 0 15px;
        max-width: 100%;
        flex-basis: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid ${primaryColors.bordershadowcolor};
      }
      @media (max-width: 899px) {
        padding-right: 0;
        width: 70%;
      }
      @media (max-width: 599px) {
        width: 100%;
        padding: 0 0 29px 0;
        border-right: 0;
        border-bottom: 1px solid ${primaryColors.bordershadowcolor};
      }
    }
    .stack_rgt {
      width: 30%;
      padding-left: 20px;
      @media (max-width: 1199px) {
        padding-left: 50px;
        max-width: 100%;
        flex-basis: 100%;
      }
      @media (max-width: 899px) {
        width: 30%;
        padding-left: 30px;
      }
      @media (max-width: 599px) {
        width: 100%;
        padding: 20px 0 0 0;
      }
      ul {
        display: flex !important;
        align-items: center;
        justify-content: center;

        li {
          width: auto;
          flex-direction: column;
          &.drop_item {
            p {
              margin-left: 6px;
            }
          }
          svg {
            width: 45px;
            height: 45px;
            margin-bottom: 5px;
          }
          &:not(:last-child) {
            padding-right: 30px;
            /* @media (max-width: 899px) {
              padding-right: 30px;
            } */
            @media (max-width: 1199px) {
              padding-right: 60px;
            }

            @media (max-width: 599px) {
              padding-right: 60px;
            }
            @media (max-width: 389px) {
              padding-right: 20px;
            }
          }
        }
      }
    }
  }

  .__rcs-handle-button {
    width: 86px !important;
    height: 86px !important;
    place-content: space-evenly !important;
  }
`;
