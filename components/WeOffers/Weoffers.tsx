import { weoffersProps } from "@/interface/weoffer.interfaces";
import assest from "@/json/assest";
import { WeoffersWrapper } from "@/styles/StyledComponents/WeoffersWrapper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

function Weoffers({
  weoffergirl_img,
  weoffergirl_imgWidth,
  weoffergirl_imgHeight,
  offerTitel,
  offerText,
  weofferProducttitle,
  weofferProductdetails,
  WeofferProductImg
}: weoffersProps) {
  return (
    <WeoffersWrapper>
      <Box className="weofferwrap">
        <i className="gradientBackground">
          <Image
            src={assest.weoffer_gradient}
            alt="gradient"
            width={452}
            height={387}
          />
        </i>
        <Container fixed>
          <Box className="weoffersection">
            <Grid container columnSpacing={{md:8, sm:2}}>
              <Grid item md={6} xs={12}>
                <figure className="weofferGirlImg">
                  <Image
                    src={weoffergirl_img}
                    alt="img"
                    width={weoffergirl_imgWidth}
                    height={weoffergirl_imgHeight}
                  />
                  <i className="blueWings">
                    <Image
                      src={assest.weoffer_blueStyle}
                      alt="img"
                      width={93}
                      height={119}
                    />
                  </i>
                  <i className="pinkWings">
                    <Image
                      src={assest.weoffer_pinkWings}
                      alt="img"
                      width={26}
                      height={31}
                    />
                  </i>
                </figure>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className="weofferTextSection">
                  <Box className="WeofferTextWrapper">
                    <Typography variant="h2">{offerTitel}</Typography>
                    <Typography variant="body1">{offerText}</Typography>
                  </Box>
                  <Box className="weofferProductWrapper">
                    <Typography variant="h3">{weofferProducttitle}</Typography>
                    <Typography variant="body1">
                      {weofferProductdetails}
                    </Typography>
                    <figure className="weofferProductimg">
                      <Image
                        src={WeofferProductImg}
                        alt="product"
                        width={279}
                        height={441}
                      />
                    </figure>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </WeoffersWrapper>
  );
}

export default Weoffers;
