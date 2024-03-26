/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const PurchesorderStatusBarWrapper = styled(Box)`
  .statusTree {
    margin: 44px 0;
    @media (max-width: 1199px) {
        margin: 20px 0;
      }
    ul {
      display: flex;
      align-items: flex-start;
      @media (max-width: 1199px) {
        align-items: center;
        flex-direction: column;
      }
      li {
        width: auto;
        min-width: 19%;
        justify-content: center;
        @media (max-width: 1199px) {
          width: 100%;
          margin-bottom: 20px;
        }

        .statusTreeBox {
          @media (max-width: 1199px) {
            width: 100%;
            padding-left: 15px;
          }
          .orderStautsdetails {
            color: ${primaryColors.black};
            font-size: 13px;
            font-weight: 600;
            line-height: 1.2;
            padding-bottom: 34px;
            margin: 0;
            text-align: center;
            position: relative;
            @media (max-width: 1199px) {
              padding-bottom: 32px;
              text-align: left;
            }
            &::after {
              content: "";
              position: absolute;
              top: 70%;
              right: 50%;
              transform: translateY(-50%);
              height: 1px;
              width: 135px;
              background-color: ${primaryColors.gray_background};
              z-index: 2;
              @media (max-width: 1199px) {
                 
                left: -10px;
                  height: 50px;
                  width: 2px;
                  top: 45px;
                }
            }
            &::before {
              content: "";
              position: absolute;
              top: 70%;
              left: 50%;
              transform: translateY(-50%);
              border-radius: 50%;
              width: 11px;
              height: 11px;
              border: 2px solid ${primaryColors.gray_background};
              z-index: 3;
              @media (max-width: 1199px) {
                left: -15px;
                top: 8px;
              }
            }
          }
          .orderDate {
            font-size: 13px;
            font-weight: 400;
            line-height: 1;
            text-align: center;
            @media (max-width:1199px) {
              text-align: left;
            }
          }
        }

        &:first-child {
          .statusTreeBox {
            .orderStautsdetails {
              &::after {
                display: none;
                @media (max-width: 1199px) {
                  display: block;
                  left: -10px;
                  height: 50px;
                  width: 2px;
                  top: 45px;
                }
              }
            }
          }
        }
        &:last-child {
          .statusTreeBox {
            .orderStautsdetails {
              &::after {
                @media (max-width: 1199px) {
                  display: none;
                }
              }
            }
          }
        }
      }
      .active {
        .statusTreeBox {
          .orderStautsdetails {
            color: ${primaryColors.primary};

            &::after {
              content: "";
              position: absolute;
              top: 70%;
              right: 50%;
              transform: translateY(-50%);
              height: 1px;
              width: 125px;
              background-color: ${primaryColors.primary};
              @media (max-width: 1199px) {
                 
                left: -10px;
                  height: 50px;
                  width: 2px;
                  top: 45px;
                }
            }
            &::before {
              content: "";
              position: absolute;
              top: 70%;
              left: 50%;
              transform: translateY(-50%);
              border-radius: 50%;
              width: 11px;
              height: 11px;
              background-color: ${primaryColors.primary};
              border: 2px solid ${primaryColors.primary};
              @media (max-width: 1199px) {
                left: -15px;
                top: 8px;
              }
            }
          }
        }
      }
    }
  }
`;
