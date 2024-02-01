import { useAddEntryImage } from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import {
  GET_CLIENTS_ENTRIES,
  GET_CLIENTS_ENTRY_DETAILS
} from "@/hooks/react-qurey/query-keys/myClientsQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import { AddImageInputWrapper } from "@/styles/StyledComponents/AddImageInputWrapper";
import AddIcon from "@/ui/Icons/AddIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { useQueryClient } from "react-query";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";

export default memo(function AddImageInput({
  text,
  entry_id,
  fetchEntryDetails
}: any) {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();

  const { mutate: addImages, isLoading } = useAddEntryImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("entry_id", `${entry_id}`);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("images", file);
      }
      addImages(formData, {
        onSuccess: (response: any) => {
          queryClient.invalidateQueries(GET_CLIENTS_ENTRIES);
          queryClient.invalidateQueries(GET_CLIENTS_ENTRY_DETAILS);
          toastSuccess(response?.data?.message ?? "Customer image added.");
          fetchEntryDetails();
        },
        onError: (error: any) => {
          toastError("Something went wrong, please try again later.");
        }
      });
    }
  };
  return (
    <AddImageInputWrapper className="add_input">
      {!isLoading ? (
        <>
          <input type="file" onChange={handleFileChange} multiple />
          <Stack
            className="add_image"
            direction="column"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <i className="ico">
              <AddIcon />
            </i>
            <Typography variant="body1" className="text">
              {text}
            </Typography>
          </Stack>
        </>
      ) : (
        <Stack
          className="add_image"
          direction="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <ButtonLoaderSecondary />
        </Stack>
      )}
    </AddImageInputWrapper>
  );
});
