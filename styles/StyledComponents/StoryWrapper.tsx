import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const StoryWrapper = styled(Box)`
  position: relative;
  &.cmn_gap {
    @media (max-width: 899px) {
      padding: 78px 0 80px 0 !important;
    }
    @media (max-width: 599px) {
      padding: 42px 0 80px 0 !important;
    }
    @media (max-width: 374px) {
      padding: 30px 0 50px 0 !important;
    }
  }
  .abs_blur_img {
    position: absolute;
    left: -10%;
    top: 10%;
    pointer-events: none;
    z-index: -1;
    @media (max-width: 599px) {
     display: none;
    }
    
  }
  .storys_sec_upper {
    margin-bottom: 55px;
  }
  .story_text {
    h2 {
      /* max-width: 462px; */
      margin-bottom: 40px;
      padding-right: 272px;
      line-height: 1;
      position: relative;
      margin-left: auto;
      max-width: 94%;
      @media (max-width: 1199px) {
        font-size: 100px;
      }
      @media (max-width: 899px) {
        font-size: 90px;
      }
      @media (max-width: 599px) {
        font-size: 36px;
        margin-bottom: 26px;
        padding-right: 60px;
        margin-left: 0;
      }

      ::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 50px;
        width: 266px;
        height: 1px;
        background-color: ${primaryColors.border_primary};
        @media (max-width: 1199px) {
          font-size: 100px;
          width: 200px;
        }
        @media (max-width: 899px) {
          font-size: 90px;
          width: 180px;
        }
        @media (max-width: 599px) {
          width: calc(100% - 220px);
          right: 15px;
          bottom: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .story_content {
      p {
        line-height: 1.4;
        span {
          display: inline-block;
          color: ${primaryColors.mainFontColor};
          font-family: Roboto;
          font-size: inherit;
          font-weight: 700;
          line-height: inherit;
        }
      }
    }
  }
  .story_content {
    max-width: 440px;
    margin-left: auto;
    @media (max-width: 899px) {
      max-width:100%;
    }
  
    p {
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }
  }
  .story_image {
    position: relative;
    >figure{
      line-height: 0;
      @media (max-width:899px) {
          width: 50vw;
          margin: 0 auto;
        }
      
    }
    &::after {
      content: "";
      width: 900px;
      height: 100%;
      background: url("/assets/images/figure_back_crcl.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      bottom: -9%;
      transform: translateX(-50%);
      z-index: -1;
      pointer-events: none;
      @media (max-width: 599px) {
        display: none;
      }
    }
  }
`;

export const StoryCardWrapper = styled(Box)`
  padding: 50px 35px;
  border-radius: 20px;
  border: 1px solid ${primaryColors?.cardBackColor};
  background: ${primaryColors?.white};
  box-shadow: 0px 44px 64px 0px rgba(41, 11, 109, 0.1);
  text-align: center;
  min-height: 100%;
  .title_head {
    position: relative;
    z-index: 4;
    margin-bottom: 35px;
    &::after {
      content: "";
      width: 90px;
      height: 90px;
      background-color: ${primaryColors?.text_purple};
      opacity: 0.09;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      pointer-events: none;
    }
    h3 {
      font-size: 60px;
      font-weight: 700;
      color: ${primaryColors?.text_purple};
      @media (max-width: 899px) {
        font-size: 55px;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
    }
  }
  .card_content {
    h6 {
      color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 18px;
      font-weight: 700;
      text-transform: capitalize;
      margin-bottom: 10px;
    }
    p {
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }
  }
`;
