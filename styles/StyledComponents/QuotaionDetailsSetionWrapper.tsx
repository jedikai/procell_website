/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const QuotaionDetailsSetionWrapper = styled(Box)`
  .quotationsection {
    .quationAddressHeading {
      color: ${primaryColors.black};
      font-size: 25px;
      font-weight: 400;
      line-height: 1.7;
      text-transform: lowercase;
      margin-bottom: 39px;
      @media (max-width: 599px) {
        font-size: 18px;
        margin-bottom: 15px;
      }
    }
    .shippingAddressWrapper {
      padding: 28px 28px 32px 28px;
      border-radius: 10px;
      border: 1px solid ${primaryColors.inputBorder};
      background: ${primaryColors.white};
      @media (max-width: 599px) {
        padding: 16px;
      }
      h4 {
        color: ${primaryColors.black};
        font-family: Roboto;
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
        text-transform: capitalize;
        margin-bottom: 21px;
      }
      .orderDetails {
        h5 {
          color: ${primaryColors.black};
          font-family: Roboto;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
        }
      }
      .orderLocationWrapper {
        margin-top: 15px;
        @media (max-width: 599px) {
          flex-wrap: wrap;
        }
        .orderlocation {
          min-width: 60%;
          p {
            font-size: 13px;
            font-weight: 500;
            line-height: 1;
            margin-left: 7px;
            width: 100%;
            max-width: calc(100% - 30px) !important;

            @media (min-width: 599px) {
              max-width: 230px;
              /* margin-bottom: 10px; */
            }
          }
        }
      }
      .orderdateWrapper {
        .orderDate {
          margin: 0 8px 0 0;
          color: #1b1b1b;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.5;
          text-transform: capitalize;
        }
        .date {
          font-size: 13px;
          font-weight: 600;
          line-height: 1;
        }
      }
    }
    .pricingDetials {
      .pricingHeading {
        color: ${primaryColors.black};
        font-size: 25px;
        font-weight: 400;
        line-height: 1.7;
        text-transform: lowercase;
        margin: 37px 0px;
        @media (max-width: 599px) {
          font-size: 18px;
          margin: 15px 0;
        }
      }
      .quotationDetailPricingtable {
        padding: 23px 0 27px 0;
        border-radius: 10px;
        border: 1px solid ${primaryColors.inputBorder};
        background: ${primaryColors.white};
        table {
          white-space: nowrap;
        }
        thead {
          tr {
            th {
              padding: 10px 13px;
              border-bottom: none;

              p {
                color: ${primaryColors.black};
                font-size: 15px;
                font-weight: 500;
                line-height: 1.3;
                text-transform: capitalize;
                padding: 0 10px;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 10px 13px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              &:first-child {
                width: 45%;
              }
              p {
                font-size: 13px;
                font-weight: 400;
                line-height: 1;
                &.productPriceamount {
                  color: ${primaryColors.secondaryFont};
                  font-family: Roboto;
                  font-size: 13px;
                  font-weight: 600;
                  line-height: 1.3;
                }
              }
              .productPaymentSeciton {
                figure {
                  min-width: 63.488px;
                  height: 59px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: ${primaryColors.sliderBackColor};
                  img {
                    width: 42px;
                  }
                }
                h4 {
                  color: ${primaryColors.black};
                  font-family: Roboto;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 1.4;
                  text-transform: capitalize;
                  margin-left: 18px;
                  max-width: 185px;
                  margin-right: auto;
                  text-wrap: wrap;
                  @media (max-width: 1199px) {
                    max-width: inherit;
                    text-wrap: inherit;
                  }
                }
              }
            }
          }
        }
        .quotationProductTotalvaluewrap {
          max-width: 420px;
          margin-left: auto;

          .productAmountsection {
            padding: 0 36px;
            margin: 17px 0 21px 0;

            p {
              font-size: 14px;
              font-weight: 500;
              line-height: 1.5;
              text-transform: capitalize;
              margin: 0;
            }
            h5 {
              color: #1b1b1b;
              font-family: Roboto;
              font-size: 14px;
              font-weight: 600;
              line-height: 1.5;
              text-transform: capitalize;
            }
          }
          .producttaxAmountsection {
            padding: 0 36px;
            margin: 0 0 21px 0;
            p {
              font-size: 14px;
              font-weight: 500;
              line-height: 1.5;
              text-transform: capitalize;
              margin: 0;
            }
            h5 {
              color: #1b1b1b;
              font-family: Roboto;
              font-size: 14px;
              font-weight: 600;
              line-height: 1.5;
              text-transform: capitalize;
            }
          }
          .productTotalAmountsection {
            padding: 17px 36px 0 36px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            h5 {
              color: ${primaryColors.footer_text};
              font-family: Roboto;
              font-size: 15px;
              font-weight: 500;
              line-height: 1.4;
              text-transform: capitalize;
            }
            h4 {
              color: ${primaryColors.footer_text};
              font-family: Roboto;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.3;
              text-transform: capitalize;
            }
          }
        }
      }
    }
    .paymentTermsWrapper {
      padding: 38px 0;
      @media (max-width: 599px) {
        padding: 20px 0;
      }

      .MuiGrid-item {
        display: flex;
        justify-content: center;
      }
      h4 {
        color: ${primaryColors.black};
        font-size: 25px;
        font-weight: 400;
        line-height: 1;
        text-transform: lowercase;
        margin-bottom: 20px;
        @media (max-width: 599px) {
          font-size: 18px;
          margin-bottom: 15px;
        }
      }
      p {
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
        margin-bottom: 27px;
      }
      .cardDetails {
        width: 162px;
        height: 102px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        border: 1px solid rgba(84, 55, 149, 0.08);
        @media (max-width: 599px) {
          height: 75px;
        }
      }
    }
    .sellspersonDetails {
      border-radius: 10px;
      border: 1px solid ${primaryColors.border_primary};
      background: ${primaryColors.white};
      padding: 30px 23px;
      @media (min-width: 899px) and (max-width: 1199px) {
        padding: 24px 20px;
      }
      @media (max-width: 599px) {
        padding: 16px;
      }
      .orderidsectionWrapper {
        padding-bottom: 27px;
        border-bottom: 1px solid ${primaryColors.bordergray};
        .orderidwrap {
          h4 {
            color: ${primaryColors.darkblack};
            font-family: Roboto;
            font-size: 17px;
            font-weight: 800;
            line-height: 1.3;
            text-transform: capitalize;
            margin-bottom: 14px;
          }
          p {
            margin: 0;
            font-size: 13px;
            line-height: 1.2;
          }
        }
      }
      .orderidbuttonWrapper {
        margin: 0 -10px;
        .printButtonseciton {
          padding: 0 10px;
        }
        .buttonsection {
          padding: 0 10px;
        }

        @media (max-width: 599px) {
          .printButtonseciton,
          .buttonsection {
            padding: 0 6px;
          }
        }
      }
      .printButtonseciton {
        button {
          padding: 10px 20px;
          border-radius: 4px;
          background: ${primaryColors.liteskyblue};
          @media (min-width: 899px) and (max-width: 1199px) {
            padding: 8px 16px;
          }
          @media (max-width: 599px) {
            padding: 6px 12px;
          }
          p {
            margin: 0 0 0 9px;
            color: ${primaryColors.primary};
            font-size: 13px;
            font-weight: 600;
            line-height: 1.7;
            text-transform: capitalize;
            @media (max-width: 599px) {
              font-size: 12px;
            }
          }
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .buttonsection {
        button {
          padding: 10px 20px;
          border-radius: 6px;
          background: rgba(84, 55, 149, 0.08);
          @media (min-width: 899px) and (max-width: 1199px) {
            padding: 8px 16px;
          }
          @media (max-width: 599px) {
            padding: 6px 12px;
          }
          p {
            color: ${primaryColors.text_purple};
            font-size: 13px;
            font-weight: 600;
            line-height: 1.7;
            text-transform: capitalize;
            margin: 0 0 0 9px;
            @media (max-width: 599px) {
              font-size: 12px;
            }
          }
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .sellspersonSectionWrap {
        padding-top: 18px;
        h4 {
          color: ${primaryColors.black};
          font-family: Roboto;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.3;
          text-transform: capitalize;
          margin-bottom: 22px;
        }
        .sellspersonbox {
          .sellspersonsection {
            figure {
              line-height: 0;
              img {
                width: 31px;
                height: 31px;
              }
            }
            .selsPersonDetails {
              padding-left: 13px;
              .userName {
                color: ${primaryColors.secondaryFont};
                font-size: 15px;
                font-weight: 600;
                line-height: 1;
                margin: 0;
              }
              .usercontact {
                color: ${primaryColors.secondaryFont};
                font-size: 13px;
                font-weight: 400;
                line-height: 1;
                margin: 11px 0 0 0;
              }
            }
          }
        }
      }
    }
  }
`;
