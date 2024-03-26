import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { usePractitionerSignUp } from "@/hooks/react-qurey/query-hooks/signUpQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import { primaryColors } from "@/themes/_muiPalette";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  email: string;
};

// <------------------ REGISTRATION FORM VALIDATION SCHEMA ------------------>
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email)
});

const RegisterWrapper = styled(Box)`
  .wrapper {
    text-align: center;
    padding-bottom: 20px;
    img {
      margin-bottom: 28px;
      @media (max-width: 599px) {
        margin-bottom: 30px;
        width: 120px;
        height: 45px;
      }
      @media (max-width: 375px) {
        margin-bottom: 15px;
        width: 100px;
        height: 35px;
      }
    }
    .form_body {
      h4 {
        color: ${primaryColors.black};
        font-size: 27px;
        font-weight: 700;
        margin-bottom: 12px;
        @media (max-width: 899px) {
          font-size: 24px;
          margin-bottom: 10px;
        }
        @media (max-width: 599px) {
          font-size: 20px;
        }
        @media (max-width: 375px) {
          font-size: 18px;
          margin-bottom: 8px;
        }
      }
      p {
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 25px;
        @media (max-width: 899px) {
          font-size: 14px;
          margin-bottom: 20px;
        }
        @media (max-width: 375px) {
          margin-bottom: 10px;
        }
      }

      .input_wrap {
        margin-bottom: 28px;
        @media (max-width: 899px) {
          margin-bottom: 20px;
        }
        .MuiFormControl-root {
          .MuiInputBase-root {
            @media (max-width: 599px) {
              min-width: auto;
            }
            input {
              @media (max-width: 599px) {
                padding: 7px 0;
              }
            }
          }
        }
      }

      button {
        width: 100%;
        margin-bottom: 32px;
        @media (max-width: 899px) {
          margin-bottom: 22px;
        }
        @media (max-width: 599px) {
          padding: 10px;
        }
        p {
          text-transform: capitalize;
        }
      }

      .form_bottom {
        font-size: 16px;
        font-weight: 400;
        color: ${primaryColors.grey_text};
        @media (max-width: 899px) {
          font-size: 14px;
        }
        a {
          color: ${primaryColors.text_purple};
          font-size: 16px;
          font-weight: 500;
          @media (max-width: 899px) {
            font-size: 14px;
          }
          &:hover {
            color: ${primaryColors.primary};
          }
        }
      }
    }
  }
`;
const register = () => {
  const router = useRouter();
  const [render, setRender] = useState(true);
  const { toastSuccess, toastError } = useNotiStack();
  const { mutate: practitionerSignUp, isLoading } = usePractitionerSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const onFormSubmit = (data: Inputs) => {
    const { email } = data;
    const formData: FormData = new FormData();
    formData.append("email", email);
    // let payload = {
    //   email_from: email,
    //   search_notify_lead: 1
    // };
    practitionerSignUp(formData, {
      onSuccess: (response) => {
        console.log("onSuccess", response);
        const { status, data } = response;
        if (status == 200) {
          router.push("/login");
        } else {
          toastSuccess(data ? data?.message : "Something went wrong.");
        }
      },
      onError: (error: any) => {
        const { response } = error;
        console.log("message", response?.data?.message);

        toastError(
          response ? response?.data?.message : "Something went wrong."
        );
      }
    });
  };

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
        <>
          <LoginWrapper
            title="welcome TO
  PROCELL"
          >
            <RegisterWrapper>
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
                  <Box className="form_body">
                    <Typography variant="h4">REGISTER NOW</Typography>
                    <Typography variant="body1">
                      Please enter the email associated with your orders
                    </Typography>
                    <Box className="input_wrap">
                      <InputFieldCommon
                        placeholder="Email"
                        style2
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="profile_error">
                          {errors.email.message}
                        </div>
                      )}
                    </Box>
                    <Box className="btn_wrapper">
                      {!isLoading ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          <Typography variant="body1">Submit</Typography>
                        </CustomButtonPrimary>
                      ) : (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                        >
                          <ButtonLoader />
                        </CustomButtonPrimary>
                      )}
                    </Box>
                    <Typography variant="body1" className="form_bottom">
                      Already have an account?{" "}
                      <Link href="/login">Login Now</Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </RegisterWrapper>
          </LoginWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default register;
