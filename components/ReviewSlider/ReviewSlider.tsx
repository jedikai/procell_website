/* eslint-disable react/no-array-index-key */
import { ReviewSliderWrapper } from "@/styles/StyledComponents/ReviewSliderWrapper";
import { Box, Container } from "@mui/system";
import React, { memo } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ReviewSlider = () => {
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 400,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: false
  //       }
  //     },
  //     {
  //       breakpoint: 899,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2
  //       }
  //     },

  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //         autoplay: true,
  //         arrows: false
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //         autoplay: true
  //       }
  //     }
  //   ]
  // };

  // const StyledRating = styled(Rating)({});

  // const reviews = [
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   },
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   },
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   },
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   },
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   },
  //   {
  //     rating: 5,
  //     date: "2 days ago",
  //     title: "Lorem ipsum dolor sit",
  //     text: "Lorem ipsum dolor sit amet consectetur. A est elementum potenti velit vel. Pretium vestibulum.",
  //     reviewer: "Worldtraveler"
  //   }
  // ];
  const ref = React.useRef(null);
  React.useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if ((window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  return (
    <>
      {/* <Script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      /> */}
      {/* <Head>{trustPilotScript}</Head> */}
      <ReviewSliderWrapper>
        <Container fixed>
          <Box className="slider_wrapper">
            {/* <Slider {...settings}>
            <Box>
              {" "}
              <Box className="review_card_first">
                <Typography variant="body1" className="rev_head">
                  Exellent
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="rating"
                >
                  <Rating
                    name="customized-color"
                    defaultValue={5}
                    getLabelText={(value: number) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={
                      <StarIcon
                        IconColor={primaryColors.deepGreen}
                        IconWidth="40"
                        IconHeight="41"
                      />
                    }
                    emptyIcon={
                      <StarIcon
                        IconColor={primaryColors.deepGreen}
                        IconWidth="40"
                        IconHeight="41"
                      />
                    }
                  />
                </Stack>

                <Typography variant="body1" className="based_on">
                  Based on <Link href="/#">456 reviews</Link>
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}
                >
                  <GreenStarIcon />
                  <Typography variant="body1" className="reviewer">
                    Trustpilot
                  </Typography>
                </Stack>
              </Box>
            </Box>
            {reviews.map((review, index:number) => (
              <Box
                sx={{
                  marginTop: index % 2 === 0 ? "20px" : 0
                }}
                key={index}
               className="reviewslider"
              >
                {" "}
                <Box className="review_card" >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="rating"
                  >
                    <StyledRating
                      name="customized-color"
                      defaultValue={review.rating}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      icon={<StarIcon IconColor={primaryColors.deepGreen} />}
                      emptyIcon={
                        <StarIcon IconColor={primaryColors.deepGreen} />
                      }
                    />

                    <Typography variant="body1" className="date">
                      {review.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body1" className="rev_head">
                    {review.title}
                  </Typography>
                  <Typography variant="body1" className="rev_text">
                    {review.text}
                  </Typography>
                  <Typography className="reviewer" variant="body1">
                    {review.reviewer}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider> */}
            {/* <!-- TrustBox widget - Carousel --> */}
            <div
              ref={ref}
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="53aa8912dec7e10d38f59f36"
              data-businessunit-id="6421d1642e0c1ea51782b7a0"
              data-style-height="140px"
              data-style-width="100%"
              data-theme="light"
              data-stars="1,2,3,4,5"
              data-review-languages="en"
            >
              <a
                href="https://www.trustpilot.com/review/procelltherapies.com"
                target="_blank"
                rel="noopener"
              >
                {/* Trustpilot */}
              </a>
            </div>
            {/* <!-- End TrustBox widget --> */}
          </Box>
        </Container>
      </ReviewSliderWrapper>
    </>
  );
};

export default memo(ReviewSlider);
