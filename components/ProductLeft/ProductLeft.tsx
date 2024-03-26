/* eslint-disable import/no-extraneous-dependencies */

import InnerImageZoom from "react-inner-image-zoom";
// import Zoom from "react-img-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Box from "@mui/material/Box";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { mainProduct } from "@/json/mock/productImage.mock";
import { ProductLeftWrap } from "@/styles/StyledComponents/ProductLeftWrap";

export default function ProductLeft({ image }: any) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <ProductLeftWrap>
      <Box className="pro_lft_wrap">
        <Box className="slider_wrap">
          <Slider {...settings}>
            {image?.map((_i: string, index: number) => (
              <Box className="top_sllider" key={index + 1}>
                <Box className="main_product">
                  <InnerImageZoom
                    src={_i}
                    zoomSrc={_i}
                    zoomScale={1}
                    hideHint
                    className="zoom_img"
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </ProductLeftWrap>
  );
}
