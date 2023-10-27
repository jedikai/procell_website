/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */

import { TreatmentWrapper } from "@/styles/StyledComponents/TreatmentWrapper";
import PlayIcon from "@/ui/Icons/PlayIcon";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Fancybox from "../Fancybox/Fancybox";
import { mainProduct, productNav } from "@/json/mock/treatmentList";

export default function TreatmentSecUpper() {


  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          dots: true,
        }
      }
    ]
  };
  return (
    <TreatmentWrapper>
      <Box className="treatment_outr">
        <Container fixed>
          <Box className="slider_wrap">
            <Slider
              asNavFor={nav2}
              ref={(slider1: any) => setNav1(slider1)}
              arrows={false}
              dots={true}
              className="slick_top"
            >
              {mainProduct.map((data , i:number) => (
                <Box className="top_sllider" key={i}>
                  <Box className="main_product">
                    <Fancybox
                      options={{
                        Carousel: {
                          infinite: false
                        }
                      }}
                    >
                      <Image
                        src={data.image}
                        alt=""
                        className="zoom_img"
                        width={1140}
                        height={610}
                      />

                      <Link data-fancybox href={data.path} className="play_btn">
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
              {productNav.map((data,index:number) => (
                <Box className="btm_sllider" key={index}>
                  <Box className="each_box">
                    <Image src={data.image} alt="" width={215} height={150} />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>
    </TreatmentWrapper>
  );
}
