/* eslint-disable react/no-array-index-key */
import { ourProductsection } from "@/interface/ourproduct.interfaces";
import assest from "@/json/assest";
import { ourproductList } from "@/json/mock/ourproductLits.mock";
import { OurProductWrapper } from "@/styles/StyledComponents/OurProductWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
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
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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

  return (
    <OurProductWrapper>
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
            {ourproductList.map((item: any, index: number) => (
              <OurProductSlider
                key={index + 1}
                OurProductsliderImg={item.productImg}
                productSlidertext={item.productTitle}
                productSliderPrice={item.productprice}
                link={item.link}
              />
            ))}
          </Slider>
        </Box>
      </Container>
    </OurProductWrapper>
  );
}

export default OurProduct;
