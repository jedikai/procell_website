import {
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import { ContactWrapper } from "@/styles/StyledComponents/ContactWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  phnCode: string | undefined;
  phone: string;
  country: string;
  state: string;
  company?: string;
  zipCode: string;
};

const exceptThisSymbols = ["e", "E", "+", "-", "."];

const ReferralForm = ({
  isCompanyAdded,
  getFormData,
  resetForm,
  buttonLoader
}: any) => {
  const router = useRouter();
  const { query } = router;
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email),
    firstName: yup.string().required(validationText.error.first_name),
    lastName: yup.string().required(validationText.error.last_name),
    phnCode: yup.string().required(validationText.error.phone_code),
    phone: yup
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
    country: yup.string().required(validationText.error.country),
    zipCode: yup
      .string()
      .required(validationText.error.zipCode)
      // .matches(/^\d+$/, "ZIP code must contain only numbers")
      .max(8, "ZIP code must contain valid six character code."),
    ...(!!isCompanyAdded
      ? {
          company: yup.string().required(validationText.error.company)
        }
      : {})
  });

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const filterCountryOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name
  });

  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );

  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null
  });

  const onFormSubmit = (data: any) => {
    const {
      email,
      language,
      firstName,
      lastName,
      phnCode,
      phone,
      country,
      state,
      company,
      zipCode,
      source,
      refference,
      type
    } = data;
    const formData: any = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email_from", email);
    formData.append("phone", `${phnCode} ${phone}`);
    formData.append("country_id", country);
    if (stateList && stateList.length > 0) {
      formData.append("state_id", state ?? "");
    }
    if (!!isCompanyAdded) {
      formData.append("partner_name", company);
    }
    formData.append("zip", zipCode);
    getFormData(formData);
  };

  useEffect(() => {
    if (!!resetForm) {
      reset();
      setValue("country", "");
      setValue("phnCode", "");
      setValue("state", "");
      setSelectedValues({
        phnCode: null,
        language: null,
        country: null,
        state: null
      });
    }
  }, [resetForm]);
  console.log("form erre", errors);
  return (
    <ContactWrapper className="cmn_gap">
      <Image
        src={assest?.blue_leaf}
        alt="leaf image"
        width={155}
        height={190}
        className="blue_leaf"
      />

      <Image
        src={assest?.pink_leaf}
        alt="leaf image"
        width={155}
        height={190}
        className="pink_leaf"
      />

      <Image
        src={assest?.pink_leaf}
        alt="leaf image"
        width={155}
        height={190}
        className="small_pink_leaf"
      />

      <Container fixed>
        <Box className="contact_sec">
          <Grid
            container
            spacing={{ xl: 4, lg: 2, md: 2, xs: 4 }}
            alignItems=""
          >
            <Grid item xl={4} lg={5} md={5} xs={12} className="left_grid">
              <figure>
                <Image
                  src={assest?.contact_image}
                  alt="image"
                  width={700}
                  height={600}
                />
              </figure>
            </Grid>
            <Grid item xl={8} lg={7} md={7} xs={12}>
              <Box className="contact_form">
                <Box className="sec_title">
                  <Typography variant="h4">
                    Get Started with Procell Today!
                  </Typography>
                </Box>

                <form id="contact_form" onSubmit={handleSubmit(onFormSubmit)}>
                  <Box className="form_group">
                    <InputFieldCommon
                      tabIndex={0}
                      placeholder="First name"
                      {...register("firstName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {errors.firstName && (
                      <div className="profile_error">
                        {errors.firstName.message}
                      </div>
                    )}
                  </Box>
                  <Box className="form_group">
                    <InputFieldCommon
                      tabIndex={1}
                      placeholder="Last name"
                      {...register("lastName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {errors.lastName && (
                      <div className="profile_error">
                        {errors.lastName.message}
                      </div>
                    )}
                  </Box>
                  <Box className="form_group">
                    <div
                      className="justify_start autocomplete_wrap"
                      style={{ alignItems: "flex-start" }}
                    >
                      <Box className="phn_code">
                        <Autocomplete
                          tabIndex={2}
                          id="phonecode-select-demo"
                          className="autocomplete_div"
                          sx={{ width: 300 }}
                          // filterOptions={filterPhoneOptions}
                          filterOptions={filterPhnCdCountryOptions}
                          value={selectedValues?.phnCode}
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
                          options={countryList ?? []}
                          // options={filterPhoneCodes ?? []}
                          // options={recomendedCountryList ?? []}
                          disabled={countryLoader}
                          autoHighlight
                          // getOptionLabel={(option: any) => option?.id}
                          getOptionLabel={(option: any) =>
                            ` +${option?.phone_code} ${option.name}`
                          }
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{
                                "& > img": { mr: 2, flexShrink: 0 }
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
                      <Box className="phn_num">
                        <InputFieldCommon
                          tabIndex={4}
                          placeholder="Phone number"
                          // type="number"
                          {...register("phone")}
                          onKeyDown={(e: any) =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                          // {...register("phone", {
                          //   max: 3
                          // })}
                        />
                        {errors.phone && (
                          <div className="profile_error">
                            {errors.phone.message}
                          </div>
                        )}
                      </Box>
                    </div>
                  </Box>
                  <Box className="form_group">
                    <InputFieldCommon
                      tabIndex={5}
                      placeholder="Email address"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="profile_error">
                        {errors.email.message}
                      </div>
                    )}
                  </Box>
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
                          tabIndex={7}
                          id="country-select-demo"
                          className="autocomplete_div"
                          sx={{ width: 300 }}
                          filterOptions={filterCountryOptions}
                          value={selectedValues?.country}
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
                          // options={recomendedCountryList ?? []}
                          disabled={countryLoader}
                          autoHighlight
                          getOptionLabel={(option: any) => option.name}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{
                                "& > img": { mr: 2, flexShrink: 0 }
                              }}
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
                              placeholder="Choose a country"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password" // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        {errors.country && !selectedValues.country && (
                          <div className="profile_error">
                            {errors.country.message}
                          </div>
                        )}
                      </Box>
                      {stateList && stateList.length > 0 && (
                        <Box className="form_group_inner">
                          <Autocomplete
                            tabIndex={8}
                            disablePortal
                            id="combo-box-demo"
                            className="autocomplete_div"
                            // {...register("state")}
                            options={stateList ?? []}
                            sx={{ width: 300 }}
                            disabled={!selectedCountryId && !stateLoder}
                            getOptionLabel={(option: any) => option.name}
                            value={selectedValues?.state}
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
                              <TextField {...params} placeholder="State" />
                            )}
                          />
                          {errors.state && (
                            <div className="profile_error">
                              {errors.state.message}
                            </div>
                          )}
                        </Box>
                      )}
                    </div>
                  </Box>
                  {!!isCompanyAdded && (
                    <Box className="form_group">
                      <InputFieldCommon
                        tabIndex={9}
                        placeholder="Your company name"
                        {...register("company")}
                      />
                      {errors.company && (
                        <div className="profile_error">
                          {errors.company.message}
                        </div>
                      )}
                    </Box>
                  )}
                  <Box className="form_group">
                    <InputFieldCommon
                      placeholder="Zip code"
                      {...register("zipCode")}
                    />
                    {errors.zipCode && (
                      <div className="profile_error">
                        {errors.zipCode.message}
                      </div>
                    )}
                  </Box>
                  <Box className="form_group">
                    {!buttonLoader ? (
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                        form="contact_form"
                      >
                        <Typography>Submit</Typography>
                      </CustomButtonPrimary>
                    ) : (
                      <CustomButtonPrimary variant="contained" color="primary">
                        <ButtonLoader />
                      </CustomButtonPrimary>
                    )}
                    <Typography style={{marginTop:'19px'}}>
                      Protected by reCAPTCHA, &nbsp;
                      <Link href="/privacy-policy">Privacy Policy</Link> &{" "}
                      <Link href="/terms-of-service">Terms of Service</Link>
                      &nbsp; apply.
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ContactWrapper>
  );
};

export default memo(ReferralForm);
