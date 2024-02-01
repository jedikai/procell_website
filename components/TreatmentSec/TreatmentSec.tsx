/* eslint-disable import/no-extraneous-dependencies */
import { useImageCompressionData } from "@/hooks/react-qurey/query-hooks/storySecQuery.hooks";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TreatmentSecUpper from "../TreatmentSecUpper/TreatmentSecUpper";
import TipIcon from "@/ui/Icons/TipIcon";

export default function TreatmentSec() {
  const { data } = useImageCompressionData();
  console.log("daaaaaaaata", data);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipeToSlide: false,
    touchMove: false
  };
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
            <Typography variant="caption">procell microchanneling</Typography>{" "}
            treatment
          </Typography>
        </Box>
        {/* <TreatmentSecUpper /> */}
        <Box className="compare_slider">
          <Slider {...settings}>
            {data &&
              data?.length > 0 &&
              data?.map((_i: any) => (
                <Box className="compare_slide" key={_i?.id ?? ""} id={_i?.id}>
                  <Box className="compare_sec">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={_i?.before_image_url ?? ""}
                          srcSet={_i?.before_image_url ?? ""}
                          // src={assest?.black_img}
                          // srcSet={assest?.black_img}
                          alt="Image one"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={_i?.after_image_url ?? ""}
                          srcSet={_i?.after_image_url ?? ""}
                          // src={assest?.glow_img}
                          // srcSet={assest?.glow_img}
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
                        Procell Microchanneling treatments enhance cellular
                        activity by creating hundreds of thousands of
                        microchannels. Each micro-injury prompts an inflammatory
                        response, initiating collagen formation. Over time, this
                        repeated healing process significantly improves skin
                        texture and overall appearance, rejuvenating the skin
                        effectively.
                      </Typography>
                    </Box>
                    <Box className="stack_rgt">
                      <List disablePadding>
                        {!!_i?.no_of_treatments && (
                          <ListItem disablePadding>
                            <GirlIcon />
                            <Typography variant="body1">
                              {_i?.no_of_treatments}
                            </Typography>
                          </ListItem>
                        )}
                        {!!_i?.serum_used && (
                          <ListItem disablePadding>
                            <DropIcon />
                            <Typography variant="body1">
                              {_i?.serum_used}
                            </Typography>
                          </ListItem>
                        )}
                        {!!_i?.tip_size && (
                          <ListItem disablePadding>
                            <TipIcon />
                            <Typography variant="body1">
                              {_i?.tip_size}
                            </Typography>
                          </ListItem>
                        )}
                      </List>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Slider>
        </Box>
      </Container>
    </TreatMentSecWrapper>
  );
}
