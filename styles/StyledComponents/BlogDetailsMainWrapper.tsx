import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import { Box } from "@mui/material";

export const BlogDetailsMainWrapper = styled(Box)`
  .details_top {
    margin: 0 0 60px;
    @media (max-width: 599px) {
      margin: 0 0 30px;
    }
    .main_head {
      font-size: 35px;
      text-transform: uppercase;
      font-weight: 400;
      margin: 0 0 25px;
      @media (max-width: 599px) {
        font-size: 24px;
      }
      @media (max-width: 374px) {
        @media (max-width: 599px) {
          font-size: 18px;
        }
      }
    }
    .date_author {
      display: flex;
      margin: 0 0 40px;
      li {
        width: auto;
        color: ${primaryColors.black};
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        &:first-child {
          margin-right: 35px;
          @media (max-width: 374px) {
            margin-right: 15px;
          }
        }
        .icon {
          margin-right: 8px;
        }
      }
    }
    .main_blog_image {
      margin: 0 0 25px;
    }
  }

  .blog_contents {
    .blg_image {
      > img {
        width: 100%;
      }
    }
    .content_row {
      display: flex;
      flex-direction: row;
      margin: 0 -15px;
      /* align-items: center; */
      .content_col {
        padding: 0 15px;
      }
    }
    .blog_content {
      &:not(:last-child) {
        margin: 0 0 60px;
        @media (max-width: 599px) {
          margin: 0 0 30px;
        }
      }
      .blog_heading {
        margin: 0 0 20px;

        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid ${primaryColors.coloreee};
        padding-bottom: 15px;
        @media (max-width: 374px) {
          flex-wrap: wrap;
        }
        .blog_head_left {
          width: 75%;
          padding-right: 10px;
          @media (max-width: 374px) {
            width: 100%;
            margin: 0 0 5px;
          }
          .title {
            color: ${primaryColors.black};
            font-family: Roboto;
            font-size: 30px;
            text-transform: capitalize;
            font-weight: 700;
            margin: 0 0 10px;
            @media (max-width: 374px) {
              font-size: 25px;
            }
          }
          p {
            color: ${primaryColors.primary};
            text-transform: capitalize;
          }
        }
        .social_list {
          display: flex;
          @media (max-width: 374px) {
            width: 100%;
          }
          li {
            width: auto;
            &:not(:last-child) {
              margin-right: 10px;
            }
            a {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${primaryColors.colorF7F7F7};
              &:hover {
                background-color: ${primaryColors.primary};
                svg path {
                  fill: #fff;
                }
              }
            }
          }
        }
      }
      .image_slider {
        img {
          width: 100%;
        }
        .slick-slider {
          padding-bottom: 10px;
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
              background: rgba(84, 55, 149, 0.3);
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
      &.blog_content_one {
        .content_first {
          flex-wrap: wrap;
          /* margin: 0 -15px 60px; */
          margin: 0 0 60px;

          @media (max-width: 1199px) {
            align-items: flex-start;
          }
          @media (max-width: 899px) {
            /* margin: 0 -15px 30px; */
            margin: 0 0 30px;
          }
          .left {
            width: 42%;
            @media (max-width: 1199px) {
              width: 50%;
            }
            @media (max-width: 899px) {
              width: 100%;
            }
          }
          .right {
            width: 58%;
            @media (max-width: 1199px) {
              width: 50%;
            }
            @media (max-width: 899px) {
              width: 100%;
            }
          }
          .blg_image {
            @media (max-width: 899px) {
              margin: 0 0 30px;
            }
            @media (max-width: 374px) {
              margin: 0 0 18px;
            }
          }
        }
        .content_last {
          align-items: center;
          flex-wrap: wrap;
          .left {
            width: 62%;
            @media (max-width: 899px) {
              width: 100%;
              margin: 0 0 30px;
            }
          }

          .right {
            width: 38%;
            @media (max-width: 899px) {
              width: 100%;
            }

            &:first-child {
              width: 100%;

              .image_slider {
                max-width: 500px;
                margin: 0 auto;
              }
            }
          }
        }
      }
      &.blog_content_two {
        .content_first {
          margin: 0 -15px 60px;
          @media (max-width: 599px) {
            margin: 0 -15px 30px;
          }
          align-items: flex-start;
          flex-wrap: wrap;
          .left {
            width: 62%;
            @media (max-width: 599px) {
              width: 100%;
              margin: 0 0 30px;
            }
          }
          .right {
            width: 38%;
            @media (max-width: 599px) {
              width: 100%;
            }
          }
        }
      }
    }

    .blogImg_left {
      float: left;
      margin-right: 35px;
      max-width: 460px;

      @media (max-width: 899px) {
        float: none;
        margin: 0 0 30px;

        img {
          width: 100%;
        }
      }
    }
  }
`;
