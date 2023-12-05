import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PaymentProcessingModal = ({ open }: any) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <SpinnerLoaderIcon width={150} height={150} />
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <Typography variant="h3" className="payment_processing_text">
            Please wait your payment is processing.
          </Typography>
        </DialogContent>
        {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions> */}
      </Dialog>
    </>
  );
};

export default PaymentProcessingModal;
