import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";

export const NewEntryCardWrapper = styled(Stack)`
    padding: 100px 85px;
    border: 1px solid ${primaryColors.primary};
    background: rgba(22, 166, 223, 0.05);
    border-radius: 10px;
    button{
        padding: 0;
        min-width: auto;
        background-color: transparent !important;
        flex-direction: column;
        .ico{
            margin: 0 0 15px;
            @media(max-width: 1199px){
                margin: 0 0 5px;
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
