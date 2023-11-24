import { useResetPassword } from "@/hooks/react-qurey/query-hooks/loginQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(validationText.error.enter_password)
    .min(2, validationText.error.min_8_password),
  confirmPassword: yup
    .string()
    .required(validationText.error.confirm_password)
    .oneOf([yup.ref("password"), null], validationText.error.match_password) // Check if it matches the 'password' field
});

const Resetpassword = () => {
  const router = useRouter();
  const { db, token, login }: any = router?.query ?? {};
  const { toastSuccess, toastError } = useNotiStack();
  const [openModal, setopenModal] = useState(false);

  const { mutate: resetPassword, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const handleOpenModal = () => {
    setopenModal(true);
  };
  const handleCloseModal = () => {
    setopenModal(false);
  };
  const onFormSubmit = (data: Inputs) => {
    console.log("show me data", data);
    const { password, confirmPassword } = data;
    const formData: FormData = new FormData();
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    // formData.append("login", login ?? "");
    formData.append("token", token ?? "");
    formData.append("db", db ?? "");
    // handleOpenModal();
    resetPassword(formData, {
      onSuccess: (response: any) => {
        // toastSuccess(
        //   response ? response?.data?.message : "Something went wrong."
        // );
        handleOpenModal();
      },
      onError: (error: any) => {
        console.log("error", error);

        toastError(
          error ? error?.response?.data?.message : "Something went wrong."
        );
      }
    });
  };
  console.log("router", login);

  return (
    <LoginWrapper
      title="welcome TO
PROCELL"
    >
      <LoginPageWrapper className="">
        <Box className="wrapper reset_wrapper">
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
              <Box className="verified_box">
                <Image
                  src={assest.purple_tick}
                  alt="verified"
                  width={32}
                  height={32}
                />
                <Typography variant="body1">Verification Successful</Typography>
              </Box>
              <Typography variant="h4">CREATE NEW PASSWORD</Typography>

              <Box className="input_wrap">
                <InputFieldCommon
                  placeholder="Password"
                  style2
                  isPassword
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
                  <div className="error">{errors.confirmPassword.message}</div>
                )}
              </Box>

              <Box className="btn_wrapper">
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <Typography variant="body1">Change password</Typography>
                </CustomButtonPrimary>
              </Box>
            </Box>
          </form>
        </Box>
        <MuiModalWrapper open={openModal} onClose={handleCloseModal} title="">
          <Box className="success_modal">
            <Box className="icon_wrap">
              <Image
                src={assest.success_modal_img}
                alt="success"
                width={121}
                height={127}
              />
            </Box>
            <Typography variant="h3">Successfully Changed Password</Typography>
            <Box className="btn_wrapper">
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => router.push("/auth/login")}
              >
                <Typography variant="body1">Ok</Typography>
              </CustomButtonPrimary>
            </Box>
          </Box>
        </MuiModalWrapper>
      </LoginPageWrapper>
    </LoginWrapper>
  );
};

export default Resetpassword;
