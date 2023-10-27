import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const WorkshopWrapper = styled(Box)`
.work_outr{
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
  .sec_title {
    margin-bottom: 150px;
    @media (max-width: 1199px) {
      margin-bottom: 120px;
    }
    @media (max-width: 899px) {
      margin-bottom: 80px;
    }
    @media (max-width: 599px) {
      margin-bottom: 60px;
    }
    h4 {
      font-size: 40px;
      text-align: center;
      font-weight: 400;
      max-width: 1012px;
      @media (max-width: 1199px) {
        font-size: 35px;
      }
      @media (max-width: 899px) {
        font-size: 30px;
      }
      @media (max-width: 599px) {
        font-size: 24px;
      }
    }
  }
  .workshp_body {
    position: relative;
   
    &::after {
      content: "";
      width: 2px;
      height: 100%;
      background: url("/assets/images/dash_line_vertical.png") repeat center;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      pointer-events: none;
      @media (max-width: 899px) {
        z-index: -1;
      }
    }
  }
}
`;
