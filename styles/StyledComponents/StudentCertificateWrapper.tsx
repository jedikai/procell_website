import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const StudentCertificateWrap = styled(Box)`
  .heading {
    font-size: 25px;
    margin: 0 0 30px;
    font-weight: 400;
    @media (max-width: 599px) {
      font-size: 20px;
      margin: 0 0 25px;
    }
  }

  .certificate_holder {
    .cert_main_image {
      border-radius: 10px;
      background: linear-gradient(
        117deg,
        rgba(84, 55, 149, 0.12) 0.74%,
        rgba(22, 166, 223, 0.12) 113.65%
      );
      padding: 30px;
      margin: 0 0 15px;
      text-align: center;
      img {
        max-width: 100%;
      }
    }

    .thumbs {
      display: flex;
      margin: 0 -7px;
      @media (max-width: 599px) {
        overflow: auto;
        padding-bottom: 10px;
        &::-webkit-scrollbar {
          width: 2px;
          height: 5px;
          background: #f9f9f9;
          border-radius: 12px;
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
        }

        &::-webkit-scrollbar-thumb {
          width: 6px;
          background: #329691;
          border-radius: 12px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: #329691;
        }
      }
      .image_box {
        width: 16.66%;
        padding: 0 7px;
        @media (max-width: 599px) {
          width: 33%;
          min-width: 33%;
        }
        button {
          width: 100%;
          min-width: auto;
          padding: 0;
          border-radius: 5px;
          padding: 10px 12px;
          border: 1px solid transparent;
          background: linear-gradient(
            117deg,
            rgba(84, 55, 149, 0.12) 0.74%,
            rgba(22, 166, 223, 0.12) 113.65%
          );

          &.active {
            border: 1px solid #16a6df;
          }
          @media (max-width: 599px) {
            padding: 5px;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
`;
