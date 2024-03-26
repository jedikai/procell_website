import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";

export const ContactRepCardWrapper = styled(Stack)`
    &.cnt_card{
        .cnt_image{
            height: 100%;
            @media(max-width: 1199px){
                height: auto;
                width: 50%;
                margin: 0 auto 25px;
            }
            @media(max-width: 599px){
                width: 100%;
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }
        }
        .cnt_riight{
            height: 100%;
            border-radius: 10px;
            background: linear-gradient(117deg, rgba(84,55,149,.06) 0.74%, rgba(22,166,223,.06) 113.65%);
            padding: 50px 30px;
            @media(max-width: 599px){
                padding: 20px;
            }
            .cnt_top{
                border-bottom: 1px solid ${primaryColors.bordergray};
                padding-bottom: 24px;
                .heading{
                    color: ${primaryColors.primary};
                    font-size: 24px;
                    font-weight: 500;
                    margin: 0 0 10px;
                }
                .desg{
                    margin: 0;
                }
            }
            .cnt_btm{
                padding: 30px 0 0;
                .cnt_list{
                    li{
                        align-items: center;
                        @media(max-width : 599px){
                            flex-direction: column;
                        }
                        p{
                            display: flex;
                            align-items: center;
                            line-height: 1.1;
                            @media(max-width: 599px){
                                    
                                    font-size: 14px;
                                }
                            a{
                                line-height: 1.1;
                                display: inline-block;
                                vertical-align: middle;
                                color: ${primaryColors.black};
                                font-weight: 500;
                                font-size: 16px;
                                margin-left: 10px;
                              
                                &:hover{
                                    color: ${primaryColors.primary};
                                }
                            }
                        }
                        .icon{
                            margin-right: 12px;
                            line-height: 0;
                            font-size: 0;
                            @media(max-width: 599px){
                                margin: 0 0 15px;
                            }
                        }
                        &:not(:last-child){
                            margin-bottom: 25px;
                        }
                    }
                }
            }
        }
    }
`