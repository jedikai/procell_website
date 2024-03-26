import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useCallback } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useCreateEntry } from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";

const NewEntryModal = ({ open, close }: any) => {
  const { mutate: createEntry } = useCreateEntry();
  const createEntryHandler = useCallback((data: any) => {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, "0");
    const day = String(data.getDate()).padStart(2, "0");
    console.log("show me date", `${year}-${month}-${day}`);
    const formData = new FormData();
    formData.append("practitioner_customer_id", `${"entry_id"}`);
    formData.append("date", `${"entry_id"}`);
  }, []);
  return (
    <>
      <MuiModalWrapper
        open={open}
        onClose={close}
        title=""
        className="calendar_modal_wrapper"
        crossDelete
      >
        <Box className="calendar_modal">
          <Typography variant="h3" className="heading">
            Create a new entry
          </Typography>
          <Box className="calendar_wrapper">
            <CustomCalendar getDate={createEntryHandler} />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            className="btn_wrapper "
          >
            <CustomButtonPrimary
              variant="outlined"
              color="info"
              onClick={close}
              className="gradient_btn"
            >
              <Typography variant="body1">Cancel</Typography>
            </CustomButtonPrimary>
            <CustomButtonPrimary
              form="edit_form"
              variant="contained"
              color="primary"
            >
              <Typography variant="body1">Create</Typography>
            </CustomButtonPrimary>
          </Stack>
        </Box>
      </MuiModalWrapper>
    </>
  );
};

export default NewEntryModal;
