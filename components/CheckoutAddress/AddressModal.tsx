import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddressModal = ({ open, handleClose, type }: any) => {
  return (
    <>
      <MuiModalWrapper open={open} onClose={handleClose} title="">
        <Box className="checkout_modal">
          <Box className="billing_adress">
            <Typography variant="h4" className="form_header">
              {type}
            </Typography>
            <Grid container spacing={2} className="billing_adress_grid">
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="First name" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Last name" style3 />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Email" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Phone number" style3 />
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street and number"
                  style3
                  multiline
                  rows={4}
                  maxRows={4}
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street 2"
                  style3
                  rows={4}
                  maxRows={4}
                  multiline
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="City" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="ZIP code" style3 />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Country" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="State/Province" style3 />
              </Grid>
            </Grid>
            {/* <FormControlLabel
              control={<Checkbox />}
              label="Ship to the same address"
            /> */}
          </Box>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            className="payment_bill_btn mx-auto"
            onClick={handleClose}
          >
            <Typography variant="body1">Save</Typography>
          </CustomButtonPrimary>
        </Box>
      </MuiModalWrapper>
    </>
  );
};

export default AddressModal;
