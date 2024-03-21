import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const DashboardStyle = styled(Box)`
  .stage_secondary {
    margin: 0;
  }
  .dashboard_stack {
    padding: 70px 0 100px;
    @media (max-width: 1199px) {
      padding: 40px 0 60px;
    }
    @media (max-width: 599px) {
      padding: 40px 0;
    }
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -40px;
      right: -150px;
      background-image: url(${assest?.dashboardpinkwing});
      width: 504px;
      height: 589px;
      z-index: -1;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      pointer-events: none;
      @media (max-width: 1199px) {
        right: 0;
      }
    }
  }
  .dashboard_body {
    position: relative;
    width: calc(100% - 324px);
    padding-left: 30px;
    min-height: 100%;
    @media (max-width: 899px) {
      width: 100%;
      padding-left: 0;
    }

    .MuiInputBase-root {
      @media (max-width: 399px) {
        min-width: auto;
      }
    }
  }
  .cmn_box {
    padding: 35px 35px;
    border-radius: 10px;
    background: ${primaryColors?.white};
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    /* min-height: 100%; */
    @media (max-width: 599px) {
      padding: 20px 16px;
    }
  }
  .menu_btn {
    position: absolute;
    left: 10px;
    top: 10px;

    p {
      margin-bottom: 0;
    }

    :hover {
      background: none;
      color: inherit;
    }

    @media (min-width: 900px) {
      display: none;
    }
  }

  .close_btn {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid ${primaryColors.border_primary};
    svg {
      width: 12px;
      height: 12px;
    }
    :hover {
      background: none;
      color: inherit;
    }
    @media (min-width: 900px) {
      display: none;
    }
  }
`;
