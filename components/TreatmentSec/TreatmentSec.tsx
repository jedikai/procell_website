/* eslint-disable import/no-extraneous-dependencies */
import assest from "@/json/assest";
import { TreatMentSecWrapper } from "@/styles/StyledComponents/TreatMentSecWrapper";
import DropIcon from "@/ui/Icons/DropIcon";
import GirlIcon from "@/ui/Icons/GirlIcon";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";
import TreatmentSecUpper from "../TreatmentSecUpper/TreatmentSecUpper";

export default function TreatmentSec() {
  return (
    <TreatMentSecWrapper className="cmn_gap">
      <Image
        src={assest.shell}
        width={151}
        height={184}
        alt="shell"
        className="shell1"
      />
      <Image
        src={assest.shell}
        width={49}
        height={41}
        alt="shell"
        className="shell2"
      />
      <Image
        src={assest.shell}
        width={87}
        height={71}
        alt="shell"
        className="shell3"
      />
      <Container fixed>
        <Box className="sec_title">
          <Typography variant="h3">
            <Typography variant="caption">procell microchanneling</Typography> treatment
          </Typography>
        </Box>
        <TreatmentSecUpper />
        <Box className="compare_sec">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={assest?.black_img}
                srcSet={assest?.black_img}
                alt="Image one"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={assest?.glow_img}
                srcSet={assest?.glow_img}
                alt="Image two"
              />
            }
          />
          <Chip label="Before" className="before_btn" />
          <Chip label="After" className="after_btn" />
        </Box>
        <Stack direction="row" className="compare_btm">
          <Box className="stack_lft">
            <Typography>
              How does a Microchanneling Treatment stimulate cellular activity?
              A single treatment creates hundreds of thousands of microchannels.
              In response to each micro-injury, an inflammatory healing process
              begins which initiates the formation of new collagen. Over time,
              the repeated healing process improves the surface texture and the
              overall appearance of the skin
            </Typography>
          </Box>
          <Box className="stack_rgt">
            <List disablePadding>
              <ListItem disablePadding>
                <GirlIcon />
              </ListItem>
              <ListItem disablePadding>
                <DropIcon />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Container>
    </TreatMentSecWrapper>
  );
}
