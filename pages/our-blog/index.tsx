/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/jsx-curly-brace-presence */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import MaintopicComp from "@/components/MaintopicComp/MaintopicComp";
import OurBlogProduct from "@/components/OurBlogProduct/OurBlogProduct";
import assest from "@/json/assest";
import { blogData } from "@/json/mock/blogData.mock";
import { categoryData } from "@/json/mock/topicData.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { Box, Container, Grid } from "@mui/material";

function index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Our Blog"
        innerHeaderRediractedPage="Blog"
        bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Home"      />
      <Box className="cmn_gap">
        <Container fixed>
          <Grid
            container
            columnSpacing={{ lg: 5, md: 3, xs: 0 }}
            rowSpacing={{ lg: 0, xs: 4 }}
          >
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                {blogData.map((data) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <OurBlogProduct
                      Blogesimg={data.image}
                      blogesDate={data.date}
                      blogTitletext={data.title}
                      blogtext={data.paragraph}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={3}>
              <MaintopicComp title="Categories" topicData={categoryData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Wrapper>
  );
}

export default index;
