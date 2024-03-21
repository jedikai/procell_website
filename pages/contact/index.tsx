import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useContactUs,
  useCountryList,
  useLanguageList,
  usePractitionersMap,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactWrapper } from "@/styles/StyledComponents/ContactWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import ContactusRadioHandler from "@/ui/CustomRadio/ContactusRadioHandler";
import CallIcon from "@/ui/Icons/CallIcon";
import DistacneIcon from "@/ui/Icons/DistacneIcon";
import MailIcon from "@/ui/Icons/MailIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  company: string;
  zipCode: string;
  source: string;
  refference: string;
  type: boolean;
};

const exceptThisSymbols = ["e", "E", "+", "-", "."];
const phoneRegExp = /^[0-9]{10}$/;
const regex = /^[0-9]+$/;
// <------------------ REGISTRATION FORM VALIDATION SCHEMA ------------------>
const recomendedCountryList = [
  {
    id: 233,
    name: "United States",
    phone_code: 1,
    image_url: "/base/static/img/country_flags/us.png"
  },
  {
    id: 38,
    name: "Canada",
    phone_code: 1,
    image_url: "/base/static/img/country_flags/ca.png"
  }
];

export default function Index() {
  const { toastSuccess, toastError, toastWarning } = useNotiStack();
  // const userGivenPhoneCode = useRef("");
  const repDataRef = useRef<HTMLDivElement | null>(null);
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [consent, setConsent] = useState("professional");
  const [isReenterFields, setIsReenterFields] = useState(false);
  const [supportRepData, setSupportRepData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    language: null,
    country: null,
    state: null
  });

  const validationSchema = yup.object().shape({
    ...(consent === "professional"
      ? {
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
            .test(
              "isValid",
              validationText.error.phone_number_range,
              (value) => {
                console.log(value);
                if (value && value?.length >= 8 && value?.length <= 16) {
                  return true;
                } else {
                  return false;
                }
              }
            ),
          country: yup.string().required(validationText.error.country),
          language: yup.string().required(validationText.error.language),
          company: yup.string().required(validationText.error.company),
          source: yup.string().required(validationText.error.source)
        }
      : {
          ...(isReenterFields
            ? {
                firstName: yup
                  .string()
                  .required(validationText.error.first_name),
                lastName: yup.string().required(validationText.error.last_name),
                phnCode: yup.string().required(validationText.error.phone_code),
                phone: yup
                  .string()
                  .required(validationText.error.phone)
                  // .matches(/^\d+$/, validationText.error.valid_phone_number)
                  .test(
                    "isValid",
                    validationText.error.phone_number_range,
                    (value) => {
                      console.log(value);
                      if (value && value?.length >= 8 && value?.length <= 16) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  ),
                email: yup
                  .string()
                  .email(validationText.error.email_format)
                  .required(validationText.error.enter_email)
              }
            : {}),

          country: yup.string().required(validationText.error.country),
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
      label: "I am a licensed practitioner looking to inquire."
    },
    {
      value: "consumer",
      label: "I am looking to get a treatment."
    }
  ];
  const { mutate: contactUsPost, isLoading } = useContactUs();
  const { data: languageList, isLoading: languageLoader } = useLanguageList();
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: practitionersMapData, isLoading: PractitionersMapLoader } =
    usePractitionersMap(consent === "consumer");
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
      type
    } = data;
    const formData: any = new FormData();
    if (consent == "professional") {
      formData.append("type", consent);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email_from", email);
      formData.append("phone", `${phnCode} ${phone}`);
      formData.append("message", source);
      formData.append("have_been_in_contact", refference);
      formData.append("procell_lead_webform", true);

      formData.append("prefer_lang_id", language);
      formData.append("country_id", country);
      if (stateList && stateList.length > 0) {
        formData.append("state_id", state ?? "");
      }
      formData.append("partner_name", company);
    }

    if (consent == "consumer") {
      if (isReenterFields) {
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("phone", `${phnCode} ${phone}`);
        formData.append("email_from", email);
      }

      formData.append("type", consent);
      // formData.append("message", source);
      formData.append("country_id", country);
      // if (stateList && stateList.length > 0) {
      //   formData.append("state_id", state ?? "");
      // }
      formData.append("zip", zipCode);
    }
    contactUsPost(formData, {
      onSuccess: (data: any) => {
        setSelectedValues({
          phnCode: null,
          language: null,
          country: null,
          state: null
        });
        reset();
        if (consent == "professional") {
          toastSuccess(data?.data?.message);
        }
        // toastWarning(data?.data?.message, 10000);
        const supportRepDataList =
          !!data?.data?.data && data?.data?.data?.length > 0
            ? data?.data?.data
            : [];
        console.log("data?.data?.email_required", data?.data?.email_required);

        if (consent === "consumer" && data?.data?.email_required) {
          setIsReenterFields(true);
        } else {
          // reset();
        }
        setSupportRepData(supportRepDataList);
        if (repDataRef.current && supportRepDataList?.length > 0) {
          repDataRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center"
          });
        }
      },
      onError: (data: any) => {
        if (data?.response?.status == "424") {
          const supportRepDataList =
            !!data?.data?.data && data?.data?.data?.length > 0
              ? data?.data?.data
              : [];
          console.log("data?.data?.email_required", data?.data?.email_required);

          if (consent === "consumer" && data?.data?.email_required) {
            setIsReenterFields(true);
          } else {
            reset();
          }
          setSupportRepData(supportRepDataList);
          toastWarning(data?.data?.message, 15000);
        } else {
          toastError(data?.response?.data?.message);
        }
      }
    });
    console.log("onFormSubmit", data);
  };
  const consentHandler = (data: string) => {
    setValue("type", data == "professional");
    setConsent(data);
    setSupportRepData([]);
    reset();
  };
  console.log("languageList", errors);

  const filterCountryOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: any) => option.name
  });
  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });

  const filterPhoneCodes = useMemo(() => {
    return userGivenPhoneCode == "" || userGivenPhoneCode == undefined
      ? countryList
      : countryList?.filter((_i: any) => _i?.phone_code == userGivenPhoneCode);
  }, [userGivenPhoneCode, countryList]);

  console.log("countryList===========>", userGivenPhoneCode, filterPhoneCodes);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUserConsumer = localStorage.getItem("isConsumer");
      if (isUserConsumer) {
        setConsent("consumer");
      }
    }
    return () => {
      localStorage.removeItem("isConsumer");
    };
  }, []);
  console.log("practitionersMapData", practitionersMapData);

  return (
    <Wrapper>
      <>
        <InnerHeader
          innerHeaderTitle="Contact Us"
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
                      {consent == "professional" ? (
                        <Typography variant="h4">
                          Average response time is 5 minutes!
                        </Typography>
                      ) : !PractitionersMapLoader &&
                        !!practitionersMapData &&
                        Object.keys(practitionersMapData ?? {})?.length > 0 ? (
                        <Typography variant="h4">
                          {`${practitionersMapData?.count} PRACTITIONERS ARE
                        PERFORMING PROCELL MICROCHANNELING TREATMENTS`}
                        </Typography>
                      ) : (
                        <></>
                      )}
                      {/* <Typography variant="h5">
                      <CallIcon IconColor={primaryColors?.text_purple} />
                      Give us a call at:
                      <Link href="tel:855.577.6235">855.577.6235</Link>
                    </Typography> */}
                    </Box>
                    <Box className="option_sec">
                      <ContactusRadioHandler
                        defaultValue={consent}
                        RadioGroupValue={consent}
                        radioList={radioChekcList}
                        onChange={(e) => consentHandler(e.target.value)}
                      />
                    </Box>
                    <form
                      onSubmit={handleSubmit(onFormSubmit)}
                      id="contact_form"
                    >
                      {consent == "professional" ? (
                        <>
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
                                  onChange={(
                                    event: any,
                                    newValue: any | null
                                  ) => {
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
                            <Autocomplete
                              tabIndex={6}
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
                                  placeholder="Preferred language"
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
                                  tabIndex={7}
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
                                    getOptionLabel={(option: any) =>
                                      option.name
                                    }
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
                          <Box className="form_group_textarea">
                            <InputFieldCommon
                              // placeholder="Message (How did you hear about Procell Therapies?)"
                              // placeholder="Message"
                              placeholder="How did you hear about Procell Therapies?"
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
                              tabIndex={10}
                              // placeholder="Optional (In contact or referred by a specific Procell rep?)"
                              // placeholder="Optional"
                              placeholder="In contact with or referred by a specific Procell rep?"
                              multiline
                              rows={3}
                              maxRows={4}
                              style3
                              {...register("refference")}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          {!PractitionersMapLoader &&
                            !!practitionersMapData &&
                            Object.keys(practitionersMapData ?? {})?.length >
                              0 && (
                              <>
                                {isReenterFields && (
                                  <>
                                    <Box className="form_group">
                                      <InputFieldCommon
                                        placeholder="First name"
                                        {...register("firstName")}
                                        // onKeyDown={(e: any) =>
                                        //   [" "].includes(e.key) &&
                                        //   e.preventDefault()
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
                                        //   [" "].includes(e.key) &&
                                        //   e.preventDefault()
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
                                            filterOptions={
                                              filterPhnCdCountryOptions
                                            }
                                            value={selectedValues?.phnCode}
                                            onChange={(
                                              event: any,
                                              newValue: any | null
                                            ) => {
                                              console.log("country", newValue);
                                              // setSelectedCountryId(
                                              //   newValue ? newValue?.id : ""
                                              // );
                                              setValue(
                                                "phnCode",
                                                newValue
                                                  ? newValue?.phone_code
                                                  : ""
                                              );
                                              setSelectedValues({
                                                ...selectedValues,
                                                phnCode: newValue
                                              });
                                            }}
                                            // options={filterPhoneCodes ?? []}
                                            options={countryList ?? []}
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
                                                `${
                                                  params?.inputProps?.value ??
                                                  ""
                                                }`
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
                                          {errors.phnCode &&
                                            !selectedValues.phnCode && (
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
                                              exceptThisSymbols.includes(
                                                e.key
                                              ) && e.preventDefault()
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
                                  </>
                                )}

                                <Box className="form_group">
                                  <div
                                    className="space_between"
                                    style={{
                                      alignItems: "flex-start",
                                      marginBottom: "15px"
                                    }}
                                  >
                                    <Box className="form_group_inner">
                                      <Autocomplete
                                        id="country-select-demo"
                                        className="autocomplete_div"
                                        sx={{ width: 300 }}
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
                                        filterOptions={filterCountryOptions}
                                        // options={countryList ?? []}
                                        options={recomendedCountryList ?? []}
                                        disabled={countryLoader}
                                        autoHighlight
                                        getOptionLabel={(option: any) =>
                                          option.name
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
                                      {errors.country &&
                                        !selectedValues.country && (
                                          <div className="profile_error">
                                            {errors.country.message}
                                          </div>
                                        )}
                                    </Box>
                                    <Box className="form_group_inner">
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
                                  </div>
                                </Box>
                              </>
                            )}
                        </>
                      )}
                    </form>

                    <Box className="form_btm_sec">
                      <Box className="option_sec">
                        {/* <CustomRadio
                        defaultValue="professional"
                        radioList={radioChekcList}
                        onChange={(e) => consentHandler(e.target.value)}
                      /> */}
                      </Box>
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
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                        >
                          <ButtonLoader />
                        </CustomButtonPrimary>
                      )}
                      <Typography>
                        Protected by reCAPTCHA, &nbsp;
                        <Link href="/privacy-policy">
                          Privacy Policy
                        </Link> &{" "}
                        <Link href="/terms-of-service">Terms of Service</Link>
                        &nbsp; apply.
                      </Typography>
                    </Box>
                  </Box>
                  {consent == "consumer" ? (
                    !PractitionersMapLoader &&
                    !!practitionersMapData &&
                    Object.keys(practitionersMapData ?? {})?.length > 0 ? (
                      <Box className="cnt_grid_sec" sx={{ marginTop: "30px" }}>
                        <figure>
                          <img
                            src={practitionersMapData?.image_url}
                            alt="image"
                            width={712}
                            height={667}
                          />
                        </figure>
                      </Box>
                    ) : (
                      <ButtonLoaderSecondary />
                    )
                  ) : (
                    <></>
                  )}

                  <div ref={repDataRef} />
                  <Box className="cnt_grid_btm">
                    <Grid
                      container
                      spacing={2}
                      className="cnt_grid"
                      justifyContent="center"
                    >
                      {!!supportRepData &&
                        supportRepData?.length > 0 &&
                        supportRepData?.map((_i: any, index: number) => (
                          <Grid
                            item
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            key={index + 1}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              flexWrap="wrap"
                              className="rep_user"
                              justifyContent="center"
                            >
                              {!!_i?.image && (
                                <Box className="cnt_image">
                                  <img
                                    src={_i?.image}
                                    alt=""
                                    width={248}
                                    height={264}
                                  />
                                </Box>
                              )}
                              <List disablePadding className="cnt_list">
                                {!!_i?.name && (
                                  <ListItem disablePadding>
                                    <Typography
                                      variant="body1"
                                      className="cnt_text cnt_name"
                                    >
                                      {_i?.name}
                                    </Typography>
                                  </ListItem>
                                )}
                                {!!_i?.distance && !!_i?.unit && (
                                  <ListItem disablePadding className="cnt_item">
                                    <i className="icon">
                                      <DistacneIcon />
                                    </i>
                                    <Typography
                                      variant="body1"
                                      className="cnt_text"
                                    >
                                      <Typography variant="body1">
                                        {_i?.distance} {_i?.unit}
                                      </Typography>
                                      {/* <Link href={`mailto:${_i?.email}`}>{_i?.email}</Link> */}
                                    </Typography>
                                  </ListItem>
                                )}
                                {!!_i?.email && (
                                  <ListItem disablePadding className="cnt_item">
                                    <i className="icon">
                                      <MailIcon />
                                    </i>
                                    <Typography
                                      variant="body1"
                                      className="cnt_text"
                                    >
                                      <Link href={`mailto:${_i?.email}`}>
                                        {_i?.email}
                                      </Link>
                                    </Typography>
                                  </ListItem>
                                )}

                                {!!_i?.phone && (
                                  <ListItem disablePadding className="cnt_item">
                                    <i className="icon">
                                      <CallIcon />
                                    </i>
                                    <Typography
                                      variant="body1"
                                      className="cnt_text"
                                    >
                                      <Link href={`tel:${_i?.phone}`}>
                                        {_i?.phone}
                                      </Link>
                                    </Typography>
                                  </ListItem>
                                )}
                              </List>
                            </Stack>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ContactWrapper>
      </>
    </Wrapper>
  );
}
