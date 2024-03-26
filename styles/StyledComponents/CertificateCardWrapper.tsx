import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CertificateCardWrapper = styled(Box)`
    &:not(:last-child){
            margin: 0 0 15px;
        }
    .certi_card{
        
        border-radius: 10px;
        border: 1px solid ${primaryColors.inputBorder};
        padding: 20px;
        @media(max-width: 1199px){
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: flex-start;
        }
        .ico{
            display: flex;
            width: 68px;
            height: 68px;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: rgba(84, 55, 149, 0.09);
            @media(max-width: 1199px){
                margin: 0 0 15px;
            }

        }
        .certi_middle{
            width: 50%;
            padding-left: 25px;
            @media(max-width: 1199px){
                padding-left: 0;
                width: 100%;
                margin: 0 0 15px;
            }
            .certi_chip{
                border-radius: 79px;
                background-color: rgba(22, 166, 223, 0.13);
                padding: 6px 16px;
                color: ${primaryColors.primary};
                font-size: 11px;
                font-weight: 500;
                height: auto !important;
                line-height: 1;
                .MuiChip-label{
                    padding: 0;
                }
            }
            .heading{
                color: ${primaryColors.black};
                font-size: 15px;
                font-weight: 500;
                text-transform: capitalize;
                margin: 5px 0 7px;
            }
            .date_length{
                p{
                    color: ${primaryColors.mainFontColor};
                    font-size: 13px;
                    font-weight: 400;
                    margin-bottom: 0;
                    .bold_txt{
                        vertical-align: baseline;
                        margin-left: 2px;
                        font-weight: 600;
                    }
                    &:not(:last-child){
                        margin-right: 20px;
                    }
                }
            }
        }

        .downloads_btn{
            margin-left: auto;
            @media(max-width: 1199px){
                margin-left: 0;
            }
        }
    }
`