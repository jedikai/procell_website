import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const PrivacyWrapper = styled(Box)`
  h3 {
    margin-bottom: 20px;
    @media (max-width: 1199px) {
      font-size: 35px;
    }
    @media (max-width: 899px) {
      font-size: 30px;
      margin-bottom: 15px;
    }
    @media (max-width: 599px) {
      font-size: 25px;
      margin-bottom: 10px;
    }
  }
  h5 {
    color: ${primaryColors.textBoldgray};
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
  }
  ul {
    margin-bottom: 20px;
    @media (max-width: 899px) {
      margin-bottom: 15px;
    }
    @media (max-width: 599px) {
      margin-bottom: 10px;
    }
    li {
      padding-left: 21px;
      margin-bottom: 10px;
      position: relative;
      @media (max-width: 899px) {
        padding-left: 15px;
      }

      &:before {
        content: "";
        width: 9px;
        height: 9px;
        position: absolute;
        left: 0;
        top: 11px;
        transform: translatey(-50%);
        background: ${primaryColors.text_purple};
        border-radius: 25px;
      }
    }
  }
  .box_variant {
    padding: 90px 139px;
    background: linear-gradient(
      117deg,
      rgba(84, 55, 149, 0.12) 0.74%,
      rgba(22, 166, 223, 0.12) 113.65%
    );
    text-align: center;
    margin: 100px 0;
    @media (max-width: 1199px) {
      padding: 70px 100px;
      margin: 50px 0;
    }
    @media (max-width: 899px) {
      padding: 60px 50px;
      margin: 50px 0;
    }
    @media (max-width: 599px) {
      padding: 40px 20px;
      margin: 30px 0;
    }
    @media (max-width: 375px) {
      padding: 20px 15px;
      margin: 20px 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
  .box_variant_two {
    position: relative;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 25px 37px -2px rgba(0, 0, 0, 0.1);
    padding: 60px 50px;
    margin: 100px 0;
    @media (max-width: 1199px) {
      padding: 40px 30px;
      margin: 80px 0;
    }
    @media (max-width: 899px) {
      padding: 30px;
      margin: 50px 0;
    }
    @media (max-width: 599px) {
      padding: 20px 15px;
      margin: 40px 0;
    }
    @media (max-width: 375px) {
      margin: 20px 0;
    }
    &::after{
      content: "";
      position: absolute;
      right: 80%;
    bottom: 0;
      background-image: url(${assest.pinkWindGradinet});
      width: 504.209px;
      height: 589.256px;
      transform: rotate(27.686deg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      z-index: -1;
    }
    &::before{
      content: "";
      position: absolute;
      left: 70%;
    bottom: -160px;
      background-image: url(${assest.pinkWindGradinet});
      width: 504.209px;
      height: 589.256px;
      transform: rotate(27.686deg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      z-index: -1;
    }
    h3{
      max-width: 477px;
      margin-bottom: 0;
    }
  }
  .box_variant_three {
    text-align: center;
    max-width: 936px;
    padding: 0 20px;
    margin: 100px auto;
    @media (max-width: 1199px) {
      margin: 80px auto;
    }
    @media (max-width: 899px) {
      max-width: 100%;
      margin: 50px auto;
    }
    @media (max-width: 599px) {
      margin: 30px auto;
      padding: 0 15px;
    }
    @media (max-width: 375px) {
      margin: 20px auto;
      padding: 0 10px;
    }
  }
  .whyYourInformation {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      right: 90%;
    top: -250px;
      background-image: url(${assest.pinkWindGradinet});
      width: 504.209px;
      height: 589.256px;
      transform: rotate(27.686deg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      
    }
  }
`;
