import { CartItemsWrapper } from "@/styles/StyledComponents/CartItemWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useEffect, useState } from "react";
import SavedAddressList from "./SavedAddressList";
import AddressModal from "./AddressModal";
import { getCookie } from "@/lib/functions/storage.lib";

const CheckoutAddress = () => {
  const [openmod, setopenmod] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [adressType, setAddressType] = useState("");
  const [isShippedToShippingAddress, setIsShippedToShippingAddress] =
    useState(true);
  const shippingAddressHandler = (event: SyntheticEvent, checked: boolean) =>
    setIsShippedToShippingAddress(checked);
  const handleClose = () => {
    setopenmod(!openmod);
  };
  const addMoreHandler = (type: string) => {
    setAddressType(type);
    handleClose();
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLoginStatus: boolean =
        !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
      console.log("userLoginStatus", userLoginStatus);
      setIsUserLoggedIn(userLoginStatus);
    }
  }, []);
  return (
    <>
      {/* <------------------------------------------------ CHECKOUT ADDRESS ------------------------------------------------> */}
      <Box className="billing_adress">
        <Typography variant="h4" className="form_header">
          Billing address
        </Typography>
        {/* <------------------------------------------------ SAVED ADDRESS ------------------------------------------------>  */}
        {isUserLoggedIn && <SavedAddressList />}
        {/* <p
          style={{ color: "#16A6DF", cursor: "pointer" }}
          onClick={() => addMoreHandler("Billing address")}
        >
          Add more
        </p> */}
        {/* <------------------------------------------------ ADDRESS FORM ------------------------------------------------>  */}

        {!isUserLoggedIn && (
          <Grid container spacing={2} className="billing_adress_grid">
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="First name" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Last name" style3 />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Email" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Phone number" style3 />
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputFieldCommon
                placeholder="Street and number"
                style3
                multiline
                rows={4}
                maxRows={4}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputFieldCommon
                placeholder="Street 2"
                style3
                rows={4}
                maxRows={4}
                multiline
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="City" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="ZIP code" style3 />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Country" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="State/Province" style3 />
            </Grid>
          </Grid>
        )}
        {/* <FormControlLabel
          onChange={shippingAddressHandler}
          control={<Checkbox checked={isShippedToShippingAddress} />}
          label="Ship to the same address"
        /> */}
      </Box>
      {/* <------------------------------------------------ SHIPPING ADDRESS ------------------------------------------------> */}
      {/* {!isShippedToShippingAddress && ( */}
      <Box className="billing_adress">
        <Typography variant="h4" className="form_header">
          Shipping address
        </Typography>
        {isUserLoggedIn && <SavedAddressList />}
        {isUserLoggedIn && (
          <p
            style={{ color: "#16A6DF", cursor: "pointer" }}
            onClick={() => addMoreHandler("Shipping address")}
          >
            Add more
          </p>
        )}
        {/* <------------------------------------------------ ADDRESS FORM ------------------------------------------------>  */}

        {!isUserLoggedIn && (
          <Grid container spacing={2} className="billing_adress_grid">
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="First name" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Last name" style3 />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Email" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Phone number" style3 />
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputFieldCommon
                placeholder="Street and number"
                style3
                multiline
                rows={4}
                maxRows={4}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputFieldCommon
                placeholder="Street 2"
                style3
                rows={4}
                maxRows={4}
                multiline
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="City" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="ZIP code" style3 />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="Country" style3 />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <InputFieldCommon placeholder="State/Province" style3 />
            </Grid>
          </Grid>
        )}
      </Box>
      {/* )} */}
      {/* <-------------------------------------------- modal ---------------------------------------> */}
      <AddressModal
        open={openmod}
        handleClose={handleClose}
        type={adressType}
      />
    </>
  );
};

export default CheckoutAddress;
