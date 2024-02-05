import { SkinAgeSecProps, SkinCardProps } from "@/interface/skinsec.interfaces";
import {
  SkinAgeCardWrapper,
  SkinAgeWrapper
} from "@/styles/StyledComponents/SkinAgeWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { memo } from "react";
// import { url } from "inspector";
// import Image from "next/image";

export function SkinAgeCard({
  title,
  content,
  image,
  watermark
}: SkinCardProps) {
  return (
    <SkinAgeCardWrapper>
      <Box className="float_box">
        <Typography variant="h6">{title}</Typography>
        <Typography>{content}</Typography>
      </Box>
      <Box className="image_box">
        <Box
          className="animate_box"
          sx={{ backgroundImage: `url(${image})` }}
        />
        {/* <Image src={assest.demo_img} alt="image" width={750} height={800} /> */}

        <Typography variant="h4" className="water_mark">
          {watermark}
        </Typography>
      </Box>
    </SkinAgeCardWrapper>
  );
}

export default memo(function SkinAgeSec({ title, subTitle }: SkinAgeSecProps) {
  return (
    <SkinAgeWrapper className="cmn_gap">
      <Container fixed>
        <Box className="title">
          <Typography variant="h2" style={{ textAlign: 'center' }}>
            {title}
            <Typography variant="caption">{subTitle}</Typography>
          </Typography>
        </Box>
        <Box className="skinage_content">
          <Box className="skinage_content_inner">
            <iframe
              width={942}
              height={530}
              src="https://www.youtube.com/embed/imZQKFcbGPk"
              title="What is Microchanneling?"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {/* <video
            style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
            playsInline
            loop
            muted
            controls
            // alt="All the devices"
            src="https://www.youtube.com/watch?v=imZQKFcbGPk"
          // ref={videoEl}
          /> */}
            {/* <Grid container spacing={{ md: 4, xs: 3 }}>
            {skinList?.map((item) => (
              <Grid item lg={4} md={6} xs={12} key={item?.title}>
                <SkinAgeCard {...item} />
              </Grid>
            ))}
          </Grid> */}
          </Box>

        </Box>
      </Container>
    </SkinAgeWrapper>
  );
})
