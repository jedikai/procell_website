import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import {
  useMannageCommunicationData,
  useUpdateMannageCommunication
} from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { GET_MANAGE_COMMUNICATION_DATA } from "@/hooks/react-qurey/query-keys/dashboardQuery.keys";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";

const ManageCommunications = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState("female");
  const onSuccessData = (response: any) => {
    console.log("data", response);
    const { opt_out } = response ?? {};
    setValue(`${opt_out}`);
  };
  const { data, isLoading: radioLoader } =
    useMannageCommunicationData(onSuccessData);
  const { mutate: updateComunication, isLoading } =
    useUpdateMannageCommunication();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const updateManageComunication = () => {
    const formData: FormData = new FormData();
    formData.append("status", `${value == "true" ? "True" : "False"}`);
    updateComunication(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_MANAGE_COMMUNICATION_DATA);
      }
    });
  };
  const renderRadioSection = useMemo(
    () => (
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>
    ),
    [value]
  );
  console.log(
    "value",
    typeof data?.opt_out,
    typeof value,
    data?.opt_out == value
  );

  return (
    <>
      <Wrapper>
        <DashboardWrapper>
          {!radioLoader ? (
            <Box className="cmn_box">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  height: "500px"
                }}
              >
                <h2 style={{ marginBottom: "10px" }}>
                  Would you like to receive marketing emails?
                </h2>
                {renderRadioSection}
                <Typography variant="body1" style={{ marginTop: "20px" }}>
                  We value your privacy and understand the importance of
                  providing you with control over your communication
                  preferences. By checking "No" on the checkbox above, you can
                  opt out of receiving all marketing emails pertaining to deals,
                  new product releases, and events.
                </Typography>
              </div>
              {!isLoading ? (
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_bill_btn mx-auto"
                  // type="submit"
                  // form="onFormSubmitBilling"
                  id="shippingButton"
                  disabled={`${data?.opt_out}` == value}
                  onClick={updateManageComunication}
                >
                  <Typography variant="body1">
                    {/* {isButtonStatusChange ? "Continue" : "Save"} */}
                    Save
                  </Typography>
                </CustomButtonPrimary>
              ) : (
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="payment_bill_btn mx-auto"
                  id="shippingButton"
                >
                  <ButtonLoader />
                </CustomButtonPrimary>
              )}
            </Box>
          ) : (
            <ButtonLoaderSecondary />
          )}
        </DashboardWrapper>
      </Wrapper>
    </>
  );
};

export default ManageCommunications;
