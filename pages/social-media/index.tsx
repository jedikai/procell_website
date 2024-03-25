import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import CustomFileInput from "@/components/CustomFileInput/CustomFileInput";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useContactUs,
  useCountryList,
  useLanguageList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactWrapper } from "@/styles/StyledComponents/ContactWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { StringLocale } from "yup/lib/locale";

type Inputs = {
  email: string;
  language: StringLocale;
  firstName: string;
  lastName: string;
  phnCode: string | undefined;
  phone: string;
  country: string;
  state: string;
  company?: string;
  zipCode: string;
  source: string;
  refference: string;
  type: boolean;
  proof_of_conversation: any;
  url?: string;
  social_media?: string;
};

const exceptThisSymbols = ["e", "E", "+", "-", "."];
const phoneRegExp = /^[0-9]{10}$/;
const regex = /^[0-9]+$/;

const socialMediaList = [
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "TikTok" },
  { name: "Twitter" }
];
// <------------------ REGISTRATION FORM VALIDATION SCHEMA ------------------>

export default function Index() {
  const { toastSuccess, toastError } = useNotiStack();
  // const userGivenPhoneCode = useRef("");
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [consent, setConsent] = useState("professional");
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null,
    social_media: null
  });
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email),
    proof_of_conversation: yup
      .mixed()
      .required("File is required")
      .test("fileSize", "File size must be less than 10MB", (value) => {
        if (!value) {
          // File is not required, so it's considered valid if not present
          return true;
        }

        // 10MB in bytes
        const maxSizeInBytes = 10 * 1024 * 1024;

        return value && value.size <= maxSizeInBytes;
      }),
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
    // phone: yup
    //   .string()
    //   .matches(phoneRegExp, validationText.error.valid_phone_number)
    //   .required(validationText.error.phone),
    country: yup.string().required(validationText.error.country),
    ...(consent === "professional"
      ? {
          language: yup.string().required(validationText.error.language),
          // country: yup.string().required(validationText.error.country),
          // state: yup.string().required(validationText.error.state),
          // company: yup.string().required(validationText.error.company)
          source: yup.string().required(validationText.error.source),
          url: yup.string().required(validationText.error.url),
          social_media: yup.string().required(validationText.error.social_media)
        }
      : {
          zipCode: yup
            .string()
            .required(validationText.error.zipCode)
            // .matches(/^\d+$/, "ZIP code must contain only numbers")
            .max(8, "ZIP code must contain valid six character code.")
        })
  });
  const radioChekcList = [
    {
      value: "professional",
      label: "I am a licensed professional."
    },
    {
      value: "consumer",
      label: "I am a consumer looking to get a treatment."
    }
  ];
  const { mutate: contactUsPost, isLoading } = useContactUs();
  const { data: languageList, isLoading: languageLoader } = useLanguageList();
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
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
      proof_of_conversation,
      type,
      url,
      social_media
    } = data;
    const formData: any = new FormData();
    if (consent == "professional") {
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email_from", email);
      formData.append("proof_of_conversation", proof_of_conversation);
      formData.append("phone", `${phnCode} ${phone}`);
      formData.append("message", source);
      formData.append("have_been_in_contact", refference);
      formData.append("procell_lead_webform", true);
      formData.append("type", consent);

      formData.append("prefer_lang_id", language);
      formData.append("country_id", country);
      if (stateList && stateList.length > 0) {
        formData.append("state_id", state ?? "");
      }
      formData.append("partner_name", company);
      formData.append("social_media",social_media?.toLocaleLowerCase());
      formData.append("social_media_url", url);
    }

    if (consent == "consumer") {
      formData.append("type", consent);
      formData.append("first_name", firstName);
      formData.append("email_from", email);
      formData.append("zip", zipCode);
      formData.append("phone", `${phnCode} ${phone}`);
      formData.append("message", source);
      formData.append("country_id", country);
      if (stateList && stateList.length > 0) {
        formData.append("state_id", state ?? "");
      }
    }
    contactUsPost(formData, {
      onSuccess: (data: any) => {
        reset();
        setSelectedValues({
          phnCode: null,
          language: null,
          country: null,
          state: null,
          social_media: null
        });
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
  const consentHandler = (data: string) => {
    setValue("type", data == "professional");
    setConsent(data);
  };
  console.log("languageList", errors);

  const filterCountryOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name
  });

  const filterPhoneCodes = useMemo(() => {
    return userGivenPhoneCode == "" || userGivenPhoneCode == undefined
      ? countryList
      : countryList?.filter((_i: any) => _i?.phone_code == userGivenPhoneCode);
  }, [userGivenPhoneCode, countryList]);

  const getProofFile = useCallback(
    (data: any) => setValue("proof_of_conversation", data),
    []
  );

  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });

  console.log("countryList===========>", errors);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Contact us"
        innerHeaderRediractedPage="Contact Us"
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
              <Grid item xl={5} lg={6} md={6} xs={12} className="left_grid">
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
                  {/* <Box className="sec_title">
                    <Typography variant="h4">
                      Please share your information below
                    </Typography>
                    <Typography variant="h5">
                      <CallIcon IconColor={primaryColors?.text_purple} />
                      Give us a call at:
                      <Link href="tel:855.577.6235">855.577.6235</Link>
                    </Typography>
                  </Box> */}
                  <form onSubmit={handleSubmit(onFormSubmit)} id="contact_form">
                    <Box className="form_group">
                      <InputFieldCommon
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
                      <CustomFileInput getProofFile={getProofFile} />
                      {errors.proof_of_conversation && (
                        <div className="profile_error">
                          {`${errors.proof_of_conversation.message}`}
                        </div>
                      )}
                    </Box>
                    {consent == "professional" ? (
                      <>
                        <Box className="form_group">
                          {/* <InputFieldCommon
                            placeholder="Preffered Language"
                            {...register("language")}
                          /> */}
                          <Autocomplete
                            id="language-select-demo"
                            className="autocomplete_div"
                            sx={{ width: 300 }}
                            value={selectedValues?.language}
                            onChange={(event: any, newValue: any | null) => {
                              setValue(
                                "language",
                                newValue ? newValue?.id : ""
                              );
                              setSelectedValues({
                                ...selectedValues,
                                language: newValue
                              });
                            }}
                            options={languageList ?? []}
                            disabled={languageLoader}
                            autoHighlight
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.name}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                // {...register("country")}
                                // label="Choose a country"
                                placeholder="Preferred Language"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password" // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {errors.language && !selectedValues.language && (
                            <div className="profile_error">
                              {errors?.language.message}
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
                                id="country-select-demo"
                                className="autocomplete_div"
                                sx={{ width: 300 }}
                                filterOptions={filterCountryOptions}
                                value={selectedValues?.country}
                                onChange={(
                                  event: any,
                                  newValue: any | null
                                ) => {
                                  console.log("country", newValue);
                                  setSelectedCountryId(
                                    newValue ? newValue?.id : ""
                                  );
                                  setValue(
                                    "country",
                                    newValue ? newValue?.id : ""
                                  );
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
                                  onChange={(
                                    event: any,
                                    newValue: any | null
                                  ) => {
                                    console.log("state", newValue);
                                    // setSelectedCountryId(newValue ? newValue?.id : "");
                                    setValue(
                                      "state",
                                      newValue ? newValue?.id : ""
                                    );
                                    setSelectedValues({
                                      ...selectedValues,
                                      state: newValue
                                    });
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="State"
                                    />
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
                        <Box className="form_group">
                          <InputFieldCommon
                            placeholder="Your company"
                            {...register("company")}
                          />
                          {errors.company && (
                            <div className="profile_error">
                              {errors.company.message}
                            </div>
                          )}
                        </Box>
                      </>
                    ) : (
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
                                setValue(
                                  "country",
                                  newValue ? newValue?.id : ""
                                );
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
                                onChange={(
                                  event: any,
                                  newValue: any | null
                                ) => {
                                  console.log("state", newValue);
                                  // setSelectedCountryId(newValue ? newValue?.id : "");
                                  setValue(
                                    "state",
                                    newValue ? newValue?.id : ""
                                  );
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
                    )}
                    <Box className="form_group_textarea">
                      <InputFieldCommon
                        placeholder="Message (How did you hear about Procell Therapies?)"
                        multiline
                        rows={3}
                        maxRows={4}
                        style3
                        {...register("source")}
                      />
                      {errors.source && (
                        <div className="profile_error">
                          {errors.source.message}
                        </div>
                      )}
                    </Box>
                    <Box className="form_group_textarea">
                      <InputFieldCommon
                        placeholder="Optional (In contact or referred by a specific Procell rep?)"
                        multiline
                        rows={3}
                        maxRows={4}
                        style3
                        {...register("refference")}
                      />
                    </Box>
                    {/* <--------------------- Client Changes ----------------> */}
                    <Box className="form_group">
                      <div
                        className="space_between"
                        style={{ alignItems: "flex-start" }}
                      >
                        <Box className="form_group_inner">
                          <Autocomplete
                            id="country-select-demo"
                            className="autocomplete_div"
                            sx={{ width: 300 }}
                            onChange={(event: any, newValue: any | null) => {
                              setValue(
                                "social_media",
                                newValue ? newValue?.name : ""
                              );
                              setSelectedValues({
                                ...selectedValues,
                                social_media: newValue?.name
                              });
                            }}
                            options={socialMediaList ?? []}
                            autoHighlight
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.name}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                // {...register("country")}
                                // label="Choose a country"
                                placeholder="Select Platform"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password" // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {errors.social_media &&
                            !selectedValues.social_media && (
                              <div className="profile_error">
                                {errors.social_media.message}
                              </div>
                            )}
                        </Box>
                        <Box className="form_group_inner">
                          <InputFieldCommon
                            placeholder="Enter url"
                            {...register("url")}
                          />
                          {errors.url && (
                            <div className="profile_error">
                              {errors.url.message}
                            </div>
                          )}
                        </Box>
                      </div>
                    </Box>
                  </form>

                  <Box className="form_btm_sec" style={{ marginTop: "10px" }}>
                    {/* <Box className="option_sec">
                      <CustomRadio
                        defaultValue="professional"
                        radioList={radioChekcList}
                        onChange={(e) => consentHandler(e.target.value)}
                      />
                    </Box> */}
                    {!isLoading ? (
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
