/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */

import { useTreatmentVideoData } from "@/hooks/react-qurey/query-hooks/storySecQuery.hooks";
import { TreatmentWrapper } from "@/styles/StyledComponents/TreatmentWrapper";
import PlayIcon from "@/ui/Icons/PlayIcon";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "next/link";
import { memo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Fancybox from "../Fancybox/Fancybox";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";
import assest from "@/json/assest";
import ReactPlayer from "react-player";

export default memo(() => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false
        }
      }
    ]
  };
  const { data, isLoading } = useTreatmentVideoData();
  console.log("data====>", data);

  return (
    <TreatmentWrapper>
      {!isLoading && !!data ? (
        <>
          <Box className="sec_title" sx={{ textAlign: "center" }}>
            <Typography variant="h3">Practitioner Testimonials</Typography>
          </Box>
          <Box className="treatment_outr">
            {data?.length > 0 && (
              <Container fixed>
                <Box className="slider_wrap">
                  <Slider
                    asNavFor={nav2}
                    ref={(slider1: any) => setNav1(slider1)}
                    arrows={false}
                    dots={true}
                    className="slick_top"
                  >
                    {!!data &&
                      data?.map((_i: any, i: number) => (
                        <Box className="top_sllider" key={i + 1}>
                          <Box className="main_product">
                            <Fancybox
                              options={{
                                Carousel: {
                                  infinite: false
                                }
                              }}
                            >
                              <img
                                src={_i?.thumbnail_image_url ?? assest?.heal_banner}
                                alt=""
                                className="zoom_img"
                                width={1140}
                                height={610}
                              />
                              {/* <ReactPlayer
                                url={_i?.name ?? ""}
                                className="react-player"
                                playing={false}
                                width={1140}
                                height={610}
                              /> */}
                              <div className="overlay" />
                              <Link
                                data-fancybox
                                href={
                                  _i?.name ??
                                  "https://www.youtube.com/watch?v=9xwazD5SyVg"
                                }
                                className="play_btn"
                              >
                                <PlayIcon />
                              </Link>
                            </Fancybox>
                          </Box>
                        </Box>
                      ))}
                  </Slider>

                  <Slider
                    asNavFor={nav1}
                    ref={(slider2: any) => setNav2(slider2)}
                    // slidesToShow={4}
                    {...settings}
                    // arrows={false}
                    // swipeToSlide
                    // focusOnSelect
                    className="slick_btm"
                  >
                    {data?.map((_i: any, index: number) => (
                      <Box className="btm_sllider" key={index + 1}>
                        <Box className="each_box">
                          <img
                            src={_i?.thumbnail_image_url ?? assest?.heal_banner}
                            alt=""
                            width={215}
                            height={150}
                          />
                          {/* <ReactPlayer
                            url={_i?.name ?? ""}
                            className="react-player"
                            playing={false}
                            width={215}
                            height={150}
                          /> */}
                        </Box>
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Container>
            )}
          </Box>
        </>
      ) : (
        <></>
      )}
    </TreatmentWrapper>
  );
});
