import { useDeleteEntry } from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import { GET_CLIENTS_ENTRIES } from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import { addedEntryProps } from "@/interface/addedEntry.interface";
import { AddedEntryCardWrapper } from "@/styles/StyledComponents/AddedEmtryCardWrapper";
import CalendarIconFill from "@/ui/Icons/CalendarIconFill";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { memo } from "react";
import { useQueryClient } from "react-query";

export default memo(function AddedEntryCard({
  id,
  date,
  images,
  openEntry,
  handleChangeState
}: addedEntryProps) {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const { mutate: deleteEntry } = useDeleteEntry();
  const timeFormatter = (date: string | undefined) => {
    const inputDate = new Date(date ?? "");
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      month: "short", // Short month name (e.g., Dec)
      day: "numeric", // Day of the month (e.g., 9)
      year: "numeric" // Full year (e.g., 2023)
    });
    return formattedDate;
  };
  const deleteEntryHandler = () => {
    const formData: FormData = new FormData();
    formData.append("entry_id", `${id}`);
    deleteEntry(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        toastSuccess(response?.data?.message ?? "Customer entry deleted.");
        // handleChangeState('customer_profile')
        // setEditDate(false);
        // setShowImage(false);
        // close();
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  };
  return (
    <AddedEntryCardWrapper className="added_entry_card">
      <Box className="image_box">
        {images && images?.length >= 2 ? (
          <>
            <img
              src={images?.at(0)?.image_url}
              width={324}
              height={265}
              alt=""
            />
            <img
              src={images?.at(-1)?.image_url}
              width={324}
              height={265}
              alt=""
            />
          </>
        ) : (
          <>
            <Image
              src={"/assets/images/no-image.png"}
              width={324}
              height={265}
              alt=""
              className="noimg_foundWrap"
            />
          </>
        )}
        <Box className="eidt_delete">
          <Button
            type="button"
            className="view_btn"
            onClick={() =>
              openEntry({
                id,
                date,
                images
              })
            }
          >
            <VisibilityIcon />
          </Button>
          <Button type="button" onClick={deleteEntryHandler}>
            <DeleteIcon IconColor="red" />
          </Button>
        </Box>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="card_btm"
      >
        <Typography variant="body1" className="date">
          <i className="ico">
            <CalendarIconFill />
          </i>

          {timeFormatter(date)}
        </Typography>
        <Typography variant="body1" className="rght_text">
          {images?.length > 0 ? images?.length : "No"} Images
        </Typography>
      </Stack>
    </AddedEntryCardWrapper>
  );
})
