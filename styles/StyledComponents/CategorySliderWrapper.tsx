import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CategorySliderWrapper = styled(Box)`
.category_slider_wrapper{
  @media(max-width: 1199px){
    padding: 0 20px;
  }
    .slick-slide{
        padding: 0 15px;
    }
     .slick-arrow{
        width: 16px;
        height: 16px;
        display: inline-flex;
    
       &.slick-disabled{
        pointer-events: none;
       }
        z-index: 1;
        &:hover{
          background-color: transparent;
        }
        &:before{
         
          
        }
        &.slick-prev{
          
          left: -40px;
          @media(max-width: 1399px){
            left: -15px;
          }
          &:before{

            background: url("/assets/images/arrow_next_purple.svg") no-repeat center center;
            background-size: 100%;
            content: '';
            width: 16px;
            height: 16px;
            position: relative;
            display: block;
            transform: rotate(180deg);
          }
        }
        &.slick-next{
          
          
          right: -40px;
          @media(max-width: 1399px){
            right: -15px;
          }
          &:before{
          background: url("/assets/images/arrow_next_purple.svg") no-repeat center center;
          display: block;
          background-size: 100%;
          
          content: '';
          width: 16px;
            height: 16px;
           
          }
        }
      }
}
    
`
