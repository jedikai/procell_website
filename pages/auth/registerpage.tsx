/* eslint-disable import/no-extraneous-dependencies */
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { useCountryList } from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import { useConsumerSignUp } from "@/hooks/react-qurey/query-hooks/signUpQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
import { LoginPageWrapper } from "@/styles/StyledComponents/LoginPageWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import validationText from "../../json/messages/validationText";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  phnCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
  practitioner_info: string;
  is_treatment_used_before: string;
};

const exceptThisSymbols = ["e", "E", "+", "-", "."];
const phoneRegExp = /^[0-9]{10}$/;
// <------------------ REGISTRATION FORM VALIDATION SCHEMA ------------------>
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
  password: yup
    .string()
    .required(validationText.error.enter_password)
    .min(2, validationText.error.min_8_password),
  confirmPassword: yup
    .string()
    .required(validationText.error.confirm_password)
    .oneOf([yup.ref("password"), null], validationText.error.match_password) // Check if it matches the 'password' field
});

const Registerpage = () => {
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const [render, setRender] = useState(true);
  const [isUserHadTherapies, setIsUserHadTherapies] = useState<boolean>(true);
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null
  });
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const { mutate: consumerSignUp, isLoading } = useConsumerSignUp();
  const { data: countryList, isLoading: countryLoader } = useCountryList();

  const onFormSubmit = (data: Inputs) => {
    const {
      email,
      firstName,
      lastName,
      phone,
      phnCode,
      password,
      confirmPassword,
      practitioner_info
    } = data;
    const formData: FormData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("login", email);
    formData.append("phone", `${phnCode} ${phone}`);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    formData.append("is_treatment_used_before", isUserHadTherapies ? "1" : "0");
    formData.append(
      "practitioner_info",
      isUserHadTherapies ? practitioner_info : ""
    );
    consumerSignUp(formData, {
      onSuccess: (response) => {
        const { status, data } = response;
        router.push("/login");
        // if (status == 200) {
        //   console.log("onSuccess", response);
        //   router.push("/auth/login");
        // } else {
        //   toastError(data ? data?.message : "Something went wrong.");
        // }
      },
      onError: (error: any) => {
        const { message } = error;
        console.log("onError", error);
        toastError(
          error ? error?.response?.data?.message : "Something went wrong."
        );
      }
    });
  };

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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userLoginStatus: boolean =
  //       !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
  //     if (userLoginStatus) {
  //       router.push("/dashboard/profile");
  //       setRender(false);
  //     } else {
  //       setRender(true);
  //     }
  //   }
  // }, []);

  return (
    <>
      {render ? (
        <LoginWrapper title="welcome TO PROCELL">
          <LoginPageWrapper>
            <Box className="wrapper">
              <Link href="/">
                <Image
                  src={assest.logo_img}
                  alt="procell"
                  width={143}
                  height={54}
                />
              </Link>
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box className="form_body form_body2">
                  <Typography variant="h4">REGISTER NOW</Typography>

                  <Box className="input_wrap">
                    <InputFieldCommon
                      placeholder="Email"
                      style2
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="error">{errors.email.message}</div>
                    )}
                    <InputFieldCommon
                      placeholder="First Name"
                      style2
                      {...register("firstName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {errors.firstName && (
                      <div className="error">{errors.firstName.message}</div>
                    )}
                    <InputFieldCommon
                      placeholder="Last Name"
                      style2
                      {...register("lastName")}
                      // onKeyDown={(e: any) =>
                      //   [" "].includes(e.key) && e.preventDefault()
                      // }
                    />
                    {errors.lastName && (
                      <div className="error">{errors.lastName.message}</div>
                    )}
                    <Stack className="phone_num_wrap">
                      <div className="autocomplete_wrap">
                        <Autocomplete
                          id="phonecode-select-demo"
                          className="autocomplete_div"
                          sx={{ width: 300 }}
                          // filterOptions={filterOptions}
                          filterOptions={filterPhnCdCountryOptions}
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
                          // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                          getOptionLabel={(option: any) =>
                            ` +${option?.phone_code} ${option.name}`
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
                                // onChange={(e) =>
                                //   setUserGivenPhoneCode(e.target.value)
                                // }
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
                          <div
                            className="phnCode_error"
                            style={{ marginLeft: "10px" }}
                          >
                            {errors.phnCode.message}
                          </div>
                        )}
                      </div>
                      <div className="autocomplete_right">
                        <InputFieldCommon
                          placeholder="Phone Number"
                          style2
                          // type="number"
                          {...register("phone")}
                          onKeyDown={(e: any) =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                        />
                        {errors.phone && (
                          <div className="error">{errors.phone.message}</div>
                        )}
                      </div>
                    </Stack>

                    <InputFieldCommon
                      placeholder="Password"
                      style2
                      isPassword
                      type="number"
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="error">{errors.password.message}</div>
                    )}
                    <InputFieldCommon
                      placeholder="Confirm Password"
                      isPassword
                      style2
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <div className="error">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </Box>
                  <Box className="radio_btn_grp">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Have you received a procell therapies treatment before?
                      </FormLabel>
                      <RadioGroup
                        className="checkbox_wrapper "
                        defaultValue="true"
                      >
                        <FormControlLabel
                          value="true"
                          control={
                            <Radio
                              icon={<RadioUncheckedIcon />}
                              checkedIcon={<RadioCheckedIcon />}
                            />
                          }
                          label="Yes, I have"
                          onChange={() => setIsUserHadTherapies(true)}
                          // {...register("consent")}
                        />
                        <FormControlLabel
                          value="false"
                          control={
                            <Radio
                              icon={<RadioUncheckedIcon />}
                              checkedIcon={<RadioCheckedIcon />}
                            />
                          }
                          label="No, I have not"
                          onChange={() => setIsUserHadTherapies(false)}
                          // {...register("consent")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  {isUserHadTherapies && (
                    <Box className="form_group_textarea text-area-one">
                      <InputFieldCommon
                        placeholder="Please let us know the practitioner information here"
                        multiline
                        rows={3}
                        maxRows={4}
                        style3
                        {...register("practitioner_info")}
                      />
                    </Box>
                  )}
                  <Box className="btn_wrapper">
                    {!isLoading ? (
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        <Typography variant="body1">Sign Up</Typography>
                      </CustomButtonPrimary>
                    ) : (
                      <CustomButtonPrimary variant="contained" color="primary">
                        <ButtonLoader />
                      </CustomButtonPrimary>
                    )}
                  </Box>

                  <Typography variant="body1" className="form_bottom">
                    Already have an account?{" "}
                    <Link href="/auth/login">Login Now</Link>
                  </Typography>
                </Box>
              </form>
            </Box>
          </LoginPageWrapper>
        </LoginWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default Registerpage;
