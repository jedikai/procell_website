/* eslint-disable mui-path-imports/mui-path-imports */
import { MainTopicWrapper } from "@/styles/StyledComponents/MainTopicWrapper";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem } from "@mui/material";
import { topicProps } from "@/interface/topic.interfaces";
import Link from "next/link";

export default function MaintopicComp({
  topicData,
  title,
  getCategoriesWiseBlog = () => { },
  selectedCategoriesId
}: topicProps) {
  console.log("topicData", topicData);

  return (
    <MainTopicWrapper>
      <Box className="topic_wrpp">
        <Typography variant="h3">{title}</Typography>
        <List disablePadding>
          {topicData.map((data: any, index: number) => (
            <ListItem disablePadding style={{ cursor: "pointer" }} key={index + 1}>
              <a
                onClick={() => getCategoriesWiseBlog(data?.id)}
                className={selectedCategoriesId == data?.id ? "active" : ""}
              >
                {data?.name}
              </a>
            </ListItem>
          ))}
        </List>
      </Box>
    </MainTopicWrapper>
  );
}
