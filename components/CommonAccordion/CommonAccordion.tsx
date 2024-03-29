/* eslint-disable mui-path-imports/mui-path-imports */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { memo, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { accorProps } from "@/interface/accordion.interfaces";
import { Box } from "@mui/material";

export default function CommonAccordion(props: accorProps) {
  const { indexNumber, handleClick, expand, accordianHead, children } = props;

  useEffect(() => {
    if (window != undefined) {
      if (expand == `panel${indexNumber + 1}`) {
        const element: any = document.getElementById(
          `panel${indexNumber}bh-header`
        );
        if (!!element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          });
        }
      }
    }
  }, [expand, indexNumber]);
  return (
    <Accordion
      expanded={expand === `panel${indexNumber + 1}`}
      onChange={handleClick(`panel${indexNumber + 1}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${indexNumber}bh-content`}
        id={`panel${indexNumber}bh-header`}
      >
        <Box className="acr_headerwrap">{accordianHead}</Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
