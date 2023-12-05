import {
  useAuthorizePayment,
  useCardDelete
} from "@/hooks/react-qurey/query-hooks/cardQuery.hooks";
import { useProfileDetails } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import {
  useCheckoutPaymentTransaction,
  usePaymentCredAndData,
  usePaymentValidate,
  usePollingCard
} from "@/hooks/react-qurey/query-hooks/paymentQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import { PaymentCardWrapper } from "@/styles/StyledComponents/PaymentCardWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import ArrowRightIcon from "@/ui/Icons/ArrowRightIcon";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import { Checkbox } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import { decryptData } from "common/functions/decryptCryptoToken";
import React, { memo, useEffect, useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";
import CustomCardExpDate from "../CustomCardExpDate/CustomCardExpDate";
import { useRouter } from "next/router";
import PaymentProcessingModal from "./PaymentProcessingModal";

interface PaymentCardProps {
  subtotal: number | null | string;
  shipping: number | null | string;
  totalAmount?: number | null | string;
  loader?: boolean;
}
type BasicCardInfo = {
  cardZipCode: string;
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
  date: string;
};

const PaymentCardDetailsCard = ({
  subtotal,
  shipping,
  totalAmount,
  loader = false
}: PaymentCardProps) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const queryClient = useQueryClient();
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const [isNewCardAdded, setIsNewCardAdded] = useState(false);
  const [pollingEnable, setPollingEnable] = useState(false);
  const [refetchInterval, setRefetchInterval] = useState(3000);
  const [pollingApiCalledCount, setPollingApiCalledCount] = useState(0);
  const [paymentValidateEndpoint, setPaymentValidateEndpoint] = useState("");
  const [cardData, setCardData] = useState<BasicCardInfo>({
    cardZipCode: "",
    cardNumber: "",
    month: "",
    year: "",
    cardCode: "",
    date: ""
  });
  const [authorizationCred, setAuthorizationCred] = useState<any>({
    apiLoginID: "",
    clientKey: ""
  });
  const [paymentTransactionInfo, setPaymentTransactionInfo] = useState<any>({});
  const [cardListData, setCardListData] = useState<any>([]);
  const [verificationError, setVerificationError] = useState({
    cardNumber: "",
    date: "",
    cardCode: ""
  });
  const [verificationLoader, setVerificationLoader] = useState(false);
  const authData = {
    apiLoginID: authorizationCred?.apiLoginID,
    clientKey: authorizationCred?.clientKey
  };
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const { data } = useProfileDetails(
    () => {},
    () => {},
    true
  );

  const onSuccessCardList = (response: any) => {
    const {
      providers,
      tokens,
      reference_prefix,
      partner_id,
      access_token,
      transaction_route,
      landing_route,
      amount
    } = response ?? {};
    const {
      encrypted_authorize_login,
      encrypted_authorize_client_key,
      id
    }: any = providers && providers?.length > 0 ? providers[0] : {};
    if (!!encrypted_authorize_login && !!encrypted_authorize_client_key) {
      setAuthorizationCred({
        apiLoginID:
          decryptData(
            encrypted_authorize_login,
            process.env.NEXT_AUTHORIZATION_CRYPTO_SECRET_KEY ?? ""
          ) ?? "",
        clientKey:
          decryptData(
            encrypted_authorize_client_key,
            process.env.NEXT_AUTHORIZATION_CRYPTO_SECRET_KEY ?? ""
          ) ?? "",
        id: id
      });
      console.log(
        "show me decryption",
        decryptData(
          encrypted_authorize_login,
          process.env.NEXT_AUTHORIZATION_CRYPTO_SECRET_KEY ?? ""
        )
      );
    }
    if (tokens && tokens?.length > 0) {
      setCardListData(
        tokens?.map((_sc: any, index: number) => ({
          ..._sc,
          checked: index == 0 ? true : false
        }))
      );
    }
    setPaymentTransactionInfo({
      reference_prefix,
      partner_id,
      access_token,
      transaction_route,
      landing_route,
      amount
    });
  };
  const {
    data: getPaymentCredAndData,
    isLoading,
    refetch
  } = usePaymentCredAndData(onSuccessCardList, () => {}, false);

  const onSuccessPolingData = (response: any) => {
    const { message, data }: any = response ?? {};
    const { display_values_list } = data ?? {};
    if (!!data) {
      const { is_post_processed, state, landing_route, state_message } =
        display_values_list[0] ?? {};
      console.log("onSuccessPolingData response", display_values_list);
      if (`${state}`?.toLowerCase() == "done" && !!is_post_processed) {
        setPollingEnable(false);
        setPaymentValidateEndpoint(landing_route);
      } else if (
        ["error", "pending", "authorized"].includes(`${state}`?.toLowerCase())
      ) {
        setPollingEnable(false);
        if (`${state}`?.toLowerCase() == "error") {
          router.push(`/product/shop`);
        } else {
          setPaymentValidateEndpoint(landing_route);
        }
        // router.push(`/product/shop`)
        // toastError(state_message??'Something went wrong.')
      } else {
        if (pollingApiCalledCount >= 10 && pollingApiCalledCount < 20) {
          setRefetchInterval(10000);
        } else if (pollingApiCalledCount >= 20) {
          setRefetchInterval(30000);
        }
        setPollingApiCalledCount(pollingApiCalledCount + 1);
      }
    } else {
      setPollingEnable(false);
      toastError(message ?? "Something went wrong.");
      router.push(`/product/shop`);
    }

    // setPollingEnable(false);
    // setPaymentValidateEndpoint(landing_route);
  };
  const { data: pollingData } = usePollingCard(
    onSuccessPolingData,
    () => {},
    pollingEnable,
    refetchInterval
  );
  const onSuccessPaymentValidate = (response: any) => {
    console.log("onSuccessPaymentValidate scss", response ?? "onSuccess");
    router.push("/product/order-confirm");
  };
  const onErrorPaymentValidate = (error: any) => {
    console.log("onErrorPaymentValidate err", error ?? "onError");
  };
  const { data: paymentValidateData } = usePaymentValidate(
    paymentValidateEndpoint,
    onSuccessPaymentValidate,
    onErrorPaymentValidate,
    !!paymentValidateEndpoint
  );
  const { mutate: getCheckoutPaymentTransaction } =
    useCheckoutPaymentTransaction();
  const { mutate: authorizePayment } = useAuthorizePayment();
  const { mutate: cardDelete } = useCardDelete();

  const getUserGivenCarddetails = (e: any) => {
    let fieldName: string = e.target.name ?? "";
    let fieldValue: string = e.target.value ?? "";
    console.log("getUserGivenCarddetails", fieldName, fieldValue);
    if (fieldName == "cardCode" && fieldValue?.length > 4) {
      return false;
    }
    if (!!fieldName) {
      setCardData({ ...cardData, [fieldName]: fieldValue ?? "" });
    }
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

  const newCardAddedHandler = () => {
    let filterSavedCardList = cardListData?.map((_i: any) => ({
      ..._i,
      checked: false
    }));
    setCardListData(filterSavedCardList);
    setIsNewCardAdded(!isNewCardAdded);
  };
  const proceedPaymentHandler = () => {
    setVerificationLoader(true);
    let userSelectedCardInfo = cardListData?.filter(
      (_i: any) => _i?.checked == true
    );
    if (userSelectedCardInfo?.length > 0) {
      let payment_option_id = userSelectedCardInfo[0]?.id;
      proceedPaymentForSavedCard(payment_option_id);
    } else {
      proceedPayment();
    }
  };
  const proceedPayment = async () => {
    try {
      const response = await dispatchData({ cardData });
      console.log("Received response:", response);
      const { dataDescriptor, dataValue } = response?.opaqueData ?? {};
      const opaqueData = response?.opaqueData;
      let userSelectedCardInfo = cardListData?.filter(
        (_i: any) => _i?.checked == true
      );
      let getZipcode =
        userSelectedCardInfo && userSelectedCardInfo?.length > 0
          ? userSelectedCardInfo[0]?.zip_code
            ? userSelectedCardInfo[0]?.zip_code
            : ""
          : cardData?.cardZipCode;
      if (!!dataValue) {
        // console.log("getZipcode", getZipcode, userSelectedCardInfo);

        const formData: FormData = new FormData();
        formData.append("amount", `${paymentTransactionInfo?.amount}`);
        formData.append("currency_id", `${getPaymentCredAndData?.currency}`);
        formData.append("partner_id", `${paymentTransactionInfo?.partner_id}`);
        formData.append(
          "access_token",
          `${paymentTransactionInfo?.access_token}`
        );
        formData.append("payment_option_id", `${authorizationCred?.id}`);
        formData.append("flow", "direct");
        // formData.append(
        //   "flow",
        //   `${cardListData?.map((_i: any) => _i?.checked).includes(true)
        //     ? "token"
        //     : "direct"
        //   }`
        // );

        formData.append("tokenization_requested", `False`);
        formData.append("card_zip", `${cardData?.cardZipCode}`);
        formData.append("landing_route", `/web/payment/validate`);
        getCheckoutPaymentTransaction(
          {
            endPoint: getPaymentCredAndData?.transaction_route,
            body: formData
          },
          {
            onSuccess: (response: any) => {
              console.log("paymentTransaction response", response?.data?.data);
              const {
                provider_id,
                provider_code,
                reference,
                amount,
                currency_id,
                partner_id,
                access_token
              } = response?.data?.data ?? {};
              const formData: FormData = new FormData();
              formData.append("reference", `${reference}`);
              formData.append("partner_id", `${partner_id}`);
              formData.append("access_token", `${access_token}`);
              formData.append("opaque_data", JSON.stringify(opaqueData));
              authorizePayment(formData, {
                onSuccess: (response: any) => {
                  setVerificationLoader(false);
                  setCardData({
                    cardZipCode: "",
                    cardNumber: "",
                    month: "",
                    year: "",
                    cardCode: "",
                    date: ""
                  });
                  refetch();
                  console.log("authorizePayment response", response);
                  router.push("/product/order-confirm");
                },
                onError: (error: any) => {
                  setVerificationLoader(false);
                  toastError(
                    error?.response?.data?.message ?? "Something went wrong."
                  );
                }
              });
            },
            onError: (error: any) => {
              toastError(
                error?.response?.data?.message ?? "Something went wrong."
              );
              setVerificationLoader(false);
            }
          }
        );
      }
    } catch (error: any) {
      console.log("Received response: error", error);
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
        } else if (
          code == "E_WC_06" ||
          code == "E_WC_07" ||
          code == "E_WC_08"
        ) {
          errMsgs = {
            ...errMsgs,
            date: "Please provide valid expiration date."
          };
        } else if (code == "E_WC_15") {
          errMsgs = { ...errMsgs, cardCode: text };
        }
      });
      console.log("errMsgs", errMsgs, errorList);
      setVerificationError(errMsgs);
      setVerificationLoader(false);
      toastError("Card is Invalid.");
    }
  };
  const proceedPaymentForSavedCard = (payment_option_id: string | number) => {
    const formData: FormData = new FormData();
    formData.append("amount", `${paymentTransactionInfo?.amount}`);
    formData.append("currency_id", `${getPaymentCredAndData?.currency}`);
    formData.append("partner_id", `${paymentTransactionInfo?.partner_id}`);
    formData.append("access_token", `${paymentTransactionInfo?.access_token}`);
    formData.append("payment_option_id", `${payment_option_id}`);
    // formData.append("flow", "direct");
    formData.append("flow", `token`);

    formData.append("tokenization_requested", `False`);
    // formData.append("card_zip", `${cardData?.cardZipCode}`);
    formData.append("landing_route", `/web/payment/validate`);
    getCheckoutPaymentTransaction(
      {
        endPoint: getPaymentCredAndData?.transaction_route,
        body: formData
      },
      {
        onSuccess: (response: any) => {
          console.log(
            "paymentTransaction response saved card",
            response?.data?.data
          );
          setPollingEnable(true);
        },
        onError: (error: any) => {
          toastError(error?.response?.data?.message ?? "Something went wrong.");
          setVerificationLoader(false);
        }
      }
    );
  };
  const selectSaveCardHandler = (id: any, checked: boolean) => {
    let fiteredData: any = cardListData?.map((_i: any) => {
      if (_i?.id == id) {
        return { ..._i, checked };
      }
      return { ..._i, checked: false };
    });
    setCardListData(fiteredData);
    setIsNewCardAdded(!checked);
  };
  const deleteCard = (cardNumber: string | number) => {
    console.log("savedCards", cardNumber);
    const formData: FormData = new FormData();
    formData.append("token_id", `${cardNumber}`);
    cardDelete(formData, {
      onSuccess: (response) => {
        console.log("response", response);
        // Payment provider deleted successfully.
        toastSuccess(
          response?.data?.message ?? "Payment provider deleted successfully."
        );
        // queryClient.invalidateQueries(GET_PAYMENT_RELATED_CREDS_AND_DATAS);
        refetch();
      },
      onError: (error: any) => {
        toastError(error?.response?.data?.message ?? "Something went wrong.");
      }
    });

    // setSavedCards(
    //   savedCards.filter((_c: any) => _c?.cardNumber !== cardNumber)
    // );
  };
  useEffect(() => {
    if (!!shipping) {
      refetch();
    }
  }, [shipping]);

  console.log("cardData", pollingApiCalledCount, refetchInterval);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {shipping != null && (
        <PaymentCardWrapper>
          {!isLoading && cardListData && cardListData?.length > 0 ? (
            <Box className="card_area">
              <Typography variant="h3" className="short_head_card">
                Your saved cards
              </Typography>
              <Box className="grid-container-card">
                {cardListData?.map((_card: any, index: number) => (
                  <Box className="saved_cards_newout">
                    <Box className="saved_cards_outer new" key={index + 1}>
                      <Checkbox
                        {...label}
                        checked={_card?.checked}
                        onChange={(e: any) =>
                          selectSaveCardHandler(_card?.id, e.target.checked)
                        }
                        style={{ padding: "0px" }}
                      />
                      <Box className="saved_cards">
                        <Box className="card_details">
                          <Typography variant="body1">
                            {_card?.display_name ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        className="saved_card_delete_icon"
                        onClick={() => deleteCard(_card?.id)}
                      >
                        <DeleteIcon />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <ButtonLoaderSecondary />
          )}

          {isNewCardAdded ? (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="card_header"
              >
                <Typography variant="body1">Card details</Typography>
                {data && data?.length > 0 && data[0]?.image_1920_url && (
                  <img
                    src={data ? data[0]?.image_1920_url : assest?.avatr_img}
                    alt="avatar"
                    width={46}
                    height={46}
                    style={{ border: "0px", borderRadius: "50%" }}
                  />
                )}
              </Stack>
              <Box className="inputField_wrapper cardetails_fieldcmn">
                <InputFieldCommon
                  placeholder="Card zipcode"
                  name="cardZipCode"
                  value={cardData.cardZipCode}
                  onChange={getUserGivenCarddetails}
                />
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
                <Box className="datepicker_cmn_glbl">
                  <CustomCardExpDate
                    value={cardData.date}
                    getExpDate={getExpDate}
                  />
                  {verificationError?.date && (
                    <div className="profile_error">
                      {verificationError?.date}
                    </div>
                  )}
                </Box>
                <InputFieldCommon
                  placeholder="Card code"
                  name="cardCode"
                  value={cardData.cardCode}
                  onChange={getUserGivenCarddetails}
                />
                {verificationError?.cardCode && (
                  <div className="profile_error">
                    {verificationError?.cardCode}
                  </div>
                )}
              </Box>
            </>
          ) : !isLoading ? (
            <Typography
              variant="body1"
              style={{ color: "#16A6DF", cursor: "pointer" }}
              onClick={newCardAddedHandler}
            >
              payment with new card
            </Typography>
          ) : (
            <></>
          )}
          {!loader ? (
            <>
              <List className="bill_amount_ul">
                <ListItem>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">subtotal</Typography>
                    <Typography variant="caption">${subtotal}</Typography>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">shipping</Typography>
                    <Typography variant="caption">${shipping}</Typography>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Total ( tax incl.)</Typography>
                    {<Typography variant="caption">${totalAmount}</Typography>}
                  </Stack>
                </ListItem>
              </List>

              {/* {shipping && ( */}
              {verificationLoader ? (
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_btn"
                >
                  <ButtonLoader />
                </CustomButtonPrimary>
              ) : (
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_btn"
                  // href="/product/order-confirm"
                  // onClick={proceedPayment}
                  onClick={proceedPaymentHandler}
                >
                  <Typography variant="body1">${totalAmount}</Typography>
                  <Typography variant="body1">
                    Proceed <ArrowRightIcon />{" "}
                  </Typography>
                </CustomButtonPrimary>
              )}
              {/* )} */}
            </>
          ) : (
            <ButtonLoaderSecondary />
          )}
        </PaymentCardWrapper>
      )}
      <PaymentProcessingModal open={pollingEnable} />
    </>
  );
};

export default memo(PaymentCardDetailsCard);
