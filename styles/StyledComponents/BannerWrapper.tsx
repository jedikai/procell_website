import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const BannerWrapper = styled(Box)`
  .banner_sec {
    position: relative;
    z-index: 1;
    line-height: 0;
    /* min-height: 100vh; */
    @media (max-width: 599px) {
      height: 100vh;
    }
    &:after {
      background-color: rgba(0, 0, 0, 0.21);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      position: absolute;
    }
    video {
      /* height: 100vh; */
      width: 100%;
      @media (max-width: 599px) {
        height: 100%;
        object-fit: cover;
      }
    }
    .mute_icon {
      position: absolute;
      top: 40px;
      right: 40px;
      z-index: 2;
      min-width: auto;
      &:hover {
        background: transparent;
      }
      @media (max-width: 1199px) {
        top: 30px;
        right: 30px;
      }
      @media (max-width: 899px) {
        width: 45px;
        top: 25px;
        right: 25px;
      }
      /* @media (max-width: 599px) {
        display: none;
      } */
    }
  }
  .banner_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .btn_holder {
      justify-content: center;
      align-items: center;
      @media (max-width: 599px) {
        flex-direction: column;
      }
      button {
        @media (max-width: 599px) {
          margin-left: 0 !important;
        }
        &:not(:last-child) {
          @media (max-width: 599px) {
            margin-bottom: 15px;
          }
        }
      }
    }

    .banner_inr {
      max-width: 520px;
      @media (max-width: 1199px) {
        max-width: 500px;
      }
      @media (max-width: 899px) {
        max-width: 430px;
      }
      @media (max-width: 599px) {
        max-width: 100%;
        text-align: center;
      }
      h1 {
        color: ${primaryColors.white};
        text-transform: uppercase;
        @media (max-width: 1199px) {
          font-size: 50px;
        }
        @media (max-width: 899px) {
          font-size: 45px;
        }
        @media (max-width: 599px) {
          font-size: 39px;
        }
      }
      h3 {
        color: ${primaryColors.white};

        font-size: 27px;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 9.315px;
        text-transform: uppercase;
        @media (max-width: 1199px) {
          font-size: 25px;
        }
        @media (max-width: 899px) {
          font-size: 20px;
        }
        @media (max-width: 599px) {
          font-size: 16px;
          letter-spacing: 5.52px;
          line-height: 1;
        }
      }
      p {
        color: ${primaryColors.white};
        @media (max-width: 1199px) {
          font-size: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 899px) {
          margin-bottom: 18px;
        }
        @media (max-width: 599px) {
          margin-bottom: 16px;
        }
      }
      .sub_para {
        padding-left: 200px;
        position: relative;
        margin-top: 20px;
        @media (max-width: 1199px) {
          font-size: 15px;
          padding-left: 180px;
        }
        @media (max-width: 899px) {
          font-size: 16px;
          padding-left: 150px;
        }
        @media (max-width: 599px) {
          margin-top: 10px;
          padding-left: 0px;
        }
        &::after {
          position: absolute;
          left: 0;
          top: 15px;
          content: "";
          background-color: ${primaryColors.white};
          height: 1px;
          width: 180px;
          @media (max-width: 1199px) {
            font-size: 15px;
            width: 170px;
          }
          @media (max-width: 899px) {
            font-size: 14px;
            width: 140px;
          }
          @media (max-width: 599px) {
            display: none;
          }
        }
        p {
        }
        button {
          padding: 12px 30px;
          @media (max-width: 899px) {
            padding: 10px 25px;
          }
          @media (max-width: 599px) {
            min-width: 145px;
            padding: 12px 30px;
            font-size: 16px;
          }
          p {
            font-weight: 400;
          }
          &:hover {
            background-color: ${primaryColors.black};
          }
        }
      }
    }
  }
`;
