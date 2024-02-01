import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import { resourcePhotosData } from "@/json/mock/resourcephotos.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ResourceWrapper } from "@/styles/StyledComponents/ResourcdePhotosWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import DownloasdIcon from "@/ui/Icons/DownloasdIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function ResourcePhotos() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="resources"
        innerHeaderRediractedPage="Resources"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <ResourceWrapper className="cmn_gap">
        <Box className="resource_main">
          <Container fixed>
            <Box className="resource_inner">
              <Typography variant="h3" className="main_heading">
                Product photos
              </Typography>
              <Box className="resource_cards">
                <Grid container spacing={2}>
                  {resourcePhotosData.map((data, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="wrap"
                        className="photo_wrap"
                      >
                        <figure>
                          <Image
                            src={data.img}
                            alt=""
                            width={70}
                            height={107}
                          />
                        </figure>
                        <Box className="right">
                          <Typography variant="body1" className="name">
                            {data.title}
                          </Typography>
                          <CustomButtonPrimary
                            className="downloads_btn"
                            variant="contained"
                            color="primary"
                            endIcon={<DownloasdIcon />}
                          >
                            <Typography variant="body1">Download</Typography>
                          </CustomButtonPrimary>
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ResourceWrapper>
    </Wrapper>
  );
}
