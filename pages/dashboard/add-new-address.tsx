/* eslint-disable react/no-unescaped-entities */
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactCeoWrapperNew } from "@/styles/StyledComponents/ContactCeoWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Index() {
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <ContactCeoWrapperNew>
            <Box className="title_block">
              <Typography variant="h4">Add New Address</Typography>
            </Box>
            <Box className="form_wrapper">
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon
                      placeholder="Full address"
                      multiline
                      rows={4}
                      maxRows={4}
                    />
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="City" />
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="ZIP code" />
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Country" />
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="State/Province" />
                  </Box>
                </Grid>
              </Grid>
              <Box className="form_submit">
                <CustomButtonPrimary variant="contained" color="primary">
                  <Typography>Save</Typography>
                </CustomButtonPrimary>
              </Box>
            </Box>
          </ContactCeoWrapperNew>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
