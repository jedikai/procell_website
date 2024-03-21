import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import {
  useAddressList,
  useCreateAddress,
  useDeleteAddress,
  useEditAddress,
  useMarkAsDefaultAddress
} from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import {
  useCountryList,
  useStateList
} from "@/hooks/react-qurey/query-hooks/contactUsQuery.hook";
import { DELIVERY_ADDRESS_LIST } from "@/hooks/react-qurey/query-keys/checkoutQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import validationText from "@/json/messages/validationText";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { CheckOutAddressWrap } from "@/styles/StyledComponents/ChekOutAddressWrapper";
import { ManageAddressWrapper } from "@/styles/StyledComponents/ManageAddressWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import AddAddress from "@/ui/Icons/AddAddress";
import DeleteIconTwo from "@/ui/Icons/DeleteIconTwo";
import EditPenIconTwo from "@/ui/Icons/EditPenIconTwo";
import WarningIcon from "@/ui/Icons/WarningIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  List,
  ListItem,
  TextField,
  createFilterOptions
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";

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

const exceptThisSymbols = ["e", "E", "+", "-", "."];

export default function ManageAdress() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    {
      id,
      name,
      email,
      phone,
      street,
      street2,
      city,
      state_id,
      zip,
      country_id,
      is_selected
    },
    setSelecetedAddressData
  ] = useState<any>({});
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [userGivenPhoneCode, setUserGivenPhoneCode] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    phnCode: null,
    country: null,
    state: null
  });

  const {
    data: addressListData,
    isLoading,
    refetch
  } = useAddressList((response: any) => {
    console.log("response", response);
    const { shipping_address } = response ?? {};
    setAddressList(shipping_address ?? []);
  });

  const { data: countryList, isLoading: countryLoader } = useCountryList();
  const { data: stateList, isLoading: stateLoder } = useStateList(
    !!selectedCountryId,
    selectedCountryId
  );
  const { mutate: editAddress, isLoading: editLoader } = useEditAddress();
  const { mutate: createAddress, isLoading: createLoader } = useCreateAddress();
  const { mutate: deleteAddress, isLoading: deleteLoader } = useDeleteAddress();
  const { mutate: markAsDefault, isLoading: markAsDefaultLoader } =
    useMarkAsDefaultAddress();

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
    setBtnLoader(true);
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
    formData.append("email", `${email}`);
    formData.append("phone", `${phnCode} ${phnNumber}`);
    formData.append("street", `${address}`);
    formData.append("street2", `${address2}`);
    formData.append("city", `${city}`);
    formData.append("state_id", `${state}`);
    formData.append("zip", `${zip}`);
    formData.append("country_id", `${country}`);
    // // formData.append("type", `${type}`);
    if (id) {
      editAddress(formData, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          reset();
          setSelecetedAddressData({});
          setSelectedValues({
            phnCode: null,
            country: null,
            state: null
          });
          toastSuccess(data?.data?.message ?? "Address updated successfully.");
          addNewAddressHandler();
          setBtnLoader(false);
        },
        onError: (data: any) => {
          toastError(data?.data?.message ?? "Something went wrong.");
          setBtnLoader(false);
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
          addNewAddressHandler();
          setBtnLoader(false);
        },
        onError: (data: any) => {
          toastError(data?.response?.data?.message ?? "Something went wrong.");
          setBtnLoader(false);
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

  const addNewAddressHandler = () => setIsAddAddress(!isAddAddress);
  const getSelectedAddressData = (data: any) =>
    setSelecetedAddressData({ ...data });
  const editAddressHandler = (data: any) => {
    getSelectedAddressData(data);
    addNewAddressHandler();
  };
  const getSelectedAddressId = (id: any) => setSelectedAddressId(id ?? "");
  const modalOpenHandler = () => setIsModalOpen(!isModalOpen);
  const deleteAddressHandler = () => {
    if (!!selectedAddressId) {
      const formData: FormData = new FormData();
      formData.append("address_id", `${selectedAddressId}`);
      deleteAddress(formData, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          reset();
          toastSuccess(data?.data?.message ?? "Address deleted successfully.");
          modalOpenHandler();
          getSelectedAddressId("");
        },
        onError: (data: any) => {
          toastError(data?.data?.message ?? "Something went wrong.");
          modalOpenHandler();
          getSelectedAddressId("");
        }
      });
    }
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
  const addressFormatter = useCallback(
    (data: any) => {
      let { street, city, state_id, country_id, zip } = data ?? {};
      return `${!!street && street != "false" ? `${street}, ` : ""}${
        !!city && city != "false" ? `${city}, ` : ""
      }${
        !!state_id && !!state_id[1] && state_id[1] != "false"
          ? `${state_id[1]}, `
          : ""
      }${
        !!country_id && !!country_id[1] && country_id[1] != "false"
          ? `${country_id[1]}, `
          : ""
      }${!!zip && zip != "false" ? `${zip}, ` : ""}`;
    },
    [addressListData]
  );
  const filterPhnCdCountryOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.phone_code} ${option.name.toLowerCase()}`
  });
  const markAsDefaultAddress = (id: any) => {
    if (!!id) {
      const formData: FormData = new FormData();
      formData.append("address_id", `${id}`);
      markAsDefault(formData, {
        onSuccess: (response: any) => {
          toastSuccess(
            response?.data?.message ?? "Address is marked as default."
          );
          refetch();
        },
        onError: (error: any) => {
          console.log("eeeeeeeeeeeeeeeeeror", error);

          toastError(
            error?.response?.data?.message ??
              "Something went wrong, please try again later."
          );
        }
      });
    }
  };
  useEffect(() => {
    if (!!id && addressListData?.billing_address?.id == id) {
      setValue("email", email);
    }
  }, [id]);
  return (
    <>
      <Wrapper>
        <DashboardWrapper>
          {!isLoading && !!addressListData ? (
            <>
              {isAddAddress ? (
                <Box className="cmn_box">
                  <CheckOutAddressWrap>
                    <Box className="title_block">
                      <Typography variant="h4">
                        {!!id ? "Edit Address" : "Add New Address"}
                      </Typography>
                    </Box>
                    <Box className="form_wrapper">
                      <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        id="form-add-address"
                      >
                        <Grid
                          container
                          spacing={2}
                          className="billing_adress_grid"
                        >
                          <Grid item lg={6} md={6} xs={12}>
                            <InputFieldCommon
                              defaultValue={name ? name?.split(" ")[0] : ""}
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
                              defaultValue={name ? name?.split(" ")[1] : ""}
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
                              disabled={
                                id == addressListData?.billing_address?.id
                              }
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
                                    // value={selectedValues?.phnCode}
                                    filterOptions={filterPhnCdCountryOptions}
                                    defaultValue={
                                      !!phone
                                        ? {
                                            phone_code:
                                              phone?.split(" ")[0] ?? "",
                                            image_url: ""
                                          }
                                        : null
                                    }
                                    // defaultValue={getSelectedItemsData[0]}
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
                                    // options={filterPhoneCodes ?? []}
                                    options={countryList ?? []}
                                    disabled={countryLoader}
                                    autoHighlight
                                    // getOptionLabel={(option: any) => ` +${option?.phone_code}`}
                                    getOptionLabel={(option: any) =>
                                      `${option?.phone_code} ${
                                        option.name ?? ""
                                      }`
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
                                  {errors.phnCode &&
                                    !selectedValues.phnCode && (
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
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
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
                              defaultValue={!!street ? street : ""}
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
                              defaultValue={!!street2 ? street2 : ""}
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
                                    filterOptions={filterCountryOptions}
                                    defaultValue={getSelectedItemsData[0]}
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
                                    getOptionLabel={(option: any) =>
                                      option.name
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
                                  {errors.country &&
                                    !selectedValues.country && (
                                      <div className="profile_error">
                                        {errors.country.message}
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
                                      getOptionLabel={(option: any) =>
                                        option.name
                                      }
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
                                          placeholder="State/Province"
                                        />
                                      )}
                                    />
                                    {errors?.state && !selectedValues.state && (
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
                              defaultValue={!!city ? city : ""}
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
                              defaultValue={!!zip ? zip : ""}
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
                      <Stack
                        direction="row"
                        justifyContent="center"
                        flexWrap="wrap"
                        className="form_submit"
                        sx={{ marginTop: "30px" }}
                      >
                        {btnLoader ? (
                          <CustomButtonPrimary
                            variant="contained"
                            color="primary"
                          >
                            <ButtonLoader />
                          </CustomButtonPrimary>
                        ) : (
                          <CustomButtonPrimary
                            variant="contained"
                            color="primary"
                            type="submit"
                            form="form-add-address"
                          >
                            <Typography>{!!id ? "Update" : "Save"}</Typography>
                          </CustomButtonPrimary>
                        )}
                        <CustomButtonPrimary
                          variant="outlined"
                          color="info"
                          onClick={() => {
                            addNewAddressHandler();
                            getSelectedAddressData({});
                            setSelectedValues({
                              phnCode: null,
                              country: null,
                              state: null
                            });
                            setValue("country", "");
                            setValue("phnCode", "");
                            setValue("state", "");
                            reset();
                          }}
                          className="gradient_btn"
                        >
                          <Typography variant="body1">Cancel</Typography>
                        </CustomButtonPrimary>
                      </Stack>
                    </Box>
                  </CheckOutAddressWrap>
                </Box>
              ) : (
                <Box className="cmn_box">
                  <ManageAddressWrapper>
                    <Typography variant="h1" className="heading">
                      Manage Addresses
                    </Typography>
                    <Box className="manage_address_wrap">
                      <Grid container spacing={2}>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                          <Box
                            className="add_address cursor_pointer"
                            onClick={addNewAddressHandler}
                          >
                            {/* <Link href="/dashboard/add-new-address"> */}
                            <i className="ico">
                              <AddAddress />
                            </i>
                            <Typography variant="body1" className="add_text">
                              + Add New Address
                            </Typography>
                            {/* </Link> */}
                          </Box>
                        </Grid>
                        {addressList.map((data: any) => (
                          <Grid
                            item
                            lg={6}
                            md={12}
                            sm={12}
                            xs={12}
                            key={data?.id}
                          >
                            <Stack
                              // eslint-disable-next-line react/no-array-index-key
                              // key={index}
                              direction="row"
                              flexWrap="wrap"
                              className="address_block"
                              alignItems="center"
                            >
                              <Box className="address_left">
                                <Box className="address_top">
                                  <Typography
                                    variant="body1"
                                    className="name_text"
                                  >
                                    {data?.name ?? ""}
                                  </Typography>
                                  {(!!data?.default_shipping ||
                                    data?.default_shipping == "true") && (
                                    <Chip label="Default" />
                                  )}
                                </Box>
                              </Box>
                              {!!data?.allow_edit &&
                              data?.id !=
                                addressListData?.billing_address?.id ? (
                                <Box className="action_right">
                                  <Button
                                    type="button"
                                    onClick={() => editAddressHandler(data)}
                                  >
                                    <EditPenIconTwo
                                      IconWidth="18"
                                      IconHeight="18"
                                    />
                                  </Button>
                                  {!data?.is_selected && (
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        getSelectedAddressId(
                                          `${data?.id ?? ""}`
                                        );
                                        modalOpenHandler();
                                      }}
                                    >
                                      <DeleteIconTwo
                                        IconWidth="13"
                                        IconHeight="15"
                                      />
                                    </Button>
                                  )}
                                </Box>
                              ) : addressListData?.billing_address
                                  ?.allow_edit ? (
                                <Box className="action_right">
                                  <Button
                                    type="button"
                                    onClick={() => editAddressHandler(data)}
                                  >
                                    <EditPenIconTwo
                                      IconWidth="18"
                                      IconHeight="18"
                                    />
                                  </Button>
                                </Box>
                              ) : (
                                <></>
                              )}
                              <Box className="address_btm_block">
                                <Typography
                                  variant="body1"
                                  className="btm_text"
                                >
                                  {addressFormatter(data)}
                                  {/* {`${data?.street ?? ""},${
                                    data?.city ? ` ${data?.city}` : ""
                                  },${
                                    data?.state_id && data?.state_id[1]
                                      ? ` ${data?.state_id[1]}`
                                      : ""
                                  },${
                                    data?.country_id && data?.country_id[1]
                                      ? ` ${data?.country_id[1]}`
                                      : ""
                                  },${data?.zip ? ` ${data?.zip}` : ""}`} */}
                                </Typography>
                              </Box>
                              {!(
                                !!data?.default_shipping ||
                                data?.default_shipping == "true"
                              ) && (
                                <Box className="btn_wrap">
                                  <CustomButtonPrimary
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      markAsDefaultAddress(data?.id)
                                    }
                                  >
                                    <Typography variant="body1">
                                      Mark as Default
                                    </Typography>
                                  </CustomButtonPrimary>
                                </Box>
                              )}
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </ManageAddressWrapper>
                </Box>
              )}
            </>
          ) : (
            <ButtonLoaderSecondary />
          )}
        </DashboardWrapper>
      </Wrapper>
      <MuiModalWrapper open={isModalOpen} onClose={modalOpenHandler} title="">
        <Box className="loginModal">
          <Box className="modalimgWrap">
            <WarningIcon IconWidth="60" IconHeight="60" />
          </Box>

          <Typography variant="h3">
            Are you sure you want to delete this address?
          </Typography>

          <List disablePadding className="btn_wrapper">
            <ListItem disablePadding>
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                className="deletebtn"
                onClick={deleteAddressHandler}
              >
                <Typography variant="body1">Yes</Typography>
              </CustomButtonPrimary>
            </ListItem>
            <ListItem disablePadding>
              <CustomButtonPrimary
                variant="outlined"
                color="info"
                className="gradient_btn"
                onClick={modalOpenHandler}
              >
                <Typography variant="body1">No</Typography>
              </CustomButtonPrimary>
            </ListItem>
          </List>
        </Box>
      </MuiModalWrapper>
    </>
  );
}
