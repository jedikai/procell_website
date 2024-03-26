/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactCeoWrapperNew } from "@/styles/StyledComponents/ContactCeoWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomSelect from "@/ui/Filter/CustomSelect";
import SelectDropDownIcon from "@/ui/Icons/SelectDropDownIcon";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function Index() {
  const sleectList = [
    {
      name: "option1",
      value: "option1"
    },
    {
      name: "option2",
      value: "option2"
    }
  ];
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <ContactCeoWrapperNew>
            <Box className="title_block">
              <Typography variant="h4">Get Help</Typography>
              <Typography>
                Please fill out the form below and your request will be
                forwarded to the appropriate personnel.
              </Typography>
            </Box>
            <Box className="form_wrapper">
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Full name" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Call back number" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Do you have any older number?" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="each_input">
                    <InputFieldCommon placeholder="Email" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="each_input">
                    <CustomSelect
                      initialValue="Please choose your issue*"
                      IconComponent={(props) => {
                        return (
                          <IconButton {...props}>
                            <SelectDropDownIcon />
                          </IconButton>
                        );
                      }}
                    >
                      {sleectList?.map((data, index) => (
                        <MenuItem
                          key={index}
                          value={data?.value}
                          className="menu_item"
                        >
                          {data?.name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Box>
                </Grid>
              </Grid>
              <Box className="form_submit">
                <CustomButtonPrimary variant="contained" color="primary">
                  <Typography>Submit</Typography>
                </CustomButtonPrimary>
              </Box>
            </Box>
          </ContactCeoWrapperNew>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
