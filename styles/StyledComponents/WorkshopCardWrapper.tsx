import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const WorkshopCardWrapper = styled(Box)`
  border-radius: 10px;
  background: ${primaryColors?.white};
  box-shadow: 0px 16px 55px 0px rgba(0, 0, 0, 0.06);
  max-width: 359px;
  padding: 70px 65px 35px 65px;
  text-align: center;
  position: relative;
  @media (max-width: 1199px) {
    padding: 50px 30px 30px;
  }
  @media (max-width: 899px) {
    max-width: 100%;
  }
  &:not(:last-child) {
    @media (max-width: 899px) {
      margin-bottom: 60px;
      margin-top: 0;
    }
  }
  &::after {
    content: "";
    width: 60%;
    height: 2px;
    background: url("/assets/images/dash_line.png") repeat center;
    position: absolute;
    right: -60%;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    @media (max-width: 1199px) {
      width: 19%;
      right: -20%;
    }
    @media (max-width: 899px) {
      display: none;
    }
  }
  &:nth-child(even) {
    margin-left: auto;
    margin-top: -30px;
    &::after {
      right: auto;
      left: -60%;
      @media (max-width: 1199px) {
        left: -18%;
      }
    }
    @media (max-width: 899px) {
      margin-top: 0;
    }
  }
  &.disabled {
    .card_content {
      h5 {
        /* color: ${primaryColors?.disabledBg}; */
      }
      ul {
        li {
          color: ${primaryColors?.disabledBg};
        }
      }
    }
  }

  .icon {
    background: linear-gradient(
          ${primaryColors?.white},
          ${primaryColors?.white}
        )
        padding-box,
      linear-gradient(
          279deg,
          ${primaryColors?.primary1} -7.77%,
          ${primaryColors?.primary} 109.39%
        )
        border-box;
    border-radius: 50px;
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 88px;
    margin: -115px auto 27px auto;
    @media (max-width: 1199px) {
      width: 65px;
      height: 65px;
      margin-top: -70px;
    }
  }
  .card_content {
    h5 {
      color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 18px;
      font-weight: 700;
      text-transform: capitalize;
      margin-bottom: 10px;
    }
    ul {
      li {
        color: ${primaryColors?.black};
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        justify-content: center;
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        svg {
          margin-right: 10px;
        }
      }
    }
    .btn_otr {
      display: flex;
      justify-content: center;
      margin-top: 25px;
      button {
        padding: 12.5px 17px;
        min-width: 130px;
        p {
          font-size: 14px;
font-weight: 600;

        }
      }
    }
  }
`;
