/* eslint-disable import/no-extraneous-dependencies */
import { useImageCompressionData } from "@/hooks/react-qurey/query-hooks/storySecQuery.hooks";
import assest from "@/json/assest";
import { TreatMentSecWrapper } from "@/styles/StyledComponents/TreatMentSecWrapper";
import DropIcon from "@/ui/Icons/DropIcon";
import GirlIcon from "@/ui/Icons/GirlIcon";
import TipIcon from "@/ui/Icons/TipIcon";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Image from "next/image";
import { memo, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default memo(() => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const { data, isLoading } = useImageCompressionData();
  console.log("daaaaaaaata", data);
  const handleSwipe = (data: number) => {
    setSliderIndex(data);
    console.log("show me data of rs", data);
  };

  // const sliderOneRef = useRef();
  // const sliderTwoRef = useRef();

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

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
    touchMove: false,
    afterChange: handleSwipe
    // asNavFor: sliderTwoRef
  };

  const settings1 = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipeToSlide: false,
    touchMove: true
    // afterChange: handleSwipe,
  };

  return (
    <TreatMentSecWrapper className="cmn_gap">
      {!isLoading && !!data ? (
        <>
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
                <Typography variant="caption">
                  procell microchanneling
                </Typography>{" "}
                treatment
              </Typography>
            </Box>
            {/* <TreatmentSecUpper /> */}
            <Box className="compare_slider">
              <Box className="compare_top">
                <Slider
                  {...settings}
                  asNavFor={nav2}
                  ref={(slider1: any) => setNav1(slider1)}
                  className="slider_one"
                >
                  {data &&
                    data?.length > 0 &&
                    data?.map((_i: any) => (
                      <Box
                        className="compare_slide"
                        key={_i?.id ?? ""}
                        id={_i?.id}
                      >
                        <Box className="compare_sec">
                          <ReactCompareSlider
                            itemOne={
                              <ReactCompareSliderImage
                                src={_i?.before_image_url ?? ""}
                                srcSet={_i?.before_image_url ?? ""}
                                // src={getGDriveImgLinkToPreview(
                                //   _i?.before_image_url ?? ""
                                // )}
                                // srcSet={getGDriveImgLinkToPreview(
                                //   _i?.before_image_url ?? ""
                                // )}
                                alt="Image one"
                              />
                            }
                            itemTwo={
                              <ReactCompareSliderImage
                                src={_i?.after_image_url ?? ""}
                                srcSet={_i?.after_image_url ?? ""}
                                // src={getGDriveImgLinkToPreview(
                                //   _i?.after_image_url ?? ""
                                // )}
                                // srcSet={getGDriveImgLinkToPreview(
                                //   _i?.after_image_url ?? ""
                                // )}
                                alt="Image two"
                              />
                            }
                          />
                        </Box>
                      </Box>
                    ))}
                </Slider>
                <Chip label="Before" className="before_btn" />
                <Chip label="After" className="after_btn" />
              </Box>

              {data && data?.length > 0 && (
                <Stack direction="row" className="compare_btm">
                  <Box className="stack_lft">
                    {data && !!data[sliderIndex] && (
                      <Typography>
                        {data[sliderIndex]?.desc
                          ? data[sliderIndex]?.desc
                          : `Procell Microchanneling enhances cellular activity by creating thousands of 
                          microchannels. Each channel prompts an inflammatory response, initiating collagen 
                          formation. Over time, this repeated healing process amplified by our stem cell derived 
                          growth-factor serums significantly improves skin texture and overall appearance, 
                          rejuvenating the skin effectively.`}
                      </Typography>
                    )}
                  </Box>
                  <Box className="stack_rgt">
                    <Slider
                      {...settings1}
                      className="slider_two"
                      asNavFor={nav1}
                      ref={(slider2: any) => setNav2(slider2)}
                    >
                      {data &&
                        data?.length > 0 &&
                        data?.map((_i: any) => (
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
                              <ListItem disablePadding className="drop_item">
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
                        ))}
                    </Slider>
                  </Box>
                </Stack>
              )}
            </Box>
          </Container>
        </>
      ) : (
        <></>
      )}
    </TreatMentSecWrapper>
  );
});
