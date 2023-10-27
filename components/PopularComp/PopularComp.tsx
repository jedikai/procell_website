/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import { PopularWrapper } from "@/styles/StyledComponents/PopularWrapper";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SinglePopularCard from "../SinglePopularCard/SinglePopularCard";
import { singlePopularData } from "@/json/mock/singlePopularlist.mock";

export default function PopularComp() {
  return (
    <PopularWrapper>
      <Box className="popular_wrapper">
        <Typography variant="h3">Popular</Typography>
        {singlePopularData.map((data) => (
          <SinglePopularCard
            title={data.title}
            date={data.date}
            link={data.link}
          />
        ))}
      </Box>
    </PopularWrapper>
  );
}
