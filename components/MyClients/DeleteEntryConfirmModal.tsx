import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import WarningIcon from "@/ui/Icons/WarningIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

const DeleteEntryConfirmModal = ({
  open,
  close = () => {},
  deleteEntry,
  type
}: any) => {
  return (
    <MuiModalWrapper crossDelete open={open} onClose={close} title="">
      <Box className="loginModal new_secmdl">
        <Box className="modalimgWrap">
          {/* <Image
              src={assest.logoutGradient}
              alt={"logout"}
              width={28}
              height={28}
            /> */}
          <WarningIcon IconWidth="60" IconHeight="60" />
        </Box>

        <Typography variant="h3">
          Are you sure you want to delete this {type}?
        </Typography>

        <List disablePadding className="btn_wrapper">
          <ListItem disablePadding>
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              className="deletebtn"
              onClick={deleteEntry}
            >
              <Typography variant="body1">Yes</Typography>
            </CustomButtonPrimary>
          </ListItem>
          <ListItem disablePadding>
            <CustomButtonPrimary
              variant="outlined"
              color="info"
              className="gradient_btn"
              onClick={close}
            >
              <Typography variant="body1">No</Typography>
            </CustomButtonPrimary>
          </ListItem>
        </List>
      </Box>
    </MuiModalWrapper>
  );
};

export default DeleteEntryConfirmModal;
