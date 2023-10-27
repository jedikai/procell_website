import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const SkinAgeWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &.cmn_gap {
    @media (max-width: 899px) {
      padding: 78px 0 60px 0 !important;
    }
    @media (max-width: 599px) {
      padding: 60px 0 56px 0 !important;
    }
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
    z-index: -1;
    pointer-events: none;
  }
  .title {
    margin-bottom: 70px;
    @media (max-width: 1199px) {
      margin-bottom: 60px;
    }
    @media (max-width: 899px) {
      margin-bottom: 50px;
    }
    @media (max-width: 599px) {
      margin-bottom: 30px;
    }

    h2 {
      span {
        color: inherit;
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        font-family: inherit;
        display: block;
        margin-left: 298px;
        @media (max-width: 899px) {
          margin-left: 150px;
        }
        @media (max-width: 599px) {
          font-size: 30px;
          margin-left: 80px;
        }
      }
      @media (max-width: 1199px) {
        font-size: 80px;
      }
      @media (max-width: 899px) {
        font-size: 60px;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
    }
  }
`;

export const SkinAgeCardWrapper = styled(Box)`
  .float_box {
    border-radius: 10px;
    background: ${primaryColors?.white};
    padding: 20px 20px;
    text-align: center;
    max-width: calc(100% - 124px);
    margin: 0 auto -35px auto;
    position: relative;
    z-index: 9;
    min-height: 94px;
    @media (max-width: 374px) {
      margin-bottom: -50px;
    }
    h6 {
      color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 15px;
      font-weight: 600;
      /* margin-bottom: 5px; */
      @media (max-width: 899px) {
        font-size: 17px;
        margin-bottom: 3px;
      }
    }
    p {
      color: rgba(0, 0, 0, 0.47);
      font-size: 13px;
      line-height: 1.2;
      max-width: 192px;
      margin: auto;
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }
  }
  .image_box {
    position: relative;
    line-height: 0;
    .water_mark {
      position: absolute;
      left: 12px;
      bottom: 0;
      -webkit-text-stroke: 1px ${primaryColors?.white};
      -webkit-text-fill-color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 45px;
      font-weight: 800;
      line-height: 1.2;
      text-transform: uppercase;
      max-width: 154px;
      opacity: 0;
      transition: opacity 1s;
    }
    .animate_box {
      height: 420px;
      border-radius: 10px;
      overflow: hidden;

      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100%;
      transition: background 0.8s;
      /* @media(max-width: 599px){
        height: auto;
      } */
    }
    &:hover {
      .animate_box {
        background-position: left center;
        background-size: 700px;
      }
      .water_mark {
        opacity: 1;
      }
    }
  }
`;
