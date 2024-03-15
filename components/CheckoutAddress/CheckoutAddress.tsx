import {
  useAddressList,
  useSaveAddresss
} from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import {
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddressModal from "./AddressModal";
import SavedAddressList from "./SavedAddressList";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useQueryClient } from "react-query";
import {
  DELIVERY_ADDRESS_LIST,
  DELIVERY_METHODS_LIST
} from "@/hooks/react-qurey/query-keys/checkoutQuery.keys";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { useUpdateShipping } from "@/hooks/react-qurey/query-hooks/paymentQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";

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
  firstName_shipping: string;
  lastName_shipping: string;
  email_shipping: string;
  phnCode_shipping: string;
  phnNumber_shipping: string;
  address_shipping: string;
  address2_shipping: string;
  city_shipping: string;
  zip_shipping: string;
  country_shipping: string;
  state_shipping: string;
};
const phoneRegExp = /^[0-9]{10}$/;
const exceptThisSymbols = ["e", "E", "+", "-", "."];

const CheckoutAddress = ({ vendorSelectionHandler = () => { } }: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const BillingRef = useRef<any>(null);
  const ShippingRef = useRef<any>(null);
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [userGivenPhoneCodeShipping, setUserGivenPhoneCodeShipping] =
    useState("");
  const [openmod, setopenmod] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userPartnerId, setUserPartnerId] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState<any>({
    billing_address: [],
    shipping_address: []
  });
  const [adressType, setAddressType] = useState("");
  const [isButtonStatusChange, setIsButtonStatusChange] = useState(false);
  const [isShippedToShippingAddress, setIsShippedToShippingAddress] =
    useState(true);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null,
    phnCode_shipping: null,
    language_shipping: null,
    country_shipping: null,
    state_shipping: null
  });
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(validationText.error.first_name),
    lastName: yup.string().required(validationText.error.last_name),
    email: yup
      .string()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email),
    phnCode: yup.string().required(validationText.error.phone_code),
    phnNumber: yup.string().required(validationText.error.phone),
    address: yup.string().required(validationText.error.address),
    city: yup.string().required(validationText.error.city),
    zip: yup.string().required(validationText.error.zipCode).max(8, "ZIP code must contain valid six character code."),
    country: yup.string().required(validationText.error.country),
    state: yup.string().required(validationText.error.state),
    ...(!isShippedToShippingAddress
      ? {
        firstName_shipping: yup
          .string()
          .required(validationText.error.first_name),
        lastName_shipping: yup
          .string()
          .required(validationText.error.last_name),
        email_shipping: yup
          .string()
          .email(validationText.error.email_format)
          .required(validationText.error.enter_email),
        phnCode_shipping: yup
          .string()
          .required(validationText.error.phone_code),
        phnNumber_shipping: yup.string().required(validationText.error.phone),
        address_shipping: yup.string().required(validationText.error.address),
        city_shipping: yup.string().required(validationText.error.city),
        zip_shipping: yup.string().required(validationText.error.zipCode).max(8, "ZIP code must contain valid six character code."),
        country_shipping: yup.string().required(validationText.error.country),
        state_shipping: yup.string().required(validationText.error.state)
      }
      : {})
  });
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

  const onSuccesCheckoutAddressList = (response: any) => {
    console.log("CHECKOUT_ADDRESS_LIST", response);
    if (Object.keys(response)?.length > 0) {
      setIsShippedToShippingAddress(false);
      const { billing_address, shipping_address, is_data_completed }: any =
        response ?? {};
      if (billing_address && Object.keys(billing_address).length > 0) {
        const { id } = billing_address ?? {};
        setUserPartnerId(`${id}`);
      }
      setIsUserLoggedIn(!!is_data_completed);
      setIsButtonStatusChange(!!is_data_completed);
      setCheckoutAddress({
        billing_address: [billing_address],
        shipping_address
      });
      console.log("billing_address", billing_address);
      const {
        first_name,
        last_name,
        email,
        phone,
        street,
        street2,
        city,
        state_id,
        zip,
        country_id
      } = billing_address ?? {};
      setValue("firstName", `${first_name}`);
      setValue("firstName_shipping", `${first_name}`);
      setValue("lastName", `${last_name}`);
      setValue("lastName_shipping", `${last_name}`);
      setValue("email", `${email}`);
      setValue("email_shipping", `${email}`);
      setValue("phnCode", `${!!phone ? phone?.split(" ")[0] : ""}`);
      setValue("phnCode_shipping", `${!!phone ? phone?.split(" ")[0] : ""}`);
      setValue("phnNumber", `${!!phone ? phone?.split(" ")[1] : ""}`);
      setValue(
        "phnNumber_shipping",
        `${!!phone ? phone?.split(" ")[1] : ""}`
      );
      setValue("address", `${`${street}` == "false" ? "" : street}`);
      setValue(
        "address_shipping",
        `${`${street}` == "false" ? "" : street}`
      );
      setValue("address2", `${`${street2}` == "false" ? "" : street2}`);
      setValue(
        "address2_shipping",
        `${`${street2}` == "false" ? "" : street2}`
      );
      setValue("country", `${country_id[0]}`);
      setValue("country_shipping", `${country_id[0]}`);
      setValue("city", `${`${city}` == "false" ? "" : city}`);
      setValue("city_shipping", `${`${city}` == "false" ? "" : city}`);
      setValue("zip", `${`${zip}` == "false" ? "" : zip}`);
      setValue("zip_shipping", `${`${zip}` == "false" ? "" : zip}`);
      setSelectedCountryId(country_id[0]);
      // setValue('phnCode', {phone_code:phone?.split(' ')[0]})
      // setSelectedShippingaddressId(getselectedShippingAddressId);
    } else {
      // setIsButtonStatusChange(false);
      // setIsUserLoggedIn(false);
      // setIsShippedToShippingAddress(true);
    }
    // setIsShippedToShippingAddress()
  };
  const { data, isLoading } = useAddressList(
    onSuccesCheckoutAddressList,
    () => { }
  );
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const { mutate: saveAddress, isLoading: saveAddressLoader } =
    useSaveAddresss();
  const { mutate: updateShipping, isLoading: updateShippingLoader } =
    useUpdateShipping();

  const getDefaultCountry = useMemo(() => {
    let filteredData =
      countryList && countryList?.length > 0
        ? countryList?.filter(
          (_i: any) => _i?.id == data?.billing_address?.country_id[0]
        )
        : [];
    return filteredData;
  }, [countryList, data]);
  const getDefaultPhoneCode = useMemo(() => {
    let filteredData =
      countryList && countryList?.length > 0
        ? countryList?.filter(
          (_i: any) =>
            _i?.phone_code == data?.billing_address?.phone?.split(" ")[0]
        )
        : [];
    return filteredData;
  }, [countryList, data]);
  console.log("getDefaultCountry", getDefaultCountry);

  const shippingAddressHandler = (event: SyntheticEvent, checked: boolean) =>
    setIsShippedToShippingAddress(checked);
  const handleClose = useCallback(() => {
    setopenmod(!openmod);
  }, [openmod])
  const addMoreHandler = (type: string) => {
    setAddressType(type);
    handleClose();
  };

  const onFormSubmitShipping = (data: Inputs): void => {
    // alert("onFormSubmitShipping");
    console.log("onFormSubmitShipping", data);
  };
  const onFormSubmit = (data: Inputs): void => {
    // alert("onFormSubmitBilling");
    console.log("onFormSubmitBilling", data);
    const {
      state_shipping,
      country_shipping,
      zip_shipping,
      city_shipping,
      address_shipping,
      phnNumber_shipping,
      phnCode_shipping,
      email_shipping,
      lastName_shipping,
      firstName_shipping,
      state,
      country,
      zip,
      city,
      address,
      phnNumber,
      phnCode,
      email,
      lastName,
      firstName,
      address2,
      address2_shipping
    } = data ?? {};
    const formData: FormData = new FormData();
    if (!!userPartnerId) {
      formData.append("partner_id", userPartnerId);
    }
    if (isShippedToShippingAddress) {
      formData.append("use_same", `${1}`);
      formData.append("first_name", `${firstName}`);
      formData.append("last_name", `${lastName}`);
      formData.append("email", `${email}`);
      formData.append("phone", `${phnCode} ${phnNumber}`);
      formData.append("street", `${address}`);
      if (!!address2) {
        formData.append("street2", `${address2}`);
      }
      formData.append("city", `${city}`);
      formData.append("state_id", `${state}`);
      formData.append("zip", `${zip}`);
      formData.append("country_id", `${country}`);
    } else {
      formData.append("use_same", `${0}`);
      formData.append("billing_first_name", `${firstName}`);
      formData.append("billing_last_name", `${lastName}`);
      formData.append("billing_email", `${email}`);
      formData.append("billing_phone", `${phnCode} ${phnNumber}`);
      formData.append("billing_street", `${address}`);
      if (!!address2) {
        formData.append("billing_street2", `${address2}`);
      }
      formData.append("billing_city", `${city}`);
      formData.append("billing_state_id", `${state}`);
      formData.append("billing_zip", `${zip}`);
      formData.append("billing_country_id", `${country}`);

      formData.append("shipping_first_name", `${firstName_shipping}`);
      formData.append("shipping_last_name", `${lastName_shipping}`);
      formData.append("shipping_email", `${email_shipping}`);
      formData.append(
        "shipping_phone",
        `${phnCode_shipping} ${phnNumber_shipping}`
      );
      formData.append("shipping_street", `${address_shipping}`);
      if (!!address2_shipping) {
        formData.append("shipping_street2", `${address2_shipping}`);
      }
      formData.append("shipping_city", `${city_shipping}`);
      formData.append("shipping_state_id", `${state_shipping}`);
      formData.append("shipping_zip", `${zip_shipping}`);
      formData.append("shipping_country_id", `${country_shipping}`);
    }
    saveAddress(formData, {
      onSuccess: (response: any) => {
        reset();
        queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
        console.log("saveAddress response", response?.data?.message);
      },
      onError: (error: any) => {
        console.log("saveAddress error", error?.response?.data?.message);
        toastError(error?.response?.data?.message ?? "Something went wrong.");
      }
    });
  };
  const selectShippingVendorHandler = () => {
    // if (isButtonStatusChange && !!selectedShippingaddressId) {
    //   const formData: FormData = new FormData();
    //   formData.append("partner_id", `${selectedShippingaddressId}`);
    //   updateShipping(formData, {
    //     onSuccess: () => {
    //       vendorSelectionHandler(true);
    //     },
    //     onError: () => { }
    //   });
    //   // vendorSelectionHandler(true);
    // }
  };
  const getSelectedAddressId = useCallback((id: number | string) => {
    // setSelectedShippingaddressId(id);
    const formData: FormData = new FormData();
    formData.append("partner_id", `${id}`);
    updateShipping(formData, {
      onSuccess: () => {
        vendorSelectionHandler({ status: true, id: id });
        queryClient.invalidateQueries(DELIVERY_METHODS_LIST);
      },
      onError: () => { }
    });
  }, []);

  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });

  useEffect(() => {
    if (!!data?.is_data_completed) {
      let getselectedShippingAddressId =
        data && data?.shipping_address && data?.shipping_address?.length > 0
          ? data?.shipping_address?.filter((_i: any) => !!_i?.is_selected)[0]
            ?.id
          : null;
      if (getselectedShippingAddressId) {
        const formData: FormData = new FormData();
        formData.append("partner_id", `${getselectedShippingAddressId}`);
        updateShipping(formData, {
          onSuccess: () => {
            vendorSelectionHandler({
              status: true,
              id: getselectedShippingAddressId
            });
            queryClient.invalidateQueries(DELIVERY_METHODS_LIST);
          },
          onError: () => { }
        });
      }
    } else {
    }
  }, [data]);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userLoginStatus: boolean =
  //       !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
  //     console.log("userLoginStatus", userLoginStatus);
  //     setIsUserLoggedIn(userLoginStatus);
  //     if (userLoginStatus) {
  //       setIsShippedToShippingAddress(false);
  //     } else {
  //       setIsShippedToShippingAddress(true);
  //     }
  //   }
  // }, []);

  const filterCountryOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name
  });

  const filterPhoneCodes = useMemo(() => {
    return userGivenPhoneCode == "" ||
      userGivenPhoneCode == undefined ||
      userGivenPhoneCode == getDefaultPhoneCode[0]?.phone_code
      ? countryList
      : countryList?.filter((_i: any) => _i?.phone_code == userGivenPhoneCode);
  }, [userGivenPhoneCode, countryList]);

  const filterPhoneCodesShipping = useMemo(() => {
    return userGivenPhoneCodeShipping == "" ||
      userGivenPhoneCodeShipping == undefined ||
      userGivenPhoneCode == getDefaultPhoneCode[0]?.phone_code
      ? countryList
      : countryList?.filter(
        (_i: any) => _i?.phone_code == userGivenPhoneCodeShipping
      );
  }, [userGivenPhoneCodeShipping, countryList]);

  const renderCheckBox = useMemo(
    () => (
      <FormControlLabel
        onChange={shippingAddressHandler}
        control={<Checkbox checked={isShippedToShippingAddress} />}
        label="Ship to the same address"
      />
    ),
    [shippingAddressHandler]
  );

  return (
    <CheckOutAddressWrap>
      <form onSubmit={handleSubmit(onFormSubmit)} id="billing_form">
        {/* <------------------------------------------------ CHECKOUT ADDRESS ------------------------------------------------> */}
        <Box className="billing_adress">
          {/* <Typography variant="h4" className="form_header">
            Billing address
          </Typography> */}
          {/* <------------------------------------------------ SAVED ADDRESS ------------------------------------------------>  */}
          {!isLoading && isUserLoggedIn && (
            <SavedAddressList
              checkoutAddress={checkoutAddress?.billing_address}
              type={"billing"}
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
            // <form onSubmit={handleSubmit(onFormSubmitBilling)} id="billing_form">
            <Grid container spacing={2} className="billing_adress_grid">
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon
                  placeholder="First name"
                  style3
                  {...register("firstName")}
                  onKeyDown={(e: any) =>
                    [' '].includes(e.key) && e.preventDefault()
                  }
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
                  onKeyDown={(e: any) =>
                    [' '].includes(e.key) && e.preventDefault()
                  }
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
                        defaultValue={getDefaultPhoneCode[0]}
                        filterOptions={filterPhnCdCountryOptions}
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
                          setSelectedValues({
                            ...selectedValues,
                            phnCode: newValue
                          });
                        }}
                        // options={filterPhoneCodes ?? []}
                        options={countryList ?? []}
                        disabled={countryLoader}
                        autoHighlight
                        getOptionLabel={(option: any) =>
                          ` +${option?.phone_code} ${option.name}`
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
                            {option.phone_code} {option.name}
                          </Box>
                        )}
                        renderInput={(params) => {
                          setUserGivenPhoneCode(
                            `${params?.inputProps?.value ?? ""}`
                          );
                          return (
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
                          );
                        }}
                      />
                      {errors.phnCode && !selectedValues.phnCode && (
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
                  type="number"
                  style3
                  {...register("phnNumber")}
                  onKeyDown={(e: any) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
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
                        defaultValue={getDefaultCountry[0]}
                        // sx={{ width: 300 }}
                        // value={selectedValues?.country}
                        filterOptions={filterCountryOptions}
                        onChange={(event: any, newValue: any | null) => {
                          console.log("country", newValue);
                          setSelectedCountryId(newValue ? newValue?.id : "");
                          setValue("country", newValue ? newValue?.id : "");
                          setSelectedValues({
                            ...selectedValues,
                            country: newValue
                          });
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
                      {errors?.country && !selectedValues.country && (
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
                            setSelectedValues({
                              ...selectedValues,
                              state: newValue
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="State/Province"
                            />
                          )}
                        />
                        {errors?.state && !selectedValues.state && (
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
            // </form>
          )}
          {/* {!isLoading && !isUserLoggedIn && renderCheckBox} */}
          {/* {!isLoading && !isUserLoggedIn && (
            <FormControlLabel
              onChange={shippingAddressHandler}
              control={<Checkbox checked={isShippedToShippingAddress} />}
              label="Ship to the same address"
            />
          )} */}
        </Box>
        {/* <FormControlLabel
        // onChange={(e) => checkHandler(e, idx)}
        control={<Checkbox checked={true} />}
        // control={<Checkbox checked={!!_i?.is_selected} />}
        label="Ship to the same address"
      /> */}
        {/* <------------------------------------------------ SHIPPING ADDRESS ------------------------------------------------> */}
        {!isShippedToShippingAddress && (
          <Box className="billing_adress">
            <Typography variant="h4" className="form_header">
              Shipping address
            </Typography>
            {!isLoading && isUserLoggedIn && (
              <SavedAddressList
                checkoutAddress={checkoutAddress?.shipping_address}
                getSelectedAddressId={getSelectedAddressId}
                type={"shipping"}
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
              // <form
              //   onSubmit={handleSubmit(onFormSubmitShipping)}
              //   id="shipping_form"
              // >
              <Grid container spacing={2} className="billing_adress_grid">
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="First name"
                    style3
                    {...register("firstName_shipping")}
                    onKeyDown={(e: any) =>
                      [' '].includes(e.key) && e.preventDefault()
                    }
                  />
                  {errors?.firstName_shipping && (
                    <div className="profile_error">
                      {errors?.firstName_shipping?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="Last name"
                    style3
                    {...register("lastName_shipping")}
                    onKeyDown={(e: any) =>
                      [' '].includes(e.key) && e.preventDefault()
                    }
                  />
                  {errors?.lastName_shipping && (
                    <div className="profile_error">
                      {errors?.lastName_shipping?.message}
                    </div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <InputFieldCommon
                    placeholder="Email"
                    style3
                    {...register("email_shipping")}
                  />
                  {errors?.email_shipping && (
                    <div className="profile_error">
                      {errors?.email_shipping?.message}
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
                          filterOptions={filterPhnCdCountryOptions}
                          defaultValue={getDefaultPhoneCode[0]}
                          // value={selectedValues?.phnCode}
                          onChange={(event: any, newValue: any | null) => {
                            console.log("country", newValue);
                            // setSelectedCountryId(
                            //   newValue ? newValue?.id : ""
                            // );
                            setValue(
                              "phnCode_shipping",
                              newValue ? newValue?.phone_code : ""
                            );
                            setSelectedValues({
                              ...selectedValues,
                              phnCode_shipping: newValue
                            });
                          }}
                          // options={filterPhoneCodes ?? []}
                          // options={filterPhoneCodesShipping ?? []}
                          options={countryList ?? []}
                          disabled={countryLoader}
                          autoHighlight
                          // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                          getOptionLabel={(option: any) =>
                            ` +${option?.phone_code} ${option.name}`
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
                              {option.phone_code} {option.name}
                            </Box>
                          )}
                          renderInput={(params) => {
                            setUserGivenPhoneCodeShipping(
                              `${params?.inputProps?.value ?? ""}`
                            );
                            return (
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
                            );
                          }}
                        />
                        {errors.phnCode_shipping &&
                          !selectedValues.phnCode_shipping && (
                            <div className="profile_error">
                              {errors.phnCode_shipping.message}
                            </div>
                          )}
                      </Box>
                    </div>
                  </Box>
                </Grid>
                <Grid item lg={8} md={8} xs={12}>
                  <InputFieldCommon
                    placeholder="Phone number"
                    type="number"
                    style3
                    {...register("phnNumber_shipping")}
                    onKeyDown={(e: any) =>
                      exceptThisSymbols.includes(e.key) && e.preventDefault()
                    }
                  />
                  {errors?.phnNumber_shipping && (
                    <div className="profile_error">
                      {errors?.phnNumber_shipping?.message}
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
                    {...register("address_shipping")}
                  />
                  {errors?.address_shipping && (
                    <div className="profile_error">
                      {errors?.address_shipping?.message}
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
                    {...register("address2_shipping")}
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
                          defaultValue={getDefaultCountry[0]}
                          // sx={{ width: 300 }}
                          // value={selectedValues?.country}
                          filterOptions={filterCountryOptions}
                          onChange={(event: any, newValue: any | null) => {
                            console.log("country", newValue);
                            setSelectedCountryId(newValue ? newValue?.id : "");
                            setValue(
                              "country_shipping",
                              newValue ? newValue?.id : ""
                            );
                            setSelectedValues({
                              ...selectedValues,
                              country_shipping: newValue
                            });
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
                        {errors?.country_shipping &&
                          !selectedValues.country_shipping && (
                            <div className="profile_error">
                              {errors?.country_shipping?.message}
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
                              setValue(
                                "state_shipping",
                                newValue ? newValue?.id : ""
                              );
                              setSelectedValues({
                                ...selectedValues,
                                state_shipping: newValue
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="State/Province"
                              />
                            )}
                          />
                          {errors?.state_shipping &&
                            !selectedValues.state_shipping && (
                              <div className="profile_error">
                                {errors?.state_shipping?.message}
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
                    {...register("city_shipping")}
                  />
                  {errors?.city_shipping && (
                    <div className="profile_error">
                      {errors?.city_shipping?.message}
                    </div>
                  )}
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <InputFieldCommon
                    placeholder="ZIP code"
                    style3
                    {...register("zip_shipping")}
                  />
                  {errors?.zip_shipping && (
                    <div className="profile_error">
                      {errors?.zip_shipping?.message}
                    </div>
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
              // </form>
            )}
          </Box>
        )}
        <Grid item lg={12} xs={12} style={{ marginBottom: "30px" }}>
          {isButtonStatusChange ? (
            <></>
          ) : !saveAddressLoader ? (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn mx-auto"
              type="submit"
              // form="onFormSubmitBilling"
              id="shippingButton"
              onClick={selectShippingVendorHandler}
            >
              <Typography variant="body1">
                {/* {isButtonStatusChange ? "Continue" : "Save"} */}
                Save
              </Typography>
            </CustomButtonPrimary>
          ) : (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn mx-auto"
              // type="submit"
              // form="onFormSubmitBilling"
              id="shippingButton"
            // onClick={handleClose}
            >
              <ButtonLoader />
            </CustomButtonPrimary>
          )}
        </Grid>
      </form>
      {/* <-------------------------------------------- modal ---------------------------------------> */}
      <AddressModal
        open={openmod}
        handleClose={handleClose}
        type={adressType}
      />
    </CheckOutAddressWrap>
  );
};

export default memo(CheckoutAddress);
