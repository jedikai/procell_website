/* eslint-disable mui-path-imports/mui-path-imports */
import { useChangePassword } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import validationText from "@/json/messages/validationText";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { EditSettingWrapper } from "@/styles/StyledComponents/EditSettingWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import InfoIcon from "@/ui/Icons/InfoIcon";
import WarningIcon from "@/ui/Icons/WarningIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
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
    .min(8, validationText.error.min_8_password),
  new_password: yup
    .string()
    .required(validationText.error.new_password)
    .min(8, validationText.error.min_8_password),
  confirm_password: yup.string().required(validationText.error.confirm_password)
});

export default function Index() {
  const [modalopen, setmodalopen] = useState(false);
  const [passwordValidator, setPasswordValidator] = useState({
    new: "",
    confirm: ""
  });
  const { toastSuccess, toastError } = useNotiStack();
  const { mutate: changePassword } = useChangePassword();
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
    const formData: FormData = new FormData();
    formData.append("old", old_password);
    formData.append("new1", new_password);
    formData.append("new2", confirm_password);
    changePassword(formData, {
      onSuccess: (data: any) => {
        toastSuccess(data?.data?.message);
        reset();
        setPasswordValidator({
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
                <Box className="form_group">
                  <InputFieldCommon
                    placeholder="Password"
                    isPassword
                    {...register("old_password")}
                  />
                </Box>
                <Box className="form_group">
                  {errors.old_password && (
                    <div className="profile_error">
                      {errors.old_password.message}
                    </div>
                  )}
                </Box>
                <Box className="form_group">
                  <InputFieldCommon
                    placeholder="New password"
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
                </Box>
                <Box className="form_group">
                  <InputFieldCommon
                    placeholder="Confirm new password"
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
                  {passwordValidator.confirm &&
                    passwordValidator.new != passwordValidator.confirm && (
                      <div className="profile_error">Passwords must match.</div>
                    )}
                </Box>
                <Box className="form_group">
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    type="submit"
                    form="change_password"
                  >
                    <Typography>Change password</Typography>
                  </CustomButtonPrimary>
                </Box>
              </form>
            </Box>
            {/* <Box className="each_block">
              <Typography variant="h4">
                Two-factor authentication
                <Typography variant="caption">
                  <InfoIcon />
                </Typography>
              </Typography>
              <Typography className="auth_para">
                <Typography variant="caption">
                  <WarningIcon />
                </Typography>
                Two-factor authentication not enabled
              </Typography>
              <CustomButtonPrimary variant="contained" color="primary">
                <Typography>Enable now</Typography>
              </CustomButtonPrimary>
            </Box> */}

            {/* <Box className="each_block">
              <Typography variant="h4">
                Delete Account
                
              </Typography>

              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={handleopen}
              >
                <Typography>Delete now</Typography>
              </CustomButtonPrimary>
              <MuiModalWrapper
                open={modalopen}
                onClose={handleModalclose}
                title=""
              >
                <Box className="DeteteNow">
                  <Typography variant="h3">
                    Are you sure you want to do this?
                  </Typography>
                  <Typography variant="body1">
                    Disable your account by entering your details below
                  </Typography>

                  <List disablePadding className="form_group">
                    <ListItem disablePadding>
                      <InputFieldCommon placeholder="Enter your email" />
                    </ListItem>
                    <ListItem disablePadding>
                      <InputFieldCommon
                        placeholder="Enter your password"
                        isPassword
                      />
                    </ListItem>
                  </List>

                  <List disablePadding className="btn_wrapper">
                    <ListItem disablePadding>
                      <CustomButtonPrimary variant="contained" color="primary" className="deletebtn">
                        <Typography variant="body1">Delete</Typography>
                      </CustomButtonPrimary>
                    </ListItem>
                    <ListItem disablePadding>
                      <CustomButtonPrimary
                        variant="outlined"
                        color="info"
                        className="gradient_btn"
                      >
                        <Typography variant="body1">Cancel</Typography>
                      </CustomButtonPrimary>
                    </ListItem>
                  </List>
                </Box>
              </MuiModalWrapper>
            </Box> */}
          </EditSettingWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
