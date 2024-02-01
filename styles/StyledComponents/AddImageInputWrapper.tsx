import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const AddImageInputWrapper = styled(Box)`
    position: relative;
    input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    .add_image{
        background-color: transparent;
        min-width: auto;
            padding: 100px 85px;
            border: 1px solid ${primaryColors.primary};
            background: rgba(22, 166, 223, 0.05);
            border-radius: 10px;
             .ico{
            margin: 0 0 15px;
            @media(max-width: 1199px){
                margin: 0 0 5px;
            }
            svg{
                @media(max-width: 599px){
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .text{
            color: ${primaryColors.primary};
            font-size: 20px;
            font-weight: 500;
            margin: 0;
            @media(max-width: 1199px){
                font-size: 14px;
            }
        }
        }
`