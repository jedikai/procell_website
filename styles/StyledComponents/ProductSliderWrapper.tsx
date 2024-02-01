/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ProductSliderWrapper = styled(Box)`
  height: 100%;
  .productSliderbox {
    padding: 28px 28px 32px 28px;
    background-color: ${primaryColors.sliderBackColor};
    text-align: center;
    border-radius: 10px;
    height: 100%;
    min-height: 420px;
    @media (max-width: 1199px) {
      padding: 25px 28px 32px 28px;
    }
    @media (max-width: 1199px) {
      padding: 20px 15px;
    }

    figure {
      height: 231px;
      margin-bottom: 23px;
      font-size: 0;
      line-height: 0;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
    }
    .slidertitletext {
      padding-top: 23px;
      border-top: 1px solid ${primaryColors.borderColor};

      h4 {
        color: ${primaryColors.black};
        font-size: 16px;
        font-weight: 600;
        line-height: 1.3;
        text-transform: capitalize;
        font-family: Roboto;
        margin-bottom: 10px;
        transition: all 0.4s;

        &:hover {
          color: ${primaryColors.primary};
        }
      }
    }
    .quantity_field {
      margin-top: 20px;
    border-radius: 60px;
    max-width: 70% !important;
    margin: 20px auto 0;
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

    .MuiInputBase-root{
      border: none;
      background-color: transparent;
      text-align: center;
      min-width: auto;
    }

    input{
      text-align: center;
      padding: 0;
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
  }
`;
