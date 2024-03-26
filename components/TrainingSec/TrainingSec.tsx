/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import { trainingData } from "@/json/mock/trainingData.mock";
import { TrainingSecWrapper } from "@/styles/StyledComponents/TrainingSecWrapper";
import Container from "@mui/material/Container";
import React, { useMemo, useState } from "react";
import CommonAccordion from "../CommonAccordion/CommonAccordion";

import {
  AccordionDetails,
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Typography
} from "@mui/material";

import {
  AccordionEachRowTypes,
  CircularProgressProps,
  chekboxProps,
  showDataProps
} from "@/interface/traningAcademy.interface";
import DefaultAccordionIcon from "@/ui/Icons/DefaultAccordionIcon";
import TickIconAccordion from "@/ui/Icons/TickIconAccordion";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

const AccordionEachItemProgress = ({
  image,
  percentage
}: CircularProgressProps) => {
  return <CircularProgressBar image={image} value={percentage} />;
};

const AccordionEachCheckBox = ({ onChangeHandler }: chekboxProps) => {
  return (
    <Checkbox
      disableRipple
      icon={<DefaultAccordionIcon />}
      checkedIcon={<TickIconAccordion />}
      onChange={onChangeHandler}
    />
  );
};

const ShowData = ({
  showCheckNumber,
  dataLength,
  percentage
}: showDataProps) => {
  return (
    <Typography variant="body1">
      <Typography variant="caption" className="progress_percent">
        {percentage}%
      </Typography>
      <Typography variant="caption" className="check_click">
        {showCheckNumber}/{dataLength}
      </Typography>
    </Typography>
  );
};

const AccordionEachRow = (props: AccordionEachRowTypes) => {
  const { index, handleChange, expanded, data } = props;
  const [checkNumber, setCheckNumber] = useState(0);

  const onHandleCheckClick = (event: any, index: number) => {
    if (event.target.checked) {
      setCheckNumber((prev) => prev + 1);
    } else {
      setCheckNumber((prev) => prev - 1);
    }
  };

  const completePercentage = useMemo(() => {
    return Math.round((checkNumber / data.checkboxList.length) * 100 * 10) / 10;
  }, [checkNumber, data.checkboxList.length]);

  return (
    <CommonAccordion
      indexNumber={index}
      handleClick={handleChange}
      expand={expanded}
      accordianHead={
        <Box className="acr_head">
          <AccordionEachItemProgress
            image={data?.image}
            percentage={completePercentage}
          />
          {/* <CircularProgressBar
        image={data?.image}
        value={(checkNumber / data.checkboxList.length) * 100}
      /> */}
          <Box className="progress_rgt">
            <Typography variant="h3">{data?.title}</Typography>
            <ShowData
              percentage={completePercentage}
              showCheckNumber={checkNumber || 0}
              dataLength={data.checkboxList.length}
            />
          </Box>
        </Box>
      }
    >
      <AccordionDetails className="acr_body">
        <List disablePadding>
          {data.checkboxList.map((item: any, index: number) => (
            <ListItem key={index + 1} disablePadding>
              <FormControlLabel
                className="check_box"
                control={
                  <AccordionEachCheckBox
                    onChangeHandler={(e: any) => onHandleCheckClick(e, index)}
                  />
                }
                label={item.name}
              />
              {item.buttonComponent}
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </CommonAccordion>
  );
};

export default function TrainingSec() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChanges =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <TrainingSecWrapper>
      <Container fixed>
        <Box className="accordionSecionWrapper">
          {trainingData?.map((data: any, index: number) => (
            <AccordionEachRow
              expanded={expanded}
              handleChange={handleChanges}
              index={index}
              data={data}
              key={index + 1}
            />
          ))}
        </Box>
      </Container>
    </TrainingSecWrapper>
  );
}
