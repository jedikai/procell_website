/* eslint-disable react/no-unstable-nested-components */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useGetHelpSubmit,
  useHelpReasonList
} from "@/hooks/react-qurey/query-hooks/getHelpQuery.hooks";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { GetHelpswrapper } from "@/styles/StyledComponents/GetHelpWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import useNotiStack from "@/hooks/useNotistack";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";

type Inputs = {
  email: string;
  fullName: string;
  callBackPhoneNumber: string;
  salesOrder?: string;
  reason: string | number;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  fullName: yup.string().required(validationText.error.fullName),
  callBackPhoneNumber: yup
    .string()
    .required(validationText.error.phone)
    .matches(/^\d+$/, validationText.error.valid_phone_number)
    .test("isValid", validationText.error.phone_number_range, (value) => {
      console.log(value);
      if (value && value?.length >= 8 && value?.length <= 16) {
        return true;
      } else {
        return false;
      }
    }),
  // salesOrder: yup
  //   .string()
  //   .required(validationText.error.phone)
  //   .matches(/^\d+$/, validationText.error.valid_phone_number)
  //   .test("isValid", validationText.error.phone_number_range, (value) => {
  //     console.log(value);
  //     if (value && value?.length >= 8 && value?.length <= 16) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }),
  reason: yup.string().required(validationText.error.reason)
});

export default function Index() {
  const [reasonID, setReasonId] = useState("");
  const { toastSuccess, toastError } = useNotiStack();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: { reason: "" },
    resolver: yupResolver(validationSchema)
  });

  const { data } = useHelpReasonList();
  const { mutate: getHelpSubmit, isLoading } = useGetHelpSubmit();

  // const getReasonValues = useMemo(() => {
  //   let value = getValues("reason")&&`${getValues("reason")}`?.length>0?;
  // }, [getValues()]);

  const onFormSubmit = (data: any) => {
    const { email, fullName, callBackPhoneNumber, salesOrder, reason } =
      data ?? {};
    let nameSplitter = fullName?.split(" ");
    let firstName = nameSplitter[0];
    let lastName = nameSplitter[nameSplitter?.length - 1];
    console.log("onFormSubmit", data);
    const formData: FormData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", callBackPhoneNumber);
    formData.append("email", email);
    if (salesOrder) {
      formData.append("sale_order", salesOrder);
    }
    formData.append("reason_id", reason);
    getHelpSubmit(formData, {
      onSuccess: (response: any) => {
        console.log("response", response?.data?.message);
        toastSuccess(response?.data?.message ?? "Form submitted successfully.");
        reset();
        setReasonId("");
      },
      onError: (error: any) => {
        console.log("error", error);
        toastError(error?.message ?? "Something went wrong.");
      }
    });
  };

  // const handleChange = (event: SelectChangeEvent | any) => {
  //   setValue(event.target.value);
  // };

  const isReasonSelected = useMemo(() => {
    if (reasonID) {
      return true;
    } else {
      return false;
    }
  }, [reasonID]);
  console.log("show me data", getValues("reason"), reasonID);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Get Help"
        innerHeaderRediractedPage="Get help"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <GetHelpswrapper className="cmn_gap">
        <Image
          src={assest?.pink_leaf}
          alt="leaf image"
          width={90}
          height={110}
          className="pink_leaf"
        />

        <Container fixed>
          <Box className="contact_sec">
            <Grid
              container
              spacing={{ xl: 4, lg: 2, md: 2, xs: 4 }}
              alignItems="center"
            >
              <Grid item xl={5} lg={6} md={6} xs={12}>
                <figure>
                  <Image
                    src={assest?.getHelpImage}
                    alt="image"
                    width={712}
                    height={620}
                  />
                </figure>
              </Grid>
              <Grid item xl={7} lg={5} md={6} xs={12}>
                <Box className="contact_form">
                  <Box className="sec_title">
                    <Typography variant="h4">
                      Welcome to our Procell support desk!
                    </Typography>
                    <Typography variant="body1">
                      Please fill out the form below and your request will be
                      forwarded to the appropriate personnel.
                    </Typography>
                  </Box>
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Box className="form_group">
                      <InputFieldCommon
                        placeholder="Full name"
                        {...register("fullName")}
                      />
                    </Box>
                    <Box className="form_group">
                      {errors.fullName && (
                        <div className="profile_error">
                          {errors.fullName.message}
                        </div>
                      )}
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon
                        placeholder="Call back number"
                        {...register("callBackPhoneNumber")}
                      />
                    </Box>
                    <Box className="form_group">
                      {errors.callBackPhoneNumber && (
                        <div className="profile_error">
                          {errors.callBackPhoneNumber.message}
                        </div>
                      )}
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon
                        placeholder="Do you have any older number?"
                        {...register("salesOrder")}
                      />
                    </Box>
                    <Box className="form_group">
                      {errors.salesOrder && (
                        <div className="profile_error">
                          {errors.salesOrder.message}
                        </div>
                      )}
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon
                        placeholder="Email"
                        {...register("email")}
                      />
                    </Box>
                    <Box className="form_group">
                      {errors.email && (
                        <div className="profile_error">
                          {errors.email.message}
                        </div>
                      )}
                    </Box>

                    <Box className="form_group select_group">
                      <CustomSelect
                        IconComponent={(props) => {
                          return (
                            <IconButton {...props}>
                              <DropDownIcon />
                            </IconButton>
                          );
                        }}
                        // {...register("reason")}
                        value={getValues(["reason"])[0]}
                        onChange={(e: any) => {
                          setValue("reason", e.target.value);
                          setReasonId(e.target.value);
                        }}
                      >
                        <MenuItem value="" sx={{ display: "none" }} selected>
                          Please choose your issue*
                        </MenuItem>

                        {data &&
                          data?.length > 0 &&
                          data?.map((item: any) => (
                            <MenuItem
                              key={item?.id}
                              value={item?.id}
                              className="menu_item"
                            >
                              {item?.name}
                            </MenuItem>
                          ))}
                      </CustomSelect>
                    </Box>
                    <Box className="form_group">
                      {errors.reason && !isReasonSelected && (
                        <div className="profile_error">
                          {errors.reason.message}
                        </div>
                      )}
                    </Box>

                    <Box className="submit_btn_holder">
                      {!isLoading ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          type="submit"
                        // form="contact_form"
                        >
                          <Typography>Submit</Typography>
                        </CustomButtonPrimary>
                      ) : (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                        // type="submit"
                        // form="contact_form"
                        >
                          <ButtonLoader />
                        </CustomButtonPrimary>
                      )}
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </GetHelpswrapper>
    </Wrapper>
  );
}
