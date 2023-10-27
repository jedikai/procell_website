/* eslint-disable mui-path-imports/mui-path-imports */
import { SearchComponentWrapper } from "@/styles/StyledComponents/SearchComponentWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import SearchIcon from "@/ui/Icons/SearchIcon";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function SearchComponent({getSearchValue}:any) {
  return (
    <SearchComponentWrapper>
      <Box className="search_wrapper">
        <Typography variant="h3">Search</Typography>
        <form>
          <Box className="form_group">
            <InputFieldCommon adorMentIcon={<SearchIcon />} placeholder="Search Here" onChange={getSearchValue}/>
          
          </Box>
        </form>
      </Box>
    </SearchComponentWrapper>
  );
}
