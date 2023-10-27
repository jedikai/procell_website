/* eslint-disable mui-path-imports/mui-path-imports */
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CardTypewrapper=styled(Box)`
.cardtypeCheckbox {
    position: relative;
    max-width: 165px;
    height: 102px;
    
   
   
    .check {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .cardtypeCheckboxWrap {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    border: 1px solid rgba(84, 55, 149, 0.08);
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
     
      .checkicon {
        position: absolute;
        top: 7px;
        right: 7px;
        line-height: 0;
        display: none;
      }
    }
  }
  .Mui-checked + .cardtypeCheckboxWrap .checkicon {
    display: block;
  }
  .Mui-checked + .cardtypeCheckboxWrap  {
    border: 1px solid #543795;
  }
    
`


