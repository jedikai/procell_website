/* eslint-disable sort-imports */
/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import MaintopicComp from "@/components/MaintopicComp/MaintopicComp";
import PopularComp from "@/components/PopularComp/PopularComp";
import ScienceCard from "@/components/ScienceCard/ScienceCard";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import {
  useScienceBlogList,
  useScienceBlogListSearchWise,
  useScienceCategoriesList
} from "@/hooks/react-qurey/query-hooks/scienceQuery.hooks";

import assest from "@/json/assest";

import { scienceCardList } from "@/json/mock/scienceCardMock";

import Wrapper from "@/layout/wrapper/Wrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Lottie from "react-lottie-player";
import { animationURL } from "@/components/AnimationUrl/AnimationUrl";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";

export default function index() {
  const [categoryList, setCategoryList] = useState([]);
  const [scienceBlogList, setScienceBlogList] = useState<any>([]);
  const [loadMore, setLoadMore] = useState(5);
  const [searchedText, setSearchedText] = useState<string>("");
  const [selectedCategoriesId, setSelectedCategoriesId] =
    useState<any>(undefined);
  const onSuccessScienceCategoryList = (response: any) => {
    // console.log("useScienceCategoriesList", response);
    setCategoryList(response);
  };
  const onErrorScienceCategoryList = () => {};
  const { data, isLoading } = useScienceCategoriesList(
    onSuccessScienceCategoryList,
    onErrorScienceCategoryList
  );
  const onSuccessScienceBlogList = (response: any) => {
    let filterResponse = [];
    if (!!selectedCategoriesId) {
      filterResponse =
        response && response?.length > 0
          ? response?.map((_i: any) => {
              return {
                image: _i?.fimg_url ?? "",
                title: _i?.title?.rendered ?? "",
                link: `/science/science-details/${_i?.id}`
              };
            })
          : [];
    } else {
      filterResponse =
        response && response?.length > 0
          ? response?.map((_i: any) => {
              return {
                image:
                  _i?._embedded["wp:featuredmedia"][0]?.media_details?.sizes
                    ?.full?.source_url ?? "",
                title: _i?.title?.rendered ?? "",
                link: `/science/science-details/${_i?.id}`
              };
            })
          : [];
    }
    setScienceBlogList(filterResponse);
  };
  const onErrorScienceBlogList = () => {};
  const { data: science_blog, isLoading: science_blog_loader } =
    useScienceBlogList(
      selectedCategoriesId,
      onSuccessScienceBlogList,
      onErrorScienceBlogList
    );
  const onSuccessScienceBlogListSearchWise = (response: any) => {
    let filterResponse = [];
    filterResponse =
      response && response?.length > 0
        ? response?.map((_i: any) => {
            return {
              image: _i?.searched_post_image ?? "",
              title: _i?.searched_post_title ?? "",
              link: `/science/science-details/${_i?.searched_post_id}`
            };
          })
        : [];
    setScienceBlogList(filterResponse);
  };
  const onErrorScienceBlogListSearchWise = () => {};
  const {
    data: science_blog_search_wise,
    isLoading: science_blog_loader_search_wise
  } = useScienceBlogListSearchWise(
    searchedText,
    searchedText?.length > 0,
    onSuccessScienceBlogListSearchWise,
    onErrorScienceBlogListSearchWise
  );

  const getCategoriesWiseBlog = (id: string | number) =>
    setSelectedCategoriesId(id);
  const getSearchValue = (e: any) => setSearchedText(e.target.value ?? "");
  const loadMoreHandler = () => setLoadMore(loadMore + 5);
  console.log("scienceBlogList", loadMore);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="The science"
        innerHeaderRediractedPage="The science"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <Box className="science_outr cmn_gap eclispe_effct">
        {!(
          science_blog_loader &&
          science_blog_loader_search_wise &&
          isLoading
        ) ? (
          <>
            <Container fixed>
              <Grid
                container
                columnSpacing={{ lg: 5, xs: 3 }}
                rowSpacing={{ lg: 0, md: 2, xs: 3 }}
              >
                {!(science_blog_loader || science_blog_loader_search_wise) && (
                  <Grid item xs={12} md={8}>
                    <Grid
                      container
                      columnSpacing={3}
                      rowSpacing={{ lg: 7, md: 5, xs: 4 }}
                    >
                      {scienceBlogList && scienceBlogList?.length > 0 ? (
                        scienceBlogList
                          ?.slice(0, loadMore)
                          .map((data: any, index: number) => (
                            <Grid item xs={12} md={6} key={index + 1}>
                              <ScienceCard
                                image={data?.image}
                                title={data?.title}
                                link={data.link}
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
                            style={{
                              width: "50%",
                              height: "100%",
                              marginLeft: "auto",
                              marginRight: "auto"
                            }}
                          />
                          <Typography
                            variant="body1"
                            className="no_found"
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto"
                            }}
                          >
                            There is no Science blog.
                          </Typography>
                        </div>
                      )}
                    </Grid>
                    {scienceBlogList.length > loadMore && (
                      <Box className="text_center">
                        <CustomButtonPrimary
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={loadMoreHandler}
                        >
                          <Typography>Load More</Typography>
                        </CustomButtonPrimary>
                      </Box>
                    )}
                  </Grid>
                )}

                <Grid item xs={12} md={4}>
                  <PopularComp />
                  {!isLoading && (
                    <>
                      <SearchComponent getSearchValue={getSearchValue} />
                      <MaintopicComp
                        title="New topics"
                        topicData={categoryList}
                        getCategoriesWiseBlog={getCategoriesWiseBlog}
                        selectedCategoriesId={selectedCategoriesId}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Container>
            <Image
              src={assest.eclipse1}
              alt=""
              width={380}
              height={450}
              className="pic1"
            />
            <Image
              src={assest.eclipse2}
              alt=""
              width={380}
              height={450}
              className="pic2"
            />
          </>
        ) : (
          <ButtonLoaderSecondary />
        )}
      </Box>
    </Wrapper>
  );
}
