import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/system";

export const LoginWrapperStyle = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url(${assest.loginBackground}) #fff 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  position: relative;
  z-index: 1;

  .product_image {
    position: absolute;
    right: 0;
    top: 0;
    height: auto;
    max-width: 30vw;
    height: 100%;
    width: 100%;
    object-position: right;
    object-fit: contain;
    @media (max-width:599px) {
      max-width: 30vw;
    }
  }
  .card_header {
    position: absolute;
    right: -35%;
    top: 35%;
    transform: translateY(-50%);
    max-width: 555px;
    text-align: center;
    transform: rotate(270deg);
    z-index: 1;
    font-size: 4vw;
    font-weight: 400;
    opacity: 0.15;
    text-transform: uppercase;
    color: ${primaryColors.black};
    @media (max-width:1199px) {
      font-size: 3vw;
      right: -15%;
    top: 45%;
    }
    @media (max-width:899px) {
      display: none;
    }
  }

  .form_box_wrapper {
    position: relative;
    max-width: 643px;

    ::before {
      position: absolute;
      content: "";
      left: -30px;
      top: 50%;
      transform: translateY(-50%);
      height: 80%;
      width: 30px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border: 1px solid #fff;
      border-right: none;
      /* Fallback background color for older browsers */
      background-color: #fff;

      /* Linear Gradient for modern browsers */
      background: linear-gradient(
        107deg,
        #fff -794.47%,
        rgba(255, 255, 255, 0.34) -514.24%,
        rgba(255, 255, 255, 0) 175.39%
      );

      /* Linear Gradient for Webkit-based browsers (Safari and Chrome) */
      background: -webkit-linear-gradient(
        107deg,
        #fff -794.47%,
        rgba(255, 255, 255, 0.34) -514.24%,
        rgba(255, 255, 255, 0) 175.39%
      );
      @media (max-width: 599px) {
        display: none;
      }
    }
  }
  .form_box {
    /* overflow-y: auto; */
    max-width: 516px;
    /* min-height: 621px; */
    /* max-height: calc(100vh - 100px); */
    padding: 46px 0px;
    position: relative;
    background-color: #fff;
    z-index: 9;
    display: flex;
    justify-content: center;

    background: -webkit-linear-gradient(
      153deg,
      #fff 9.76%,
      rgba(255, 255, 255, 0.34) 40.29%,
      rgba(255, 255, 255, 0) 115.42%
    );
    background: linear-gradient(
      153deg,
      #fff 9.76%,
      rgba(255, 255, 255, 0.34) 40.29%,
      rgba(255, 255, 255, 0) 115.42%
    );
    /* background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(229, 233, 242, 1) 53%,
      rgba(220, 229, 242, 1) 100%
    ); */

    border-radius: 15px;
    border: 1px solid #fff;
    > div {
      width: 100%;
    }
    @media (max-width:1199px) {
      padding: 30px 0px;
      max-width: 500px;
    }
    @media (max-width:599px) {
      padding: 20px 0px;
      max-width: 500px;
    }
  }

  .form_body {
    h4 {
      color: ${primaryColors.black};
      font-size: 27px;
      font-weight: 700;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    > p {
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 25px;
      color: ${primaryColors.form_text};
    }

    .input_wrap {
      margin-bottom: 28px;
    }

    .btn_wrapper {
      margin-bottom: 32px;

      button {
        width: 100%;
        padding: 15px 20px;
        p {
          font-size: 14px;
          font-weight: 600;
        }
        @media (max-width:599px) {
          padding: 10px;
        }
      }
    }

    .form_bottom {
      font-size: 16px;
      font-weight: 400;
      color: ${primaryColors.grey_text};
      a {
        color: ${primaryColors.text_purple};
        font-size: 16px;
        font-weight: 500;
        &:hover{
          color: ${primaryColors.primary};
        }
      }
    }
    &.form_body2 {
      h4 {
        margin-bottom: 25px;
      }
    }
  }
  .perfect_scroll {
    max-height: calc(100vh - 166px);
    padding: 0 46px;
    @media (max-width:599px) {
      padding:0 25px
    }
  }
`;
