import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const ReviewSliderWrapper = styled(Box)`
  padding: 60px 0px 0;
  @media (max-width: 899px) {
    padding: 50px 0px 0;
  }
  @media (max-width: 599px) {
    padding: 10px 0px 0;
  }

  .slider_wrapper {
    padding: 20px;
    @media (max-width: 599px) {
      padding: 0;
    }
    .slick-slide {
      padding: 0 10px;
    }
    .reviewslider{
      @media (max-width: 899px) {
        margin: 0;
      }
    }
  }
  .slick-track {
    margin: 0 -10px;
    
  }
  .slick-list {
    padding: 30px 10px;
    
  }
  .review_card {
    padding: 50px 20px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 1px 13px 20px 4px rgb(27 59 119 / 6%);
    
    @media (max-width: 899px) {
       
      
    box-shadow: 1px 3px 13px 2px rgb(27 59 119 / 7%);

      }
    .MuiRating-icon {
      margin-right: 5px;
    }
    .rating {
      margin-bottom: 17px;
    }
    .date {
      font-size: 12px;
      font-weight: 300;
      @media (max-width: 599px) {
        font-size: 14px;
      }
    }
    .rev_head {
      font-size: 16px;
      font-weight: 600;
      color: ${primaryColors.black};
      margin-bottom: 17px;
    }
    .rev_text {
      margin-bottom: 17px;
      font-size: 13px;
      font-weight: 300;
      color: ${primaryColors.black};
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
    .reviewer {
      font-size: 14px;
      font-weight: 600;
      color: ${primaryColors.black};
      @media (max-width: 599px) {
        font-size: 16px;
      }
    }
  }

  .review_card_first {
    padding: 50px 20px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 1px 13px 20px 4px rgb(27 59 119 / 6%);
    @media (max-width: 899px) {
       min-height: 295px;
       box-shadow: 1px 3px 13px 2px rgb(27 59 119 / 7%);
      }
    @media (max-width:599px) {
    
    }

    .MuiRating-icon {
      margin-right: 5px;
    }

    text-align: center;

    .rev_head {
      font-size: 16px;
      font-weight: 600;
      color: ${primaryColors.black};
      margin-bottom: 10px;
    }
    .rating {
      margin-bottom: 10px;
    }

    .based_on {
      font-size: 14px;

      font-weight: 300;
      color: ${primaryColors.black};

      a {
        font-weight: 700;
        text-decoration: underline;
        color: ${primaryColors.black};
      }
    }

    .reviewer {
      margin-top: 2px;
      font-size: 16px;
      font-weight: 700;
      color: ${primaryColors.black};
    }
  }

  .global_slick {
    /* .slick-dots {
      text-align: start;
      bottom: -65px;
      li {
        width: 14px;
        height: 14px;
        button {
          border: 1px solid rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
          line-height: 10px;
          background: transparent;
          border-radius: 100%;
          margin: auto;

          &::before {
            font-size: 0;
            line-height: 10px;
            width: auto;
            height: auto;
            content: "";
            text-align: center;
            border: 0;
            opacity: 1;
            background: transparent;
            border-radius: 100%;
          }
        }
        &.slick-active {
          button {
            opacity: 1;
            background: linear-gradient(
              158.45deg,
              #0bd3d3 17.08%,
              #ab2aa9 64.21%,
              #f890e7 97.73%
            );
            &::before {
              width: auto;
              height: auto;
              border: 1px solid rgba(11, 211, 211, 1);
              border-radius: 100%;
              content: "";
              top: -4px;
              left: -3px;
              right: -3px;
              bottom: -2px;
            }
          }
        }
      }
    } */
  }
  .slick-prev {
    background-image: url("/assets/images/ArrowLeft.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 48px;
    left: -72px;
    width: 48px;
    height: 48px;
    &::before {
      content: "";
    }
    &:hover {
      /* background: url("../public/assets/images/prev2.svg") center no-repeat
        transparent;
      background-size: 30px; */
      background-size: 48px;
      background-image: url("/assets/images/ArrowLeft.svg");
      background-color: transparent;
      opacity: 0.4;
    }
    &:focus {
      background-size: 48px;
      background-image: url("/assets/images/ArrowLeft.svg");
      background-color: transparent;
      opacity: 0.4;
    }
  }
  .slick-next {
    background-image: url("/assets/images/ArrowRight.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 48px;
    right: -72px;
    width: 48px;
    height: 48px;
    &::before {
      content: "";
    }
    &:hover {
      background-image: url("/assets/images/ArrowRight.svg");
      background-size: 48px;
      background-color: transparent;
      opacity: 0.4;
    }
    &:focus {
      background-image: url("/assets/images/ArrowRight.svg");
      background-size: 48px;
      background-color: transparent;
      opacity: 0.4;
    }
  }
  .MuiContainer-root {
    @media (max-width: 599px) {
      max-width: 100%;
    }
  }
`;
