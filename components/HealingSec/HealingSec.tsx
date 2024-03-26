import assest from "@/json/assest";
import { HealingSecWrapper } from "@/styles/StyledComponents/HealingSecWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";

export default function HealingSec() {
  return (
    <HealingSecWrapper>
      <figure className="healing_figure">
        <Image
          src={assest?.heal_banner}
          alt="image"
          width={2000}
          height={800}
        />
      </figure>
      <Box className="healing_content_wrapper">
        <Container fixed>
          <Typography variant="h2">
            How Do Stem Cells Assist Healing?
          </Typography>
          <Typography>
            Human growth-factor serums derived from bone marrow mesenchymal stem
            cells are known to promote scarless healing with minimal
            inflammation. Application of serums immediately after
            microchanneling treatment enhances delivery and collagen growth.
          </Typography>
        </Container>
      </Box>
    </HealingSecWrapper>
  );
}
