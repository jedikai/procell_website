/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import {
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import {
  useDeleteProfile,
  useProfileDetails,
  useUpdateProfile
} from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  refreshProfileImg,
  updatedProfileImg
} from "@/reduxtoolkit/slices/userProfle.slice";
import { ProfileWrapper } from "@/styles/StyledComponents/ProfileWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import EditProfileIcon from "@/ui/Icons/EditProfileIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string | number | undefined;
  state: string | number | undefined;
  phnCode: string | number | undefined;
};

const phoneRegExp = /^[0-9]{10}$/;
const exceptThisSymbols = ["e", "E", "+", "-", "."];
// <------------------ PROFILE VALIDATION SCHEMA ------------------>
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
  address: yup.string().required(validationText.error.address),
  city: yup.string().required(validationText.error.city),
  zipCode: yup
    .string()
    .required(validationText.error.zipCode)
    .max(8, "ZIP code must contain valid six character code."),
  country: yup.string().required(validationText.error.country)
  // state: yup.string().required(validationText.error.state)
});

export default function Profile(): JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { refresh } = useAppSelector((s) => s.userProfileImgSlice);
  const apiGivenDP = useRef<string | null>(null);
  const [apiGivenrofilePic, setApiGivenrofilePic] = useState<
    string | null | undefined
  >(null);
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [changedCountry, setChangedCountry] = useState<string | null>("");
  const [profileDetails, setProfileDetails] = useState<any>({
    first_name: "",
    last_name: "",
    phnCode: "",
    contact: "",
    mail: "",
    address: "",
    city: "",
    pin: "",
    country: "",
    state: "",
    share: false
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { toastSuccess, toastError } = useNotiStack();

  const onProfileDetailsSuccess = (response: any) => {
    const {
      id,
      image_1920_url,
      create_date,
      first_name,
      last_name,
      phone,
      email,
      street,
      street2,
      city,
      zip,
      state_id,
      country_id,
      share
    } = response[0] ?? {};
    setProfileDetails({
      first_name,
      last_name,
      phnCode: phone?.split(" ")[0],
      contact: phone?.split(" ")[1],
      mail: email,
      address:
        `${street}`?.includes("false") || `${street}`?.includes("N/a")
          ? ""
          : street,
      city:
        `${city}`?.includes("false") || `${city}`?.includes("N/a") ? "" : city,
      pin: `${zip}`?.includes("false") || `${zip}`?.includes("N/a") ? "" : zip,
      country: country_id,
      state: state_id,
      share
    });
    apiGivenDP.current = image_1920_url;
    setApiGivenrofilePic(image_1920_url);
    setChangedCountry(country_id[1]);
    // setCookieClient(
    //   "userDetails",
    //   JSON.stringify({
    //     email,
    //     cred: data?.data?.data?.sid,
    //     name: `${first_name} ${last_name}`,
    //     joined: create_date,
    //     dp: image_1920_url
    //   })
    // );
    setValue("phnCode", `${phone?.split(" ")[0]}`);
    setValue("country", country_id[0]);
    setSelectedCountryId(country_id[0]);
    if (state_id) {
      setValue("state", state_id[0]);
    }
    dispatch(updatedProfileImg(image_1920_url));
  };
  const onProfileDetailsError = (response: any) => {
    console.log("error", response);
    // toastError("Your profile is not authorized, please log in.");
    // router.push("/auth/login");
  };
  const { data, isLoading, refetch } = useProfileDetails(
    onProfileDetailsSuccess,
    onProfileDetailsError
  );
  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const { mutate: updateProfile, isLoading: updateLoader } = useUpdateProfile();
  const { mutate: deleteProfile, isLoading: deleteLoader } = useDeleteProfile();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    // defaultValues: useMemo(() => {
    //   return {
    //     firstName: profileDetails?.first_name,
    //     lastName: profileDetails?.last_name,
    //     phone: profileDetails?.contact,
    //     email: profileDetails?.mail,
    //     address: profileDetails?.address,
    //     city: profileDetails?.city,
    //     zipCode: profileDetails?.pin
    //   };
    // }, [profileDetails]),
    resolver: yupResolver(validationSchema)
  });

  const handleChange = (): void => {
    setEdit(!edit);
    setChangedCountry(profileDetails?.country[1]);
  };
  // const handleAction = (): void => {

  // };

  const getProfilePic = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setProfilePic(fileObj);
  };
  const profilePicHandler = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const onFormSubmit = (data: Inputs): void => {
    // if (edit) {
    console.log(data, "user given data");
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      country,
      state,
      phnCode
    } = data ?? {};
    const {
      first_name,
      last_name,
      contact,
      mail,
      address: prev_address,
      city: prev_city,
      pin
    } = profileDetails;
    const formData: FormData = new FormData();
    // if (firstName !== first_name) {
    formData.append("first_name", firstName);
    // }
    // if (lastName !== last_name) {
    formData.append("last_name", lastName);
    // }
    // if (phone !== contact) {
    formData.append("phone", `${phnCode} ${phone}`);
    // }
    // if (email !== mail) {
    formData.append("email", email);
    // }
    // if (address !== prev_address) {
    formData.append("street", address);
    // }
    // if (city !== prev_city) {
    formData.append("city", city);
    // }
    formData.append("country_id", `${country}`);
    formData.append("state_id", `${state}`);
    if (zipCode !== pin) {
      formData.append("zip", zipCode);
    }
    if (profilePic) {
      formData.append("image_1920", profilePic);
    }
    updateProfile(formData, {
      onSuccess: (response: any) => {
        setEdit(false);
        setProfileDetails({
          first_name: "",
          last_name: "",
          phnCode: "",
          contact: "",
          mail: "",
          address: "",
          city: "",
          pin: "",
          country: "",
          state: ""
        });
        setProfilePic(null);
        refetch();
        dispatch(refreshProfileImg(!refresh));
        // queryClient.invalidateQueries(GET_PROFILE_DETAILS);
        toastSuccess(response?.data?.message);
      },
      onError: (response: any) => {
        toastError(response?.response?.data?.message ?? "Somehing went wrong.");
      }
    });
    // } else {
    //   deleteProfile({});
    //   alert("delete");
    // }
  };
  const handleButtionAction = () => {
    if (edit) {
      return false;
    }
    deleteProfile({});
  };
  useEffect(() => {
    refetch();
  }, []);
  // useEffect(() => {
  //   window.location.reload(true);
  // }, [isFetched]);
  // const selectedCountry = useMemo(
  //   () => (data ? data[0]?.country_id[1] : ""),
  //   [data]
  // );
  const stateDefaultValue = useMemo(() => {
    const prevSelectedCountry = data ? data[0]?.country_id[1] : "";
    return changedCountry != prevSelectedCountry
      ? null
      : profileDetails?.state
      ? { name: profileDetails?.state[1] }
      : null;
  }, [data, changedCountry]);
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
  console.log("show me value", apiGivenrofilePic, profileDetails);
  return (
    <Wrapper>
      <DashboardWrapper>
        {data && !isLoading && (
          <Box className="cmn_box">
            {!isLoading && (
              <ProfileWrapper>
                {!edit ? (
                  <Box className="profile_content">
                    {!!apiGivenrofilePic && (
                      <figure className="profile_avatar">
                        <img
                          src={apiGivenrofilePic ?? assest?.avatr_img}
                          alt="image"
                          width={147}
                          height={147}
                          key={refresh ? "render" : "no-render"}
                        />
                      </figure>
                    )}
                    <Box className="form_Sec">
                      {/* <form onSubmit={handleSubmit(onFormSubmit)} id="edit_form"> */}
                      <Grid container spacing={2}>
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="First name"
                            fullWidth
                            value={profileDetails?.first_name}
                            disabled
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="Last name"
                            fullWidth
                            value={profileDetails?.last_name}
                            disabled
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="Phone code"
                            fullWidth
                            // value={`+${profileDetails?.phnCode}`}
                            value={`${profileDetails?.phnCode}`}
                            disabled
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="Phone number"
                            fullWidth
                            value={profileDetails?.contact}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFieldCommon
                            placeholder="Email address"
                            fullWidth
                            value={profileDetails?.mail}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFieldCommon
                            placeholder="Address"
                            fullWidth
                            value={
                              // edit
                              //   ? ""
                              //   : `${profileDetails?.address}`?.toLowerCase() ==
                              //     "false"
                              //   ? "N/A"
                              //   : profileDetails?.address
                              profileDetails?.address
                            }
                            disabled
                          />
                        </Grid>
                        <Grid
                          item
                          lg={
                            profileDetails &&
                            profileDetails?.state &&
                            profileDetails?.state[1]
                              ? 6
                              : 12
                          }
                          xs={12}
                        >
                          <InputFieldCommon
                            placeholder="Country"
                            fullWidth
                            value={profileDetails?.country[1]}
                            disabled
                          />
                        </Grid>
                        {profileDetails &&
                          profileDetails?.state &&
                          profileDetails?.state[1] && (
                            <Grid item lg={6} xs={12}>
                              <InputFieldCommon
                                placeholder="State"
                                fullWidth
                                value={profileDetails?.state[1]}
                                disabled
                              />
                            </Grid>
                          )}
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="City"
                            fullWidth
                            value={
                              // edit
                              //   ? ""
                              //   : `${profileDetails?.city}`?.toLowerCase() == "false"
                              //   ? "N/A"
                              //   : profileDetails?.city
                              profileDetails?.city
                            }
                            disabled
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <InputFieldCommon
                            placeholder="ZIP code"
                            fullWidth
                            value={
                              // edit
                              //   ? ""
                              //   : `${profileDetails?.pin}`?.toLowerCase() == "false"
                              //   ? "N/A"
                              //   : profileDetails?.pin
                              profileDetails?.pin
                            }
                            disabled
                          />
                        </Grid>
                      </Grid>
                      {/* </form> */}
                    </Box>
                  </Box>
                ) : (
                  <Box className="profile_content">
                    <figure className="profile_avatar">
                      {profilePic ? (
                        <img
                          // src={assest?.noProfile_img}
                          src={URL.createObjectURL(
                            profilePic ||
                              new Blob([JSON.stringify({}, null, 2)], {
                                type: "application/json"
                              })
                          )}
                          alt="image"
                          width={147}
                          height={147}
                        />
                      ) : (
                        <img
                          // src={assest?.noProfile_img}
                          src={apiGivenDP.current ?? assest?.avatr_img}
                          alt="image"
                          width={147}
                          height={147}
                          key={refresh ? "render" : "no-render"}
                        />
                      )}
                      {/* IF USER DO NOT HAVE PROFILE PIC */}
                      {/* <span className="profile_no_image">
                    <p>AB</p>
                  </span> */}
                      <Box className="editProfileWrap">
                        <Button
                          type="button"
                          className="editButnIcon"
                          onClick={profilePicHandler}
                        >
                          <EditProfileIcon />
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={getProfilePic}
                        />
                      </Box>
                    </figure>
                    <Box className="form_Sec">
                      <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        id="edit_form"
                      >
                        <Grid container spacing={2}>
                          <Grid item lg={6} xs={12}>
                            <InputFieldCommon
                              placeholder="First name"
                              fullWidth
                              defaultValue={profileDetails?.first_name}
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
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <InputFieldCommon
                              placeholder="Last name"
                              fullWidth
                              defaultValue={profileDetails?.last_name}
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
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Autocomplete
                              id="phonecode-select-demo"
                              className="autocomplete_div"
                              sx={{ width: 300 }}
                              filterOptions={filterPhnCdCountryOptions}
                              defaultValue={{
                                phone_code: profileDetails?.phnCode
                              }}
                              onChange={(event: any, newValue: any | null) => {
                                console.log("phone_code", newValue);
                                // setSelectedCountryId(
                                //   newValue ? newValue?.id : ""
                                // );
                                setValue(
                                  "phnCode",
                                  newValue ? newValue?.phone_code : ""
                                );
                              }}
                              // options={filterPhoneCodes ?? []}
                              options={countryList ?? []}
                              disabled={countryLoader}
                              autoHighlight
                              // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                              getOptionLabel={(option: any) =>
                                `${option?.phone_code} ${option.name ?? ""}`
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
                                  {option?.phone_code} {option?.name ?? ""}
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
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <InputFieldCommon
                              placeholder="Phone number"
                              // type="number"
                              fullWidth
                              defaultValue={profileDetails?.contact}
                              {...register("phone")}
                              onKeyDown={(e: any) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                              }
                            />
                            {errors.phone && (
                              <div className="profile_error">
                                {errors.phone.message}
                              </div>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <InputFieldCommon
                              placeholder="Email address"
                              fullWidth
                              defaultValue={profileDetails?.mail}
                              {...register("email")}
                            />
                            {errors.email && (
                              <div className="profile_error">
                                {errors.email.message}
                              </div>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <InputFieldCommon
                              placeholder="Address"
                              fullWidth
                              defaultValue={
                                // `${profileDetails?.address}`?.toLowerCase() ==
                                // "false"
                                //   ? "N/A"
                                //   : profileDetails?.address
                                profileDetails?.address
                              }
                              {...register("address")}
                            />
                            {errors.address && (
                              <div className="profile_error">
                                {errors.address.message}
                              </div>
                            )}
                          </Grid>
                          <Grid
                            item
                            lg={stateList && stateList.length > 0 ? 6 : 12}
                            xs={12}
                          >
                            <Autocomplete
                              id="country-select-demo"
                              className="autocomplete_div"
                              // sx={{ width: 300 }}
                              defaultValue={{
                                name: profileDetails?.country[1]
                              }}
                              filterOptions={filterCountryOptions}
                              onChange={(event: any, newValue: any | null) => {
                                console.log("country", newValue);
                                setSelectedCountryId(
                                  newValue ? newValue?.id : ""
                                );
                                setChangedCountry(
                                  newValue ? newValue?.name : ""
                                );
                                setValue(
                                  "country",
                                  newValue ? newValue?.id : ""
                                );
                                setValue("state", "");
                              }}
                              options={countryList ?? []}
                              disabled={countryLoader}
                              autoHighlight
                              getOptionLabel={(option: any) => option.name}
                              renderOption={(props: any, option: any) => (
                                <Box
                                  component="li"
                                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                  {...props}
                                >
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${process.env.NEXT_APP_BASE_URL}/${
                                      option?.image_url ?? ""
                                    }`}
                                    alt=""
                                  />
                                  {option?.name}
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
                            {errors.country && (
                              <div className="profile_error">
                                {errors.country.message}
                              </div>
                            )}
                          </Grid>
                          {stateList && stateList.length > 0 && (
                            <Grid item lg={6} xs={12}>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                className="autocomplete_div"
                                // {...register("state")}
                                options={stateList ?? []}
                                sx={{ width: 300 }}
                                defaultValue={stateDefaultValue}
                                // defaultValue={
                                //   profileDetails?.country[1] !=
                                //   data[0]?.country_id[1]
                                //     ? null
                                //     : profileDetails?.state
                                //     ? { name: profileDetails?.state[1] }
                                //     : null
                                // }
                                disabled={!selectedCountryId && !stateLoder}
                                getOptionLabel={(option: any) => option.name}
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
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} placeholder="State" />
                                )}
                              />
                              {/* {errors.country && (
                            <div className="profile_error">
                              {errors.country.message}
                            </div>
                          )} */}
                            </Grid>
                          )}
                          <Grid item lg={6} xs={12}>
                            <InputFieldCommon
                              placeholder="City"
                              fullWidth
                              defaultValue={
                                // `${profileDetails?.city}`?.toLowerCase() == "false"
                                //   ? "N/A"
                                //   : profileDetails?.city
                                profileDetails?.city
                              }
                              {...register("city")}
                            />
                            {errors.city && (
                              <div className="profile_error">
                                {errors.city.message}
                              </div>
                            )}
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <InputFieldCommon
                              placeholder="ZIP code"
                              fullWidth
                              defaultValue={
                                // `${profileDetails?.pin}`?.toLowerCase() == "false"
                                //   ? "N/A"
                                //   : profileDetails?.pin
                                profileDetails?.pin
                              }
                              {...register("zipCode")}
                            />
                            {errors.zipCode && (
                              <div className="profile_error">
                                {errors.zipCode.message}
                              </div>
                            )}
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Box>
                  //   <button type="submit">save</button>
                  // </form>
                )}

                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  className="btn_stack"
                >
                  {!!profileDetails?.share && (
                    <CustomButtonPrimary
                      variant="outlined"
                      color="info"
                      onClick={handleChange}
                      className="gradient_btn"
                    >
                      <Typography variant="body1">
                        {!edit ? "Edit profile" : "Discard changes"}
                      </Typography>
                    </CustomButtonPrimary>
                  )}
                  {!updateLoader ? (
                    edit ? (
                      <CustomButtonPrimary
                        form="edit_form"
                        variant="contained"
                        color="primary"
                        // onClick={handleButtionAction}
                        type="submit"
                      >
                        <Typography variant="caption">
                          {/* {!edit ? "Delete profile" : "Save changes"} */}
                          Save changes
                        </Typography>
                      </CustomButtonPrimary>
                    ) : (
                      <></>
                    )
                  ) : (
                    <CustomButtonPrimary
                      form="edit_form"
                      variant="contained"
                      color="primary"

                      // onClick={handleAction}
                      // type="submit"
                    >
                      {/* <Typography variant="caption"> */}
                      <ButtonLoader customClass="transparent_button" />
                      {/* </Typography> */}
                    </CustomButtonPrimary>
                  )}
                </Stack>
              </ProfileWrapper>
            )}
          </Box>
        )}
      </DashboardWrapper>
    </Wrapper>
  );
}
