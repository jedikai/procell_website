import assest from "@/json/assest";
import { PaymentCardWrapper } from "@/styles/StyledComponents/PaymentCardWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CardType from "@/ui/CustomCheckbox/CardType";
import ArrowRightIcon from "@/ui/Icons/ArrowRightIcon";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";
import { memo } from "react";
import { useProfileDetails } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import CustomCardExpDate from "../CustomCardExpDate/CustomCardExpDate";

interface PaymentCardProps {
  subtotal: number | null | string;
  shipping: number | null | string;
  totalAmount?: number | null | string;
  loader?: boolean;
}

const PaymentCardDetailsCard = ({
  subtotal,
  shipping,
  totalAmount,
  loader = false
}: PaymentCardProps) => {
  const { data, isLoading, refetch, isFetched } = useProfileDetails(
    () => { },
    () => { },
    true
  );
  return (
    <>
      {shipping != null && (
        <PaymentCardWrapper>
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
          {/* <Box className="cardtype">
            <Typography variant="body1">Card type</Typography>
            <Grid
              container
              columnSpacing={{ lg: 2.5, xs: 1 }}
              rowSpacing={{ sm: 0, xs: 2 }}
            >
              <Grid item lg={3} sm={3} xs={6}>
                <CardType
                  cardimg={assest.mastercard}
                  cardImgWidth={33}
                  cardImgHeight={21}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={6}>
                <CardType
                  cardimg={assest.visacard}
                  cardImgWidth={42}
                  cardImgHeight={12}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={6}>
                <CardType
                  cardimg={assest.AmericanExpress}
                  cardImgWidth={49}
                  cardImgHeight={14}
                />
              </Grid>
              <Grid item lg={3} sm={3} xs={6}>
                <CardType
                  cardimg={assest.paypal}
                  cardImgWidth={35}
                  cardImgHeight={30}
                />
              </Grid>
            </Grid>
          </Box> */}

          <Box className="inputField_wrapper">
            <InputFieldCommon placeholder="Card name"/>
            <InputFieldCommon placeholder="Card number" />
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
              className="expiry_date"
            >
              <CustomCardExpDate />
              {/* <InputFieldCommon placeholder="CVV" /> */}
            </Stack>
          </Box>
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
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                className="payment_btn"
                href="/product/order-confirm"
              >
                <Typography variant="body1">${totalAmount}</Typography>
                <Typography variant="body1">
                  Proceed <ArrowRightIcon />{" "}
                </Typography>
              </CustomButtonPrimary>
              {/* )} */}
            </>
          ) : (
            <ButtonLoaderSecondary />
          )}
        </PaymentCardWrapper>
      )}
    </>
  );
};

export default memo(PaymentCardDetailsCard);
