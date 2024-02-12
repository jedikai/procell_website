/* eslint-disable no-nested-ternary */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import VerifyBox from "@/components/VerifyBox/VerifyBox";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { VerifyStepsWrapper } from "@/styles/StyledComponents/VerifyStepsWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CrossIcon from "@/ui/Icons/CrossIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";

export default function Index() {
  const [step, setStep] = useState<Number>(1);

  const incrStep = (nextStep: Number) => {
    setStep(nextStep);
  };
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Certificate verify"
        innerHeaderTitle="Certificate verify"
        innerHeaderMainPage="Home"
        innnerHeaderMainurl="Home"
      />
      <Box className="cmn_gap">
        <Container fixed>
          <VerifyBox>
            <Box className="verify_inner">
              <VerifyStepsWrapper>
                {step === 1 ? (
                  <Box className="verify_cer_1">
                    <Typography variant="body1" className="verify_text">
                      Certificate ID*
                    </Typography>
                    <Box className="input_group">
                      <InputFieldCommon value="459611" />
                    </Box>
                    <Box className="btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => incrStep(2)}
                      >
                        <Typography variant="body1">Submit</Typography>
                      </CustomButtonPrimary>
                    </Box>
                    <Typography variant="body1" className="err_text">
                      <i className="ico">
                        <CrossIcon />
                      </i>
                      No valid Procell Therapies certificate matches ID 3323
                    </Typography>
                    <Typography variant="body1" className="protect_text">
                      Protected by reCAPTCHA,{" "}
                      <Link href="/">Privacy Policy</Link> &
                      <Link href="/">Terms of Service</Link> apply.
                    </Typography>
                  </Box>
                ) : step === 2 ? (
                  <Box className="verify_cer_2">
                    <Typography variant="body1" className="verify_text">
                      Certified procell therapies practitioner
                    </Typography>
                    <Stack
                      className="pr_details"
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Box className="pr_block">
                        <Typography variant="caption">Name: </Typography>{" "}
                        Practitioner
                      </Box>
                      <Box className="pr_block">
                        <Typography variant="caption">Certified ID:</Typography>
                        82F816
                      </Box>
                      <Box className="pr_block">
                        <Typography variant="caption">
                          Certificate On:
                        </Typography>
                        September 04 2023
                      </Box>
                    </Stack>
                  </Box>
                ) : null}
              </VerifyStepsWrapper>
            </Box>
          </VerifyBox>
        </Container>
      </Box>
    </Wrapper>
  );
}
