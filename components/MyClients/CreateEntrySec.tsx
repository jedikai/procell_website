import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { memo, useCallback, useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useCreateEntry } from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import { GET_CLIENTS_ENTRIES } from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import { useQueryClient } from "react-query";
import useNotiStack from "@/hooks/useNotistack";
import logger from "redux-logger";

const CreateEntrySec = ({ clientId, handleChangeState }: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const [date, setDate] = useState<any>(null);
  const { mutate: createEntry } = useCreateEntry();
  const getDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log('daaaaaaaate',`${year}-${month}-${day}`)
    setDate(`${year}-${month}-${day}`);
  };
  const createEntryHandler = () => {
    const formData = new FormData();
    formData.append("practitioner_customer_id", `${clientId}`);
    formData.append("date", date);
    createEntry(formData, {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
        toastSuccess(response?.data?.message ?? "Customer image deleted.");
        handleChangeState("customer_profile");
      },
      onError: (error: any) => {
        toastError("Something went wrong, please try again later.");
      }
    });
  };
// console.log('date======>',date);

  return (
    <>
      <Box className="calendar_modal">
        <Typography variant="h3" className="heading">
          Create a new entry
        </Typography>
        <Box className="calendar_wrapper">
          <CustomCalendar getDate={getDate} />
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
            onClick={()=>handleChangeState("customer_profile")}
            className="gradient_btn"
          >
            <Typography variant="body1">Cancel</Typography>
          </CustomButtonPrimary>
          <CustomButtonPrimary
            form="edit_form"
            variant="contained"
            color="primary"
            onClick={createEntryHandler}
          >
            <Typography variant="body1">Create</Typography>
          </CustomButtonPrimary>
        </Stack>
      </Box>
    </>
  );
};

export default memo(CreateEntrySec);
