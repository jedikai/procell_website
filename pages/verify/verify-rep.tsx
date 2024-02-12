/* eslint-disable no-nested-ternary */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import VerifyBox from "@/components/VerifyBox/VerifyBox";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { VerifyStepsWrapper } from "@/styles/StyledComponents/VerifyStepsWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import ClipBoadrIcon from "@/ui/Icons/ClipBoadrIcon";
import FaliureIcon from "@/ui/Icons/FaliureIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openModal, setopenModal] = useState(false);

  const handleOpenModal = () => {
    setopenModal(true);
  };
  const handleCloseModal = () => {
    setopenModal(false);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [step, setStep] = useState<Number>(1);

  const incrStep = (nextStep: Number) => {
    setStep(nextStep);
  };
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Rep Verify"
        innerHeaderTitle="Rep Verify"
        innerHeaderMainPage="Home"
        innnerHeaderMainurl="Home"
      />

      <Box className="cmn_gap">
        <Container fixed>
          <VerifyBox>
            <Box className="verify_inner">
              <VerifyStepsWrapper>
                {step === 1 ? (
                  <>
                    <Typography variant="body1" className="verify_text">
                      Generate a 10 minute secret “Verification key”
                    </Typography>
                    <Box className="btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => incrStep(2)}
                      >
                        <Typography variant="body1">Generate</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </>
                ) : step === 2 ? (
                  <Box className="verify_rep_2">
                    <Typography variant="body1" className="verify_text">
                      Send this code to the Procell representative you are
                      speaking with
                    </Typography>
                    <Box className="input_group copy_group">
                      <InputFieldCommon
                        value="459611"
                        adorMentIcon={<ClipBoadrIcon />}
                      />
                    </Box>
                    <Box className="btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => incrStep(3)}
                      >
                        <Typography variant="body1">Next</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </Box>
                ) : step === 3 ? (
                  <Box className="verify_rep_3">
                    <Typography variant="body1" className="verify_text">
                      Enter the verified key provided to you by the Procell
                      representative you are speaking with
                    </Typography>
                    <Box className="input_group ">
                      <InputFieldCommon value="459611" />
                    </Box>
                    <Box className="btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={handleOpenModal}
                      >
                        <Typography variant="body1">Submit</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </Box>
                ) : null}
              </VerifyStepsWrapper>
            </Box>
          </VerifyBox>
        </Container>
      </Box>
      <MuiModalWrapper
        open={openModal}
        onClose={handleCloseModal}
        title=""
        className="verify_modal"
      >
        <Box className="success_modal">
          <Box className="icon_wrap">
            {/* <SuccessIcon /> */}
            <FaliureIcon />
          </Box>
          <Typography variant="h2">Verification Successful!</Typography>
          <Typography variant="h3">
            {" "}
            You are speaking with a verified Procell Therapies rep
          </Typography>
          <Box className="btn_wrapper">
            <CustomButtonPrimary variant="contained" color="primary">
              <Typography variant="body1">Ok</Typography>
            </CustomButtonPrimary>
          </Box>
        </Box>
      </MuiModalWrapper>
    </Wrapper>
  );
}
