import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ResourceCardWapper = styled(Box)`
    &.resource_card{
        border-radius: 10px;
        background-color: ${primaryColors.white};
        box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.10);
        padding: 30px 25px;
        .heading{
            color: ${primaryColors.black};
            font-size: 22px;
            font-weight: 500;
            margin: 0 0 20px;
        }
        .resorce_btm{
            margin-top: 50px;
            border-radius: 10px;
            background: linear-gradient(117deg, rgba(84, 55, 149, .12) 0.74%, rgba(22, 166, 223, .12) 113.65%);
            
            padding: 16px;
            .left{
                @media(max-width: 599px){
                    margin-bottom: 15px;
                }
                .btm_main_text{
                    color: ${primaryColors.text_purple};
                    font-size: 20px;
                    font-weight: 500;
                    margin: 0 0 5px;
                }
            }
        }
    }
`