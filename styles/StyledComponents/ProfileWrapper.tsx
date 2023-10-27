import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ProfileWrapper = styled(Box)`
  .autocomplete_div {
    width: 100%;
    .MuiFormControl-root {
      .MuiInputBase-root {
        color: #070707;
        border-radius: 10px;
        padding: 3.5px 20px;
        border: 1px solid #e1e1e1;
        background: #fff;
        min-width: 100%;
        @media (max-width: 600px) {
          padding: 3.5px 10px;
        }
        .MuiOutlinedInput-notchedOutline {
          display: none;
        }
        input {
          border: none;
          padding-left: 0;
          &::placeholder {
            color: ${primaryColors?.inputText};
            opacity: 1;
          }
        }
      }
    }
  }
  .profile_avatar {
    width: 147px;
    height: 147px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 55px auto;
    position: relative;
    .editProfileWrap {
      position: absolute;
      bottom: 0;
      right: 0;
      input[type="file"] {
        position: absolute;
        appearance: none;
        left: 0;
        top: 0;
        font-size: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      .editButnIcon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        min-width: auto;
        background: ${primaryColors.black};
        &:hover {
          opacity: 0.7;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0px;
      border-radius: 50%;
    }
    @media (max-width: 899px) {
      margin: 0 auto 25px auto;
    }
    @media (max-width: 399px) {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px auto;
    }
  }
  .btn_stack {
    justify-content: center;
    margin-top: 45px;
    button {
      &:not(:last-child) {
        margin-right: 14px;
      }
      @media (max-width: 499px) {
        width: 100%;
        &:not(:last-child) {
          margin-right: 0px;
          margin-bottom: 10px;
        }
      }
      span {
        color: ${primaryColors.white};
        font-family: Roboto;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.7;
      }
      &.gradient_btn {
        span {
          color: ${primaryColors.black};
          font-family: Roboto;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.7;
        }
      }
    }
  }
`;
