/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const OrderconfirmWrapper = styled(Box)`
  padding: 72px 0 108px 0;
  @media (max-width: 899px) {
    padding: 50px 0;
  }
  @media (max-width: 599px) {
    padding: 30px 0;
  }
  .confirmstatus {
    margin-bottom: 83px;
    @media (max-width: 899px) {
      margin-bottom: 45px;
    }
    @media (max-width: 599px) {
      margin-bottom: 20px;
    }
    .icon_wrap {
      width: 123px;
      margin: 0 auto;
      line-height: 0;
      @media (max-width: 899px) {
        width: 100px;
      }
      @media (max-width: 599px) {
        width: 60px;
      }
      img {
        width: 100%;
     
      }
    }
    h4 {
      margin-top: 36px;
      text-align: center;
      color: ${primaryColors.black};
      font-size: 27px;
      font-weight: 700;
      line-height: 1;
      text-transform: uppercase;
      @media (max-width: 899px) {
        margin-top: 20px;
        font-size: 25px;
      }
      @media (max-width: 599px) {
        margin-top: 15px;
        font-size: 22px;
      }
    }
  }
  .userdetails {
    position: relative;
    border-radius: 10px;
    background: ${primaryColors.white};
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    padding: 55px 41px 61px 40px;
    margin-bottom: 40px;
    @media (max-width: 899px) {
      padding: 30px;
      margin-bottom: 30px;
    }
    @media (max-width: 599px) {
      padding: 20px;
      margin-bottom: 20px;
    }
    .pinkWingGradinetbox {
      position: absolute;
      top: -190px;
      right: -160px;
      z-index: -1;
      pointer-events: none;
      @media (max-width: 599px) {
        opacity: 0.5;
      }
    }

    .userName {
      color: ${primaryColors.mainFontColor};
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 13px;
      @media (max-width: 899px) {
        font-size: 17px;
      }
      @media (max-width: 599px) {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
    .description {
      color: ${primaryColors.mainFontColor};
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
      margin: 0;
      padding-bottom: 55px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      @media (max-width: 899px) {
        font-size: 15px;
        padding-bottom: 30px;
      }
      @media (max-width: 599px) {
        font-size: 14px;
        padding-bottom: 25px;
      }
    }
    .orderdetailsStatusWrap {
      padding-top: 30px;
     
      p {
        color: ${primaryColors.footer_text};
        font-size: 16px;
        margin-bottom: 18px;
        line-height: 1.3;
        text-transform: capitalize;
        @media (max-width: 899px) {
          font-size: 15px;
        }
        @media (max-width: 599px) {
          font-size: 14px;
        }

        span {
          display: inline-block;
          font-weight: 400;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          margin-left: 5px;
        }
        :last-child{
          margin-bottom: 0;
        }
      }
     
    }
  }

  .confirmProductDetials {
    position: relative;
    border-radius: 10px;
    background: ${primaryColors.white};
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    padding: 35px 41px 43px 40px;
    @media (max-width: 899px) {
      padding: 30px;
    }
    @media (max-width: 599px) {
      padding: 20px;
    }
    .pinkWingGradinet {
      position: absolute;
      top: -160px;
      left: -220px;
      transform: rotate(-46.574deg);
      pointer-events: none;
      z-index: -1;
      @media (max-width: 599px) {
        opacity: 0.5;
      }
    }
    .productSectionListWrap {
      padding-bottom: 33px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      @media (max-width: 899px) {
        padding-bottom: 20px;
      }
      @media (max-width: 599px) {
        padding-bottom: 15px;
      }
      .confirmproductWrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        @media (max-width: 599px) {
          margin-bottom: 15px;
        }
        
        figure {
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          background-color: ${primaryColors.sliderBackColor};
          @media (max-width: 899px) {
            width: 70px;
            height: 70px;
          }
          @media (max-width: 599px) {
            width: 60px;
            height: 60px;
          }
          img{ 
            
            @media (max-width: 899px) {
          height: 60px;
      }
      @media (max-width: 599px) {
        width: 40px;
        height: 40px;
      }
          }
        }
        .ProductDetailWrap {
          display: flex;
          width: calc(100% - 84px);
          justify-content: space-between;
          padding-left: 15px;
          align-items: center;
          flex-wrap: wrap;
          @media (max-width: 899px) {
            width: calc(100% - 70px);
            
          }
          @media (max-width: 599px) {
            width: calc(100% - 60px);
            padding-left: 10px;
          }
          .productname {
            color: ${primaryColors.black};
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
            text-transform: capitalize;
            margin: 0;
            @media (max-width: 599px) {
            width: 100%;
            margin-bottom: 5px;
          }
          }
          .productprice {
            color: ${primaryColors.darkblack};
            font-size: 15px;
            font-weight: 700;
            line-height: 1.5;
            text-transform: capitalize;
            margin: 0;
          }
        }
      }
    }
    .orderTotalvalue {
      margin-top: 33px;
      @media (max-width: 899px) {
        margin-top: 25px;
            
          }
          @media (max-width: 599px) {
            margin-top: 20px;
          }
      .orderPriceWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        @media (max-width: 899px) {
          margin-bottom: 20px;
            
          }
          @media (max-width: 599px) {
            margin-bottom: 15px;
          }
        .product_Price {
          color: ${primaryColors.footer_text};
          line-height: 1;
          text-transform: capitalize;
          font-size: 14px;
          margin: 0;
        }
        .product_priceSection {
          color: ${primaryColors.footer_text};
          font-weight: 600;
          line-height: 1;
          text-transform: capitalize;
          font-size: 14px;
          margin: 0;
        }
      }
    }
  }
  .confirmProductbutton {
    margin-top: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      max-width: 194px;
     
      p{
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        line-height: 1.7;
      }
    }
    @media (max-width: 599px) {
            margin-top: 20px;
          }
  }
`;
