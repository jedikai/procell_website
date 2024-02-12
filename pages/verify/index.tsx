import InnerHeader from "@/components/InnerHeader/InnerHeader";
import VerifyBox from "@/components/VerifyBox/VerifyBox";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { SelectVerifyWrapper } from "@/styles/StyledComponents/SelectVerifyWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Select Verify"
        innerHeaderTitle="Verify"
        innerHeaderMainPage="Home"
        innnerHeaderMainurl="Home"
      />

      <Box className="cmn_gap">
        <Container fixed>
          <Box className="verify_inner">
            <VerifyBox>
              <SelectVerifyWrapper>
                <Typography variant="body1" className="select_text">
                  Please select below:
                </Typography>
                <Box className="btn_holder">
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/verify/verify-rep")}
                  >
                    <Typography variant="body1">Verify Rep</Typography>
                  </CustomButtonPrimary>
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/verify/verify-certificate")}
                  >
                    <Typography variant="body1">Verify certificate </Typography>
                  </CustomButtonPrimary>
                </Box>
              </SelectVerifyWrapper>
            </VerifyBox>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
}
