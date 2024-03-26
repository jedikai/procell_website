/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable mui-path-imports/mui-path-imports */
import assest from "@/json/assest";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { PaymentMethodsWrapper } from "@/styles/StyledComponents/PaymentMethodsWrapper";
import { Box } from "@mui/material";

import AuthorizedNet from "@/components/AuthorizedNet/AuthorizedNet";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import { useCreateCustomerProfile } from "@/hooks/react-qurey/query-hooks/authorizeNetQuery.hooks";
import {
  useAuthorizePayment,
  useCardDelete,
  useCardList,
  usePaymentTransaction
} from "@/hooks/react-qurey/query-hooks/cardQuery.hooks";
import { GET_CARD_LIST } from "@/hooks/react-qurey/query-keys/cardQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import validationText from "@/json/messages/validationText";
import { getCookie } from "@/lib/functions/storage.lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import { decryptData } from "common/functions/decryptCryptoToken";

type Inputs = {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
};
const validationSchema = yup.object().shape({
  cardName: yup.string().required(validationText.error.cardName),
  cardNumber: yup.string().required(validationText.error.cardNumber),
  expDate: yup.string().required(validationText.error.expDate),
  cvv: yup.string().required(validationText.error.cvv)
});
const cardsArray = [
  {
    // cardName: "Master card",
    cardImg: assest.mastercard,
    isSelected: true,
    cardImgWidth: 47,
    cardImgHeight: 37
  },
  {
    // cardName: "Visa card",
    cardImg: assest.visacard,
    isSelected: false,
    cardImgWidth: 70,
    cardImgHeight: 20
  },
  {
    // cardName: "American Express",
    cardImg: assest.AmericanExpress,
    isSelected: false,
    cardImgWidth: 84,
    cardImgHeight: 24
  },
  {
    // cardName: "Paypal",
    cardImg: assest.paypal,
    isSelected: false,
    cardImgWidth: 47,
    cardImgHeight: 40
  }
];
function PaymentMethods() {
  const queryClient = useQueryClient();
  // const clearInputs = useRef(false);
  const { toastSuccess, toastError } = useNotiStack();
  const [cardList, setCardList] = useState(cardsArray);
  const [clearInputs, setClearInputs] = useState(false);
  const [paymentTransactionInfo, setPaymentTransactionInfo] = useState<any>({});
  const [authorizedData, setAuthorizedData] = useState<any>({});
  const [cardSaveLoader, setCardSaveLoader] = useState(false);
  const [savedCards, setSavedCards] = useState<any>([
    // {
    //   cardName: "Bank of Baroda",
    //   cardNumber: "4242 4242 4242 4242",
    //   expDate: "06/24",
    //   cvv: "323",
    //   cardImg: "/assets/images/mastercard2.png",
    //   isSelected: true,
    //   cardImgWidth: 47,
    //   cardImgHeight: 37
    // }
  ]);
  const onSuccessCardList = (response: any) => {
    const {
      providers,
      tokens,
      reference_prefix,
      partner_id,
      access_token,
      transaction_route,
      landing_route
    } = response ?? {};
    const {
      encrypted_authorize_login,
      encrypted_authorize_client_key,
      id,
      state
    }: any = providers && providers?.length > 0 ? providers[0] : {};
    setAuthorizedData({
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
      id: id,
      state: state
    });
    setSavedCards(tokens && tokens?.length > 0 ? tokens : []);
    setPaymentTransactionInfo({
      reference_prefix,
      partner_id,
      access_token,
      transaction_route,
      landing_route
    });
  };
  const { mutate: createCustomerProfile } = useCreateCustomerProfile();
  const { mutate: paymentTransaction } = usePaymentTransaction();
  const { mutate: cardDelete } = useCardDelete();
  const { mutate: authorizePayment } = useAuthorizePayment();
  const {
    data: getCardListData,
    isLoading,
    refetch
  } = useCardList(onSuccessCardList);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const selectCardHandler = (data: string) => {
    let updatedCardList = cardList.map((_card) => {
      if (_card.cardImg == data) {
        return { ..._card, isSelected: true };
      }
      return { ..._card, isSelected: false };
    });
    setCardList(updatedCardList);
  };
  const onFormSubmit = (data: Inputs) => {
    console.log("onFormSubmit", {
      ...data,
      ...cardList.filter((_c) => _c.isSelected)[0]
    });
    setSavedCards([
      ...savedCards,
      { ...data, ...cardList.filter((_c) => _c.isSelected)[0] }
    ]);
  };
  const editCard = (cardDetails: any) => {
    const { cardName, cardNumber, expDate, cvv, cardImg } = cardDetails;
    selectCardHandler(cardImg);
    setValue("cardName", cardName);
    setValue("cardNumber", cardNumber);
    setValue("expDate", expDate);
    setValue("cvv", cvv);
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
        queryClient.invalidateQueries(GET_CARD_LIST);
      },
      onError: (error: any) => {
        toastError(error?.response?.data?.message ?? "Something went wrong.");
      }
    });

    // setSavedCards(
    //   savedCards.filter((_c: any) => _c?.cardNumber !== cardNumber)
    // );
  };
  const getToken = (data: any) => {
    setCardSaveLoader(true);
    const {
      token,
      cardNumber,
      year,
      month,
      cardZipCode,
      email,
      description,
      merchantCustomerId,
      name,
      transactionKey
    } = data ?? {};
    let savedEmail = "";
    const isUserLoggedIn =
      !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
    if (isUserLoggedIn) {
      let getUserDetails: any = {};
      if (!!localStorage.getItem("userDetails")) {
        getUserDetails = JSON.parse(localStorage.getItem("userDetails") ?? "");
      } else {
        if (getCookie("userDetails")) {
          try {
            getUserDetails = JSON.parse(getCookie("userDetails") ?? "");
          } catch (error) {
            console.error("Error parsing user details:", error);
          }
        }
      }
      savedEmail = !!getUserDetails ? getUserDetails?.email : "";
    }

    if (!!token?.dataValue) {
      const formData: FormData = new FormData();
      formData.append("partner_id", `${paymentTransactionInfo?.partner_id}`);
      formData.append(
        "access_token",
        `${paymentTransactionInfo?.access_token}`
      );
      formData.append("payment_option_id", `${authorizedData?.id}`);
      formData.append(
        "reference_prefix",
        `${paymentTransactionInfo?.reference_prefix}`
      );
      formData.append("flow", `direct`);
      formData.append("tokenization_requested", `True`);
      formData.append("is_validation", `True`);
      formData.append("card_zip", `${cardZipCode}`);
      formData.append(
        "landing_route",
        `/web/payment_method`
        // `${paymentTransactionInfo?.landing_route}`
      );
      // flow, tokenization_requested, is_validation, landing_route
      paymentTransaction(formData, {
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
          formData.append("opaque_data", JSON.stringify(token));
          // formData.append("opaque_data", JSON.stringify(token));

          const payload = {
            reference,
            partner_id,
            access_token,
            opaque_data: token
          };
          authorizePayment(formData, {
            onSuccess: (response: any) => {
              console.log("authorizePayment onSuccess", response);
              queryClient.invalidateQueries(GET_CARD_LIST);
              toastSuccess(response?.data?.message ?? "Card saved.");
              setCardSaveLoader(false);
              // clearInputs.current = true;
              setClearInputs(true);
            },
            onError: (error: any) => {
              console.log("authorizePayment onError", error);
              toastError(
                error?.response?.data?.message ?? "Something went wrong."
              );
              setCardSaveLoader(false);
              // clearInputs.current = true;
            }
          });
          // Payment provider deleted successfully.
          // toastSuccess(
          //   response?.data?.message ?? "Payment provider deleted successfully."
          // );
        },
        onError: (error: any) => {
          console.log(
            "paymentTransaction response err",
            error?.response?.data?.message
          );
          toastError(error?.response?.data?.message ?? "Something went wrong.");
          setCardSaveLoader(false);
        }
      });
    }
    console.log("getToken", data);
  };

  console.log("createCustomerProfile", savedCards);

  return (
    <Wrapper>
      <DashboardWrapper>
        {!isLoading ? (
          <Box className="cmn_box">
            <PaymentMethodsWrapper>
              <div className="card_area">
                <h2>Your saved cards</h2>
                <div className="grid-container-card">
                  {savedCards.map((_card: any, index: number) => (
                    <div className="saved_cards_newout">
                      <div className="saved_cards_outer" key={index + 1}>
                        <div className="saved_cards">
                          {/* <Image
                            className="cardtypeimg"
                            src={_card?.cardImg}
                            alt={"cardtype"}
                            width={_card?.cardImgWidth}
                            height={_card?.cardImgHeight}
                          /> */}
                          <div className="card_details">
                            <p>{_card?.display_name ?? ""}</p>
                            {/* <span>
                              {_card?.cardNumber ?? "4242 4242 4242 4242"}
                            </span> */}
                          </div>
                        </div>
                        <div
                          className="saved_card_delete_icon"
                          onClick={() => deleteCard(_card?.id)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <AuthorizedNet
                getToken={getToken}
                authorizedData={authorizedData}
                buttonloading={cardSaveLoader}
                clearInputs={clearInputs}
              />
            </PaymentMethodsWrapper>
          </Box>
        ) : (
          <ButtonLoaderSecondary />
        )}
      </DashboardWrapper>
    </Wrapper>
  );
}

export default PaymentMethods;
