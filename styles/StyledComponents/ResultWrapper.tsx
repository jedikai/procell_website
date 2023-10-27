import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ResultWrapper = styled(Box)`
  .sec_title {
    margin-bottom: 60px;
    @media (max-width: 899px) {
      margin-bottom: 40px;
    }
    @media (max-width: 599px) {
      margin-bottom: 30px;
    }
    h4 {
      color: ${primaryColors?.black};
font-family: Roboto;
font-size: 27px;
font-weight: 400;
line-height: 43px;
text-align: center;
      @media (max-width: 899px) {
        font-size: 24px;
      }
      @media (max-width: 599px) {
        font-size: 20px;
      }
      a {
        color: ${primaryColors?.text_purple};
        font-weight: 600;
        &:hover {
          color: ${primaryColors?.primary1};
        }
      }
    }
  }
`;

export const ResultCardWrapper = styled(Box)`
  border-radius: 8px;
  background: ${primaryColors?.white};
  box-shadow: 0px 4px 37px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .title_content {
    h5 {
      color: ${primaryColors?.black};
      font-family: Roboto;
      font-size: 11px;
      font-weight: 700;
    }
    p {
      color: ${primaryColors?.lightGreytxt};
      font-size: 9px;
      font-weight: 500;
    }
  }
  .title_block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px;
  }
  .title_left {
    display: flex;
    align-items: center;
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
  }
  .image_block {
    a {
      height: 267px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 100%;
      @media (max-width: 899px) {
        height: auto;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: all 0.5s ease;
      }
      &:hover {
        img {
          transform: scale(1.3);
        }
      }
    }
  }
  .ftr_block {
    padding: 12px 13px;
    ul {
      display: flex;
      align-items: center;
      li {
        display: block;
        width: auto;
        button {
          min-width: auto;
          background: transparent;
          padding: 0;
          transition: all 0.3s ease;
          &:hover {
            background: transparent;
            transform: scale(1.5);
          }
        }
        &:not(:last-child) {
          margin-right: 12px;
        }
        &:last-child {
          margin-left: auto;
        }
      }
    }
  }
`;
