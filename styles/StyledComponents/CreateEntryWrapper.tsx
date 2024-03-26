import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CreateEntryWrapper = styled(Box)`
    .main_heading{
        font-size: 25px;
        margin: 0 0 30px;
        
        @media(max-width: 599px){
          font-size: 20px;
          margin: 0 0 25px;
        }
    }



    .edit_date_row{
        padding: 12px;
        border-radius: 10px;
        background-color: ${primaryColors.colorF3FAFD};
        margin: 0 0 30px;
        button{
            padding: 16px 19px;
            min-width: 140px;
            @media(max-width: 599px){
                    padding: 12px 16px;
                    min-width: auto;
                    font-size: 14px;
            }
        }
        .date{
            margin: 0;
                    display: flex;
                    align-items: center;
                    color: ${primaryColors.primary};
                    font-size: 16px;
                    font-weight: 500;
                    .ico{
                        margin: 0 6px 0 0;
                        line-height: 1;
                    }
                }
    }

    .new_entries_sec{
        .image_box{
            padding: 8px 11px;
            border-radius: 10px;
            border: 1px solid ${primaryColors.inputBorder};
            height: 100%;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .add_input{
            height: 100%;
            .add_image{
                height: 100%;
                @media(max-width: 1199px){
                    padding: 20px;
                }
                
            }
        }
    }

    .btn_holder{
        margin-top: 30px;
    }
`