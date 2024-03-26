import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const WeoffersWrapper = styled(Box)`
  .weofferwrap {
    padding-top: 55px;
    position: relative;
    @media (max-width: 1199px) {
      padding-top: 40px;
    }
    @media (max-width: 899px) {
      padding-top: 30px;
    }
    @media (max-width: 599px) {
      padding-top: 17px;
    }

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 400px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 94%,
        rgba(255, 255, 255, 1) 100%
      );

      bottom: -10px;
      left: 0;
      z-index: 2;
      pointer-events: none;
    }
    .gradientBackground {
      display: inline-block;
      width: 452px;
      height: 387px;
      position: absolute;
      top: -20px;
      right: 0;
      img {
        width: 100%;
        height: 100%;
      }
      @media (max-width: 1199px) {
        width: 250px;
      }
      @media (max-width: 899px) {
        width: 200px;
      }
      @media (max-width: 599px) {
        display: none;
      }
    }
    .weoffersection {
      .weofferGirlImg {
        line-height: 0;
        box-sizing: border-box;
        width: 782px;
        position: relative;
        img {
          margin-left: -190px;
          width: 100%;
          @media (max-width: 1199px) {
            width: 540px;
            margin-left: -30px;
          }
          @media (max-width: 899px) {
            margin: 0;
          }
        }
        @media (max-width: 1199px) {
          width: 782px;
        }
        @media (max-width: 899px) {
          width: 782px;
          &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 240px;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 1) 94%,
              rgba(255, 255, 255, 1) 100%
            );

            bottom: -10px;
            left: 0;
            z-index: 2;
            pointer-events: none;
          }
        }
        @media (max-width: 599px) {
          width: 322px;
          width: 100%;
        }

        .blueWings {
          display: inline-block;
          width: 93px;
          position: absolute;
          top: 10px;
          right: 0;

          img {
            width: 100%;
          }
          @media (max-width: 1199px) {
            width: 50px;
            top: 0;
            right: 300px;
          }
          @media (max-width: 899px) {
            display: none;
          }
        }
        .pinkWings {
          display: inline-block;
          width: 26px;
          position: absolute;
          bottom: 300px;
          left: 0;
          z-index: 3;
          img {
            width: 100%;
          }
          @media (max-width: 1199px) {
            bottom: 200px;
            left: 18px;
          }

          @media (max-width: 899px) {
            display: none;
          }
        }
      }
      .weofferTextSection {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: flex-end;

        .WeofferTextWrapper {
          padding-bottom: 65px;
          @media (max-width: 899px) {
            padding-bottom: 40px;
          }
          @media (max-width: 599px) {
            padding-bottom: 33px;
            margin-top: -20px;
          }
          h2 {
            color: ${primaryColors.black};
            font-size: 136px;
            line-height: 1;
            text-transform: lowercase;
            padding-bottom: 37px;
            @media (max-width: 1199px) {
              font-size: 100px;
              max-width: 400px;
              position: relative;
              z-index: 2;
            }
            @media (max-width: 899px) {
              font-size: 90px;
              padding-bottom: 15px;
            }
            @media (max-width: 599px) {
              font-size: 40px;
              max-width: 261px;
            }
          }
          p {
            padding: 11px 0 11px 24px;
            border-left: 1px solid ${primaryColors.primary};
            max-width: 374px;
            @media (max-width: 599px) {
              font-size: 16px;
              padding: 15px 0 15px 13px;
              max-width: 100%;
            }
          }
        }
        .weofferProductWrapper {
          padding: 37px 10px 37px 50px;
          max-width: 562px;
          border-radius: 30px;
          background: rgba(84, 55, 149, 0.08);
          position: relative;
          margin-left: -147px;
          margin-bottom: 69px;
          z-index: 9;

          @media (max-width: 1199px) {
            max-width: 400px;
            margin-left: -50px;
          }
          @media (max-width: 899px) {
            min-width: 500px;
            margin-left: 0;
          }
          @media (max-width: 599px) {
            min-width: calc(100% - 170px);
            padding: 37px 105px 31px 17px;
          }

          h3 {
            font-family: "Roboto";
            color: ${primaryColors.black};
            font-size: 21px;
            font-weight: 700;
            line-height: 1.2;
            text-transform: lowercase;
            max-width: 300px;
            display: inline-block;
            @media (max-width: 1199px) {
              font-size: 18px;
              max-width: 250px;
            }
            @media (max-width: 899px) {
              font-size: 16px;
              max-width: 200px;
            }
            /* @media (max-width: 599px) {
              font-size: 14px;
            } */
          }
          p {
            padding-top: 12px;
            max-width: 320px;
            font-size: 14px;
            margin: 0;

            @media (max-width: 899px) {
              font-size: 16px;
              max-width: 252px;
            }
            /* @media (max-width: 599px) {
              font-size: 12px;
            } */
          }
          .weofferProductimg {
            line-height: 0;
            box-sizing: border-box;
            position: absolute;
            bottom: -90px;
            right: -120px;
            z-index: 55;
            img {
              width: 100%;
            }
            @media (max-width: 1199px) {
              width: 180px;
              right: -80px;
              bottom: -60px;
            }
            @media (max-width: 899px) {
            }
            @media (max-width: 599px) {
              width: 171px;
              right: -70px;
              bottom: -60px;
            }
            @media (max-width: 499px) {
              right: -37px;
              bottom: -43px;
            }
          }
        }
      }
    }
  }
`;
