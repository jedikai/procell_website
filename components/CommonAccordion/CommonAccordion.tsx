/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable mui-path-imports/mui-path-imports */
import { accorProps } from "@/interface/accordion.interfaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary, {
  AccordionSummaryProps
} from "@mui/material/AccordionSummary";
import React, { useEffect } from "react";

const CommonAccordion: React.FC<accorProps & AccordionSummaryProps> = ({
  indexNumber,
  handleClick,
  expand,
  accordianHead,
  children,
  show = true,
  ...others
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (expand == `panel${indexNumber + 1}`) {
        const element: any = document.getElementById(
          `panel${indexNumber}bh-header`
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
          });
        }
      }
    }
  }, [expand, indexNumber]);

  console.log(indexNumber, expand, "clicked expand");
  return (
    <Accordion
      expanded={expand === `panel${indexNumber + 1}`}
      onChange={handleClick(`panel${indexNumber + 1}`)}
      {...others}
    >
      <AccordionSummary
        expandIcon={show ? <ExpandMoreIcon /> : <></>}
        aria-controls={`panel${indexNumber}bh-content`}
        id={`panel${indexNumber}bh-header`}
        {...others}
      >
        <Box className="acr_headerwrap">{accordianHead}</Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CommonAccordion;
