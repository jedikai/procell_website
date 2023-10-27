import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { ResultProps } from "@/interface/result.interface";
import assest from "@/json/assest";
import { resultList } from "@/json/mock/resultList.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  ResultCardWrapper,
  ResultWrapper
} from "@/styles/StyledComponents/ResultWrapper";
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

export function ResultCard({ date, image, name }: ResultProps) {
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
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1">{date}</Typography>
          </Box>
        </Box>
        <Box className="title_rgt">
          <InstagramColorIcon />
        </Box>
      </Box>
      <Box className="image_block">
        <Link href="/">
          <Image src={image} alt="image" width={500} height={500} />
        </Link>
      </Box>
      <Box className="ftr_block">
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
      </Box>
    </ResultCardWrapper>
  );
}

export default function Index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Results"
        innerHeaderRediractedPage="Results"
        bannerImage={assest?.innerHeaderbackground} innerHeaderMainPage="Home"      />
      <ResultWrapper className="cmn_gap">
        <Container fixed>
          <Box className="result_body">
            <Box className="sec_title">
              <Typography variant="h4">
                Follow us on Instagram <Link href="/">@microchanneling</Link>
              </Typography>
            </Box>
            <Box className="result_content">
              <Grid container spacing={3}>
                {resultList?.map((item) => (
                  <Grid item lg={3} md={4} sm={6} xs={12} key={item?.date}>
                    <ResultCard {...item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ResultWrapper>
    </Wrapper>
  );
}
