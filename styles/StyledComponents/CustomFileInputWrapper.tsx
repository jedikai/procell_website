import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CustomFileInputWrapper = styled(Box)`
text-align: center;
      border: 1px solid ${primaryColors.inputBorder};
      padding: 1.5rem;
      position: relative;
      cursor: pointer;
      border-radius: 10px;
      p{
        margin-bottom: 0 !important;
      }
    input{
        border: 0;
        padding: 0;
        display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;

    }
    .MuiInputBase-root{
        height: auto !important;
    }
    h3{
        font-size: 22px;
        margin-bottom: 5px !important;
    }
`