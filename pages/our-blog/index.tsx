/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/jsx-curly-brace-presence */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import MaintopicComp from "@/components/MaintopicComp/MaintopicComp";
import OurBlogProduct from "@/components/OurBlogProduct/OurBlogProduct";
import {
  useBlogsList,
  useCategoriesList
} from "@/hooks/react-qurey/query-hooks/blogsQuery.hooks";
import assest from "@/json/assest";
import { blogData } from "@/json/mock/blogData.mock";
import { categoryData } from "@/json/mock/topicData.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Lottie from "react-lottie-player";
import { animationURL } from "@/components/AnimationUrl/AnimationUrl";

function index() {
  const [blogList, setBloglist] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] =
    useState<any>(undefined);
  const [categoriesList, setCategorieslist] = useState([]);
  const onBlogListSuccess = (response: any) => {
    setBloglist(response);
  };
  const onBlogListError = () => { };
  const onCategoriesListSuccess = (response: any) => {
    setCategorieslist(response);
  };
  const onCategoriesListError = () => { };
  const { data, isLoading } = useBlogsList(
    selectedCategoriesId,
    onBlogListSuccess,
    onBlogListError
  );
  const { data: categoriesListData, isLoading: categoriesListLoader } =
    useCategoriesList(onCategoriesListSuccess, onCategoriesListError);

  const getCategoriesWiseBlog = (id: string | number) =>
    setSelectedCategoriesId(id);
  console.log("BLOG_LIST", blogList);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Our Blog"
        innerHeaderRediractedPage="Blog"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <Box className="cmn_gap">
        <Container fixed>
          <Grid
            container
            columnSpacing={{ lg: 5, md: 3, xs: 0 }}
            rowSpacing={{ lg: 0, xs: 4 }}
          >
            <Grid item xs={12} md={9}>
              {!isLoading ? (
                <Grid container spacing={2}>
                  {blogList && blogList.length > 0 ? (
                    blogList.map((data: any, index: number) => (
                      <Grid item xs={12} sm={6} md={4} key={index + 1}>
                        <OurBlogProduct
                          link={`/our-blog/blog-details/${data.id}`}
                          Blogesimg={data?.fimg_url}
                          blogesDate={data?.date}
                          blogTitletext={data?.title?.rendered}
                          blogtext={data?.content?.rendered}
                        />
                      </Grid>
                    ))
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyItems: "center",
                        width: "100%"
                      }}
                    >
                      {/* <MyLottieAnimation play /> */}
                      <Lottie
                        loop
                        animationData={animationURL}
                        play
                        style={{ width: "50%", height: "100%" }}
                      />
                      <Typography variant="body1" className="no_found">
                        There is no Blogs.
                      </Typography>
                    </div>
                  )}
                </Grid>
              ) : (
                <ButtonLoaderSecondary />
              )}
            </Grid>

            {!categoriesListLoader &&
              <Grid item xs={12} md={3}>
                <MaintopicComp
                  title="Categories"
                  topicData={categoriesList}
                  getCategoriesWiseBlog={getCategoriesWiseBlog}
                  selectedCategoriesId={selectedCategoriesId}
                />
              </Grid>
            }
          </Grid>
        </Container>
      </Box>
    </Wrapper>
  );
}

export default index;
