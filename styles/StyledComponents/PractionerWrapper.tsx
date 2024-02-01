import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";


export const PractionerSecWrapper = styled(Box)`
  padding-bottom: 100px;
  @media (max-width: 1199px) {
    padding-bottom: 60px;
  }
  @media (max-width: 599px) {
    padding-bottom: 40px;
  }
  .acr_head {
    display: flex;
    align-items: center;
    .progress_rgt {
      margin-left: 35px;
      @media (max-width: 1199px) {
        margin-left: 15px;
      }
      h3 {
        color: ${primaryColors.black};
        font-family: Roboto;
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        text-transform: capitalize;
        margin-bottom: 12px;
        @media (max-width: 1199px) {
          font-size: 20px;
        }
        @media (max-width: 599px) {
          font-size: 18px;
        }
      }
      p {
        display: flex;
        align-items: center;
      }
      .progress_percent {
        color: ${primaryColors.primary};
        background-color: ${primaryColors.liteskyblue};
        padding: 6px 12px;
        display: inline-block;
        border-radius: 4px;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        text-transform: capitalize;
        min-width: 70px;
        text-align: center;
        @media (max-width: 599px) {
          min-width: 50px;
        }
      }
      .check_click {
        color: ${primaryColors.text_purple};
        display: inline-block;
        margin-left: 14px;
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        text-transform: capitalize;
        @media (max-width: 599px) {
          font-size: 16px;
        }
      }
    }
  }
  .accordionSecionWrapper {
    .MuiAccordionSummary-root {
      .MuiSvgIcon-root {
        fill: ${primaryColors.text_purple};
      }
    }
    .MuiPaper-root {
      border-radius: 10px;
      background: ${primaryColors.white};
      box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
      margin-bottom: 35px;
      &:before {
        display: none;
      }
    }
  }
  .acr_body {
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
    @media (max-width: 899px) {
      padding: 20px 0 0;
    }
    li {
      justify-content: space-between;
      margin-bottom: 15px;
      @media (max-width: 479px) {
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      &:last-child {
        margin-bottom: 0;
      }

      .MuiButtonBase-root {
        @media (max-width: 899px) {
          padding: 4px 12px;
        }
        
      }
    }
  }
  .check_box {
    @media (max-width: 479px) {
      margin-bottom: 10px;
      width: 100%;
    }
    .MuiTypography-root {
      color: ${primaryColors.color313131};
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      position: absolute;
      padding-left: 30px;
      left: 0;
      @media (max-width: 899px) {
        font-size: 14px;
      }
    }
  }
`;