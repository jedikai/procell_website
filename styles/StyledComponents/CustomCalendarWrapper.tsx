import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CustomCalendarWrapper = styled(Box)`
&.custom_calendar{
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${primaryColors.primary};
    }
    .calendar_top{
        padding: 12px 15px;
        border-radius: 10px 10px 0 0;
        background-color: ${primaryColors.colorF3FAFD};
        @media(max-width: 599px){
            justify-content: center;
        }
        .left{
            margin: 0 5px 0 0;
            color: ${primaryColors.primary};
            font-weight: 700;
            font-size: 16px;
            @media(max-width: 599px){
                margin-bottom: 10px;
            }
        }

        .calendar_control{
            border-radius: 4px;
            border: 1px solid ${primaryColors.primary};
            padding: 4px 15px;
            .select_holder{
                &:not(:last-child){
                    margin-right: 15px;
                }
            }
            .MuiOutlinedInput-notchedOutline{
                display: none;
            }

            .MuiInputBase-root{
                .MuiSelect-select{
                padding: 0 20px 0 0;
                border: none;
                position: relative;
                color: ${primaryColors.primary};
                font-size: 14px;
                font-weight: 700;
               
            }

            svg{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0;
                    pointer-events: none;
                }
            }
            
        }
    }
    .react-calendar{
        .react-calendar__month-view__weekdays__weekday{
            color: ${primaryColors.color1F1F1F};
            font-size: 12px;
            font-weight: 600;
            padding: 20px 30px;
            border-bottom: 1px solid ${primaryColors.colorF0F0F0};
            @media(max-width: 899px){
                padding: 5px;
                text-align: center;
            }
            &:not(:last-child){
                border-right: 1px solid ${primaryColors.colorF0F0F0};
            }
            abbr{
                text-decoration: inherit;
            }
        }

        .react-calendar__month-view__days{
            button{
                background-color: transparent;
                outline: none !important;
                font-size: 14px;
            font-weight: 500;
            padding: 20px 30px;
            border-bottom: 1px solid ${primaryColors.colorF0F0F0};
            border-top: none;
            border-right: 1px solid ${primaryColors.colorF0F0F0};
            border-left: none;
            cursor: pointer;
            @media(max-width: 899px){
                padding: 5px;
                text-align: center;
            }
            &.react-calendar__month-view__days__day--neighboringMonth{
                pointer-events: none;
                abbr{
                    display: none;
                    
                }
            }
            &.react-calendar__tile--active{
                background-color: ${primaryColors.colorF3FAFD};
                color: ${primaryColors.primary};
            }
            }
        }
    }
`