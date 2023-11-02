import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";

export const PaymentCardWrapper = styled(Card)`
  width: 100%;
  box-shadow: none;
  border-radius: 10px;
  padding: 32px 26px;
  background: linear-gradient(
    135deg,
    rgba(84, 55, 149, 0.06) 0%,
    rgba(84, 55, 149, 0.06) 6%,
    rgba(22, 166, 223, 0.06) 83%,
    rgba(22, 166, 223, 0.06) 100%
  );
  @media (max-width: 599px) {
    padding: 20px 10px;
  }

  .card_header {
    padding: 12px;
    border-bottom: 1px solid ${primaryColors.border_primary};
    margin-bottom: 24px;
    @media (max-width: 599px) {
      padding: 10px 0;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 0;
      font-size: 18px;
      font-weight: 700;
      color: ${primaryColors.black};
    }
  }
  .cardtypeCheckbox {
    height: 82px !important;
    @media (max-width: 375px) {
      height: 60px !important;
    }
  }
  .cardtype {
    margin-bottom: 27px;
    @media (max-width: 599px) {
      margin-bottom: 20px;
    }
    p {
      color: ${primaryColors.black};
      font-size: 16px;
      font-weight: 400;
      text-transform: capitalize;

      margin-bottom: 17px;
      @media (max-width: 599px) {
        margin-bottom: 10px;
      }
    }
  }
  .inputField_wrapper {
    padding-bottom: 27px;
    border-bottom: 1px solid ${primaryColors.border_primary};
    margin-bottom: 24px;
    @media (max-width: 599px) {
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
    @media (max-width: 599px) {
      padding-bottom: 20px;
      margin-bottom: 15px;
    }
    .MuiFormControl-root {
      :not(:last-child) {
        margin-bottom: 15px;
      }
      .MuiInputBase-adornedEnd {
        background: transparent;
        min-width: auto !important;
      }
    }
  }
  .expiry_date {
    .MuiFormControl-root {
      background: transparent;
      .MuiInputBase-adornedEnd {
        min-width: auto !important;
      }
    }
  }

  .bill_amount_ul {
    margin-bottom: 36px;
    @media (max-width: 599px) {
      margin-bottom: 20px;
    }
    li {
      .MuiStack-root {
        width: 100%;
        p {
          margin-bottom: 18px;
          text-transform: capitalize;
          color: ${primaryColors.black};
          font-size: 14px;
          font-weight: 400;
        }
        span {
          color: ${primaryColors.black};
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }

  .payment_btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .payment_bill_btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
