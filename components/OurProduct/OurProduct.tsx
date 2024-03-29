/* eslint-disable react/no-array-index-key */
import { useFeaturedProductList } from "@/hooks/react-qurey/query-hooks/productQuery.hooks";
import { ourProductsection } from "@/interface/ourproduct.interfaces";
import assest from "@/json/assest";
import { OurProductWrapper } from "@/styles/StyledComponents/OurProductWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import OurProductSlider from "../OurProductSlider/OurProductSlider";

function OurProduct({
  producttitle,
  producttitletop,
  ourProductimg
}: ourProductsection) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const { data: featuredProductData, isLoading } = useFeaturedProductList();

  return (
    <OurProductWrapper>
      {!isLoading && featuredProductData && (
        <>
          <figure className="ourProductLadyimg">
            <Image src={ourProductimg} alt="img" width={610} height={873} />
          </figure>
          <figure className="ourProductPinkWing">
            <Image
              src={assest.ourProductpinkwing}
              alt="img"
              width={387}
              height={452}
            />
          </figure>
          <figure className="ourProducteclips">
            <Image
              src={assest.ourProductEclips}
              alt="img"
              width={1046}
              height={722}
            />
          </figure>

          <Container fixed>
            <Box className="ourProductTitle">
              <Typography variant="h3">
                <Typography variant="caption">{producttitletop}</Typography>
                {producttitle}
              </Typography>
            </Box>
            <Box className="ourProductSliderwrapperSection">
              <Slider {...settings}>
                {!isLoading &&
                  !!featuredProductData &&
                  featuredProductData?.length > 0 &&
                  featuredProductData.map((item: any, index: number) => {
                    const { id, name, image_1920_url, list_price } = item ?? {};
                    return (
                      <OurProductSlider
                        key={index + 1}
                        OurProductsliderImg={image_1920_url ?? ""}
                        productSlidertext={name ?? ""}
                        productSliderPrice={list_price ?? ""}
                        link={id ?? ""}
                      />
                    );
                  })}
              </Slider>
            </Box>
          </Container>
        </>
      )}
    </OurProductWrapper>
  );
}

export default memo(OurProduct);
