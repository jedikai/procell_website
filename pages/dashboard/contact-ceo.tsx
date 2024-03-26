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
              <Typography variant="h4">Contact CEO</Typography>
              <Typography>
                Please fill out the form below and your information will be
                forwarded straight to the CEO's desk
              </Typography>
            </Box>
            <Box className="form_wrapper">
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Full name" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Call back number" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Do you have any older number?" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Email" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon
                      placeholder="Please explain your issue"
                      multiline
                      rows={4}
                      maxRows={4}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <Typography className="blue_para">
                      *Your issue will go straight to the CEO's desk.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box className="form_submit">
                <CustomButtonPrimary variant="contained" color="primary">
                  <Typography>Submit</Typography>
                </CustomButtonPrimary>
              </Box>
            </Box>
          </ContactCeoWrapperNew>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
