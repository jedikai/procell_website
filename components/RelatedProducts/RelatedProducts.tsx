/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import React, { memo } from "react";
import Container from "@mui/material/Container";
import { RelatedProductsWrapper } from "@/styles/StyledComponents/RelatedProductsWrapper";
import Typography from "@mui/material/Typography";

import { Box, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ourproductList2 } from "@/json/mock/ourproductLits.mock";
import OurProductSlider from "../OurProductSlider/OurProductSlider";
import SliderLeftArrow from "@/ui/Icons/SliderLeftArrow";
import SliderRightArrow from "@/ui/Icons/SliderRightArrow";


export default function RelatedProducts({ productDetails }: any) {
  const { alternative_product_info } = productDetails ?? {};
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const slider: any = React.useRef(null);
  return (
    <>
      {alternative_product_info && alternative_product_info?.length > 0 ? (
        <RelatedProductsWrapper className="cmn_gap">
          <Container fixed>
            <Box className="products_wrapper">
              <Typography variant="h3" color="initial">
                Related Products
              </Typography>
              <Box className="slick_btn">
                <Button onClick={() => slider?.current?.slickPrev()}>
                  <SliderLeftArrow />
                </Button>
                <Button onClick={() => slider?.current?.slickNext()}>
                  <SliderRightArrow />
                </Button>
              </Box>
            </Box>
          </Container>
          <Box className="products_slider">
            <Container fixed>
              <Box className="product_area">
                <Box className="product_slider_btm">
                  <Slider {...settings} ref={slider}>
                    {alternative_product_info.map((item: any) => (
                      <OurProductSlider
                        OurProductsliderImg={item.image_1920_url}
                        productSlidertext={item.name}
                        productSliderPrice={item.list_price}
                        link={item.id}
                      />
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Container>
          </Box>
        </RelatedProductsWrapper>
      ) : null}
    </>
  );
};
