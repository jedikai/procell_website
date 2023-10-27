import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const MicroChannelWrapper = styled(Box)`
  .video_sec {
    padding: 24px 24px;
    border-radius: 10px;
    background: ${primaryColors?.white};
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;
    @media (max-width: 1199px) {
      margin-bottom: 60px;
      padding: 20px;
    }
    @media (max-width: 899px) {
      margin-bottom: 40px;
      padding: 15px;
    }
    @media (max-width: 599px) {
      margin-bottom: 30px;
      padding: 10px;
    }
    .video_sec_inner {
      position: relative;
      padding-bottom: 52.25%;
      overflow: hidden;
      border-radius: 30px;
      @media (max-width: 599px) {
        border-radius: 15px;
      }
      video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .play_btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
        padding: 0;
        width: 48px;
        height: 48px;
        min-width: auto;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 1199px) {
          width: 40px;
          height: 40px;
        }
        @media (max-width: 899px) {
          width: 35px;
          height: 35px;
        }
        @media (max-width: 599px) {
          width: 20px;
          height: 20px;
        }
        img {
          max-width: 48px;
          height: 100%;
          object-fit: contain;
          @media (max-width: 899px) {
            max-width: 20px;
          }
        }
        &::after {
          content: "";
          width: 116px;
          height: 116px;
          border-radius: 100%;
          background: #fff;
          box-shadow: 0px 10px 38px 0px rgba(0, 0, 0, 0.25);

          position: absolute;
          left: 40%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          @media (max-width: 1199px) {
            width: 90px;
            height: 90px;
          }
          @media (max-width: 899px) {
            width: 60px;
            height: 60px;
          }
          @media (max-width: 599px) {
            width: 40px;
            height: 40px;
          }
        }
        &::before {
          content: "";
          width: 146px;
          height: 146px;
          border-radius: 100%;
          background: rgba(255, 255, 255, 0.33);
          box-shadow: 0px 10px 38px 0px rgba(0, 0, 0, 0.25);
          position: absolute;
          left: 40%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -2;
          @media (max-width: 1199px) {
            width: 110px;
            height: 110px;
          }
          @media (max-width: 899px) {
            width: 80px;
            height: 80px;
          }
          @media (max-width: 599px) {
            width: 60px;
            height: 60px;
          }
        }
        &.pause_btn {
          opacity: 0;
        }
      }
      &:hover {
        .pause_btn {
          opacity: 1;
        }
      }
    }
  }
  .channel_content {
    margin-bottom: 70px;
    @media (max-width: 899px) {
      margin-bottom: 30px;
    }
    h4 {
      @media (max-width: 899px) {
        font-size: 30px;
      }
      @media (max-width: 599px) {
        font-size: 24px;
      }
    }
  }
  .btn_otr {
    display: flex;
    justify-content: center;
    button {
      min-width: 275px;
      padding: 14px 44px;
      p {
        font-size: 14px;
      }
    }
  }
`;
