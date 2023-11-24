import { BlogDetailsMainWrapper } from "@/styles/StyledComponents/BlogDetailsMainWrapper";
import ClockIcon from "@/ui/Icons/ClockIcon";
import FacebookIcon from "@/ui/Icons/FacebookIcon";
import InstagramIcon from "@/ui/Icons/InstagramIcon";
import UserIcon from "@/ui/Icons/UserIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function BlogDeailsMain({
  topDetails,
  blogContents,
  blogDetailsData
}: any) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const {
    post_author,
    post_date,
    post_description,
    post_image,
    post_practioner,
    post_title
  } = blogDetailsData ?? {};
  // console.log(
  //   "post_practioner",blogDetailsData,
  //   post_author,
  //   post_date,
  //   post_description,
  //   post_image,
  //   post_practioner,
  //   post_title
  // );

  return (
    <BlogDetailsMainWrapper className="cmn_gap">
      <Container fixed>
        <Box className="details_top">
          {post_title && (
            <Typography variant="h2" className="main_head">
              {post_title ?? ""}
            </Typography>
          )}
          <List className="date_author">
            {post_date && (
              <ListItem disablePadding>
                <Typography variant="caption" className="icon">
                  <ClockIcon />
                </Typography>
                {post_date ?? ""}
              </ListItem>
            )}
            {post_author && (
              <ListItem disablePadding>
                <Typography variant="caption" className="icon">
                  <UserIcon />
                </Typography>
                {post_author ?? ""}
              </ListItem>
            )}
          </List>
          {post_image && (
            <Box className="main_blog_image">
              <img src={post_image ?? ""} alt="" width={1140} height={410} />
            </Box>
          )}
          {post_description && (
            <Typography
              variant="body1"
              className="text"
              dangerouslySetInnerHTML={{ __html: post_description ?? "" }}
            />
          )}
        </Box>
        {post_practioner && post_practioner?.length > 0 && (
          <Box className="blog_contents">
            {post_practioner.map((blogContent: any, index: number) => {
              return (
                <Box className="blog_content blog_content_one" key={index + 1}>
                  {/* start */}
                  <Box className="content_first ">
                    {blogContent?.practitioner_image && (
                      <>
                        <Box className="blogImg_left">
                          <img
                            src={blogContent?.practitioner_image}
                            alt=""
                          // width={blogContent.mainImgWidth}
                          // height={blogContent.mainImgHeight}
                          />
                        </Box>

                        <Stack direction="row" className="blog_heading">
                          <Box className="blog_head_left">
                            {blogContent?.practitioner_name && (
                              <Typography variant="h3" className="title">
                                {blogContent?.practitioner_name}
                              </Typography>
                            )}
                            {blogContent?.practitioner_designation && (
                              <Typography variant="body1">
                                {blogContent?.practitioner_designation}
                              </Typography>
                            )}
                          </Box>
                          <List className="social_list">
                            <ListItem disablePadding>
                              <Link href="/">
                                <FacebookIcon />
                              </Link>
                            </ListItem>
                            <ListItem disablePadding>
                              <Link href="/">
                                <InstagramIcon />
                              </Link>
                            </ListItem>
                          </List>
                        </Stack>
                        {blogContent?.practitioner_first_content && (
                          <Box
                            className="blog_para"
                            dangerouslySetInnerHTML={{
                              __html:
                                blogContent?.practitioner_first_content ?? ""
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                  {/* end */}
                  <Stack direction="row" className="content_last content_row">
                    {blogContent?.practitioner_second_content && (
                      <Box className="content_col left">
                        <Box className="blog_content">
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html:
                                blogContent?.practitioner_second_content ?? ""
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                    <Box className="content_col right">
                      {blogContent?.before_after_images &&
                        blogContent?.before_after_images?.length > 0 && (
                          <Box className="image_slider">
                            <Slider {...settings}>
                              {blogContent?.before_after_images?.map(
                                (slide: any, index: number) => (
                                  <Box className="slider_image" key={index + 1}>
                                    <img
                                      src={slide?.slider_image ?? ""}
                                      alt=""
                                      width={410}
                                      height={475}
                                    />
                                  </Box>
                                )
                              )}
                            </Slider>
                          </Box>
                        )}
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </BlogDetailsMainWrapper>
  );
}
