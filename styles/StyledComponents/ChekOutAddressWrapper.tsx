import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CheckOutAddressWrap = styled(Box)`
  .title_block {
    h4 {
      font-size: 25px;
      margin: 0 0 30px;
      font-weight: 400;
    }
  }
  .form_group {
    .form_group_inner {
      width: 49%;
      &.form_group_inner_full {
        width: 100%;
      }
      .profile_error {
        margin-bottom: 0;
      }
      @media (max-width: 1199px) {
        width: 100%;
        margin: 0 0 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .autocomplete_div {
      width: 100%;
      .MuiFormControl-root {
        .MuiInputBase-root {
          color: #070707;
          border-radius: 25px;
          padding: 12.5px 20px;
          border: 1px solid #e1e1e1;
          background: #fff;
          min-width: 100%;
          .MuiOutlinedInput-notchedOutline {
            display: none;
          }
          input {
            padding: 0;
            border: none;
            &::placeholder {
              color: ${primaryColors?.inputText};
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .form_submit {
    button {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
    @media (max-width: 599px) {
      button {
        width: 100%;
        &:not(:last-child) {
          margin-bottom: 15px;
          margin-right: 0;
        }
      }
    }
  }
`;
