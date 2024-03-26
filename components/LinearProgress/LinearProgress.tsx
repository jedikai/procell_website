/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable mui-path-imports/mui-path-imports */
import { LinearProgressWrapper } from "@/styles/StyledComponents/LinearProgressWrapper";
import Container from "@mui/material/Container";

import ProgressBar, { ProgressBarProps } from "@ramonak/react-progress-bar";

interface progressProps extends ProgressBarProps {}

export default function LinearProgressBar({ ...props }: progressProps) {
  return (
    <LinearProgressWrapper className="progress_wrap">
      <Container fixed>
        <ProgressBar
          height="8px"
          className="progress_bar"
          baseBgColor="#efefef"
          barContainerClassName="container"
          labelClassName="label"
          {...props}
        />
      </Container>
    </LinearProgressWrapper>
  );
}
