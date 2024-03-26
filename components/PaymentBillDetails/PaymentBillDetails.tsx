import { getCookie } from "@/lib/functions/storage.lib";
import { PaymentCardWrapper } from "@/styles/StyledComponents/PaymentCardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { List, ListItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaymentCardProps {
  subtotal: number | null | string;
  shipping: number | null | string;
  totalAmount?: number | null | string;
  loader?: boolean;
  isRedirectionEnable?: boolean;
}

const PaymentBillDetails = ({
  subtotal,
  shipping,
  totalAmount,
  loader = false,
  isRedirectionEnable = false
}: PaymentCardProps) => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const redirectionHandler = () => {
    router.push("/product/checkout/");
  };
  useEffect(() => {
    const userLoginStatus =
      !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
    setIsUserLoggedIn(userLoginStatus);
  }, []);
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
          {isRedirectionEnable && (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn"
              onClick={redirectionHandler}
            >
              <Typography variant="body1">
                {isUserLoggedIn ? "Proceed to checkout" : "Checkout as guest"}
              </Typography>
            </CustomButtonPrimary>
          )}
          {!isUserLoggedIn && (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn"
              onClick={() => router.push("/login?cart=true")}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="body1">Login/Register</Typography>
            </CustomButtonPrimary>
          )}
          {/* )} */}
        </>
      </PaymentCardWrapper>
    </>
  );
};

export default PaymentBillDetails;
