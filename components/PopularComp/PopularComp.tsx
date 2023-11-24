/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import { PopularWrapper } from "@/styles/StyledComponents/PopularWrapper";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SinglePopularCard from "../SinglePopularCard/SinglePopularCard";
import { singlePopularData } from "@/json/mock/singlePopularlist.mock";
import { usePopularPostList } from "@/hooks/react-qurey/query-hooks/scienceQuery.hooks";

export default function PopularComp() {
  const { data: popularPostList, isLoading } = usePopularPostList();
  // console.log("usePopularPostList", data);

  return (
    <PopularWrapper>
      {!isLoading ? <Box className="popular_wrapper">
        <Typography variant="h3">Popular</Typography>
        {popularPostList &&
          popularPostList.length > 0 &&
          popularPostList?.map((data: any) => (
            <SinglePopularCard
              key={data?.popular_post_id}
              title={data?.popular_post_title ?? ""}
              date={data?.popular_post_date ?? ""}
              link={`/science/science-details/${data?.popular_post_id}`}
            />
          ))}
      </Box> : <></>}
    </PopularWrapper>
  );
}
