import assest from "@/json/assest";
import { addedImageData } from "@/json/mock/addedImage.mock";
import { CreateEntryWrapper } from "@/styles/StyledComponents/CreateEntryWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import BackArrowIcon from "@/ui/Icons/BackArrowIcon";
import CalendarIconFill from "@/ui/Icons/CalendarIconFill";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import EditPenIcon from "@/ui/Icons/EditPenIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Button, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import AddImageInput from "../AddImageInput/AddImageInput";
import NewEntryModal from "./NewEntryModal";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import {
  useDeleteEntry,
  useDeleteEntryImage
} from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import { useQueryClient } from "react-query";
import { GET_CLIENTS_ENTRIES } from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import useNotiStack from "@/hooks/useNotistack";

const MyClientPreviewModal = ({ entryData, openmod, close }: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const { id, date, images } = entryData ?? {};
  const [showImage, setShowImage] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>({});

  const { mutate: deleteImage } = useDeleteEntryImage();
  const { mutate: deleteEntry } = useDeleteEntry();

  const handleShowImage = (data: any) => {
    setShowImage(!showImage);
    setSelectedImage(data);
  };

  const editDateHandler = () => setEditDate(!editDate);

  const timeFormatter = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      month: "short", // Short month name (e.g., Dec)
      day: "numeric", // Day of the month (e.g., 9)
      year: "numeric" // Full year (e.g., 2023)
    });
    return formattedDate;
  };
  const deleteImageHandler = () => {
    const formData: FormData = new FormData();
    formData.append("image_id", `${selectedImage?.id}`);
    console.log("deleteImageHandler", selectedImage?.id);
    deleteImage(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        toastSuccess(response?.data?.message ?? "Customer image deleted.");
        setEditDate(false);
        setShowImage(false);
        close();
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  };
  const deleteEntryHandler = () => {
    const formData: FormData = new FormData();
    formData.append("entry_id", `${id}`);
    deleteEntry(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        toastSuccess(response?.data?.message ?? "Customer entry deleted.");
        setEditDate(false);
        setShowImage(false);
        close();
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  };
  return (
    <>
      <MuiModalWrapper
        crossDelete
        open={openmod}
        onClose={close}
        title=""
        className="my_client_preview_modal"
      >
        {showImage ? (
          <>
            <CreateEntryWrapper>
              <Stack
                className="edit_date_row edit_date_row_second"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Button type="button" onClick={() => handleShowImage(null)}>
                  <BackArrowIcon />
                </Button>
                <Button type="button" onClick={deleteImageHandler}>
                  <DeleteIcon />
                </Button>
              </Stack>
              <Box className="new_entries_sec new_entries_sec_image">
                <Box className="main_image">
                  <img
                    src={selectedImage?.image_url ?? assest.blogimg3}
                    alt=""
                    width={500}
                    height={500}
                  />
                </Box>
              </Box>
            </CreateEntryWrapper>
          </>
        ) : (
          <>
            {editDate ? (
              <>
                <Typography variant="h3" className="heading">
                  Edit date
                </Typography>
                <Box className="calendar_wrapper">
                  <CustomCalendar />
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  className="btn_wrapper cmn_btnStyle"
                >
                  <CustomButtonPrimary
                    variant="outlined"
                    color="info"
                    onClick={editDateHandler}
                    className="gradient_btn"
                  >
                    <Typography variant="body1">Cancel</Typography>
                  </CustomButtonPrimary>
                  <CustomButtonPrimary
                    form="edit_form"
                    variant="contained"
                    color="primary"
                  >
                    <Typography variant="body1">Update</Typography>
                  </CustomButtonPrimary>
                </Stack>
              </>
            ) : (
              <CreateEntryWrapper>
                <Typography variant="h4" className="main_heading">
                  Create a new entry
                </Typography>
                <Stack
                  className="edit_date_row"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Typography variant="body1" className="date">
                    <i className="ico">
                      <CalendarIconFill />
                    </i>
                    {timeFormatter(date)}
                  </Typography>
                  <CustomButtonPrimary
                    className="downloads_btn"
                    variant="contained"
                    color="primary"
                    endIcon={<EditPenIcon />}
                    onClick={editDateHandler}
                  >
                    <Typography variant="body1">Edit date</Typography>
                  </CustomButtonPrimary>
                </Stack>
                <Box className="new_entries_sec">
                  <Grid container spacing={{ lg: 3, md: 3, sm: 2, xs: 2 }}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <AddImageInput
                        text="Add image"
                        entry_id={id}
                        close={close}
                      />
                    </Grid>
                    {images?.map((_img: any) => (
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Box
                          className="image_box"
                          onClick={() => handleShowImage(_img)}
                          key={_img?.id}
                        >
                          <img
                            src={_img.image_url}
                            alt=""
                            width={324}
                            height={311}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Stack
                  className="btn_holder "
                  direction="row"
                  justifyContent="center"
                >
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={deleteEntryHandler}
                  >
                    <Typography variant="body1">Delete entry</Typography>
                  </CustomButtonPrimary>
                </Stack>
              </CreateEntryWrapper>
            )}
          </>
        )}
      </MuiModalWrapper>
    </>
  );
};

export default MyClientPreviewModal;
