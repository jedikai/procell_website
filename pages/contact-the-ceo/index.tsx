import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactCeoWrapper } from "@/styles/StyledComponents/ContactCeoWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Contact the ceo"
        innerHeaderRediractedPage="Contact the ceo"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <ContactCeoWrapper className="cmn_gap">
        <Image
          src={assest?.pink_leaf}
          alt="leaf image"
          width={90}
          height={110}
          className="pink_leaf"
        />

        <Container fixed>
          <Box className="contact_sec">
            <Grid
              container
              spacing={{ xl: 4, lg: 2, md: 2, xs: 4 }}
              alignItems="center"
            >
              <Grid item xl={5} lg={6} md={6} xs={12}>
                <figure>
                  <Image
                    src={assest?.contactCeoImage}
                    alt="image"
                    width={712}
                    height={667}
                  />
                </figure>
              </Grid>
              <Grid item xl={7} lg={5} md={6} xs={12}>
                <Box className="contact_form">
                  <Box className="sec_title">
                    <Typography variant="h4">Connect with our CEO!</Typography>
                    <Typography variant="body1">
                      Please fill out the form below and your information will
                      be forwarded straight to the CEO's desk
                    </Typography>
                  </Box>
                  <form>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Full name" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Call back number" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Do you have any older number?" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Email" />
                    </Box>
                    <Box className="form_group_textarea">
                      <InputFieldCommon
                        placeholder="Please explain your issue"
                        multiline
                        rows={4}
                        maxRows={4}
                        style3
                      />
                    </Box>
                    <Typography variant="body1" className="special_text">
                      *Your issue will go straight to the CEO's desk.
                    </Typography>

                    <Box className="submit_btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                        form="contact_form"
                      >
                        <Typography>Submit</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContactCeoWrapper>
    </Wrapper>
  );
}
