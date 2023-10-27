/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable mui-path-imports/mui-path-imports */
import { LinearProgressWrapper } from "@/styles/StyledComponents/LinearProgressWrapper";
import React from "react";
import Container from "@mui/material/Container";

import ProgressBar from "@ramonak/react-progress-bar";

export default function LinearProgressBar() {
  return (
    <LinearProgressWrapper>
      <Container fixed>


        <ProgressBar
          completed={25}
          height="8px"
          className="progress_bar"
          baseBgColor="#efefef"
          barContainerClassName="container"
          // completedClassName="barCompleted"
          labelClassName="label"
        />
      </Container>
    </LinearProgressWrapper>
  );
}
