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
import React, { useState } from "react";

export default function BannerSec() {
  const [muted, setMuted] = useState(true);
  const handleToggleMute = () => setMuted((current) => !current);
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
          {muted ? <MuteIcon /> :<UnMuteIcon /> }
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
                <CustomButtonPrimary
                  endIcon={<WhiteArrowIcon />}
                  variant="contained"
                  color="secondary"
                >
                  <Typography variant="body1">Get started</Typography>
                </CustomButtonPrimary>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </BannerWrapper>
  );
}
