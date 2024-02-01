import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const ContactWrapper = styled(Box)`
  position: relative;
  .blue_leaf {
    position: absolute;
    left: 10%;
    top: 50px;
    pointer-events: none;
    z-index: 4;
    @media (max-width: 1299px) {
      left: 3%;
      width: 100px;
      top: calc(100% - 85%);
    }
    @media (max-width: 899px) {
      display: none;
    }
  }
  .pink_leaf {
    position: absolute;
    right: 10%;
    top: 100px;
    pointer-events: none;
    z-index: 2;
    @media (max-width: 1299px) {
      right: 3%;
      width: 100px;
    }
    @media (max-width: 899px) {
      display: none;
    }
  }
  .small_pink_leaf {
    position: absolute;
    left: 38%;
    top: 250px;
    pointer-events: none;
    z-index: 4;
    max-width: 30px;
    @media (max-width: 1199px) {
      top: calc(100% - 80%);
    }
    @media (max-width: 899px) {
      display: none;
    }
  }
  .contact_sec {
    .autocomplete_wrap {
      display: flex;
      .phn_code {
      }
      .phn_num {
        width: 100%;
        margin-left: 10px;
      }
    }
    figure {
      margin-left: -280px;
      position: relative;
      line-height: 0;
      z-index: 1;

      @media (max-width: 1399px) {
        margin-left: -198px;
        width: 51vw;
      }
      @media (max-width: 1199px) {
        margin-left: -159px;
        width: 54vw;
      }
      @media (max-width: 899px) {
        margin-left: 0px;
      }
      @media (max-width: 599px) {
        margin: 0 auto;
      }

      &::after {
        content: "";
        width: 100%;
        height: 30%;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 94%,
          rgba(255, 255, 255, 1) 100%
        );
        position: absolute;
        left: 0;
        bottom: -10px;
        z-index: 9;
      }
    }
  }
  .sec_title {
    margin-bottom: 30px;
    h4 {
      margin-bottom: 25px;
      @media (max-width: 1199px) {
        font-size: 30px;
        margin-bottom: 15px;
      }
      @media (max-width: 899px) {
        font-size: 24px;
      }
    }
    h5 {
      display: flex;
      align-items: center;
      color: ${primaryColors?.text_purple};
      text-align: right;
      font-family: Roboto;
      font-size: 15px;
      font-weight: 600;
      svg {
        margin-right: 10px;
      }
      a {
        display: inline-block;
        color: ${primaryColors?.footer_text};
        font-size: 15px;
        font-weight: 600;
        margin-left: 15px;
        &:hover {
          color: ${primaryColors?.primary};
        }
      }
    }
  }
  .contact_form {
    .form_group {
      .MuiFormControl-root {
        .MuiInputBase-root {
          height: 50px;
          @media (max-width: 1199px) {
            height: 45px;
          }
          input {
            padding: 0;
            border: 0;
          }
          textarea {
            padding: 0 !important;
          }
        }
      }
    }
  }
  .contact_form {
    position: relative;
    z-index: 2;
    .space_between {
      gap: 0;
      flex-wrap: wrap;
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
          margin: 0 0 15px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .form_group {
      .autocomplete_div {
        width: 100%;
        .MuiFormControl-root {
          .MuiInputBase-root {
            color: #070707;
            border-radius: 10px;
            padding: 6.5px 20px;
            border: 1px solid #e1e1e1;
            background: #fff;
            min-width: 100%;
            .MuiOutlinedInput-notchedOutline {
              display: none;
            }
            input {
              &::placeholder {
                color: ${primaryColors?.inputText};
                opacity: 1;
              }
            }
          }
        }
      }
      .MuiFormControl-root {
        .MuiInputBase-root {
          height: 50px;
          @media (max-width: 1199px) {
            height: 45px;
          }
          input {
            padding: 0;
            border: 0;
          }
          textarea {
            padding: 0 !important;
          }
        }
      }
    }
  }

  .contact_form {
    .MuiFormControl-root {
      .MuiInputBase-root {
        textarea {
          padding-left: 0 !important;
        }
      }
    }
  }
  .form_group_textarea {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .option_sec {
    margin: 25px 0;
  }
  .form_btm_sec {
    > button {
      margin-bottom: 19px;
    }
    > p {
      font-size: 14px;
      font-style: italic;
      a {
        color: ${primaryColors?.primary};
        &:hover {
          color: ${primaryColors?.black};
        }
      }
    }
  }
`;
