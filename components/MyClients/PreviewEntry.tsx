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
import { memo, useCallback, useEffect, useState } from "react";
import AddImageInput from "../AddImageInput/AddImageInput";
import NewEntryModal from "./NewEntryModal";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import {
  useClientEntryDetails,
  useDeleteEntry,
  useDeleteEntryImage,
  useUpdateEntry
} from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import { useQueryClient } from "react-query";
import {
  GET_CLIENTS_ENTRIES,
  GET_CLIENTS_ENTRY_DETAILS
} from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import DeleteEntryConfirmModal from "./DeleteEntryConfirmModal";

const PreviewEntry = ({ entryData, handleChangeState, close }: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const { id, date, images } = entryData ?? {};
  const [showImage, setShowImage] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [updatedDate, setUpdatedDate] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>({});
  const [open, setOpen] = useState(false);

  const {
    data: entryDetails,
    isLoading: entryDetailsLoading,
    refetch
  } = useClientEntryDetails(id, false, (response: any) => {
    console.log("entryDetails response", response);
  });
  const { mutate: deleteImage, isLoading: deleteImageLoader } =
    useDeleteEntryImage();
  const { mutate: deleteEntry, isLoading: deleteEntryLoader } =
    useDeleteEntry();
  const { mutate: updateEntry, isLoading: updateEntryDateLoader } =
    useUpdateEntry();

  const modalHandler = useCallback(() => setOpen(!open), [open]);
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
        queryClient.invalidateQueries(GET_CLIENTS_ENTRY_DETAILS);
        refetch();
        toastSuccess(response?.data?.message ?? "Customer image deleted.");
        setEditDate(false);
        setShowImage(false);
        // handleChangeState("customer_profile");
        // close();
      },
      onError: (error: any) => {
        console.log("first====>", error);
        toastError("Something went wrong, please try again later.");
      }
    });
  };
  const deleteEntryHandler = useCallback(() => {
    const formData: FormData = new FormData();
    formData.append("entry_id", `${id}`);
    deleteEntry(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        // queryClient.invalidateQueries(GET_CLIENTS_ENTRY_DETAILS);
        // refetch();
        toastSuccess(response?.data?.message ?? "Customer entry deleted.");
        setEditDate(false);
        setShowImage(false);
        handleChangeState("customer_profile");
        // close();
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  }, []);
  const getEditedDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log("daaaaaaaate", `${year}-${month}-${day}`);
    setUpdatedDate(`${year}-${month}-${day}`);
  };
  const updateEntryHandler = () => {
    const formData = new FormData();
    formData.append("entry_id", `${id}`);
    formData.append("date", updatedDate);
    updateEntry(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        queryClient.invalidateQueries(GET_CLIENTS_ENTRY_DETAILS);
        refetch();
        toastSuccess(response?.data?.message ?? "Customer entry updated.");
        setEditDate(false);
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  };
  console.log("orev date", new Date(date), date);
  useEffect(() => {
    if (!!id) {
      refetch();
    }
  }, [id]);
  return (
    <>
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
              {!deleteImageLoader ? (
                <Button type="button" onClick={deleteImageHandler}>
                  <DeleteIcon />
                </Button>
              ) : (
                <Button type="button">
                  <ButtonLoader />
                </Button>
              )}
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
                <CustomCalendar getDate={getEditedDate} value={date} />
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                className="btn_wrapper cmn_btnStyle"
              >
                {!updateEntryDateLoader ? (
                  <CustomButtonPrimary
                    form="edit_form"
                    variant="contained"
                    color="primary"
                    onClick={updateEntryHandler}
                  >
                    <Typography variant="body1">Update</Typography>
                  </CustomButtonPrimary>
                ) : (
                  <CustomButtonPrimary
                    form="edit_form"
                    variant="contained"
                    color="primary"
                  >
                    <ButtonLoader />
                  </CustomButtonPrimary>
                )}
                <CustomButtonPrimary
                  variant="outlined"
                  color="info"
                  onClick={editDateHandler}
                  className="gradient_btn"
                >
                  <Typography variant="body1">Cancel</Typography>
                </CustomButtonPrimary>
              </Stack>
            </>
          ) : (
            <CreateEntryWrapper>
              {!entryDetailsLoading && !!entryDetails ? (
                <>
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
                      {timeFormatter(entryDetails?.date ?? "")}
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
                          fetchEntryDetails={refetch}
                          //   close={close}
                        />
                      </Grid>
                      {!!entryDetails &&
                        entryDetails?.images?.map((_img: any) => (
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
                    className="btn_holder cmn_btnStyle"
                    direction="row"
                    justifyContent="center"
                  >
                    <CustomButtonPrimary
                      variant="contained"
                      color="primary"
                      onClick={modalHandler}
                    >
                      {!deleteEntryLoader ? (
                        <Typography variant="body1">Delete entry</Typography>
                      ) : (
                        <ButtonLoader />
                      )}
                    </CustomButtonPrimary>
                    <CustomButtonPrimary
                      variant="outlined"
                      color="info"
                      onClick={() => handleChangeState("customer_profile")}
                      className="gradient_btn"
                    >
                      <Typography variant="body1">Back</Typography>
                    </CustomButtonPrimary>
                  </Stack>
                </>
              ) : (
                <ButtonLoaderSecondary />
              )}
            </CreateEntryWrapper>
          )}
        </>
      )}
      <DeleteEntryConfirmModal
        open={open}
        close={modalHandler}
        deleteEntry={deleteEntryHandler}
        type={"entry"}
      />
    </>
  );
};

export default memo(PreviewEntry);
