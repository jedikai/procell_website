import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { useUserLogin } from "@/hooks/react-qurey/query-hooks/loginQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import { LoginPageWrapper } from "@/styles/StyledComponents/LoginPageWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import Switch from "@mui/material/Switch";
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
  password: string;
  remember_me?: boolean;
};

// <------------------ LOGIN FORM VALIDATION SCHEMA ------------------>
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  password: yup
    .string()
    .required(validationText.error.enter_password)
    .min(2, validationText.error.min_8_password)
});

const Login = () => {
  const router = useRouter();
  const [render, setRender] = useState(true);
  const [checked, setChecked] = useState(false);
  const { toastSuccess, toastError } = useNotiStack();
  const onSuccessUserLogin = () => {
    router.push("/dashboard/profile");
  };
  const onErrorUserLogin = (error: any) => {
    toastError(error ? error?.message : "Something went wrong.");
  };
  // const {
  //   data: userLogin,
  //   isLoading,
  //   refetch
  // } = useUserLogin(userGivenCred, false, onSuccessUserLogin, onErrorUserLogin);
  const { mutate: userLogin, isLoading } = useUserLogin();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const onFormSubmit = (data: Inputs) => {
    const { email, password, remember_me } = data;
    const formData: FormData = new FormData();
    formData.append("login", email);
    formData.append("password", password);
    userLogin(formData, {
      onSuccess: (data: any) => {
        console.log("login user cred", data, remember_me);
        const userDetails = JSON.stringify({
          email,
          cred: data?.data?.data?.sid
        });
        sessionStorage.setItem("session_id", data?.data?.data?.sid);
        // if (remember_me) {
        if (checked) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              email,
              cred: data?.data?.data?.sid,
              remember_me: checked
            })
          );
        } else {
          setCookieClient("userDetails", userDetails);
          localStorage.removeItem("userDetails");
        }
        router.push("/dashboard/profile");
      },
      onError: (error: any) => {
        // console.log("login user cred", error);
        toastError(
          error ? error?.response?.data?.message : "Something went wrong."
        );
      }
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // const userLoginStatus: boolean =
      //   !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
      // if (userLoginStatus) {
      //   router.push("/dashboard/profile");
      //   setRender(false);
      // } else {
      //   setRender(true);
      // }
      let getUserDetails: any = {};
      if (!!localStorage.getItem("userDetails")) {
        getUserDetails = JSON.parse(localStorage.getItem("userDetails") ?? "");
      }
      setValue("email", getUserDetails?.email ?? "");
      setChecked(getUserDetails?.remember_me ?? false);
      // setValue("remember_me", getUserDetails?.remember_me ?? false);
      console.log(
        "getUserDetails",
        typeof getUserDetails,
        getUserDetails?.email ?? "nodata"
      );
      //  getUserDetails=JSON.parse()
    }
    // }
  }, []);

  console.log("getValues", checked);
  const checkHandler = (data: boolean) => setChecked(data);
  return (
    <>
      {render ? (
        <>
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
                  <Box className="form_body">
                    <Typography variant="h4">
                      Sign in to{" "}
                      <Typography variant="caption">Procell</Typography>
                    </Typography>
                    {/* <Typography variant="body1">
                      Enter your details to get sign in to your account
                    </Typography> */}
                    <Box className="input_wrap">
                      <InputFieldCommon
                        placeholder="Email"
                        style2
                        defaultValue={""}
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="error">{errors.email.message}</div>
                      )}
                      <InputFieldCommon
                        placeholder="Password"
                        isPassword
                        style2
                        {...register("password")}
                      />
                      {errors.password && (
                        <div className="error">{errors.password.message}</div>
                      )}
                    </Box>
                    <Box className="forgot_pass">
                      <Box className="rememberMewrap">
                        <Switch
                          checked={checked}
                          // {...register("remember_me")}
                          onChange={(e: any) => checkHandler(e.target.checked)}
                        />
                        <Typography variant="body1">Remember me</Typography>
                      </Box>

                      <Link href="/auth/forgetpassword">Forgot password?</Link>
                    </Box>
                    <Box className="btn_wrapper">
                      {!isLoading ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          <Typography variant="body1">Login</Typography>
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
                      Don’t have an account?{" "}
                      {/* <Link href="/auth/registerpage">Register Now</Link> */}
                      <Link href="/auth/firststep">Register Now</Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </LoginPageWrapper>
          </LoginWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;
