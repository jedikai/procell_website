import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const CheckoutWrapper = styled(Box)`
  .delivery_options_wrap {
    .MuiFormControl-root {
      width: 100%;
    }
  }
  .delivery_option {
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: ${primaryColors.white};
    box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
    padding: 28px 21px;
    @media (max-width: 599px) {
      padding: 20px 15px;
    }

    h5 {
      font-family: Roboto;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;
      text-transform: capitalize;
      margin-bottom: 11px;
    }
    p {
      margin-top: 0;
      font-size: 13px;
      font-weight: 400;
    }
    :not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .billing_adress {
    padding-bottom: 50px;
    border-bottom: 1px solid ${primaryColors.border_primary};
    margin-bottom: 40px;
    @media (max-width: 599px) {
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .billing_adress_grid {
      margin-bottom: 32px;
      @media (max-width: 599px) {
        margin-bottom: 15px;
      }

      .MuiInputBase-root {
        input {
          @media (max-width: 599px) {
            font-size: 16px;
          }
        }
        textarea {
          @media (max-width: 599px) {
            height: 60px !important;
          }
        }
      }
    }
  }
  .form_header {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 40px;
    @media (max-width: 899px) {
      font-size: 25px;
      margin-bottom: 30px;
    }
    @media (max-width: 599px) {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
`;
