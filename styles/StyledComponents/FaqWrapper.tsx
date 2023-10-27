import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const FaqWrapper = styled(Box)`
  .accordion_sec {
    .MuiAccordion-root {
      padding: 31px;
      margin-bottom: 20px;
      border-radius: 10px;
      border: 1px solid #e1e1e1;
      box-shadow: inherit;
      @media (max-width: 1199px) {
        padding: 20px 15px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &:before {
        background: transparent;
      }
    }
    .MuiAccordionSummary-root {
      padding: 0;
      min-height: auto;
      .MuiSvgIcon-root {
        fill: ${primaryColors.text_purple};
      }
    }
    .MuiAccordionSummary-content {
      margin: 0;
      &.Mui-expanded {
        margin-bottom: 15px;
        .MuiTypography-root {
          color: ${primaryColors.text_purple};
        }
      }
      .MuiTypography-root {
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        text-transform: capitalize;
        color: ${primaryColors.black};
        @media (max-width: 1199px) {
          font-size: 16px;
        }
      }
    }

    .MuiAccordionDetails-root {
      padding: 0;
      padding-right: 40px;
      @media (max-width: 899px) {
        padding-right: 0;
      }
    }
  }
`;
