/* eslint-disable sort-imports */
/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import ScienceCard from "@/components/ScienceCard/ScienceCard";
import {
  useScienceBlogList,
  useScienceBlogListSearchWise,
  useScienceBlogList_new
} from "@/hooks/react-qurey/query-hooks/scienceQuery.hooks";

import assest from "@/json/assest";

import { animationURL } from "@/components/AnimationUrl/AnimationUrl";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import Wrapper from "@/layout/wrapper/Wrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { useDebounce } from "@/hooks/useDebounce";

export default function index() {
  const [categoryList, setCategoryList] = useState([]);
  const [scienceBlogList, setScienceBlogList] = useState<any>([]);
  const [loadMore, setLoadMore] = useState(5);
  const [searchedText, setSearchedText] = useState<string>("");
  const [selectedCategoriesId, setSelectedCategoriesId] =
    useState<any>(undefined);
  const debouncedData = useDebounce(searchedText, 300);
  // const onSuccessScienceBlogList = (response: any) => {
  //   let filterResponse = [];
  //   // if (!!selectedCategoriesId) {
  //   //   filterResponse =
  //   //     response && response?.length > 0
  //   //       ? response?.map((_i: any) => {
  //   //           return {
  //   //             image: _i?.fimg_url ?? "",
  //   //             title: _i?.title?.rendered ?? "",
  //   //             link: `/science/science-details/${_i?.id}`
  //   //           };
  //   //         })
  //   //       : [];
  //   // } else {
  //   //   filterResponse =
  //   //     response && response?.length > 0
  //   //       ? response?.map((_i: any) => {
  //   //           return {
  //   //             image:
  //   //               _i?.fimg_url ?? "",
  //   //             title: _i?.title?.rendered ?? "",
  //   //             link: _i?.acf?.blogs_links ?? "",
  //   //             desc: _i?.content?.rendered ?? ""
  //   //           };
  //   //         })
  //   //       : [];
  //   // }
  //   filterResponse =
  //     response && response?.length > 0
  //       ? response?.map((_i: any) => {
  //           return {
  //             image: _i?.fimg_url ?? "",
  //             title: _i?.title?.rendered ?? "",
  //             link: _i?.acf?.blogs_links ?? "",
  //             desc: _i?.content?.rendered ?? "",
  //             author: _i?.acf?.author_name ?? ""
  //           };
  //         })
  //       : [];
  //   setScienceBlogList(filterResponse);
  // };
  // const onErrorScienceBlogList = () => {};
  // const {
  //   data: science_blog,
  //   isLoading: science_blog_loader,
  //   refetch
  // } = useScienceBlogList(
  //   selectedCategoriesId,
  //   onSuccessScienceBlogList,
  //   onErrorScienceBlogList
  // );
  const { data: new_scienceList, isLoading: new_scienceListLoading } =
    useScienceBlogList_new((response: any) => {
      console.log("response", response);

      const filterResponse =
        response && response?.length > 0
          ? response?.map((_i: any) => {
              return {
                image: _i?.image_url ?? "",
                title: _i?.name ?? "",
                link: _i?.redirect_url ?? "",
                desc: _i?.description ?? "",
                author: _i?.author ?? ""
              };
            })
          : [];
      setScienceBlogList(filterResponse);
    });
  // const onSuccessScienceBlogListSearchWise = (response: any) => {
  //   let filterResponse = [];
  //   filterResponse =
  //     response && response?.length > 0
  //       ? response?.map((_i: any) => {
  //           return {
  //             image: _i?.searched_post_image ?? "",
  //             title: _i?.searched_post_title ?? "",
  //             link: _i?.searched_post_external_link ?? "",
  //             desc: _i?.searched_post_excerpt_content ?? "",
  //             author: _i?.searched_post_author_name ?? ""
  //           };
  //         })
  //       : [];
  //   setScienceBlogList(filterResponse);
  // };
  // const onErrorScienceBlogListSearchWise = () => {};
  // const {
  //   data: science_blog_search_wise,
  //   isLoading: science_blog_loader_search_wise
  // } = useScienceBlogListSearchWise(
  //   debouncedData,
  //   searchedText?.length > 0,
  //   onSuccessScienceBlogListSearchWise,
  //   onErrorScienceBlogListSearchWise
  // );

  const getCategoriesWiseBlog = (id: string | number) =>
    setSelectedCategoriesId(id);
  const getSearchValue = (e: any) => {
    if (e.target.value == "") {
      // refetch();
    } else {
      setSearchedText(e.target.value ?? "");
    }
  };
  const loadMoreHandler = () => setLoadMore(loadMore + 5);
  console.log("scienceBlogList", new_scienceList);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="The Science"
        innerHeaderRediractedPage="The Science"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <Box className="science_outr cmn_gap eclispe_effct">
        {!new_scienceListLoading ? (
          // !(
          //   (science_blog_loader && science_blog_loader_search_wise)
          // &&
          // isLoading
          <>
            <Container fixed>
              <Grid
                container
                columnSpacing={{ lg: 5, xs: 3 }}
                rowSpacing={{ lg: 0, md: 2, xs: 3 }}
                justifyContent="center"
              >
                <Grid item xs={12} md={11}>
                  {/* <Box className="search_comp_wrapper">
                    <SearchComponent getSearchValue={getSearchValue} />
                  </Box> */}
                  {!new_scienceListLoading && (
                    // !(
                    //   science_blog_loader || science_blog_loader_search_wise
                    // )
                    <>
                      <Grid
                        container
                        columnSpacing={8}
                        rowSpacing={{ lg: 7, md: 5, xs: 4 }}
                      >
                        {scienceBlogList && scienceBlogList?.length > 0 ? (
                          // scienceBlogList
                          //   ?.slice(0, loadMore)
                          //   .map((data: any, index: number) => (
                          scienceBlogList?.map((data: any, index: number) => (
                            <Grid item xs={12} md={4} key={index + 1}>
                              <ScienceCard
                                image={data?.image}
                                title={data?.title}
                                link={data?.link}
                                desc={data?.desc}
                                author={data?.author}
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
                      {/* {scienceBlogList.length > loadMore && (
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
                      )} */}
                    </>
                  )}
                </Grid>

                {/* <Grid item xs={12} md={4}>
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
                </Grid> */}
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
