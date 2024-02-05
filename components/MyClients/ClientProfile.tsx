import { useDeleteClient } from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import {
  GET_CLIENTS_ENTRIES,
  GET_CLIENTS_LIST
} from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import { CustomerProfileWrapper } from "@/styles/StyledComponents/CustomerProfileWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import EditProfileIcon from "@/ui/Icons/EditProfileIcon";
import { Button, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import Slider from "react-slick";
import AddedEntryCard from "../AddedEntryCard/AddedEntryCard";
import NewEntryCard from "../NewEntryCard/NewEntryCard";
import DeleteEntryConfirmModal from "./DeleteEntryConfirmModal";

const settings = {
  dots: false,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  swipeToSlide: true,
  focusOnSelect: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 899,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};
const ClientProfile = ({
  handleChangeState,
  handleOpenNewEntryModal,
  handleDeleteEntry,
  clientProfileUpdateDecider,
  getSelectedClientData,
  selectedClientData,
  clientsList,
  clientsEntries,
  getSelectedClientId,
  clientId,
  fetchClientList
}: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const { id, first_name, last_name, phone, email, profile_image_url } =
    selectedClientData ?? {};

  const [open, setOpen] = useState(false);

  const { mutate: deleteClient } = useDeleteClient();

  const modalHandler = useCallback(() => setOpen(!open), [open]);
  const deleteClientHandler = () => {
    const formData: FormData = new FormData();
    formData.append("customer_id", `${id}`);
    deleteClient(formData, {
      onSuccess: (response: any) => {
        getSelectedClientData(clientsList[0]);
        fetchClientList();
        // queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        // queryClient.invalidateQueries(GET_CLIENTS_LIST);
        modalHandler();
        toastSuccess(
          response?.data?.message ?? "Customer entry has been deleted."
        );
      }
    });
  };
  const updateClientProfile = () => {
    // clientProfileUpdateDecider(true);
    handleChangeState("add_customer");
  };
  const clientSelector = (data: any) => {
    getSelectedClientData(data);
    getSelectedClientId(data?.id);
  };
  console.log("profile_image_url", phone, email);

  return (
    <>
      <CustomerProfileWrapper>
        <Typography variant="h4" className="main_heading">
          Client profile
        </Typography>
        {!!clientsList && clientsList?.length > 0 ? (
          <>
            <Stack
              className="profile_header"
              direction="row"
              flexWrap="wrap"
              alignItems="center"
            >
              <Stack className="left" direction="row">
                {/* <Box className="cl_image_wrap">
                  <Box className="client_image">
                    <img
                      src={
                        profile_image_url != "false" && !!profile_image_url
                          ? profile_image_url
                          : assest.avatarIcon
                      }
                      alt=""
                      width={80}
                      height={80}
                    />
                    <Box className="editProfileWrap">
                      <Button
                        type="button"
                        className="editButnIcon"
                        onClick={updateClientProfile}
                      >
                        <EditProfileIcon />
                      </Button>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    className="profiletext"
                    sx={{ textAlign: "center" }}
                  >
                    {`${first_name} ${last_name}`}
                  </Typography>
                </Box> */}

                <Box
                  className="see_all"
                  onClick={() => {
                    getSelectedClientData(null);
                    handleChangeState("add_customer");
                  }}
                >
                  <Box className="client_image addClientImg">
                    <Image
                      src={assest.addClientIcon}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    className="profiletext"
                    sx={{ textAlign: "center" }}
                  >
                    Add Client
                  </Typography>
                </Box>
                <Box
                  className="see_all"
                  onClick={() => handleChangeState("all_client_list")}
                >
                  <Box className="client_image">
                    <Image
                      src={assest.AllClientIcon}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    className="profiletext"
                    sx={{ textAlign: "center" }}
                  >
                    See All
                  </Typography>
                </Box>
              </Stack>
              {/* {!!clientsList && !clientListLoader && ( */}
              <Box className="right">
                {clientsList?.length > 5 ? (
                  <Box className="slider_wrap">
                    <Slider {...settings}>
                      {clientsList?.map((_client: any) => (
                        <Box
                          className={`slide_image${
                            id == _client?.id ? " slide_image_active" : ""
                          }`}
                          key={_client?.id}
                          onClick={() => clientSelector(_client)}
                        >
                          <Box className="client_image">
                            <img
                              src={
                                !!_client?.profile_image_url &&
                                _client?.profile_image_url != "false"
                                  ? _client?.profile_image_url
                                  : assest.avatarIcon
                              }
                              alt=""
                              width={80}
                              height={80}
                            />
                          </Box>
                          {!!_client?.first_name && !!_client?.last_name && (
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "center" }}
                            >
                              {`${_client?.first_name} ${_client?.last_name}`}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Slider>
                  </Box>
                ) : (
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="right_image_part"
                  >
                    {clientsList?.length > 0 &&
                      clientsList?.map((_client: any) => (
                        <Box
                          className={`image_wrap${
                            id == _client?.id ? " slide_image_active" : ""
                          }`}
                          key={_client?.id}
                          onClick={() => clientSelector(_client)}
                        >
                          <Box className="client_image">
                            <img
                              src={
                                !!_client?.profile_image_url &&
                                _client?.profile_image_url != "false"
                                  ? _client?.profile_image_url
                                  : assest.avatarIcon
                              }
                              alt=""
                              width={80}
                              height={80}
                            />
                          </Box>
                          {!!_client?.first_name && !!_client?.last_name && (
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "center" }}
                              className="profiletext"
                            >
                              {`${_client?.first_name} ${_client?.last_name}`}
                            </Typography>
                          )}
                        </Box>
                      ))}
                  </Stack>
                )}
              </Box>
              {/* )} */}
            </Stack>
            <Stack
              className="profile_header"
              direction="row"
              flexWrap="wrap"
              alignItems="center"
            >
              <Stack className="left_customer_profile" direction="row">
                <Box className="cl_image_wrap">
                  <Box className="client_image">
                    <img
                      src={
                        profile_image_url != "false" && !!profile_image_url
                          ? profile_image_url
                          : assest.avatarIcon
                      }
                      alt=""
                      width={80}
                      height={80}
                    />
                    {/* <Box className="editProfileWrap">
                      <Button
                        type="button"
                        className="editButnIcon"
                        // onClick={updateClientProfile}
                      >
                        <EditProfileIcon />
                      </Button>
                    </Box> */}
                  </Box>
                </Box>
                <Box className="textWrapInfo">
                  <Box className="textWrap_only">
                    <Typography
                      variant="body1"
                      className={"profiletext name_title"}
                      sx={{ textAlign: "center" }}
                    >
                      {`${first_name} ${last_name}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="profiletext"
                      sx={{ textAlign: "center" }}
                    >
                      Email : {!!email && email != "false" ? email : "N/A"}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="profiletext"
                      sx={{ textAlign: "center" }}
                    >
                      Number : {!!phone && phone != "false" ? phone : "N/A"}
                    </Typography>
                  </Box>
                  <Box className="btnwrap_all">
                    <Button onClick={updateClientProfile}>
                      <EditProfileIcon />
                    </Button>
                    <Button onClick={modalHandler}>
                      <DeleteIcon IconColor={primaryColors.white} />
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Box className="new_entries_sec">
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <NewEntryCard
                    text="Create a new entry"
                    onClick={() => {
                      handleChangeState("create_entry");
                    }}
                  />
                </Grid>
                {clientsEntries?.map((_entry: any) => (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={_entry?.id}>
                    <AddedEntryCard {..._entry} openEntry={handleDeleteEntry} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        ) : (
          <Typography variant="body1">
            There is no client please app client.
          </Typography>
        )}
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          className="btn_holder cmn_btnStyle"
        >
          <CustomButtonPrimary
            variant="outlined"
            color="info"
            onClick={() => {
              getSelectedClientData(null);
              handleChangeState("add_customer");
            }}
            className="gradient_btn"
          >
            <Typography variant="body1">Add Client</Typography>
          </CustomButtonPrimary>
          <CustomButtonPrimary
            form="edit_form"
            variant="contained"
            color="primary"
            onClick={modalHandler}
          >
            <Typography variant="body1">Delete Client</Typography>
          </CustomButtonPrimary>
        </Stack> */}
      </CustomerProfileWrapper>
      <DeleteEntryConfirmModal
        open={open}
        close={modalHandler}
        deleteEntry={deleteClientHandler}
        type={"client"}
      />
    </>
  );
};

export default memo(ClientProfile);
