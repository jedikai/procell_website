import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactCeoWrapper } from "@/styles/StyledComponents/ContactCeoWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { useGetHelpCeoSubmit } from "@/hooks/react-qurey/query-hooks/getHelpQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import validationText from "@/json/messages/validationText";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  email: string;
  fullName: string;
  callBackPhoneNumber: string;
  salesOrder?: string;
  issue: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  fullName: yup
    .string()
    .required(validationText.error.fullName)
    .test(
      "no-leading-space",
      "Full name should not start with a blank space",
      (value) => {
        return !value || !value.startsWith(" ");
      }
    ),
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
  issue: yup.string().required(validationText.error.issue)
});

export default function Index() {
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const { toastSuccess, toastError } = useNotiStack();
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
  const { mutate: getHelpCeoSubmit, isLoading } = useGetHelpCeoSubmit();
  const onFormSubmit = (data: any) => {
    const { email, fullName, callBackPhoneNumber, salesOrder, issue } =
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
    formData.append("issue", issue);
    getHelpCeoSubmit(formData, {
      onSuccess: (response: any) => {
        console.log("response", response?.data?.message);
        toastSuccess(response?.data?.message ?? "Form submitted successfully.");
        reset();
      },
      onError: (error: any) => {
        console.log("error", error);
        toastError(error?.message ?? "Something went wrong.");
      }
    });
  };
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Contact the ceo"
        innerHeaderRediractedPage="Contact the CEO"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <ContactCeoWrapper className="cmn_gap">
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
              <Grid item xl={5} lg={6} md={6} xs={12} className="left_grid">
                <figure>
                  <Image
                    src={assest?.contactCeoImage}
                    alt="image"
                    width={712}
                    height={667}
                  />
                </figure>
              </Grid>
              <Grid item xl={7} lg={5} md={6} xs={12}>
                <Box className="contact_form">
                  <Box className="sec_title">
                    <Typography variant="h4">Connect with our CEO!</Typography>
                    <Typography variant="body1">
                      Please fill out the form below and your information will
                      be forwarded straight to the CEO's desk
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
                        type="number"
                        placeholder="Call back number"
                        {...register("callBackPhoneNumber")}
                        onKeyDown={(e: any) =>
                          exceptThisSymbols.includes(e.key) &&
                          e.preventDefault()
                        }
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
                        placeholder="Do you have an older number?"
                        {...register("salesOrder")}
                      />
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
                    <Box className="form_group_textarea">
                      <InputFieldCommon
                        placeholder="Please explain your issue"
                        multiline
                        rows={4}
                        maxRows={4}
                        style3
                        {...register("issue")}
                      />
                    </Box>
                    <Box className="form_group">
                      {errors.issue && (
                        <div className="profile_error">
                          {errors.issue.message}
                        </div>
                      )}
                    </Box>
                    <Typography variant="body1" className="special_text">
                      *Your issue will go straight to the CEO's desk.
                    </Typography>

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
      </ContactCeoWrapper>
    </Wrapper>
  );
}
