import { contactRepProps } from "@/interface/contactRep.interface";
import { ContactRepCardWrapper } from "@/styles/StyledComponents/ContactRepCardWrapper";
import CallIcon from "@/ui/Icons/CallIcon";
import MailIcon from "@/ui/Icons/MailIcon";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export default function ContactRepCard({
  desg,
  email,
  imgUrl,
  phone,
  title,
  emailUrl,
  phoneUrl
}: contactRepProps) {
  return (
    <ContactRepCardWrapper className="cnt_card" direction="row" flexWrap="wrap">
      <Grid container spacing={2}>
        <Grid item lg={4.5} md={12} sm={12} xs={12}>
          <Box className="cnt_image">
            <img src={imgUrl} alt="" width={248} height={264} />
          </Box>
        </Grid>
        <Grid item lg={7.5} md={12} sm={12} xs={12}>
          <Box className="cnt_riight">
            <Box className="cnt_top">
              {!!title && title != "N/A" && (
                <Typography variant="body1" className="heading">
                  {title}
                </Typography>
              )}
              {!!desg && desg != "N/A" && <Typography variant="body1" className="desg">
                {desg}
              </Typography>}
            </Box>
            <Box className="cnt_btm">
              <List disablePadding className="cnt_list">
                {!!email && email != "N/A" && <ListItem disablePadding>
                  <i className="icon">
                    <MailIcon />
                  </i>
                  <Typography variant="body1" className="cnt_text">
                    <Typography variant="caption"> Email:</Typography>

                    <Link href={`mailto:${emailUrl}`}>{email}</Link>
                  </Typography>
                </ListItem>}
                {!!phone && phone != "N/A" && <ListItem disablePadding>
                  <i className="icon">
                    <CallIcon />
                  </i>
                  <Typography variant="body1" className="cnt_text">
                    <Typography variant="caption"> Phone Number:</Typography>

                    {<Link href={`tel:${phoneUrl}`}>{phone}</Link>}
                  </Typography>
                </ListItem>}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ContactRepCardWrapper>
  );
}
