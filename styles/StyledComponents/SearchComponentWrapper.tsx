/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const SearchComponentWrapper = styled(Box)`
  .search_wrapper {
    margin-bottom: 50px;
    h3 {
      color: ${primaryColors.black};
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
  .form_group {
    position: relative;
    .srch_btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    .MuiOutlinedInput-notchedOutline {
      display: none;
    }
    .MuiFormControl-root {
      width: 100%;
    }

    .MuiInputBase-root {
      background-color: ${primaryColors.colorF5F5F5};
      border: 0;
      border-radius: 0;
      padding: 12.5px 20px;
      input {
        background-color: transparent !important;

        padding: 0 !important;
        color: ${primaryColors.black};
        border: 0 !important;
      }
    }
  }
`;
