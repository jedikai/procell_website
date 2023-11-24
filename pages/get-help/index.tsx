/* eslint-disable react/no-unstable-nested-components */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import { issueQuestions } from "@/json/mock/quationselectlList.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { GetHelpswrapper } from "@/styles/StyledComponents/GetHelpWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";

export default function Index() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Get Help"
        innerHeaderRediractedPage="Get help"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <GetHelpswrapper className="cmn_gap">
        <Image
          src={assest?.pink_leaf}
          alt="leaf image"
          width={90}
          height={110}
          className="pink_leaf"
        />

        <Container fixed>
          <Box className="contact_sec">
            <Grid
              container
              spacing={{ xl: 4, lg: 2, md: 2, xs: 4 }}
              alignItems="center"
            >
              <Grid item xl={5} lg={6} md={6} xs={12}>
                <figure>
                  <Image
                    src={assest?.getHelpImage}
                    alt="image"
                    width={712}
                    height={620}
                  />
                </figure>
              </Grid>
              <Grid item xl={7} lg={5} md={6} xs={12}>
                <Box className="contact_form">
                  <Box className="sec_title">
                    <Typography variant="h4">
                      Welcome to our Procell support desk!
                    </Typography>
                    <Typography variant="body1">
                      Please fill out the form below and your request will be
                      forwarded to the appropriate personnel.
                    </Typography>
                  </Box>
                  <form>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Full name" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Call back number" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Do you have any older number?" />
                    </Box>
                    <Box className="form_group">
                      <InputFieldCommon placeholder="Email" />
                    </Box>
                    <Box className="form_group select_group">
                      <CustomSelect
                        IconComponent={(props) => {
                          return (
                            <IconButton {...props}>
                              <DropDownIcon />
                            </IconButton>
                          );
                        }}
                        value={value}
                        onChange={handleChange}
                      >
                        <MenuItem value="" sx={{ display: "none" }}>
                          Please choose your issue*
                        </MenuItem>

                        {issueQuestions.map((item) => (
                          <MenuItem
                            key={item?.name}
                            value={item?.name}
                            className="menu_item"
                          >
                            {item?.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Box>

                    <Box className="submit_btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        type="submit"
                        form="contact_form"
                      >
                        <Typography>Submit</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </GetHelpswrapper>
    </Wrapper>
  );
}
