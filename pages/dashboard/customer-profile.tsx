/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import AddImageInput from "@/components/AddImageInput/AddImageInput";
import AddedEntryCard from "@/components/AddedEntryCard/AddedEntryCard";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import NewEntryCard from "@/components/NewEntryCard/NewEntryCard";
import assest from "@/json/assest";
import { addedImageData } from "@/json/mock/addedImage.mock";
import { addedentriesData } from "@/json/mock/addedentries.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { AddCustomerWrapper } from "@/styles/StyledComponents/AddCustomerWrapper";
import { CreateEntryWrapper } from "@/styles/StyledComponents/CreateEntryWrapper";
import { CustomerProfileWrapper } from "@/styles/StyledComponents/CustomerProfileWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CalendarIconFill from "@/ui/Icons/CalendarIconFill";
import EditPenIcon from "@/ui/Icons/EditPenIcon";
import EditProfileIcon from "@/ui/Icons/EditProfileIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";

export default function Index() {

    const [openModal, setopenModal] = useState(false);

    const handleCloseModal = () => {
        setopenModal(false)
    }

    const handleOpenModal = () => {
        setopenModal(true)
    }



    const [profileState, setProfileState] = useState('customer_profile');

    const handleChangeState = (nextState: string) => {
        setProfileState(nextState)
    }


    return (
        <Wrapper>
            <DashboardWrapper>
                <Box className="cmn_box">
                    {
                        profileState === 'customer_profile' ? (
                            <CustomerProfileWrapper>
                                <Typography variant="h4" className="main_heading">
                                    Customer profile
                                </Typography>
                                <Box className="new_entries_sec">
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <NewEntryCard text="Create A New Entry" onClick={() => { handleChangeState('add_entry') }} />
                                        </Grid>
                                        {
                                            addedentriesData?.map((data, index) => (
                                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                                    <AddedEntryCard key={index} {...data} />
                                                </Grid>

                                            ))
                                        }
                                    </Grid>
                                </Box>
                                <Stack direction='row' alignItems='center' justifyContent='center' flexWrap='wrap' className="btn_holder">
                                    <CustomButtonPrimary
                                        variant="outlined"
                                        color="info"
                                        onClick={() => handleChangeState('add_customer')}
                                        className="gradient_btn"
                                    >
                                        <Typography variant="body1">
                                            Add customer
                                        </Typography>
                                    </CustomButtonPrimary>
                                    <CustomButtonPrimary
                                        form="edit_form"
                                        variant="contained"
                                        color="primary"

                                    >

                                        <Typography variant="body1">
                                            Delete customer

                                        </Typography>

                                    </CustomButtonPrimary>
                                </Stack>
                            </CustomerProfileWrapper>
                        ) : profileState === 'add_customer' ? (
                            <AddCustomerWrapper>
                                <Typography variant="h4" className="main_heading">
                                    Add Customer
                                </Typography>
                                <Box className="add_customer_form">
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
                                        <form>
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
                                                        placeholder="Email address (Optional)"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={12} xs={12}>
                                                    <InputFieldCommon
                                                        placeholder="Phone number (Optional)"
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Box>
                                    <Stack className="btn_holder " direction='row' justifyContent='center'>
                                        <CustomButtonPrimary
                                            form="edit_form"
                                            variant="contained"
                                            color="primary"

                                        >

                                            <Typography variant="body1">
                                                Add now

                                            </Typography>

                                        </CustomButtonPrimary>
                                    </Stack>
                                </Box>
                            </AddCustomerWrapper>
                        ) : profileState === 'add_entry' ? (
                            <CreateEntryWrapper>
                                <Typography variant="h4" className="main_heading">
                                    Create a new entry
                                </Typography>
                                <Stack className="edit_date_row" direction='row' alignItems='center' justifyContent='space-between' flexWrap='wrap'>
                                    <Typography variant='body1' className='date'>
                                        <i className='ico'>
                                            <CalendarIconFill />
                                        </i>

                                        Dec 9,2023
                                    </Typography>
                                    <CustomButtonPrimary className='downloads_btn' variant="contained" color="primary" endIcon={<EditPenIcon />} onClick={handleOpenModal}>
                                        <Typography variant='body1'>Edit date</Typography>
                                    </CustomButtonPrimary>
                                </Stack>
                                <Box className="new_entries_sec">
                                    <Grid container spacing={{ lg: 3, md: 3, sm: 2, xs: 2 }}>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <AddImageInput text="Add Image" />
                                        </Grid>
                                        {
                                            addedImageData?.map((data, index) => (
                                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                                    <Box className="image_box">
                                                        <Image
                                                            src={data.imgUrl} key={index}
                                                            alt=""
                                                            width={324}
                                                            height={311}
                                                        />
                                                    </Box>
                                                </Grid>

                                            ))
                                        }
                                    </Grid>
                                </Box>
                                <Stack className="btn_holder" direction='row' justifyContent='center'>
                                    <CustomButtonPrimary variant="contained" color="primary" >
                                        <Typography variant='body1'>Delete entry</Typography>
                                    </CustomButtonPrimary>
                                </Stack>

                                <MuiModalWrapper
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    title=""
                                    className="calendar_modal_wrapper"
                                    crossDelete
                                >
                                    <Box className="calendar_modal">
                                        <Typography variant="h3" className="heading">
                                            Create date
                                        </Typography>
                                        <Box className="calendar_wrapper">
                                            <CustomCalendar />
                                        </Box>
                                        <Stack direction='row' alignItems='center' justifyContent='center' className="btn_wrapper ">
                                            <CustomButtonPrimary
                                                variant="outlined"
                                                color="info"
                                                className="gradient_btn"

                                            >
                                                <Typography variant="body1">Cancel</Typography>
                                            </CustomButtonPrimary>
                                            <CustomButtonPrimary
                                                form="edit_form"
                                                variant="contained"
                                                color="primary"

                                            >

                                                <Typography variant="body1">
                                                    Create

                                                </Typography>

                                            </CustomButtonPrimary>
                                        </Stack>
                                    </Box>
                                </MuiModalWrapper>
                            </CreateEntryWrapper>

                        ) : null
                    }
                </Box>
            </DashboardWrapper>
        </Wrapper>
    )
}
