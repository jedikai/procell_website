/* eslint-disable sort-imports */
/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import MaintopicComp from "@/components/MaintopicComp/MaintopicComp";
import PopularComp from "@/components/PopularComp/PopularComp";
import ScienceCard from "@/components/ScienceCard/ScienceCard";
import SearchComponent from "@/components/SearchComponent/SearchComponent";

import assest from "@/json/assest";

import { scienceCardList } from "@/json/mock/scienceCardMock";
import { topicData } from "@/json/mock/topicData.mock";

import Wrapper from "@/layout/wrapper/Wrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="The science"
        innerHeaderRediractedPage="The science"
        bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Home"      />
      <Box className="science_outr cmn_gap eclispe_effct">
        <Container fixed>
          <Grid
            container
            columnSpacing={{ lg: 5, xs: 3 }}
            rowSpacing={{ lg: 0, md: 2, xs: 3 }}
          >
            <Grid item xs={12} md={8}>
              <Grid
                container
                columnSpacing={3}
                rowSpacing={{ lg: 7, md: 5, xs: 4 }}
              >
                {scienceCardList.map((data) => (
                  <Grid item xs={12} md={6}>
                    <ScienceCard
                      image={data.image}
                      title={data.title}
                      link={data.link}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box className="text_center">
                <CustomButtonPrimary
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  <Typography>Load More</Typography>
                </CustomButtonPrimary>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <SearchComponent />
              <PopularComp />
              <MaintopicComp title="New topics" topicData={topicData} />
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
      </Box>
    </Wrapper>
  );
}
