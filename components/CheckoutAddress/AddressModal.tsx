import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  createFilterOptions
} from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import validationText from "@/json/messages/validationText";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckOutAddressWrap } from "@/styles/StyledComponents/ChekOutAddressWrapper";
import {
  useCreateAddress,
  useEditAddress
} from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import { useQueryClient } from "react-query";
import { DELIVERY_ADDRESS_LIST } from "@/hooks/react-qurey/query-keys/checkoutQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
type Inputs = {
  firstName: string;
  lastName: string;
  email?: string;
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

const exceptThisSymbols = ["e", "E", "+", "-", "."];
const AddressModal = ({
  open,
  handleClose,
  type,
  selectedAddress = {}
}: any) => {
  console.log("selectedAddress", selectedAddress);
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(validationText.error.first_name),
    lastName: yup.string().required(validationText.error.last_name),
    ...(type != "Billing address"
      ? {
          email: yup
            .string()
            .email(validationText.error.email_format)
            .required(validationText.error.enter_email)
        }
      : {}),
    phnCode: yup.string().required(validationText.error.phone_code),
    phnNumber: yup
      .string()
      .required(validationText.error.phone)
      // .matches(/^\d+$/, validationText.error.valid_phone_number)
      .test("isValid", validationText.error.phone_number_range, (value) => {
        console.log(value);
        if (value && value?.length >= 8 && value?.length <= 16) {
          return true;
        } else {
          return false;
        }
      }),
    address: yup.string().required(validationText.error.address),
    city: yup.string().required(validationText.error.city),
    zip: yup
      .string()
      .required(validationText.error.zipCode)
      .max(8, "ZIP code must contain valid six character code."),
    country: yup.string().required(validationText.error.country),
    state: yup.string().required(validationText.error.state)
  });
  const {
    id,
    name,
    first_name,
    last_name,
    email,
    phone,
    street,
    street2,
    city,
    state_id,
    zip,
    country_id,
    is_selected
  } = selectedAddress ?? {};
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [render, setRender] = useState(false);
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");

  const { mutate: editAddress, isLoading: editLoader } = useEditAddress();
  const { mutate: createAddress, isLoading: createLoader } = useCreateAddress();

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
  const onFormSubmit = (data: Inputs): void => {
    console.log("onFormSubmit", data);
    const {
      firstName,
      lastName,
      email,
      phnCode,
      phnNumber,
      address,
      address2,
      city,
      zip,
      country,
      state
    } = data ?? {};

    const formData: FormData = new FormData();
    if (id) {
      formData.append("partner_id", `${id}`);
    }
    formData.append("first_name", `${firstName}`);
    formData.append("last_name", `${lastName}`);
    formData.append(
      "email",
      `${type != "Billing address" ? email : selectedAddress?.email}`
    );
    formData.append("phone", `${phnCode} ${phnNumber}`);
    formData.append("street", `${address}`);
    formData.append("street2", `${address2}`);
    formData.append("city", `${city}`);
    formData.append("state_id", `${state}`);
    formData.append("zip", `${zip}`);
    formData.append("country_id", `${country}`);
    // formData.append("type", `${type}`);
    if (id) {
      editAddress(formData, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          reset();
          toastSuccess(data?.data?.message ?? "Address updated successfully.");
          handleClose();
        },
        onError: (data: any) => {
          toastError(data?.data?.message ?? "Something went wrong.");
          handleClose();
        }
      });
    } else {
      createAddress(formData, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          reset();
          toastSuccess(
            data?.response?.data?.message ?? "Address created successfully."
          );
          handleClose();
        },
        onError: (data: any) => {
          toastError(data?.response?.data?.message ?? "Something went wrong.");
          handleClose();
        }
      });
    }
  };
  const getSelectedItemsData = useMemo(() => {
    let filteredList = [];
    if (country_id) {
      setSelectedCountryId(country_id[0]);
      filteredList = country_id
        ? countryList?.filter((_i: any) => _i?.id == country_id[0])
        : [];
      if (filteredList?.length > 0) {
        setValue("country", filteredList[0]?.id);
        setValue("phnCode", filteredList[0]?.phone_code);
        setValue("state", state_id ? state_id[0] : "");
      }
    }
    return filteredList;
  }, [country_id]);
  // const getSelectedItemsState = useMemo(() => {
  //   let filteredList = [];
  //   if (state_id) {
  //     filteredList =
  //       state_id && stateList
  //         ? stateList?.filter((_i: any) => _i?.id == state_id[0])
  //         : [];
  //     setValue("state", filteredList?.id);
  //   }
  //   return filteredList;
  // }, [state_id, stateList]);

  useEffect(() => {
    if (open) {
      setValue("firstName", !!first_name ? first_name : "");
      setValue("lastName", !!last_name ? last_name : "");
      setValue("email", email ?? "");
      setValue("phnCode", getSelectedItemsData[0]?.phone_code);
      setValue(
        "phnNumber",
        phone
          ? phone?.split(" ").length == 1
            ? phone?.split(" ")[0]
            : phone?.split(" ")[1]
          : ""
      );
      setValue("address", !!street && street != "false" ? street : "");
      setValue("address2", !!street2 && street2 != "false" ? street2 : "");
      setValue("country", getSelectedItemsData[0]?.id);
      setValue("state", !!state_id && !!state_id[0] ? state_id[0] : "");
      setValue("city", !!city && city != "false" ? city : "");
      setValue("zip", !!zip && zip != "false" ? zip : "");
    }
    setRender(!render);
  }, [open]);
  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });

  console.log("AddressModal in add more", id);
  console.log("AddressModal selectedAddress", selectedAddress);

  return (
    <>
      <MuiModalWrapper
        open={open}
        onClose={() => {
          handleClose();
          reset();
        }}
        title=""
      >
        <Box className="checkout_modal">
          <Box className="billing_adress">
            <Typography variant="h4" className="form_header">
              {type}
            </Typography>
            <CheckOutAddressWrap>
              <form onSubmit={handleSubmit(onFormSubmit)} id="form-modal">
                <Grid container spacing={2} className="billing_adress_grid">
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      // defaultValue={name ? name?.split(" ")[0] : ""}
                      defaultValue={!!first_name ? first_name : ""}
                      placeholder="First name"
                      style3
                      {...register("firstName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {/* <InputFieldCommon
                      defaultValue={name?.split(" ")[0]??''}
                      placeholder="Email"
                      style3
                      {...register("email")}
                    /> */}
                    {errors?.firstName && (
                      <div className="profile_error">
                        {errors?.firstName?.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      // defaultValue={name ? name?.split(" ")[1] : ""}
                      defaultValue={!!last_name ? last_name : ""}
                      placeholder="Last name"
                      style3
                      {...register("lastName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {errors?.lastName && (
                      <div className="profile_error">
                        {errors?.lastName?.message}
                      </div>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <InputFieldCommon
                      defaultValue={email ?? ""}
                      placeholder="Email"
                      style3
                      {...register("email")}
                      disabled={type == "Billing address"}
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
                        className={"space_between"}
                        style={{ alignItems: "flex-start" }}
                      >
                        <Box
                          className={`form_group_inner_full form_group_inner`}
                        >
                          <Autocomplete
                            id="phonecode-select-demo"
                            className="autocomplete_div"
                            sx={{ width: 300 }}
                            // filterOptions={filterPhoneOptions}
                            filterOptions={filterPhnCdCountryOptions}
                            // value={selectedValues?.phnCode}
                            defaultValue={getSelectedItemsData[0]}
                            onChange={(event: any, newValue: any | null) => {
                              console.log("country", newValue);
                              // setSelectedCountryId(
                              //   newValue ? newValue?.id : ""
                              // );
                              setValue(
                                "phnCode",
                                newValue ? newValue?.phone_code : ""
                              );
                              // setSelectedValues({
                              //   ...selectedValues,
                              //   phnCode: newValue
                              // });
                            }}
                            // options={filterPhoneCodes ?? []}
                            options={countryList ?? []}
                            // options={recomendedCountryList ?? []}
                            disabled={countryLoader}
                            autoHighlight
                            // getOptionLabel={(option: any) => option?.id}
                            getOptionLabel={(option: any) =>
                              `${option?.phone_code} ${option.name ?? ""}`
                            }
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{
                                  "& > img": {
                                    mr: 2,
                                    flexShrink: 0
                                  }
                                }}
                                {...props}
                              >
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={`${process.env.NEXT_APP_BASE_URL}/${option?.image_url}`}
                                  alt=""
                                />
                                {" +"}
                                {option.phone_code} {option.name ?? ""}
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
                      defaultValue={
                        phone
                          ? phone?.split(" ").length == 1
                            ? phone?.split(" ")[0]
                            : phone?.split(" ")[1]
                          : ""
                      }
                      // type="number"
                      placeholder="Phone number"
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
                      defaultValue={street ?? ""}
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
                      defaultValue={street2 ?? ""}
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
                        className={"space_between"}
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
                            defaultValue={getSelectedItemsData[0]}
                            onChange={(event: any, newValue: any | null) => {
                              console.log("country", newValue);
                              setSelectedCountryId(
                                newValue ? newValue?.id : ""
                              );
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
                              {errors?.country?.message}
                            </div>
                          )}
                        </Box>
                        {(!!state_id ||
                          (stateList && stateList.length > 0)) && (
                          <Box className="form_group_inner">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              className="autocomplete_div"
                              // {...register("state")}
                              options={stateList ?? []}
                              sx={{ width: 300 }}
                              // disabled={
                              //   (!selectedCountryId && !stateLoder) ||
                              //   (state_id)
                              // }
                              getOptionLabel={(option: any) => option.name}
                              //   value={selectedValues?.state}
                              // defaultValue={getSelectedItemsState[0]}
                              defaultValue={
                                state_id
                                  ? {
                                      id: state_id[0],
                                      name: state_id[1]
                                    }
                                  : null
                              }
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
                                {errors?.state?.message}
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
                      defaultValue={city ?? ""}
                      style3
                      {...register("city")}
                    />
                    {errors?.city && (
                      <div className="profile_error">
                        {errors?.city?.message}
                      </div>
                    )}
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <InputFieldCommon
                      placeholder="ZIP code"
                      defaultValue={zip ?? ""}
                      style3
                      {...register("zip")}
                    />
                    {errors?.zip && (
                      <div className="profile_error">
                        {errors?.zip?.message}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </form>
            </CheckOutAddressWrap>
            {/* <FormControlLabel
              control={<Checkbox />}
              label="Ship to the same address"
            /> */}
          </Box>
          {!editLoader || !createLoader ? (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn mx-auto"
              type="submit"
              // onClick={handleClose}
              form="form-modal"
            >
              <Typography variant="body1">Save</Typography>
            </CustomButtonPrimary>
          ) : (
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="payment_bill_btn mx-auto"
              // type="submit"
              // // onClick={handleClose}
              // form="form-modal"
            >
              <ButtonLoader />
            </CustomButtonPrimary>
          )}
        </Box>
      </MuiModalWrapper>
    </>
  );
};

export default memo(AddressModal);
