/* eslint-disable no-nested-ternary */
/* eslint-disable mui-path-imports/mui-path-imports */
import { innerHeaderProps } from "@/interface/innerHeader.interfaces";

import { InnerHeaderWrapper } from "@/styles/StyledComponents/InnerHeaderWrapper";
import NextArrowIcon from "@/ui/Icons/NextArrowIcon";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";

function InnerHeader({
  innerHeaderTitle,
  innerHeaderRediractedPage,
  bannerImage,
  innerHeaderMainPage,
  innnerHeaderMainurl="/"
}: innerHeaderProps) {
  return (
    <InnerHeaderWrapper>
      <Box
        className="innerHeadersection"
        sx={{ backgroundImage: `url(${bannerImage})` }}
      >
        <Container fixed>
          <Typography variant="h3">{innerHeaderTitle}</Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <Link href={innnerHeaderMainurl}>{innerHeaderMainPage}</Link>
            </ListItem>
            <ListItem disablePadding>
              <NextArrowIcon />
            </ListItem>
            <ListItem disablePadding>{innerHeaderRediractedPage}</ListItem>
          </List>
        </Container>
      </Box>
    </InnerHeaderWrapper>
  );
}

export default InnerHeader;
