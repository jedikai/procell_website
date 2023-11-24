import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useEffect, useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import CustomCardExpDate from "../CustomCardExpDate/CustomCardExpDate";
import useNotiStack from "@/hooks/useNotistack";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { useAppSelector } from "@/hooks/useAppSelector";

// const authData = {
//   apiLoginID: process.env.NEXT_AUTHORIZATION_LOGIN_ID ?? "",
//   clientKey: process.env.NEXT_AUTHORIZATION_CLIENT_KEY ?? ""
// };

type BasicCardInfo = {
  cardZipCode: string;
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
  date: string;
};

const AuthorizedNet = ({
  getToken = () => {},
  authorizedData = {},
  buttonloading = false,
  clearInputs = false
}: any) => {
  console.log("AuthorizedNet loading", buttonloading);

  const { AuthorizedNetCred } = useAppSelector((s) => s.userProfileImgSlice);
  // const authData = {
  //   apiLoginID: AuthorizedNetCred?.login_id ?? '7V22xWuL',
  //   clientKey: AuthorizedNetCred?.client_key ?? '4S5Pw37LKgmHY4WpTs2G3xT2swRN25qMY34cbsfMQZqCg6q822c7GERfn3RaW4Bd'
  // };
  const authData = {
    apiLoginID: authorizedData?.authorize_login,
    clientKey: authorizedData?.authorize_client_key
  };
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = React.useState<BasicCardInfo>({
    cardZipCode: "",
    cardNumber: "",
    month: "",
    year: "",
    cardCode: "",
    date: ""
    // cardNumber: "370000000000002",
    // month: "12",
    // year: "2025",
    // cardCode: "1234"
  });
  const [verificationError, setVerificationError] = useState({
    cardNumber: "",
    date: "",
    cardCode: ""
  });
  const [verificationLoader, setVerificationLoader] = useState(false);

  const getUserGivenCarddetails = (e: any) => {
    let fieldName: string = e.target.name ?? "";
    let fieldValue: string = e.target.value ?? "";
    console.log("getUserGivenCarddetails", fieldName, fieldValue);
    if (!!fieldName) {
      setCardData({ ...cardData, [fieldName]: fieldValue ?? "" });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setVerificationLoader(true);
    // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
    try {
      const response = await dispatchData({ cardData });
      getToken({
        token: response?.opaqueData ?? {},
        ...cardData,
        name: authData?.apiLoginID,
        transactionKey: "635FzCZUhfpS9927"
      });
      console.log("Received response:", response);
      setVerificationLoader(false);
      setVerificationError({
        cardNumber: "",
        date: "",
        cardCode: ""
      });
    } catch (error: any) {
      console.log("Received response: error", error?.messages?.message);
      let errorList = error?.messages?.message ?? [];
      let errMsgs = {
        cardNumber: "",
        date: "",
        cardCode: ""
      };
      errorList.map((_err: any) => {
        let { code, text } = _err ?? {};
        if (code == "E_WC_05") {
          errMsgs = { ...errMsgs, cardNumber: text };
        } else if (code == "E_WC_06" || code == "E_WC_07") {
          errMsgs = {
            ...errMsgs,
            date: "Please provide valid expiration date."
          };
        } else if (code == "E_WC_15") {
          errMsgs = { ...errMsgs, cardCode: text };
        }
      });
      // console.log("errMsgs", errMsgs, errorList,);
      setVerificationError(errMsgs);

      setVerificationLoader(false);
    }
    // const response = await dispatchData({ cardData });
    // getToken(response?.opaqueData?.dataValue ?? "");
  };
  const getExpDate = (data: any) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (!!date) {
      setCardData({
        ...cardData,
        year: `${year}`,
        month: `${month}`,
        date: data
      });
    }
    console.log("getExpDate", year, month, date);
  };

  useEffect(() => {
    if (clearInputs) {
      setCardData({
        cardZipCode: "",
        cardNumber: "",
        month: "",
        year: "",
        cardCode: "",
        date: ""
      });
    }
  }, [clearInputs]);

  return (
    <form onSubmit={handleSubmit}>
      <Box className="cardDetails">
        <Typography variant="h4">Card details</Typography>
        <Grid container columnSpacing={2} rowSpacing={2.2}>
          <Grid item lg={6} xs={12}>
            <InputFieldCommon
              placeholder="Card holder name"
              name="cardZipCode"
              value={cardData.cardZipCode}
              onChange={getUserGivenCarddetails}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <InputFieldCommon
              placeholder="Card number"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={getUserGivenCarddetails}
            />
            {verificationError?.cardNumber && (
              <div className="profile_error">
                {verificationError?.cardNumber}
              </div>
            )}
          </Grid>
          <Grid item lg={6} xs={12}>
            <CustomCardExpDate value={cardData.date} getExpDate={getExpDate} />
            {verificationError?.date && (
              <div className="profile_error">{verificationError?.date}</div>
            )}
          </Grid>
          <Grid item lg={6} xs={12}>
            <InputFieldCommon
              placeholder="CVV"
              name="cardCode"
              value={cardData.cardCode}
              onChange={getUserGivenCarddetails}
            />
            {verificationError?.cardCode && (
              <div className="profile_error">{verificationError?.cardCode}</div>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box className="paymentSubmitBtn">
        {buttonloading || verificationLoader ? (
          <CustomButtonPrimary variant="contained" color="primary">
            <ButtonLoader />
          </CustomButtonPrimary>
        ) : (
          <CustomButtonPrimary
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !(
                !!cardData.cardZipCode &&
                !!cardData.cardNumber &&
                !!cardData.month &&
                !!cardData.year &&
                !!cardData.cardCode
              )
            }
          >
            <Typography variant="caption">Save payment method</Typography>
          </CustomButtonPrimary>
        )}
      </Box>
    </form>
  );
};

export default memo(AuthorizedNet);
