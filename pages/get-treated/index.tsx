import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useContactUs,
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactWrapper } from "@/styles/StyledComponents/ContactWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomRadio from "@/ui/CustomRadio/CustomRadio";
import CallIcon from "@/ui/Icons/CallIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  createFilterOptions
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  phnCode: string | undefined;
  phone: string;
  country: string;
  state: string;
  zipCode: string;
};
const exceptThisSymbols = ["e", "E", "+", "-", "."];

export default function Index() {
  const { toastSuccess, toastError } = useNotiStack();
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [hasUserConcent, setHasUserConcent] = useState(false);
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null
  });

  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const { mutate: contactUsPost, isLoading } = useContactUs();
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
    ...(stateList && stateList.length > 0
      ? { state: yup.string().required(validationText.error.state) }
      : {})
  });
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
  const onFormSubmit = (data: Inputs) => {
    const {
      email,
      firstName,
      lastName,
      phnCode,
      phone,
      country,
      state,
      zipCode
    } = data ?? {};
    const formData: any = new FormData();
    formData.append("type", "consumer");
    formData.append("first_name", firstName);
    formData.append("email_from", email);
    formData.append("zip", zipCode);
    formData.append("phone", `${phnCode} ${phone}`);
    // formData.append("message", source);
    formData.append("country_id", country);
    if (stateList && stateList.length > 0) {
      formData.append("state_id", state ?? "");
    }
    contactUsPost(formData, {
      onSuccess: (data: any) => {
        reset();
        setSelectedValues({
          phnCode: null,
          language: null,
          country: null,
          state: null
        });
        setHasUserConcent(false)
        toastSuccess(data?.data?.message);
      },
      onError: (data: any) => {
        // reset();
        // setSelectedValues({
        //   phnCode: null,
        //   language: null,
        //   country: null,
        //   state: null
        // });
        toastError(data?.response?.data?.message);
      }
    });
    console.log("onFormSubmit", data);
  };
  const filterCountryOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name
  });
  const filterPhoneCodes = useMemo(() => {
    return userGivenPhoneCode == "" || userGivenPhoneCode == undefined
      ? countryList
      : countryList?.filter((_i: any) => _i?.phone_code == userGivenPhoneCode);
  }, [userGivenPhoneCode, countryList]);
  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });
  console.log("hasUserConcent", hasUserConcent);
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Get Treated"
        innerHeaderRediractedPage="Get Treated"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
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
              alignItems="flex-end"
            >
              <Grid item xl={5} lg={6} md={6} xs={12}>
                <figure>
                  <Image
                    src={assest?.contact_image}
                    alt="image"
                    width={700}
                    height={600}
                  />
                </figure>
              </Grid>
              <Grid item xl={7} lg={5} md={6} xs={12}>
                <Box className="contact_form">
                  <Box className="sec_title">
                    <Typography variant="h4">
                      Please enter your information below and a local
                      practitioner in your area will reach out.
                    </Typography>
                    {/* <Typography variant="h5">
                                            <CallIcon IconColor={primaryColors?.text_purple} />
                                            Give us a call at:
                                            <Link href="tel:855.577.6235">855.577.6235</Link>
                                        </Typography> */}
                  </Box>
                  <form onSubmit={handleSubmit(onFormSubmit)} id="contact_form">
                    <Box className="form_group">
                      <InputFieldCommon
                        placeholder="First name"
                        {...register("firstName")}
                        // onKeyDown={(e: any) =>
                        //   [' '].includes(e.key) && e.preventDefault()
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
                        placeholder="Last name"
                        {...register("lastName")}
                        // onKeyDown={(e: any) =>
                        //   [' '].includes(e.key) && e.preventDefault()
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
                            id="phonecode-select-demo"
                            className="autocomplete_div"
                            sx={{ width: 300 }}
                            filterOptions={
                              filterPhnCdCountryOptions
                            }
                            // filterOptions={filterPhoneOptions}
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
                            // options={filterPhoneCodes ?? []}
                            options={countryList ?? []}
                            disabled={countryLoader}
                            autoHighlight
                            // getOptionLabel={(option: any) => option?.id}
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
                        <Box className="phn_num">
                          <InputFieldCommon
                            placeholder="Phone number"
                            // type="number"
                            {...register("phone")}
                            onKeyDown={(e: any) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
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
                        style={{
                          alignItems: "flex-start",
                          marginBottom: "15px"
                        }}
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
                            sx={{ width: 300 }}
                            value={selectedValues?.country}
                            onChange={(event: any, newValue: any | null) => {
                              console.log("country", newValue);
                              setSelectedCountryId(
                                newValue ? newValue?.id : ""
                              );
                              setValue("country", newValue ? newValue?.id : "");
                              setSelectedValues({
                                ...selectedValues,
                                country: newValue
                              });
                            }}
                            filterOptions={filterCountryOptions}
                            options={
                              countryList && countryList?.length > 0
                                ? countryList?.filter(
                                  (_i: any) => _i?.phone_code == 1
                                )
                                : []
                            }
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
                            {errors.state && !selectedValues.state && (
                              <div className="profile_error">
                                {errors.state.message}
                              </div>
                            )}
                          </Box>
                        )}
                      </div>
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
                  </form>

                  <Box className="form_btm_sec">
                    <Box className="option_sec">
                      <FormControlLabel
                        onChange={(e: any) => setHasUserConcent(e.target.checked)}
                        control={<Checkbox />}
                        label="I give Procell Therapies permission to share information with local practitioners offering treatments."
                      />
                    </Box>
                    {!isLoading ? (
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                        form="contact_form"
                        disabled={!hasUserConcent}
                      >
                        <Typography>Submit</Typography>
                      </CustomButtonPrimary>
                    ) : (
                      <CustomButtonPrimary variant="contained" color="primary">
                        <ButtonLoader />
                      </CustomButtonPrimary>
                    )}
                    <Typography>
                      Protected by reCAPTCHA, &nbsp;
                      <Link href="/privacy-policy">Privacy Policy</Link> &{" "}
                      <Link href="/terms-of-service">Terms of Service</Link>
                      &nbsp; apply.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContactWrapper>
    </Wrapper>
  );
}
