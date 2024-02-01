import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CustomerProfileWrapper = styled(Box)`
  .main_heading {
    font-size: 25px;
    margin: 0 0 30px;
    @media (max-width: 599px) {
      font-size: 20px;
      margin: 0 0 25px;
    }
  }

  .new_entries_sec {
    max-height: 650px;
    overflow: auto;
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
    .new_entry_card {
      height: 100%;
      @media (max-width: 1199px) {
        padding: 20px;
      }
      @media (max-width: 899px) {
        padding: 40px 20px;
      }
    }
  }

  .btn_holder {
    margin-top: 40px;
    @media (max-width: 599px) {
      margin-top: 20px;
    }
    button {
      &:not(:last-child) {
        margin-right: 10px;
        @media (max-width: 599px) {
          margin-bottom: 20px;
          margin-right: 0;
        }
      }
    }
  }

  .profile_header {
    background-image: url("/assets/images/innerHeaderBackgroundimg.png");
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    .left {
      width: 28%;
      justify-content: center;
      padding-right: 15px;
      .client_image {
        text-align: center;
      }
      border-right: 1px solid ${primaryColors.white};
      @media (max-width: 1199px) {
        width: 48%;
      }
      @media (max-width: 599px) {
        width: 100%;
        padding: 0;
        border: 0;
      }
      .cl_image_wrap {
        padding: 0 8px;
        width: 50%;
        .client_image {
          width: 73px;
          height: 73px;
          position: relative;
          margin: 0 0 7px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          .editProfileWrap {
            position: absolute;
            bottom: 0;
            right: 0;
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
            .editButnIcon {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              min-width: auto;
              background: ${primaryColors.black};
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }
      .see_all {
        padding: 0 8px;
        width: 50%;
      }

      p {
        color: ${primaryColors.white};
        @media (max-width: 599px) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .right {
      max-width: 72%;
      padding-left: 15px;
      .right_image_part {
        margin: 0 -5px;
        .image_wrap {
          padding: 0 5px;
          .client_image {
            margin: 0 auto;
            margin: 0 0 6px;
          }
        }
        p {
          color: ${primaryColors.white};
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      @media (max-width: 1199px) {
        width: 52%;
      }
      @media (max-width: 599px) {
        display: none;
      }
      .slide_image_active {
        .client_image {
          &:before {
            opacity: 1;
          }
        }
        p {
          color: ${primaryColors.primary} !important;
        }
      }
      .client_image {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        img {
          margin: 0 auto;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid ${primaryColors.primary};
          opacity: 0;
          border-radius: 100%;
          z-index: 2;
        }
      }
      .slide_image {
        p {
          color: ${primaryColors.white};
          text-align: center;
          white-space: nowrap;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .slider_wrap {
        .slick-slide {
          padding: 0 10px;
        }
        .slick-arrow {
          width: 20px;
          height: 20px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background-color: ${primaryColors.white};
          border-radius: 50%;
          top: 40%;

          &.slick-disabled {
            pointer-events: none;
          }
          z-index: 1;
          &:hover {
            background-color: transparent;
          }
          &:before {
          }
          &.slick-prev {
            left: 0;

            &:before {
              background: url("/assets/images/arrow_next_purple.svg") no-repeat
                center center;
              background-size: 60%;
              content: "";
              width: 16px;
              height: 16px;
              position: relative;
              display: block;
              transform: rotate(180deg);
            }
          }
          &.slick-next {
            right: 0;

            &:before {
              background: url("/assets/images/arrow_next_purple.svg") no-repeat
                center center;
              display: block;
              background-size: 60%;

              content: "";
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    .profiletext {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
`;
