/* eslint-disable mui-path-imports/mui-path-imports */
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { SinglePopularWrapper } from "@/styles/StyledComponents/SinglePopularWrapper";
import { singlePopularProps } from "@/interface/singlePopular.interfaces";
import CalenderIcon from "@/ui/Icons/CalenderIcon";
import Link from "next/link";

export default function SinglePopularCard({ title, date,link }: singlePopularProps) {
  return (
    <SinglePopularWrapper>
      <Box className="single_card">
        <Link href={link}>
          <Typography variant="h4" color="initial">
            {title}
          </Typography>
        </Link>

        <Box className="date_box">
          <i>
            <CalenderIcon />
          </i>
          <Typography variant="body1">{date}</Typography>
        </Box>
      </Box>
    </SinglePopularWrapper>
  );
}
