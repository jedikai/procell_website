/* eslint-disable mui-path-imports/mui-path-imports */
import { animationURL } from "@/components/AnimationUrl/AnimationUrl";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import WorkshopCard from "@/components/WorkshopCard/WorkshopCard";
import { useWorkshopList } from "@/hooks/react-qurey/query-hooks/workShopQuery.hooks";
import assest from "@/json/assest";
import { workshopData } from "@/json/mock/workshopData.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { WorkshopWrapper } from "@/styles/StyledComponents/WorkshopWrapper";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Lottie from "react-lottie-player";

export default function Index() {
  const { data: workshopList, isLoading } = useWorkshopList();

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Workshops"
        innerHeaderRediractedPage="Workshops"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <WorkshopWrapper>
        <Box
          className="work_outr cmn_gap"
          sx={{ backgroundImage: `url(${assest.workshopBackground})` }}
        >
          <Container fixed>
            <Box className="sec_title">
              <Typography variant="h4">
                If you are a licensed practitioner, you are welcome to join us
                for our FREE Procell virtual workshops!
              </Typography>
            </Box>
            {!isLoading ? (
              workshopList && workshopList?.length > 0 ? (
                <Box className="workshp_body">
                  {workshopList?.map((data: any) => (
                    <WorkshopCard {...data} key={data?.title} />
                  ))}
                </Box>
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
                    There is no workshop.
                  </Typography>
                </div>
              )
            ) : (
              <></>
            )}
          </Container>
        </Box>
      </WorkshopWrapper>
    </Wrapper>
  );
}
