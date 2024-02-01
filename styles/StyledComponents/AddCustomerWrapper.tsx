import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const AddCustomerWrapper = styled(Box)`
    .main_heading{
        font-size: 25px;
        margin: 0 0 30px;
        @media(max-width : 899px){
          text-align: center;
        }
        @media(max-width: 599px){
          font-size: 20px;
          margin: 0 0 25px;
          
        }
    }

    .profile_avatar {
    width: 147px;
    height: 147px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 55px auto;
    position: relative;
    .editProfileWrap {
      position: absolute;
      bottom: 0;
      right: 0;
      input[type="file"] {
        position: absolute;
        appearance: none;
        left: 0;
        top: 0;
        font-size: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .editButnIcon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        min-width: auto;
        background: ${primaryColors.black};
        &:hover {
          opacity: 0.7;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0px;
      border-radius: 50%;
    }
    @media (max-width: 899px) {
      margin: 0 auto 25px auto;
    }
    @media (max-width: 399px) {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px auto;
    }
    }
    .btn_holder{
        margin-top: 40px;
        button{
          margin-right: 10px;
          &:last-child{
            margin-right: 0;
          }
        }
    }
`