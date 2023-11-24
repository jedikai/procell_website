import { useAddressList } from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import {
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import validationText from "@/json/messages/validationText";
import { getCookie } from "@/lib/functions/storage.lib";
import { CheckOutAddressWrap } from "@/styles/StyledComponents/ChekOutAddressWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddressModal from "./AddressModal";
import SavedAddressList from "./SavedAddressList";
import { Checkbox, FormControlLabel } from "@mui/material";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phnCode: string;
  phnNumber: string;
  address: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  state: string;
};
const phoneRegExp = /^[0-9]{10}$/;
const validationSchema = yup.object().shape({
  firstName: yup.string().required(validationText.error.first_name),
  lastName: yup.string().required(validationText.error.last_name),
  email: yup
    .string()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  phnCode: yup.string().required(validationText.error.phone_code),
  phnNumber: yup
    .string()
    .matches(phoneRegExp, validationText.error.valid_phone_number)
    .required(validationText.error.phone),
  address: yup.string().required(validationText.error.address),
  city: yup.string().required(validationText.error.city),
  zip: yup.string().required(validationText.error.phone),
  country: yup.string().required(validationText.error.phone),
  state: yup.string().required(validationText.error.phone)
});

const CheckoutAddress = () => {
  const BillingRef = useRef<any>(null);
  const ShippingRef = useRef<any>(null);
  const [openmod, setopenmod] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [checkoutAddress, setCheckoutAddress] = useState<any>({
    billing_address: [],
    shipping_address: []
  });
  const [adressType, setAddressType] = useState("");
  const [isShippedToShippingAddress, setIsShippedToShippingAddress] =
    useState(true);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null
  });
  const onSuccesCheckoutAddressList = (response: any) => {
    console.log("CHECKOUT_ADDRESS_LIST", response);
    const { billing_address, shipping_address }: any = response ?? {};
    setCheckoutAddress({
      billing_address: [billing_address],
      shipping_address
    });
  };
  const { data, isLoading } = useAddressList(onSuccesCheckoutAddressList);
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const shippingAddressHandler = (event: SyntheticEvent, checked: boolean) =>
    setIsShippedToShippingAddress(checked);
  const handleClose = () => {
    setopenmod(!openmod);
  };
  const addMoreHandler = (type: string) => {
    setAddressType(type);
    handleClose();
  };

  const onFormSubmitShipping = (data: Inputs): void => {
    // alert("onFormSubmitShipping");
    console.log("onFormSubmitShipping", data, selectedValues);
  };
  const onFormSubmitBilling = (data: Inputs): void => {
    // alert("onFormSubmitBilling");
    console.log("onFormSubmitBilling", data, selectedValues);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLoginStatus: boolean =
        !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
      console.log("userLoginStatus", userLoginStatus);
      setIsUserLoggedIn(userLoginStatus);
      if (userLoginStatus) {
        setIsShippedToShippingAddress(false);
      } else {
        setIsShippedToShippingAddress(true);
      }
    }
  }, []);
  console.log("checkoutAddress");

  return (
    <CheckOutAddressWrap>
      {/* <------------------------------------------------ CHECKOUT ADDRESS ------------------------------------------------> */}
      <Box className="billing_adress">
        <Typography variant="h4" className="form_header">
          Billing address
        </Typography>
        {/* <------------------------------------------------ SAVED ADDRESS ------------------------------------------------>  */}
        {!isLoading && isUserLoggedIn && (
          <SavedAddressList
            checkoutAddress={checkoutAddress?.billing_address}
          />
        )}
        {/* <p
          style={{ color: "#16A6DF", cursor: "pointer" }}
          onClick={() => addMoreHandler("billing")}
        >
          Add more
        </p> */}
        {/* <------------------------------------------------ ADDRESS FORM ------------------------------------------------>  */}

        {!isLoading && !isUserLoggedIn && (
          <form onSubmit={handleSubmit(onFormSubmitBilling)} id="billing_form">
            <Grid container spacing={2} className="billing_adress_grid">
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon
                  placeholder="First name"
                  style3
                  {...register("firstName")}
                />
                {errors?.firstName && (
                  <div className="profile_error">
                    {errors?.firstName?.message}
                  </div>
                )}
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon
                  placeholder="Last name"
                  style3
                  {...register("lastName")}
                />
                {errors?.lastName && (
                  <div className="profile_error">
                    {errors?.lastName?.message}
                  </div>
                )}
              </Grid>

              <Grid item xs={12}>
                <InputFieldCommon
                  placeholder="Email"
                  style3
                  {...register("email")}
                />
                {errors?.email && (
                  <div className="profile_error">{errors?.email?.message}</div>
                )}
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Box className="form_group">
                  <div
                    className="space_between"
                    style={{ alignItems: "flex-start" }}
                  >
                    <Box className="form_group_inner_full form_group_inner">
                      <Autocomplete
                        id="phonecode-select-demo"
                        className="autocomplete_div"
                        sx={{ width: 300 }}
                        // value={selectedValues?.phnCode}
                        onChange={(event: any, newValue: any | null) => {
                          console.log("country", newValue);
                          // setSelectedCountryId(
                          //   newValue ? newValue?.id : ""
                          // );
                          setValue(
                            "phnCode",
                            newValue ? newValue?.phone_code : ""
                          );
                          //   setSelectedValues({
                          //     ...selectedValues,
                          //     phnCode: newValue
                          //   });
                        }}
                        options={countryList ?? []}
                        disabled={countryLoader}
                        autoHighlight
                        // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                        getOptionLabel={(option: any) =>
                          ` +${option?.phone_code}`
                        }
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`${process.env.NEXT_APP_BASE_URL}/${option?.image_url}`}
                              alt=""
                            />
                            {" +"}
                            {option.phone_code}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // {...register("country")}
                            // label="Choose a country"
                            placeholder="Phone code"
                            inputProps={{
                              ...params.inputProps
                              // autoComplete: "new-password" // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                      {errors.phnCode && (
                        <div className="profile_error">
                          {errors.phnCode.message}
                        </div>
                      )}
                    </Box>
                  </div>
                </Box>
              </Grid>
              <Grid item lg={8} md={8} xs={12}>
                <InputFieldCommon
                  placeholder="Phone number"
                  style3
                  {...register("phnNumber")}
                />
                {errors?.phnNumber && (
                  <div className="profile_error">
                    {errors?.phnNumber?.message}
                  </div>
                )}
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street and number"
                  style3
                  multiline
                  rows={4}
                  maxRows={4}
                  {...register("address")}
                />
                {errors?.address && (
                  <div className="profile_error">
                    {errors?.address?.message}
                  </div>
                )}
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street 2"
                  style3
                  rows={4}
                  maxRows={4}
                  multiline
                  {...register("address2")}
                />
              </Grid>
              <Grid item xs={12}>
                <Box className="form_group">
                  <div
                    className="space_between"
                    style={{ alignItems: "flex-start" }}
                  >
                    <Box
                      className={
                        stateList && stateList.length > 0
                          ? "form_group_inner"
                          : "form_group_inner_full form_group_inner"
                      }
                    >
                      <Autocomplete
                        id="country-select-demo"
                        className="autocomplete_div"
                        // sx={{ width: 300 }}
                        // value={selectedValues?.country}
                        onChange={(event: any, newValue: any | null) => {
                          console.log("country", newValue);
                          setSelectedCountryId(newValue ? newValue?.id : "");
                          setValue("country", newValue ? newValue?.id : "");
                          //   setSelectedValues({
                          //     ...selectedValues,
                          //     country: newValue
                          //   });
                        }}
                        options={countryList ?? []}
                        disabled={countryLoader}
                        autoHighlight
                        getOptionLabel={(option: any) => option.name}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`${process.env.NEXT_APP_BASE_URL}/${option?.image_url}`}
                              alt=""
                            />
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // {...register("country")}
                            // label="Choose a country"
                            placeholder="Country"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password" // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                      {errors?.country && (
                        <div className="profile_error">
                          {errors?.country.message}
                        </div>
                      )}
                    </Box>
                    {stateList && stateList.length > 0 && (
                      <Box className="form_group_inner">
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          className="autocomplete_div"
                          // {...register("state")}
                          options={stateList ?? []}
                          sx={{ width: 300 }}
                          disabled={!selectedCountryId && !stateLoder}
                          getOptionLabel={(option: any) => option.name}
                          //   value={selectedValues?.state}
                          onChange={(event: any, newValue: any | null) => {
                            console.log("state", newValue);
                            // setSelectedCountryId(newValue ? newValue?.id : "");
                            setValue("state", newValue ? newValue?.id : "");
                            // setSelectedValues({
                            //   ...selectedValues,
                            //   state: newValue
                            // });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="State/Province"
                            />
                          )}
                        />
                        {errors?.state && (
                          <div className="profile_error">
                            {errors?.state.message}
                          </div>
                        )}
                      </Box>
                    )}
                  </div>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon
                  placeholder="City"
                  style3
                  {...register("city")}
                />
                {errors?.city && (
                  <div className="profile_error">{errors?.city?.message}</div>
                )}
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon
                  placeholder="ZIP code"
                  style3
                  {...register("zip")}
                />
                {errors?.zip && (
                  <div className="profile_error">{errors?.zip?.message}</div>
                )}
              </Grid>

              {/* <Grid item lg={12} xs={12}>
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_bill_btn mx-auto"
                  type="submit"
                  form="onFormSubmitBilling"
                  id="billingButton"
                  // onClick={handleClose}
                >
                  <Typography variant="body1">Save</Typography>
                </CustomButtonPrimary>
              </Grid> */}
            </Grid>
          </form>
        )}
        {!isUserLoggedIn && (
          <FormControlLabel
            onChange={shippingAddressHandler}
            control={<Checkbox checked={isShippedToShippingAddress} />}
            label="Ship to the same address"
          />
        )}
      </Box>
      {/* <------------------------------------------------ SHIPPING ADDRESS ------------------------------------------------> */}
      {!isShippedToShippingAddress && (
        <Box className="billing_adress">
          <Typography variant="h4" className="form_header">
            Shipping address
          </Typography>
          {!isLoading && isUserLoggedIn && (
            <SavedAddressList
              checkoutAddress={checkoutAddress?.shipping_address}
            />
          )}
          {!isLoading && isUserLoggedIn && (
            <p
              style={{ color: "#16A6DF", cursor: "pointer" }}
              onClick={() => addMoreHandler("Add shipping address")}
            >
              Add more
            </p>
          )}
          {/* <------------------------------------------------ ADDRESS FORM ------------------------------------------------>  */}

          {!isLoading && !isUserLoggedIn && (
            <form
              onSubmit={handleSubmit(onFormSubmitShipping)}
              id="shipping_form"
            >
              <Grid container spacing={2} className="billing_adress_grid">
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="First name"
                    style3
                    {...register("firstName")}
                  />
                  {errors?.firstName && (
                    <div className="profile_error">
                      {errors?.firstName?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="Last name"
                    style3
                    {...register("lastName")}
                  />
                  {errors?.lastName && (
                    <div className="profile_error">
                      {errors?.lastName?.message}
                    </div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <InputFieldCommon
                    placeholder="Email"
                    style3
                    {...register("email")}
                  />
                  {errors?.email && (
                    <div className="profile_error">
                      {errors?.email?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Box className="form_group">
                    <div
                      className="space_between"
                      style={{ alignItems: "flex-start" }}
                    >
                      <Box className="form_group_inner_full form_group_inner">
                        <Autocomplete
                          id="phonecode-select-demo"
                          className="autocomplete_div"
                          sx={{ width: 300 }}
                          // value={selectedValues?.phnCode}
                          onChange={(event: any, newValue: any | null) => {
                            console.log("country", newValue);
                            // setSelectedCountryId(
                            //   newValue ? newValue?.id : ""
                            // );
                            setValue(
                              "phnCode",
                              newValue ? newValue?.phone_code : ""
                            );
                            //   setSelectedValues({
                            //     ...selectedValues,
                            //     phnCode: newValue
                            //   });
                          }}
                          options={countryList ?? []}
                          disabled={countryLoader}
                          autoHighlight
                          // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                          getOptionLabel={(option: any) =>
                            ` +${option?.phone_code}`
                          }
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <img
                                loading="lazy"
                                width="20"
                                src={`${process.env.NEXT_APP_BASE_URL}/${option?.image_url}`}
                                alt=""
                              />
                              {" +"}
                              {option.phone_code}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // {...register("country")}
                              // label="Choose a country"
                              placeholder="Phone code"
                              inputProps={{
                                ...params.inputProps
                                // autoComplete: "new-password" // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        {errors.phnCode && (
                          <div className="profile_error">
                            {errors.phnCode.message}
                          </div>
                        )}
                      </Box>
                    </div>
                  </Box>
                </Grid>
                <Grid item lg={8} md={8} xs={12}>
                  <InputFieldCommon
                    placeholder="Phone number"
                    style3
                    {...register("phnNumber")}
                  />
                  {errors?.phnNumber && (
                    <div className="profile_error">
                      {errors?.phnNumber?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={12} xs={12}>
                  <InputFieldCommon
                    placeholder="Street and number"
                    style3
                    multiline
                    rows={4}
                    maxRows={4}
                    {...register("address")}
                  />
                  {errors?.address && (
                    <div className="profile_error">
                      {errors?.address?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={12} xs={12}>
                  <InputFieldCommon
                    placeholder="Street 2"
                    style3
                    rows={4}
                    maxRows={4}
                    multiline
                    {...register("address2")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box className="form_group">
                    <div
                      className="space_between"
                      style={{ alignItems: "flex-start" }}
                    >
                      <Box
                        className={
                          stateList && stateList.length > 0
                            ? "form_group_inner"
                            : "form_group_inner_full form_group_inner"
                        }
                      >
                        <Autocomplete
                          id="country-select-demo"
                          className="autocomplete_div"
                          // sx={{ width: 300 }}
                          // value={selectedValues?.country}
                          onChange={(event: any, newValue: any | null) => {
                            console.log("country", newValue);
                            setSelectedCountryId(newValue ? newValue?.id : "");
                            setValue("country", newValue ? newValue?.id : "");
                            //   setSelectedValues({
                            //     ...selectedValues,
                            //     country: newValue
                            //   });
                          }}
                          options={countryList ?? []}
                          disabled={countryLoader}
                          autoHighlight
                          getOptionLabel={(option: any) => option.name}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <img
                                loading="lazy"
                                width="20"
                                src={`${process.env.NEXT_APP_BASE_URL}/${option?.image_url}`}
                                alt=""
                              />
                              {option.name}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // {...register("country")}
                              // label="Choose a country"
                              placeholder="Country"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password" // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        {errors?.country && (
                          <div className="profile_error">
                            {errors?.country.message}
                          </div>
                        )}
                      </Box>
                      {stateList && stateList.length > 0 && (
                        <Box className="form_group_inner">
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            className="autocomplete_div"
                            // {...register("state")}
                            options={stateList ?? []}
                            sx={{ width: 300 }}
                            disabled={!selectedCountryId && !stateLoder}
                            getOptionLabel={(option: any) => option.name}
                            //   value={selectedValues?.state}
                            onChange={(event: any, newValue: any | null) => {
                              console.log("state", newValue);
                              // setSelectedCountryId(newValue ? newValue?.id : "");
                              setValue("state", newValue ? newValue?.id : "");
                              // setSelectedValues({
                              //   ...selectedValues,
                              //   state: newValue
                              // });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="State/Province"
                              />
                            )}
                          />
                          {errors?.state && (
                            <div className="profile_error">
                              {errors?.state.message}
                            </div>
                          )}
                        </Box>
                      )}
                    </div>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="City"
                    style3
                    {...register("city")}
                  />
                  {errors?.city && (
                    <div className="profile_error">{errors?.city?.message}</div>
                  )}
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="ZIP code"
                    style3
                    {...register("zip")}
                  />
                  {errors?.zip && (
                    <div className="profile_error">{errors?.zip?.message}</div>
                  )}
                </Grid>

                {/* <Grid item lg={12} xs={12}>
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_bill_btn mx-auto"
                  type="submit"
                  form="onFormSubmitBilling"
                  id="shippingButton"
                  // onClick={handleClose}
                >
                  <Typography variant="body1">Save</Typography>
                </CustomButtonPrimary>
              </Grid> */}
              </Grid>
            </form>
          )}
        </Box>
      )}
      <Grid item lg={12} xs={12} style={{ marginBottom: "30px" }}>
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          className="payment_bill_btn mx-auto"
          type="submit"
          form="onFormSubmitBilling"
          id="shippingButton"
          // onClick={handleClose}
        >
          <Typography variant="body1">Save</Typography>
        </CustomButtonPrimary>
      </Grid>
      {/* <-------------------------------------------- modal ---------------------------------------> */}
      <AddressModal
        open={openmod}
        handleClose={handleClose}
        type={adressType}
      />
    </CheckOutAddressWrap>
  );
};

export default CheckoutAddress;
