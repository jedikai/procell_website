/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable mui-path-imports/mui-path-imports */
import CardType from "@/ui/CustomCheckbox/CardType";
import assest from "@/json/assest";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { PaymentMethodsWrapper } from "@/styles/StyledComponents/PaymentMethodsWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Grid, Typography } from "@mui/material";

import React, { useState } from "react";
import validationText from "@/json/messages/validationText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

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
  const [cardList, setCardList] = useState(cardsArray);
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [savedCards, setSavedCards] = useState<any>([
    {
      cardName: "Bank of Baroda",
      cardNumber: "4242 4242 4242 4242",
      expDate: "06/24",
      cvv: "323",
      cardImg: "/assets/images/mastercard2.png",
      isSelected: true,
      cardImgWidth: 47,
      cardImgHeight: 37
    }
  ]);
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
  const deleteCard = (cardNumber: string) => {
    console.log("savedCards", cardNumber);
    setSavedCards(
      savedCards.filter((_c: any) => _c?.cardNumber !== cardNumber)
    );
  };
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <PaymentMethodsWrapper>
            <div className="card_area">
              <h2>Your saved cards</h2>
              <div className="grid-container">
                {savedCards.map((_card: any) => (
                  <div className="saved_cards_outer">
                    <div className="saved_cards">
                      <Image
                        className="cardtypeimg"
                        src={_card?.cardImg}
                        alt={"cardtype"}
                        width={_card?.cardImgWidth}
                        height={_card?.cardImgHeight}
                      />
                      <div className="card_details">
                        <p>{_card?.cardName ?? "Bank of Baroda"}</p>
                        <span>
                          {_card?.cardNumber ?? "4242 4242 4242 4242"}
                        </span>
                      </div>
                    </div>
                    <div className="tooltip">
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 29.96 122.88"
                        fill="black"
                        height="20px"
                        width="20px"
                        // {...props}
                      >
                        <defs>
                          <style>{".cls-1{fill-rule:evenodd;}"}</style>
                        </defs>
                        <title>{"3-vertical-dots"}</title>
                        <path
                          className="cls-1"
                          d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"
                        />
                      </svg>
                      <div className="tooltiptext">
                        <span onClick={() => editCard(_card)}>Edit</span>
                        <span onClick={() => deleteCard(_card?.cardNumber)}>
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Box className="cardtype">
                <Typography variant="h4">Card type</Typography>
                <Grid container columnSpacing={2.5} rowSpacing={2.5}>
                  {cardList.map((_card, idx) => (
                    <Grid item sm={3} xs={6} key={idx + 1}>
                      <CardType
                        cardimg={_card?.cardImg ?? ""}
                        cardImgWidth={_card?.cardImgWidth}
                        cardImgHeight={_card?.cardImgHeight}
                        isSelected={_card?.isSelected}
                        click={selectCardHandler}
                      />
                    </Grid>
                  ))}
                  {/* <Grid item sm={3} xs={6}>
                    <CardType
                      cardimg={assest.visacard}
                      cardImgWidth={70}
                      cardImgHeight={20}
                    />
                  </Grid>
                  <Grid item sm={3} xs={6}>
                    <CardType
                      cardimg={assest.AmericanExpress}
                      cardImgWidth={84}
                      cardImgHeight={24}
                    />
                  </Grid>
                  <Grid item sm={3} xs={6}>
                    <CardType
                      cardimg={assest.paypal}
                      cardImgWidth={47}
                      cardImgHeight={40}
                    />
                  </Grid> */}
                </Grid>
              </Box>

              <Box className="cardDetails">
                <Typography variant="h4">Card details</Typography>
                <Grid container columnSpacing={2} rowSpacing={2.2}>
                  <Grid item lg={6} xs={12}>
                    <InputFieldCommon
                      placeholder="Card name"
                      {...register("cardName")}
                    />
                    {errors.cardName && (
                      <div className="profile_error">
                        {errors.cardName.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <InputFieldCommon
                      placeholder="Card number"
                      {...register("cardNumber")}
                    />
                    {errors.cardNumber && (
                      <div className="profile_error">
                        {errors.cardNumber.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <InputFieldCommon
                      placeholder="Expiry date"
                      {...register("expDate")}
                      value={expiryDate}
                      onChange={(e) => {
                        if (e.target.value.length <= 5) {
                          console.log(e.target.value);
                          let data=e.target.value
                          if(data?.length==2){
                            data=data+'/'
                          }
                          setExpiryDate(data)
                          // setCvv(e.target.value);
                          return false;
                        }
                      }}
                    />
                    {errors.expDate && (
                      <div className="profile_error">
                        {errors.expDate.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <InputFieldCommon
                      placeholder="CVV"
                      value={cvv}
                      {...register("cvv")}
                      onChange={(e) => {
                        if (e.target.value.length <= 3) {
                          console.log(e.target.value);
                          setCvv(e.target.value);
                          return false;
                        }
                      }}
                    />
                    {errors.cvv && (
                      <div className="profile_error">{errors.cvv.message}</div>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box className="paymentSubmitBtn">
                <CustomButtonPrimary
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <Typography variant="caption">Save payment method</Typography>
                </CustomButtonPrimary>
              </Box>
            </form>
          </PaymentMethodsWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default PaymentMethods;
