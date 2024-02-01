import assest from "@/json/assest";
import { AddCustomerWrapper } from "@/styles/StyledComponents/AddCustomerWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import EditProfileIcon from "@/ui/Icons/EditProfileIcon";
import { Button, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import validationText from "@/json/messages/validationText";
import { useForm } from "react-hook-form";
import {
  useClientDetails,
  useCreateClient,
  useUpdateClient
} from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import { useQueryClient } from "react-query";
import useNotiStack from "@/hooks/useNotistack";
import {
  GET_CLIENTS_ENTRIES,
  GET_CLIENTS_LIST
} from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

type Inputs = {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
};

const AddUpdateClients = ({
  handleChangeState,
  getSelectedClientData,
  fetchClientList,
  // clientProfileUpdateDecider,
  clientId
}: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();

  const [isEmailEnable, setIsEmailEnable] = useState(false);
  const [isPhoneEnable, setIsPhoneEnable] = useState(false);
  const [emailPhn, setEmailPhn] = useState({ email: "", phn: "" });
  const [dp, setDp] = useState<any>(null);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  const {
    data: clientDetails,
    isLoading,
    refetch
  } = useClientDetails(clientId, false, (response: any) => {
    console.log("useClientDetails", response);
    const { id, first_name, last_name, phone, profile_image_url, email }: any =
      response && response?.length > 0 ? response[0] : {};
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue(
      "phone",
      `${phone}` == "false" || `${phone}` == "False" ? "N/A" : phone
    );
    setValue(
      "email",
      `${email}` == "false" || `${email}` == "False" ? "N/A" : email
    );
    setDp(profile_image_url);
    setEmailPhn({
      email: `${email}` == "false" || `${email}` == "False" ? "N/A" : email,
      phn: `${phone}` == "false" || `${phone}` == "False" ? "N/A" : phone
    });
  });
  const { mutate: createClient, isLoading: createLoader } = useCreateClient();
  const { mutate: updateClient, isLoading: updateLoader } = useUpdateClient();

  const cancelActionHandler = () => {
    // clientProfileUpdateDecider(false);
    fetchClientList();
    handleChangeState("customer_profile");
  };

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .required(validationText.error.first_name)
      .test(
        "no-leading-space",
        "First name should not start with a blank space",
        (value) => {
          return !value || !value.startsWith(" ");
        }
      ),
    last_name: yup
      .string()
      .required(validationText.error.last_name)
      .test(
        "no-leading-space",
        "Last name should not start with a blank space",
        (value) => {
          return !value || !value.startsWith(" ");
        }
      ),
    ...(isEmailEnable
      ? {
          email: yup
            .string()
            .email(validationText.error.email_format)
            .required(validationText.error.enter_email)
        }
      : {}),
    ...(isPhoneEnable
      ? {
          phone: yup
            .string()
            .required(validationText.error.phone)
            .matches(/^\d+$/, validationText.error.valid_phone_number)
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
            )
        }
      : {})
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const onFormSubmit = (userGivendata: Inputs) => {
    setBtnLoader(true);
    const { first_name, last_name, email, phone } = userGivendata;
    const formData: FormData = new FormData();

    if (!!first_name) {
      formData.append("first_name", `${first_name}`);
    }
    if (!!last_name) {
      formData.append("last_name", `${last_name}`);
    }
    if (!!clientDetails) {
      if (email != clientDetails[0].email) {
        formData.append("email", `${email}`);
      }
      if (phone != clientDetails[0].phone) {
        formData.append("phone", `${phone}`);
      }
      if (typeof dp != "string") {
        formData.append("profile_image", dp);
      }
      formData.append("customer_id", `${clientId}`);
      updateClient(formData, {
        onSuccess: (response: any) => {
          // alert("updated");
          const { data, message } = response?.data ?? {};
          console.log("response updateClient", response);
          getSelectedClientData(data[0]);
          toastSuccess(message ?? "Customer profile updated.");
          queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
          queryClient.invalidateQueries(GET_CLIENTS_LIST);
          handleChangeState("customer_profile");
          setBtnLoader(false);
        },
        onError: (error: any) => {
          toastError(error?.response?.data?.message ?? "Something went wrong.");
        }
      });
    } else {
      if (!!email) {
        formData.append("email", `${email}`);
      }
      if (!!phone) {
        formData.append("phone", `${phone}`);
      }
      if (!!dp) {
        formData.append("profile_image", dp);
      }
      createClient(formData, {
        onSuccess: (response: any) => {
          const { data, message } = response?.data ?? {};
          getSelectedClientData(data[0]);
          toastSuccess(message ?? "Customer profile created.");
          queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
          queryClient.invalidateQueries(GET_CLIENTS_LIST);
          handleChangeState("customer_profile");
          setBtnLoader(false);
        },
        onError: (error: any) => {
          toastError(error?.response?.data?.message ?? "Something went wrong.");
        }
      });
    }
  };
  console.log("onFormSubmit", emailPhn);

  const getClientDp = (imageFile: any) => setDp(imageFile);
  // useEffect(() => {
  //   if (!!data) {
  //     const { id, first_name, last_name, phone, email, profile_image_url } =
  //       data ?? {};
  //     setValue("first_name", first_name);
  //     setValue("last_name", last_name);
  //     setValue(
  //       "phone",
  //       `${phone}` == "false" || `${phone}` == "False" ? "N/A" : phone
  //     );
  //     setValue(
  //       "email",
  //       `${email}` == "false" || `${email}` == "False" ? "N/A" : email
  //     );
  //     setDp(profile_image_url);
  //   }
  // }, [data]);
  useEffect(() => {
    if (!!clientId) {
      refetch();
    }
  }, [clientId]);
  return (
    <>
      <AddCustomerWrapper>
        <Typography variant="h4" className="main_heading">
          {`${!!clientDetails ? "Update" : "Add"} Client`}
        </Typography>
        <Box className="add_customer_form">
          <figure className="profile_avatar">
            <img
              src={
                !!dp
                  ? typeof dp == "string"
                    ? dp
                    : URL.createObjectURL(dp)
                  : assest?.avatarIcon
              }
              alt="image"
              width={147}
              height={147}
            />
            <Box className="editProfileWrap">
              <Button type="button" className="editButnIcon">
                <EditProfileIcon />
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => getClientDp(e.target.files[0] ?? {})}
              />
            </Box>
          </figure>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box className="form_Sec">
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <InputFieldCommon
                    placeholder="First name"
                    fullWidth
                    // value={first_name ?? ""}
                    {...register("first_name")}
                  />
                  <Box className="form_group">
                    {errors.first_name && (
                      <div className="profile_error">
                        {errors.first_name.message}
                      </div>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFieldCommon
                    // name="last_name"
                    placeholder="Last name"
                    fullWidth
                    // value={last_name ?? ""}
                    {...register("last_name")}
                  />
                  <Box className="form_group">
                    {errors.last_name && (
                      <div className="profile_error">
                        {errors.last_name.message}
                      </div>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <InputFieldCommon
                    // name="email"
                    placeholder="Email address (Optional)"
                    fullWidth
                    value={emailPhn?.email}
                    onChange={(e) => {
                      if (e.target.value.length > 0) {
                        setIsEmailEnable(true);
                        setValue("email", e.target.value);
                        setEmailPhn({ ...emailPhn, email: e.target.value });
                      } else {
                        setIsEmailEnable(false);
                        setValue("email", "");
                      }
                    }}
                    // {...register("email")}
                  />
                  <Box className="form_group">
                    {errors.email && (
                      <div className="profile_error">
                        {errors.email.message}
                      </div>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <InputFieldCommon
                    // name="number"
                    value={emailPhn?.phn}
                    placeholder="Phone number (Optional)"
                    fullWidth
                    onChange={(e) => {
                      if (e.target.value.length > 0) {
                        setIsPhoneEnable(true);
                        setValue("phone", e.target.value);
                        setEmailPhn({ ...emailPhn, phn: e.target.value });
                      } else {
                        setIsPhoneEnable(false);
                        setValue("phone", "");
                      }
                    }}
                    // value={phone ?? ""}
                    // {...register("phone")}
                  />
                  <Box className="form_group">
                    {errors.phone && (
                      <div className="profile_error">
                        {errors.phone.message}
                      </div>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Stack
              className="btn_holder cmn_btnStyle"
              direction="row"
              justifyContent="center"
            >
              {!btnLoader ? (
                <CustomButtonPrimary
                  // form="edit_form"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <Typography variant="body1">
                    {!!clientDetails ? "Update" : "Add"} now
                  </Typography>
                </CustomButtonPrimary>
              ) : (
                <CustomButtonPrimary
                  // form="edit_form"
                  variant="contained"
                  color="primary"
                >
                  <ButtonLoader />
                </CustomButtonPrimary>
              )}
              <CustomButtonPrimary
                variant="outlined"
                color="info"
                onClick={cancelActionHandler}
                className="gradient_btn"
              >
                <Typography variant="body1">Cancel</Typography>
              </CustomButtonPrimary>
            </Stack>
          </form>
        </Box>
      </AddCustomerWrapper>
    </>
  );
};

export default memo(AddUpdateClients);
