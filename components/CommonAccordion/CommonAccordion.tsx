/* eslint-disable mui-path-imports/mui-path-imports */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { accorProps } from "@/interface/accordion.interfaces";
import { Box } from "@mui/material";






export default function CommonAccordion(props: accorProps) {

    const { indexNumber, handleClick, expand, accordianHead, children } = props
    return (
      
            <Accordion expanded={expand === `panel${indexNumber + 1}`} onChange={handleClick(`panel${indexNumber +1}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${indexNumber}bh-content`}
                    id={`panel${indexNumber}bh-header`}
                >
                    <Box className="acr_headerwrap">
                        {accordianHead}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
     
    )
}
