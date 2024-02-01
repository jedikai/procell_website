import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const MyOrdersWrapper = styled(Box)`
  .quotationHeader {
    margin-bottom: 31px;
    flex-wrap: nowrap;
    @media (max-width: 599px) {
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    h4 {
      color: ${primaryColors.black};
      font-size: 25px;
      line-height: 1.7;
      text-transform: lowercase;
      @media (max-width: 1199px) {
        font-size: 22px;
      }
      @media (max-width: 899px) {
        font-size: 20px;
      }
      @media (max-width: 599px) {
        width: 100%;
      }
    }
    .quotationshort {
      @media (max-width: 599px) {
        width: 100%;
        justify-content: space-between;
      }
      p {
        min-width: 100px;
        margin: 0 26px 0 0;
        text-align: right;
        color: ${primaryColors.black};
        font-size: 13px;
        line-height: 1.2;
        letter-spacing: 0.4px;
        @media (max-width: 599px) {
          text-align: left;
          margin-right: auto;
          min-width: auto;
        }
      }
      .orderDataSelect {
        .MuiSelect-select {
          color: ${primaryColors.liteshadowGray};
          font-size: 16px;
          font-weight: 400;
          min-height: auto;
          line-height: 1;
          letter-spacing: 0.4px;
          @media (max-width: 479px) {
            padding-right: 16px;
            font-size: 14px;
          }
        }
        .MuiSelect-icon {
          @media (max-width: 479px) {
            right: 5px;
          }
        }
      }
    }
  }
  .accordionSecionWrapper {
    max-height: 583px;
    overflow: auto;
    padding-right: 5px;
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
    .MuiSvgIcon-root {
      fill: ${primaryColors.text_purple};
    }
    .MuiPaper-root {
      padding: 0 20px 0 24px;
      border-radius: 10px;
      border: 1px solid ${primaryColors.inputBorder};
      background: ${primaryColors.white};
      margin-bottom: 15px;
      box-shadow: none;
      @media (max-width: 1199px) {
        padding: 0 15px;
      }
      @media (max-width: 899px) {
        padding: 0 10px;
      }
      &::before {
        display: none;
      }
      .MuiButtonBase-root {
        padding: 0;
        .MuiAccordionSummary-content {
          .acr_headerwrap {
            width: 100%;
            .acr_head {
              display: flex;
              align-items: center;
              @media (max-width: 599px) {
                flex-wrap: wrap;
              }

              .productimgBoxsection {
                padding: 0 5px;
                @media (max-width: 599px) {
                  width: 30%;
                  margin-bottom: 10px;
                }
                figure {
                  background-color: ${primaryColors.sliderBackColor};
                  width: 84px;
                  height: 86px;
                  justify-content: center;
                  align-items: center;
                  display: flex;
                  @media (max-width: 1199px) {
                    width: 60px;
                    height: 60px;
                  }

                  img {
                    width: auto;
                    max-width: 100%;
                    height: auto;
                    @media (max-width: 1199px) {
                      width: 40px;
                    }
                  }
                }
              }
              .productDetails {
                padding: 0 10px;
                width: 40%;
                @media (max-width: 599px) {
                  width: 70%;
                  margin-bottom: 10px;
                }
                @media (max-width: 375px) {
                  padding: 0 5px;
                }

                h5 {
                  color: ${primaryColors.black};
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 1.4;
                  text-transform: capitalize;
                  font-family: Roboto;
                  margin-bottom: 11px;
                  @media (max-width: 1199px) {
                    font-size: 12px;
                    margin-bottom: 5px;
                  }
                }
                .orderstausSection {
                  padding: 0;
                  background-color: transparent;
                  line-height: 0;
                  p {
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1;

                    text-transform: capitalize;
                    margin: 0;
                  }
                  a {
                    color: ${primaryColors.cancelRed};
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1;
                    text-decoration: underline;
                    text-transform: capitalize;
                    margin: 0;
                    display: inline-block;
                    :hover {
                      opacity: 0.7;
                    }
                  }

                  .delivered {
                    color: ${primaryColors.primary};
                  }
                  .cancelled {
                    color: ${primaryColors.Alart_color};
                  }
                }
              }
              .ProductPrice {
                padding: 0 5px;
                color: ${primaryColors.darkblack};
                font-size: 15px;
                font-weight: 800;
                line-height: 1.5;
                text-transform: capitalize;
                margin: 0;
                width: 20%;
                text-align: right;
                @media (max-width: 1199px) {
                  font-size: 12px;
                }
                @media (max-width: 599px) {
                  width: 50%;
                  text-align: left;
                }
              }
              .orderdetails {
                padding: 0 5px;
                color: ${primaryColors.text_purple};
                text-align: right;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.5;
                text-transform: capitalize;
                margin-right: 14px;
                width: 30%;
                @media (max-width: 1199px) {
                  font-size: 13px;
                  margin-right: 10px;
                }
                @media (max-width: 599px) {
                  width: 50%;
                  margin: 0;
                }
              }
            }
          }
        }
      }
      .MuiAccordionDetails-root {
        padding: 0;
        .acr_body {
          .orderidCopy_btn {
            max-width: 227px;
            margin: 0 auto 30px;
            max-height: 39px;
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 12px 5px 12px 18px;
            p {
              color: ${primaryColors.mainFontColor};
              font-size: 13px;
              font-weight: 400;
              line-height: 1;
              margin: 0;
              span {
                color: inherit;
                font-size: inherit;
                font-weight: 600;
                line-height: inherit;
              }
            }
            button {
              padding: 6px;
              background-color: transparent;
              min-width: auto;

              span {
                line-height: 1;
                height: 11px;
                transition: 0.3s ease-in-out;
              }
              &:hover span {
                transform: scale(1.3);
                filter: brightness(0);
              }
            }
          }
          .products {
            margin: 0 -15px;
            .product_col {
              padding: 0 15px;
              margin: 0 0 25px;
              width: 50%;
              @media (max-width: 1199px) {
                width: 100%;
              }
              .pr_single {
                figure {
                  background-color: ${primaryColors.sliderBackColor};
                  width: 84px;
                  height: 93px;
                  justify-content: center;
                  align-items: center;
                  display: flex;
                  @media (max-width: 1199px) {
                    width: 60px;
                    height: 60px;
                  }

                  img {
                    width: auto;
                    max-width: 100%;
                    height: auto;
                    max-height: a;
                    @media (max-width: 1199px) {
                      width: auto;
                    }
                  }
                }
                .pr_right {
                  width: calc(100% - 84px);
                  padding-left: 15px;
                  .pr_text {
                    color: ${primaryColors.black};
                    font-size: 14px;
                    font-weight: 400;
                    margin: 0 0 10px;
                    text-transform: capitalize;
                  }
                  .pr_price {
                    color: ${primaryColors.darkblack};
                    font-weight: 800;
                    margin: 0;
                    text-transform: capitalize;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
