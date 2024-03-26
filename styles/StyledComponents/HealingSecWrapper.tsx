import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HealingSecWrapper = styled(Box)`
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(
      347deg,
      rgba(0, 0, 0, 0.6) 20.88%,
      rgba(0, 0, 0, 0) 70.97%
    );
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
  }
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
  }
  .healing_figure {
    height: 100vh;
    @media (max-width: 599px) {
      height: 590px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media(max-width: 899px){
        object-position: 20% top;
      }
    }
  }
  .healing_content_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 80px 0;
    z-index: 9;
    text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    @media (max-width: 1199px) {
      padding: 70px 0;
    }
    @media (max-width: 899px) {
      padding: 60px 0;
    }
    @media (max-width: 599px) {
      padding: 54px 0;
    }
    h2 {
      color: ${primaryColors?.white};
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
    p {
      max-width: 778px;
      margin: auto;
      color: ${primaryColors?.white};
      @media (max-width: 599px) {
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }
`;
