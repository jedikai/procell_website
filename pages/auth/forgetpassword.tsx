import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { useResetPassword } from "@/hooks/react-qurey/query-hooks/loginQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import { LoginPageWrapper } from "@/styles/StyledComponents/LoginPageWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  email: string;
};

// <------------------ FORGET PASSWORD FORM VALIDATION SCHEMA ------------------>
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required")
});

const Forgetpassword = () => {
  const { toastSuccess, toastError } = useNotiStack();
  const router = useRouter();
  const [render, setRender] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const userGivenData = useRef({});
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const startTimer = () => {
    setTimeLeft(59);
  };
  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimer: number) => prevTimer! - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setTimeLeft(null); // Reset the timer
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOpenModal = () => {
    setopenModal(true);
    startTimer();
  };
  const handleCloseModal = () => {
    setopenModal(false);
    clearInterval(interval);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const onFormSubmit = (data: Inputs) => {
    const { email } = data;
    const formData: FormData = new FormData();
    formData.append("login", email);
    let payload = { login: email };
    userGivenData.current = payload;
    // handleOpenModal();
    resetPassword(formData, {
      onSuccess: (response: any) => {
        toastSuccess(
          response ? response?.data?.message : "Something went wrong."
        );
        reset();
        // handleOpenModal();
      },
      onError: (error: any) => {
        console.log("error", error);

        toastError(
          error ? error?.response?.data?.message : "Something went wrong."
        );
      }
    });
  };
  const resendOTP = () => {
    clearInterval(interval);
    // startTimer();
    resetPassword(userGivenData.current, {
      onSuccess: () => {
        startTimer();
      },
      onError: (error: any) => {
        toastError(error ? error?.message : "Something went wrong.");
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
            <LoginPageWrapper className="forget_wrapper">
              <Box className="wrapper ">
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
                    <Typography variant="h4">Forgot your password!</Typography>
                    <Typography variant="body1" className="forget_page_p">
                      Enter your email and we will send you instructions to
                      reset your password.
                    </Typography>
                    <Box className="input_wrap">
                      <InputFieldCommon
                        placeholder="Email"
                        style2
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="error">{errors.email.message}</div>
                      )}
                    </Box>

                    <Box className="btn_wrapper">
                      {!isLoading ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          <Typography variant="body1">
                            Reset password
                          </Typography>
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
                  </Box>
                </form>
              </Box>
              <MuiModalWrapper
                open={openModal}
                onClose={handleCloseModal}
                title=""
              >
                <Box className="forgot_password_modal">
                  <Typography variant="h3">
                    Password reset OTP sent to your email id
                  </Typography>
                  <Typography variant="body1">
                    Enter the OTP which you received via email
                  </Typography>

                  <Box className="input_field_wrapper">
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                    <Box className="input_wrap">
                      <InputFieldCommon />
                    </Box>
                  </Box>
                  <Box className="btn_wrapper">
                    <CustomButtonPrimary variant="contained" color="primary">
                      <Typography variant="body1">Verify</Typography>
                    </CustomButtonPrimary>
                  </Box>

                  <Box className={!!timeLeft ? "resend_otp" : "resend_otp1"}>
                    {!!timeLeft ? (
                      <Typography variant="body1">
                        Resend OTP in
                        <Typography variant="caption">{` 00 : ${
                          `${timeLeft}`.length > 1 ? timeLeft : `0${timeLeft}`
                        }`}</Typography>
                      </Typography>
                    ) : (
                      <Box className="btn_wrapper">
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          onClick={resendOTP}
                        >
                          <Typography variant="body1"> Resend OTP</Typography>
                        </CustomButtonPrimary>
                      </Box>
                    )}
                  </Box>
                </Box>
              </MuiModalWrapper>
            </LoginPageWrapper>
          </LoginWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Forgetpassword;
