import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { useResultList } from "@/hooks/react-qurey/query-hooks/resultQuery.hooks";
import { ResultProps2 } from "@/interface/result.interface";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  ResultCardWrapper,
  ResultWrapper
} from "@/styles/StyledComponents/ResultWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import InstagramColorIcon from "@/ui/Icons/InstagramColorIcon";
import LikeIcon from "@/ui/Icons/LikeIcon";
import MesaageIcon from "@/ui/Icons/MesaageIcon";
import SaveIcon from "@/ui/Icons/SaveIcon";
import SentIcon from "@/ui/Icons/SentIcon";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// export function ResultCard({ date, image, name }: ResultProps) {
export function ResultCard({
  id,
  caption,
  media_type,
  media_url,
  permalink,
  timestamp,
  username,
  thumbnail_url
}: ResultProps2) {
  const timeFormatter = useMemo(() => {
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
    return formattedDate;
  }, [timestamp]);

  return (
    <ResultCardWrapper>
      <Box className="title_block">
        <Box className="title_left">
          <i>
            <Image
              src={assest?.procell_small_icon}
              alt="icon"
              width={22}
              height={22}
            />
          </i>
          <Box className="title_content">
            <Typography variant="h5" className="line-clamp-2">
              {caption ?? "microchanneling"}
            </Typography>
            <Typography variant="body1">{timeFormatter}</Typography>
            {/* <Typography variant="body1">{timestamp}</Typography> */}
          </Box>
        </Box>
        <Box className="title_rgt">
          <InstagramColorIcon />
        </Box>
      </Box>
      <Box className="image_block">
        <Link href={permalink} target="_blank">
          {/* {media_type == 'IMAGE' ?
            <img src={thumbnail_url} alt="image" width={500} height={500} /> :
            <video><source src={thumbnail_url} /></video>} */}
          <img
            src={thumbnail_url ?? media_url}
            alt="image"
            width={500}
            height={500}
          />
        </Link>
      </Box>
      {/* <Box className="ftr_block">
        <List disablePadding>
          <ListItem disablePadding>
            <Button type="button">
              <LikeIcon />
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button type="button">
              <MesaageIcon />
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button type="button">
              <SentIcon />
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button type="button">
              <SaveIcon />
            </Button>
          </ListItem>
        </List>
      </Box> */}
    </ResultCardWrapper>
  );
}
const instagramPostsApiUrl = `https://graph.instagram.com/v12.0/me/media?fields=id,username,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${process.env.NEXT_AUTHORIZATION_INSTAGRAM_ACCESS_TOKEN}`;
export default function Index() {
  const [apiUrl, setApiUrl] = useState(instagramPostsApiUrl);
  const [postList, setPostList] = useState<any>([]);
  const [isApiFetchAgain, setIsApiFetchAgain] = useState<boolean>(false);
  const onSuccessInstaPostsFetch = (response: any) => {
    const { data, paging } = response ?? {};
    setApiUrl(paging?.next ?? "");

    const getOnlyMentionHastaggedPosts =
      data && data?.length > 0
        ? data?.filter(
            (_i: any) => _i?.caption?.includes("#result")
            // _i?.caption?.includes("#") || _i?.caption?.includes("@")
          )
        : [];
    if (getOnlyMentionHastaggedPosts?.length > 5) {
      setPostList([...postList, ...getOnlyMentionHastaggedPosts]);
      setIsApiFetchAgain(false);
    } else {
      if (paging?.next) {
        refetch();
      }
    }
  };
  const {
    data: resultData,
    isLoading,
    refetch
  } = useResultList(apiUrl, onSuccessInstaPostsFetch);
  const fetchPostHandler = () => {
    refetch();
    setIsApiFetchAgain(true);
  };
  useEffect(() => {
    refetch();
  }, []);
  console.log("show me url result", postList);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Results"
        innerHeaderRediractedPage="Results"
        bannerImage={assest?.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <ResultWrapper className="cmn_gap">
        <Container fixed>
          <Box className="result_body">
            {postList && postList?.length > 0 && (
              <Box className="sec_title">
                <Typography variant="h4">
                  Follow for more results{" "}
                  <Link
                    href={`https://www.instagram.com/${
                      postList && postList?.length > 0
                        ? postList[0]?.username
                        : ""
                    }`}
                    target="_blank"
                  >
                    @
                    {postList && postList?.length > 0
                      ? postList[0]?.username
                      : ""}
                  </Link>
                </Typography>
              </Box>
            )}
            <Box className="result_content">
              <Grid container spacing={3}>
                {!isLoading &&
                  postList &&
                  postList?.length > 0 &&
                  postList?.map((item: any, index: number) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index + 1}>
                      <ResultCard {...item} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
          <Grid item xs={12}>
            <Box className="text_center" style={{ marginTop: "35px" }}>
              {!isLoading && postList?.length > 0 && !!apiUrl ? (
                <CustomButtonPrimary
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={fetchPostHandler}
                >
                  {isApiFetchAgain ? (
                    <ButtonLoader />
                  ) : (
                    <Typography>Load More</Typography>
                  )}
                </CustomButtonPrimary>
              ) : !!apiUrl ? (
                <ButtonLoaderSecondary />
              ) : (
                <>
                  {postList?.length == 0 && !apiUrl ? (
                    <Typography variant="h4">
                      There is no Instagram posts
                    </Typography>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Container>
      </ResultWrapper>
    </Wrapper>
  );
}
