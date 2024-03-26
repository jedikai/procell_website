/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ProductRgtWrap = styled(Box)`
  padding-left: 25px;
  .pro_rgt_outr {
    h2 {
      color: ${primaryColors.black};
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: 1.2; /* 120% */
      text-transform: uppercase;
      margin-bottom: 25px;
      @media (max-width:899px) {
        font-size: 25px;
      }
      @media (max-width:599px) {
        font-size: 22px;
        margin-bottom: 15px;
      }
    }
    .price {
      margin-bottom: 35px;
      @media (max-width:899px) {
        margin-bottom: 25px;
      }
      @media (max-width:599px) {
       
        margin-bottom: 15px;
      }
      p {
        color: ${primaryColors.text_purple};
        font-size: 30px;
        font-style: normal;
        font-family: Cinzel;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        @media (max-width:899px) {
        font-size: 25px;
      }
      @media (max-width:599px) {
        font-size: 22px;
        
      }
      }
    }
    .product_para {
      p{
        max-width: 470px;
text-transform: capitalize;
      }
    }
  }
  .social_sec {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    margin: 38px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    @media (max-width:899px) {
        padding: 20px 0;
        margin: 20px 0;
      }
      @media (max-width:899px) {
        padding: 15px 0;
        margin: 15px 0;
      }
    .social_lft {
      @media (max-width:599px) {
        width: 100%;
        margin-bottom: 10px;
      }
      p {
        margin: 0;
        color: ${primaryColors.black};
        font-size: 13px;
        margin-bottom: 4px;
       
      }
    }
  }
  .social_rgt {
    ul {
      display: flex;
      align-items: center;
      li {
        width: auto;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        a {
          transition: 0.4s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
  .quantity_field {
    border-radius: 60px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    max-height: 56px;
    max-width: 235px;
    @media (max-width:899px) {
      max-width: 150px;
      max-height: 40px;
    }
    @media (max-width:375px) {
      max-width: 110px;
      padding: 9px;
     
    }
  
    button {
      font-weight: 100;
      color: ${primaryColors.color353D4A};
      font-size: 40px;
      min-width: auto;
      padding: 0;
      &:hover {
        background-color: transparent;
      }
      @media (max-width:899px) {
        font-size:30px;
      }
     >button{
      svg{
        width: 11px;
        path{
          fill: rgba(0, 0, 0, 0.71);
        }
      }
     }
      
    }
    .form_control {
      input {
        text-align: center;
        border: 0;
        color: ${primaryColors.color353D4A};
      }
      .MuiOutlinedInput-notchedOutline {
        display: none;
      }
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }
    }
  }
  .quantity-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    
   
  }
  .cart_btn {
    min-width: 235px;
    margin-left: 10px;
    @media (max-width:899px) {
      min-width: 150px;
      max-height: 40px;
    }
    @media (max-width:375px) {
      min-width: 110px;
      padding: 9px;
    }
   
  }
  .qnty_outr {
    h4 {
      color: ${primaryColors.color353D4A};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: Roboto;
      letter-spacing: 0.32px;
      
    }
  }
`;
