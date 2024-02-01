/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import { practionerData } from "@/json/mock/trainingData.mock";
import Container from "@mui/material/Container";
import React, { memo, useMemo, useState } from "react";
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
import { PractionerSecWrapper } from "@/styles/StyledComponents/PractionerWrapper";
import DefaultAccordionIcon from "@/ui/Icons/DefaultAccordionIcon";
import TickIconAccordion from "@/ui/Icons/TickIconAccordion";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import TrainingButton from "../TrainingButton/TrainingButton";
import YoutubeIconPurple from "@/ui/Icons/YoutubeIconPurple";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import { useRouter } from "next/router";

const AccordionEachItemProgress = ({
  image,
  percentage
}: CircularProgressProps) => {
  return <CircularProgressBar image={image} value={percentage} />;
};

const AccordionEachCheckBox = ({ checked }: any) => {
  return (
    <Checkbox
      disableRipple
      checked={checked}
      icon={<DefaultAccordionIcon />}
      checkedIcon={<TickIconAccordion />}
      // onChange={onChangeHandler}
      disabled={!checked}
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
  const router = useRouter();
  const { index, handleChange, expanded, data } = props;
  const { id, name, description, full_image_url, completed, content }: any =
    data ?? {};
  const [checkNumber, setCheckNumber] = useState(0);

  const onHandleCheckClick = (event: any, index: number) => {
    if (event.target.checked) {
      setCheckNumber((prev) => prev + 1);
    } else {
      setCheckNumber((prev) => prev - 1);
    }
  };
  console.log("content", router);

  const contentType = (type: string) => {
    if (type == "video") {
      return (
        <TrainingButton startIcon={<YoutubeIconPurple />} content="Video" />
      );
    } else if (type == "pdf") {
      return <TrainingButton startIcon={<DownloadIcon />} content="PDF" />;
    } else if (type == "text") {
      return <TrainingButton startIcon={<DownloadIcon />} content="Text" />;
    } else {
      return <></>;
    }
  };

  const completedContents = useMemo(() => {
    if (!!content && content?.length > 0) {
      const totalCmpltContents = content.filter((_i: any) => _i?.is_completed);
      return totalCmpltContents?.length;
    } else {
      return 0;
    }
  }, [content]);

  // const completePercentage = useMemo(() => {
  //   return Math.round((checkNumber / data.checkboxList.length) * 100 * 10) / 10;
  // }, [checkNumber, data.checkboxList.length]);

  return (
    <CommonAccordion
      indexNumber={index}
      handleClick={handleChange}
      expand={expanded}
      accordianHead={
        <Box className="acr_head">
          <AccordionEachItemProgress
            image={full_image_url ?? ""}
            percentage={Math.round(completed ?? 0)}
          />

          <Box className="progress_rgt">
            {!!name && <Typography variant="h3">{name}</Typography>}
            <ShowData
              percentage={Math.round(completed ?? 0)}
              showCheckNumber={completedContents || 0}
              dataLength={
                !!content && content?.length > 0 ? content?.length : ""
              }
            />
          </Box>
        </Box>
      }
    >
      <AccordionDetails className="acr_body">
        <List disablePadding>
          {!!content &&
            content?.length > 0 &&
            content?.map((item: any, index: number) => (
              <ListItem
                key={index + 1}
                disablePadding
                onClick={() => {
                  if (!!content[index == 0 ? 0 : index - 1]?.is_completed) {
                    router.push(
                      `/academy/${router?.query?.slug}/${item?.id ?? ""}`
                    );
                  }
                }}
              >
                <FormControlLabel
                  className="check_box"
                  control={
                    <AccordionEachCheckBox
                      // onChangeHandler={(e: any) => onHandleCheckClick(e, index)}
                      checked={item?.is_completed ?? false}
                    />
                  }
                  label={item?.name ?? ""}
                />
                {/* {item.buttonComponent} */}
                {contentType(item?.content_type ?? "")}
              </ListItem>
            ))}
        </List>
      </AccordionDetails>
    </CommonAccordion>
  );
};

export default memo(function PractionerSec({ academyContentData }: any) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChanges =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <PractionerSecWrapper>
      <Container fixed>
        <Box className="accordionSecionWrapper">
          {academyContentData?.map((data: any, index: number) => (
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
    </PractionerSecWrapper>
  );
});
