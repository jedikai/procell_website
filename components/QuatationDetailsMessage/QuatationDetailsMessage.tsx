/* eslint-disable react/self-closing-comp */
/* eslint-disable mui-path-imports/mui-path-imports */
import { QuatationMessageWrapper } from "@/styles/StyledComponents/QuatationMessageWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import ClipButtonIcon from "@/ui/Icons/ClipButtonIcon";
import SendIcon from "@/ui/Icons/sendIcon";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface quatationDetailsprops {
  quatationMessageTitle: string;
  quatationMessagetext: string;
}

function QuatationDetailsMessage({
  quatationMessageTitle,
  quatationMessagetext
}: quatationDetailsprops) {
  return (
    <QuatationMessageWrapper>
      <Box className="QuatationDetailbox">
        <Typography variant="h4">{quatationMessageTitle}</Typography>
        <Typography variant="body1">{quatationMessagetext}</Typography>
        <form>
          <Box className="inputmessagefield">
            <InputFieldCommon multiline placeholder="Write a message..." />

            <Box className="inputmessageButton">
              <Button>
                <Typography variant="caption">
                  <ClipButtonIcon />
                </Typography>
              </Button>
              <Button>
                <Typography variant="caption">
                  <SendIcon />
                </Typography>
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </QuatationMessageWrapper>
  );
}

export default QuatationDetailsMessage;
