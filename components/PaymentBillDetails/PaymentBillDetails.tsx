import assest from "@/json/assest";
import { PaymentCardWrapper } from "@/styles/StyledComponents/PaymentCardWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CardType from "@/ui/CustomCheckbox/CardType";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ArrowRightIcon from "@/ui/Icons/ArrowRightIcon";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

interface PaymentCardProps {
  subtotal: number | null | string;
  shipping: number | null | string;
  totalAmount?: number | null | string;
  loader?: boolean;
}

const PaymentBillDetails = ({
  subtotal,
  shipping,
  totalAmount,
  loader = false
}: PaymentCardProps) => {
  const router = useRouter();
  const redirectionHandler = () => {
    router.push("/product/checkout/");
  };
  return (
    <>
      <PaymentCardWrapper>
        <>
          <List className="bill_amount_ul">
            <ListItem>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">subtotal</Typography>
                <Typography variant="caption">${subtotal}</Typography>
              </Stack>
            </ListItem>
            {/* <ListItem>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">shipping</Typography>
                <Typography variant="caption">${shipping}</Typography>
              </Stack>
            </ListItem> */}
            <ListItem>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">Total ( tax excl.)</Typography>
                {<Typography variant="caption">${totalAmount}</Typography>}
              </Stack>
            </ListItem>
          </List>

          {/* {shipping && ( */}
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            className="payment_bill_btn"
            onClick={redirectionHandler}
          >
            <Typography variant="body1">Proceed to checkout</Typography>
          </CustomButtonPrimary>
          {/* )} */}
        </>
      </PaymentCardWrapper>
    </>
  );
};

export default PaymentBillDetails;
