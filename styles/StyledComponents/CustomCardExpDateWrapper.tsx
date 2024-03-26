import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CustomCardExpDateWrapper = styled(Box)`
    width: 100%;
    
    .MuiFormControl-root {
    width: 100%;
    .MuiInputBase-root {
        height: auto;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 400;
        color: var(--white);
        border-radius: 10px;
        padding: 6.5px 20px;
        border: 1px solid #E1E1E1;
        background: #fff;
        min-width: 100%;
        box-shadow: none;
        @media (max-width: 600px) {
        padding: 5px 10px;
    }

        input{
            padding: 0;
            border: 0;
            color: ${primaryColors.cardShadow};

            /* &:focus{
            color: ${primaryColors.cardShadow};

            } */
        }

        fieldset{
            display: none;
        }
    }
}
`