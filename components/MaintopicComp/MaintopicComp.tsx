/* eslint-disable mui-path-imports/mui-path-imports */
import { MainTopicWrapper } from "@/styles/StyledComponents/MainTopicWrapper";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem } from "@mui/material";
import { topicProps } from "@/interface/topic.interfaces";
import Link from "next/link";

export default function MaintopicComp({ topicData, title }: topicProps) {
  return (
    <MainTopicWrapper>
      <Box className="topic_wrpp">
        <Typography variant="h3">{title}</Typography>
        <List disablePadding>
          {topicData.map((data) => (
            <ListItem disablePadding>
              <Link href={data.link}>{data.name}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </MainTopicWrapper>
  );
}
