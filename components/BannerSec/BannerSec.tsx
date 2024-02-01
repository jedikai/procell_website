/* eslint-disable no-var */
/* eslint-disable react/no-unknown-property */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable jsx-a11y/media-has-caption */
import assest from "@/json/assest";
import { BannerWrapper } from "@/styles/StyledComponents/BannerWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

import MuteIcon from "@/ui/Icons/MuteIcon";
import UnMuteIcon from "@/ui/Icons/UnMuteIcon";
import WhiteArrowIcon from "@/ui/Icons/WhiteArrowIcon";
import { Box, Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BannerSec() {
  const router = useRouter();
  const [muted, setMuted] = useState(true);
  const handleToggleMute = () => setMuted((current) => !current);
  const getTreatedHandler = () => {
    localStorage.setItem("isConsumer", 'true');
    router.push("/contact/");
  };
  return (
    <BannerWrapper>
      <Box className="banner_sec">
        <video
          width="auto"
          height="auto"
          loop
          muted={muted}
          playsInline
          autoPlay
        >
          <source src={assest.banner_vdo} type="video/mp4" />
        </video>
        <Button onClick={handleToggleMute} className="mute_icon">
          {muted ? <MuteIcon /> : <UnMuteIcon />}
        </Button>

        <Box className="banner_wrapper">
          <Container fixed>
            <Box className="banner_inr">
              <Typography variant="h1">Our Technology</Typography>
              <Typography variant="h3">Your Transformation</Typography>
              <Box className="sub_para">
                <Typography variant="body1">
                  Unlock your body’s natural ability to produce healthy new
                  skin.
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={5}
                  className="btn_holder"
                >
                  <CustomButtonPrimary
                    endIcon={<WhiteArrowIcon />}
                    variant="contained"
                    color="primary"
                    onClick={getTreatedHandler}
                  // href="/auth/registerpage/"
                  >
                    <Typography variant="body1">Get Treated</Typography>
                  </CustomButtonPrimary>
                  <CustomButtonPrimary
                    endIcon={<WhiteArrowIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/contact/")}
                  // href="/auth/register/"
                  >
                    <Typography variant="body1">Practioner</Typography>
                  </CustomButtonPrimary>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </BannerWrapper>
  );
}
