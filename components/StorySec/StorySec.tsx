import { useStorySecData } from "@/hooks/react-qurey/query-hooks/storySecQuery.hooks";
import { StoryCardList, StorySecProps } from "@/interface/stoysec.interface";
import assest from "@/json/assest";
import {
  StoryCardWrapper,
  StoryWrapper
} from "@/styles/StyledComponents/StoryWrapper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { formatNumber } from "common/functions/formatNumbers";
import Image from "next/image";
import { useState } from "react";

export function StoryCard({ content, number, title }: StoryCardList) {
  return (
    <StoryCardWrapper>
      <Box className="title_head">
        <Typography variant="h3">{number}</Typography>
      </Box>
      <Box className="card_content">
        <Typography variant="h6">{title}</Typography>
        <Typography>{content}</Typography>
      </Box>
    </StoryCardWrapper>
  );
}

export default function StorySec({
  image,
  title,
  children
}: // cardList
StorySecProps) {
  const [cardList, setCardList] = useState<any>([]);
  const onSuceessStorySecDataFetch = (response: any) => {
    const { direct_representation_countries, worlwide_treatment_count } =
      response ?? {};
    setCardList([
      {
        number: "2013",
        title: "Founded",
        content:
          "With over 30 years in dermatology, Dr. Mitchell Schwartz established Procell Therapies to create safer, non-invasive anti-aging solutions through innovative engineering."
      },
      {
        number: formatNumber(parseInt(worlwide_treatment_count ?? "-")),
        title: "Procell Treatments",
        content:
          "Procell Therapies has established a legacy of excellence in skincare. Each treatment reflects our commitment to innovation and quality, profoundly impacting individuals' lives across the globe. We're proud to be at the forefront of advanced skincare, continually advancing the field and setting new standards for effective, client-focused care."
      },
      {
        number: `${formatNumber(
          parseInt(direct_representation_countries ?? "-")
        )}`,
        title: "Countries of Direct Representation",
        content:
          "With its proven real-world results and innovative treatment techniques, Procell Therapies is capturing attention globally, as individuals around the world discover its transformative impact in advanced skincare."
      }
    ]);
  };
  const { data } = useStorySecData(onSuceessStorySecDataFetch);
  console.log("data", data);

  return (
    <StoryWrapper className="cmn_gap">
      <Image
        src={assest?.blur_img}
        alt="image"
        width={500}
        height={500}
        className="abs_blur_img"
      />
      <Container fixed>
        <Box className="storys_sec_upper">
          <Grid container spacing={{ md: 0, xs: 3 }}>
            <Grid item md={5} xs={12}>
              <Box className="story_image">
                <figure>
                  <Image src={image} alt="image" width={1000} height={1000} />
                </figure>
              </Box>
            </Grid>
            <Grid item md={7} xs={12}>
              <Box className="story_text">
                <Typography variant="h2">{title}</Typography>
                {/* <Box className="story_content">{children}</Box> */}
                <Box className="story_content">
                  {/* <iframe
                    width="660"
                    height="378"
                    src="https://www.youtube.com/embed/492HPE-UL-I?si=4BRJ1nnBU4XVMktA"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    style={{ borderRadius: "20px" }} // You can adjust the value as per your preference
                  ></iframe> */}
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/k3DYWkUxbVg?si=62hTEPo2eJCwQw6P&rel=0"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    style={{ borderRadius: "20px" }}
                  ></iframe>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="storys_sec_lwr">
          <Grid container spacing={{ md: 4, xs: 2 }} justifyContent="center">
            {cardList?.map((item: any) => (
              <Grid item lg={4} md={6} xs={12} key={item?.title}>
                <StoryCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </StoryWrapper>
  );
}
