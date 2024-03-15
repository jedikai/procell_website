/* eslint-disable mui-path-imports/mui-path-imports */
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { useChangePassword } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import validationText from "@/json/messages/validationText";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { EditSettingWrapper } from "@/styles/StyledComponents/EditSettingWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

// <------------------ PASSWORD CHANGE SCHEMA VALIDATION SCHEMA ------------------>
const validationSchema = yup.object().shape({
  old_password: yup
    .string()
    .required(validationText.error.enter_password)
    .min(2, validationText.error.min_8_password),
  new_password: yup
    .string()
    .required(validationText.error.new_password)
    .min(2, validationText.error.min_8_password),
  confirm_password: yup
    .string()
    .required(validationText.error.confirm_password)
    .oneOf(
      [yup.ref("new_password")],
      "New password and confirm password do not match"
    )
});

export default function Index() {
  const [modalopen, setmodalopen] = useState(false);
  const [passwordValidator, setPasswordValidator] = useState({
    old: "",
    new: "",
    confirm: ""
  });
  const { toastSuccess, toastError } = useNotiStack();
  const { mutate: changePassword, isLoading } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });
  const handleopen = () => {
    setmodalopen(true);
  };
  const handleModalclose = () => {
    setmodalopen(false);
  };
  const onFormSubmit = (data: any) => {
    const { old_password, new_password, confirm_password } = data ?? {};
    if (new_password != confirm_password) {
      return false;
    }
    if (passwordValidator.new == passwordValidator.old) {
      return false;
    }
    const formData: FormData = new FormData();
    formData.append("old", old_password);
    formData.append("new1", new_password);
    formData.append("new2", confirm_password);
    changePassword(formData, {
      onSuccess: (data: any) => {
        toastSuccess(data?.data?.message);
        reset();
        setPasswordValidator({
          old: "",
          new: "",
          confirm: ""
        });
      },
      onError: (data: any) => {
        console.log("onError", data?.response);
        toastError(data?.response?.data?.message);
      }
    });
  };
  console.log("show me password data", errors);
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <EditSettingWrapper>
            <Box className="each_block">
              <Typography variant="h4">Change password</Typography>
              <form onSubmit={handleSubmit(onFormSubmit)} id="change_password">
                <Box className="form_group bottomless-margin">
                  <InputFieldCommon
                    placeholder="Password"
                    autoComplete="off"
                    isPassword
                    {...register("old_password")}
                    onKeyUp={(e: any) =>
                      setPasswordValidator({
                        ...passwordValidator,
                        old: e.target.value
                      })
                    }
                  />
                </Box>
                <Box className="form_group">
                  {errors.old_password && (
                    <div className="profile_error">
                      {errors.old_password.message}
                    </div>
                  )}
                </Box>
                <Box className="form_group bottomless-margin">
                  <InputFieldCommon
                    placeholder="New password"
                    autoComplete="off"
                    isPassword
                    {...register("new_password")}
                    onKeyUp={(e: any) =>
                      setPasswordValidator({
                        ...passwordValidator,
                        new: e.target.value
                      })
                    }
                  />
                </Box>
                <Box className="form_group">
                  {errors.new_password && (
                    <div className="profile_error">
                      {errors.new_password.message}
                    </div>
                  )}
                  {passwordValidator.new &&
                    passwordValidator.new == passwordValidator.old && (
                      <div className="profile_error">
                        Old and new Passwords must not match.
                      </div>
                    )}
                </Box>
                <Box className="form_group bottomless-margin">
                  <InputFieldCommon
                    placeholder="Confirm new password"
                    autoComplete="off"
                    isPassword
                    {...register("confirm_password")}
                    onKeyUp={(e: any) =>
                      setPasswordValidator({
                        ...passwordValidator,
                        confirm: e.target.value
                      })
                    }
                  />
                </Box>
                <Box className="form_group">
                  {errors.confirm_password && (
                    <div className="profile_error">
                      {errors.confirm_password.message}
                    </div>
                  )}
                  {/* {passwordValidator.confirm &&
                    passwordValidator.new != passwordValidator.confirm && (
                      <div className="profile_error">Passwords must match.</div>
                    )} */}
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box className="form_group forgot_group">
                    {!isLoading ? (
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                        form="change_password"
                      >
                        <Typography>Change password</Typography>
                      </CustomButtonPrimary>
                    ) : (
                      <CustomButtonPrimary variant="contained" color="primary">
                        <ButtonLoader />
                      </CustomButtonPrimary>
                    )}
                  </Box>
                  <Link href="/auth/forgetpassword">
                    Forgot password?
                  </Link>
                </Stack>
              </form>
            </Box>
          </EditSettingWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
