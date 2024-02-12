import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const OurProductWrapper = styled(Box)`
  padding: 140px 0 107px 0;
  position: relative;
  z-index: 5;
  overflow: hidden;
  @media (max-width: 1199px) {
    padding: 100px 0 100px 0;
  }
  @media (max-width: 899px) {
    padding: 80px 0 100px 0;
  }
  @media (max-width: 599px) {
    padding: 40px 0;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0.12;
    background: linear-gradient(117deg, #543795 0.74%, #16a6df 113.65%);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2;
    pointer-events: none;
  }
  /* &::before {
    content: "";
    width: 100%;
    height: 50%;
    background: linear-gradient(
      1deg,
      rgba(255, 255, 255, 0) 0.1%,
      rgba(255, 255, 255, 0.77) 32.55%,
      #fff 48.41%,
      rgba(255, 255, 255, 0.82) 67.24%,
      rgba(255, 255, 255, 0) 88.37%
    );
    position: absolute;
    left: 0;
    top: -24%;
    z-index: -1;
    pointer-events: none;
    @media (max-width:599px) {
      display: none;
    }
  } */
  .ourProductLadyimg {
    line-height: 1;
    box-sizing: border-box;
    width: 65%;
    position: absolute;
    top: 20%;

    right: -400px;

    @media (max-width: 1199px) {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 899px) {
      width: 50%;
    }
    @media (max-width: 599px) {
      height: 556px;
      width: 100%;
    }
  }
  .ourProductPinkWing {
    position: absolute;
    top: 310px;
    left: 0;
    @media (max-width: 899px) {
      display: none;
    }
  }
  .ourProducteclips {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 80%;
    img {
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
    }
  }
  .ourProductTitle {
    padding-bottom: 78px;
    @media (max-width: 1199px) {
      padding-bottom: 60px;
    }
    @media (max-width: 899px) {
      padding-bottom: 50px;
    }
    @media (max-width: 599px) {
      padding-bottom: 43px;
    }
    h3 {
      text-align: center;
      color: ${primaryColors.black};
      font-size: 106px;
      font-weight: 400;
      line-height: 1;
      text-transform: lowercase;
      @media (max-width: 1199px) {
        font-size: 80px;
      }
      @media (max-width: 899px) {
        font-size: 60px;
      }
      @media (max-width: 599px) {
        font-size: 40px;
      }
      span {
        font-size: 66px;
        display: block;
        line-height: inherit;
        color: inherit;
        font-family: inherit;
        @media (max-width: 1199px) {
          font-size: 60px;
        }
        @media (max-width: 899px) {
          font-size: 50px;
        }
        @media (max-width: 599px) {
          font-size: 30px;
        }
      }
    }
  }
  .ourProductSliderwrapperSection {
    max-width: 730px;
    @media (max-width: 1399px) {
      padding: 0 25px;
    }
    @media (max-width: 1199px) {
      max-width: none;
    }
    @media (max-width: 599px) {
      max-width: 100%;
    }
    .slick-slider {
      padding-bottom: 50px;
      margin: 0 -16px;
      @media (max-width: 899px) {
        font-size: 45px;
      }
      @media (max-width: 599px) {
        font-size: 37px;
        margin: 0;
        padding-bottom: 37px;
      }
      .slick-slide {
        padding: 0 16px;
        @media (max-width: 599px) {
          padding: 0;
        }
      }

      .slick-arrow {
        width: 40px;
        height: 40px;
        display: inline-flex;

        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid ${primaryColors.text_purple};
        z-index: 1;
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
          @media (max-width: 1399px) {
            left: -30px;
          }
          &:before {
            background: url("/assets/images/arrow_prev.svg") no-repeat center
              center;
            background-size: 100%;
          }
        }
        &.slick-next {
          right: -40px;
          @media (max-width: 1399px) {
            right: -30px;
          }
          &:before {
            background: url("/assets/images/arrow_next.svg") no-repeat center
              center;
            background-size: 100%;
          }
        }
      }

      .slick-dots {
        text-align: start;
        bottom: -20px;
        text-align: center;

        @media (max-width: 599px) {
          bottom: -12px;
        }
        li {
          width: 10px;
          height: 10px;
          margin: 0 2px;
          button {
            width: 10px;
            height: 10px;
            background: rgba(84, 55, 149, 0.1);
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
              background: ${primaryColors.text_purple};
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
