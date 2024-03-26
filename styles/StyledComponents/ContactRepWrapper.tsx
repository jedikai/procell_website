import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ContactRepWrapper = styled(Box)`
    .main_heading{
        font-size: 25px;
        margin: 0 0 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid ${primaryColors.inputBorder};
        @media(max-width: 599px){
          font-size: 20px;
          margin: 0 0 25px;
        }
    }
`