import assest from '@/json/assest';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import Wrapper from '@/layout/wrapper/Wrapper';
import { StudentProfileWrapper } from '@/styles/StyledComponents/StudentProfileWrapper';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import EditProfileIcon from '@/ui/Icons/EditProfileIcon';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from 'next/image';
import React from 'react';

export default function Index() {
    const [edit, setEdit] = React.useState<boolean>(false);
    const handleChange = (): void => {
        setEdit(!edit);

    };
    return (
        <Wrapper>
            <DashboardWrapper>
                <Box className="cmn_box">
                    <StudentProfileWrapper>
                        {!edit ? (
                            <Box className="profile_content">
                                <figure className="profile_avatar">
                                    <Image
                                        src={assest?.avatr_img}
                                        alt="image"
                                        width={147}
                                        height={147}

                                    />
                                </figure>
                                <Box className="form_Sec">
                                    {/* <form onSubmit={handleSubmit(onFormSubmit)} id="edit_form"> */}
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} xs={12}>
                                            <InputFieldCommon
                                                placeholder="First name"
                                                fullWidth
                                                value='John'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <InputFieldCommon
                                                placeholder="Last name"
                                                fullWidth
                                                value='Doe'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item lg={12} xs={12}>
                                            <InputFieldCommon
                                                placeholder="Phone number"
                                                fullWidth
                                                value='+01-825842255'
                                                disabled

                                            />
                                        </Grid>
                                        <Grid item lg={12} xs={12}>
                                            <InputFieldCommon
                                                placeholder="Email address"
                                                fullWidth
                                                value='info@johndoe.com'
                                                disabled

                                            />
                                        </Grid>
                                        <Grid item lg={12} xs={12}>
                                            <InputFieldCommon
                                                placeholder="Address"
                                                fullWidth
                                                value='11073 lorem ipsum dummy address, 142 road'
                                                disabled

                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <InputFieldCommon
                                                placeholder="City"
                                                fullWidth
                                                value='Newyork'
                                                disabled

                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <InputFieldCommon
                                                placeholder="ZIP code"
                                                fullWidth
                                                value='3000015'
                                                disabled

                                            />
                                        </Grid>
                                    </Grid>
                                    {/* </form> */}
                                </Box>
                            </Box>
                        ) : (
                            <Box className="profile_content">
                                <figure className="profile_avatar">
                                    <Image
                                        src={assest?.avatarIcon}
                                        alt="image"
                                        width={147}
                                        height={147}

                                    />
                                    <Box className="editProfileWrap">
                                        <Button
                                            type="button"
                                            className="editButnIcon"

                                        >
                                            <EditProfileIcon />
                                        </Button>
                                        <input
                                            type="file"
                                            accept="image/*"

                                        />
                                    </Box>
                                </figure>
                                <Box className="form_Sec">
                                    <form

                                        id="edit_form"
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item lg={6} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="First name"
                                                    fullWidth


                                                />
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="Last name"
                                                    fullWidth


                                                />
                                            </Grid>
                                            <Grid item lg={12} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="Phone number"
                                                    fullWidth



                                                />
                                            </Grid>
                                            <Grid item lg={12} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="Email address"
                                                    fullWidth



                                                />
                                            </Grid>
                                            <Grid item lg={12} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="Address"
                                                    fullWidth



                                                />
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="City"
                                                    fullWidth



                                                />
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <InputFieldCommon
                                                    placeholder="ZIP code"
                                                    fullWidth



                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Box>
                            </Box>
                            //   <button type="submit">save</button>
                            // </form>
                        )}

                        <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                            className="btn_stack"
                        >
                            <CustomButtonPrimary
                                form="edit_form"
                                variant="contained"
                                color="primary"
                                onClick={handleChange}
                            // onClick={handleAction}
                            // type="submit"
                            >
                                {/* <Typography variant="caption"> */}
                                <Typography variant="caption">
                                    {!edit ? "Edit profile" : "Discard changes"}

                                </Typography>
                                {/* </Typography> */}
                            </CustomButtonPrimary>
                            {
                                edit ? (
                                    <CustomButtonPrimary
                                        variant="outlined"
                                        color="info"
                                        className="gradient_btn"
                                    >
                                        <Typography variant="body1">Save changes</Typography>
                                    </CustomButtonPrimary>
                                ) :
                                    (
                                        <CustomButtonPrimary
                                            variant="outlined"
                                            color="info"
                                            className="gradient_btn"
                                        >
                                            <Typography variant="body1">Delete profile</Typography>
                                        </CustomButtonPrimary>
                                    )}
                        </Stack>
                    </StudentProfileWrapper>
                </Box>
            </DashboardWrapper>
        </Wrapper>
    )
}
