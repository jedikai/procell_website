/* eslint-disable react/no-array-index-key */
import assest from "@/json/assest";
import { foooterItems, social_links } from "@/json/mock/footeritem.mock";
import { FooterWrap } from "@/styles/StyledComponents/FooterWrapper";
import CallIcon from "@/ui/Icons/CallIcon";
import MailIcon from "@/ui/Icons/MailIcon";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <FooterWrap>
      <Container fixed>
        <Box className="ftr-wrapper">
          <Link href="/" className="ftr-logo">
            <Image src={assest.logo_img} alt="" width={217} height={82} />
          </Link>

          <List className="ftr-list">
            {foooterItems.map((item: any, index: number) => (
              <ListItem disablePadding key={index + 1}>
                <Link
                  href={item?.route}
                  key={item.name}
                  className={router.pathname === item.route ? "active" : ""}
                >
                  {item?.name}
                </Link>
              </ListItem>
            ))}
          </List>

          <List className="social-list">
            {social_links.map((item, i: number) => (
              <ListItem key={i + 1}>
                <Link href={item.path}>{item.logo}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      <Box className="footer_btm_wrapper">
        <Container fixed>
          <Box className="footer_btm">
            <Typography variant="body1" className="copy">
              {" "}
              Copyright © 2023 - All Rights Reserved. |
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              className="footer_link_stack"
            >
              <Box className="footer_links">
                <MailIcon />
                <a href="mailto:info@procelltherapies.com">
                  info@procelltherapies.com
                </a>
              </Box>
              <Box className="footer_links">
                <CallIcon />
                <a href="tel:+855 577 6235">855 577 6235</a>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </FooterWrap>
  );
};

export default Footer;
