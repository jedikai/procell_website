/* eslint-disable react/no-array-index-key */

import { CategorySliderProps } from "@/interface/categoryCard.interface";
import { CategorySliderWrapper } from "@/styles/StyledComponents/CategorySliderWrapper";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { memo } from "react";

export default memo(function CategorySlider({
  categorySlider,
  selectedCategory,
  category
}: any) {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false
        }
      },
      {
        breakpoint: 899,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  console.log("categorySlider", categorySlider);

  return (
    <CategorySliderWrapper>
      <Box className="category_slider_wrapper">
        <Slider {...settings}>
          {categorySlider.map((item: any, index: number) => (
            <CategoryCard
              key={index + 1}
              {...item}
              imgHeight={140}
              imgWidth={140}
              selectedCategory={selectedCategory}
              category={category}
            />
          ))}
        </Slider>
      </Box>
    </CategorySliderWrapper>
  );
});
