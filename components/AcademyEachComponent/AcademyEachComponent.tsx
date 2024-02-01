import {
  AcademyEachComponentWrapper,
  EachLinearComponent
} from "@/styles/StyledComponents/AcademyEachComponentWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { HTMLAttributes, memo } from "react";
import LinearProgressBar from "../LinearProgress/LinearProgress";
import { Button } from "@mui/material";
import { ArrowRightIcon } from "@mui/x-date-pickers";

interface customProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  numberOfResources: number;
  compeltePercent: number;
}

const AcademyEachComponent: React.FC<
  customProps & HTMLAttributes<HTMLDivElement>
> = ({ title, numberOfResources, compeltePercent, ...props }) => {
  const router = useRouter();
  return (
    <AcademyEachComponentWrapper {...props}>
      <Box
        className="flex_between_center"
        onClick={() =>
          router.push(
            `/academy/${
              title == "Practitioner Academy"
                ? "practitioner-academy"
                : "rep-academy"
            }`
          )
        }
      >
        <Typography variant="h4">{title}</Typography>
        <Button type="button">
          <ArrowRightIcon />
        </Button>
      </Box>

      <LinearProgressBar
        completed={compeltePercent}
        labelClassName="no_label"
      />
      <Typography className="blue_para">
        {compeltePercent}% completed
      </Typography>
      <EachLinearComponent>
        <Box
          className="wrapper"
          onClick={() =>
            router.push(
              `/resources?type=${
                title == "Practitioner Academy"
                  ? "practitioner-academy"
                  : "rep-academy"
              }`
            )
          }
          style={{ cursor: "pointer" }}
        >
          <Typography variant="h5">Resources</Typography>
          <Typography>
            {numberOfResources} resource items are available
          </Typography>
        </Box>
      </EachLinearComponent>
    </AcademyEachComponentWrapper>
  );
};

export default memo(AcademyEachComponent);
