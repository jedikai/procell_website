import InnerHeader from "@/components/InnerHeader/InnerHeader";
import ItemsCard from "@/components/ItemsCard/ItemsCard";
import PaymentCardDetailsCard from "@/components/PaymentCardDetails/PaymentCardDetailsCard";
import assest from "@/json/assest";
import { checkoutItems } from "@/json/mock/checkoutItems.mock";
import { radioList } from "@/json/mock/checkoutradio.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { CheckoutWrapper } from "@/styles/StyledComponents/CheckoutWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomRadio from "@/ui/CustomRadio/CustomRadio";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";

const Checkout = () => {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Checkout"
        innerHeaderRediractedPage="Checkout"
        bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Cart"    innnerHeaderMainurl="cart"   />

      <CheckoutWrapper className="cmn_gap">
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item lg={7.5} xs={12}>
              <Box className="billing_adress">
                <Typography variant="h4" className="form_header">
                  Billing address
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
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ship to the same address"
                />
              </Box>
              <Typography variant="h4" className="form_header">
                Choose a delivery method
              </Typography>
              <Box className="delivery_options_wrap">
                <CustomRadio radioList={radioList} customlabel />
              </Box>
            </Grid>
            <Grid item lg={4.5} xs={12}>
              <ItemsCard itemsList={checkoutItems} />
              <PaymentCardDetailsCard subtotal={3000} shipping={20} />
            </Grid>
          </Grid>
        </Container>
      </CheckoutWrapper>
    </Wrapper>
  );
};

export default Checkout;
