/* eslint-disable react/no-unescaped-entities */
import InnerHeader from "@/components/InnerHeader/InnerHeader";

import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { EachLinearComponent } from "@/styles/StyledComponents/AcademyEachComponentWrapper";
import {
  QizBlockWrapper,
  QuizWrapper
} from "@/styles/StyledComponents/QizBlockWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import QuizRightIcon from "@/ui/Icons/QuizRightIcon";
import QuizWrongIcon from "@/ui/Icons/QuizWrongIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="procell Quiz"
        innerHeaderRediractedPage="Procell Quiz"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <QuizWrapper className="cmn_gap">
        <Container fixed>
          <QizBlockWrapper>
            <Typography variant="h5">Question 1 of 11</Typography>
            <Typography variant="h4">
              What is the difference between Traditional MicroNeedling and
              Procell MicroChanneling?
            </Typography>
            <Box className="answer_block">
              <Typography>Choose only ONE best answer.</Typography>
              <EachLinearComponent>
                <Box className="wrapper">
                  <Typography>
                    Procell Microchanneling is a style of collagen rejuvenation
                    in which the "micro-injuries" are created by "stamping" in a
                    vertical fashion to create vertical micro-channels instead
                    of dragging or gliding across the skin like in traditional
                    Microneedling. No scratching or tearing of the skin occurs.
                  </Typography>
                  <Typography>
                    This stamping method reduces damage to skin during
                    treatment; less painful,faster healing, and shorter
                    downtimes.
                  </Typography>
                </Box>
                <Typography component="i" className="right_icon">
                  <QuizRightIcon />
                </Typography>
                <Typography component="i" className="wrong_icon">
                  <QuizWrongIcon />
                </Typography>
              </EachLinearComponent>
              <EachLinearComponent isWrong>
                <Box className="wrapper">
                  <Typography>
                    There are no differences. They are the same treatment.
                  </Typography>
                </Box>
                <Typography component="i" className="right_icon">
                  <QuizRightIcon />
                </Typography>
                <Typography component="i" className="wrong_icon">
                  <QuizWrongIcon />
                </Typography>
              </EachLinearComponent>
              <EachLinearComponent isRight>
                <Box className="wrapper">
                  <Typography>The correct answer is not provided</Typography>
                </Box>
                <Typography component="i" className="right_icon">
                  <QuizRightIcon />
                </Typography>
                <Typography component="i" className="wrong_icon">
                  <QuizWrongIcon />
                </Typography>
              </EachLinearComponent>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ marginTop: "25px" }}
            >
              <CustomButtonPrimary
                variant="outlined"
                color="info"
                className="gradient_btn"
              >
                <Typography>Confirm</Typography>
              </CustomButtonPrimary>
            </Stack>
          </QizBlockWrapper>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: "60px" }}
          >
            <CustomButtonPrimary variant="contained" color="primary">
              <Typography>Next</Typography>
            </CustomButtonPrimary>
          </Stack>
        </Container>
      </QuizWrapper>
    </Wrapper>
  );
}
