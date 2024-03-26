/* eslint-disable mui-path-imports/mui-path-imports */
import { searchComponentProps } from "@/interface/seacrhComponent.interface";
import { SearchComponentWrapper } from "@/styles/StyledComponents/SearchComponentWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import SearchIcon from "@/ui/Icons/SearchIcon";
import { Box, Typography } from "@mui/material";
import { memo } from "react";

export default memo(
  ({ getSearchValue, placeHolderText, noseacrhText,value }: searchComponentProps) => {
    return (
      <SearchComponentWrapper>
        <Box className="search_wrapper">
          {!noseacrhText && <Typography variant="h3">Search</Typography>}

          <Box className="form_group">
            <InputFieldCommon
            value={value}
              adorMentIcon={<SearchIcon />}
              placeholder={placeHolderText || "Search Here"}
              onChange={getSearchValue}
              autoComplete="off"
              type="text"
            />
          </Box>
        </Box>
      </SearchComponentWrapper>
    );
  }
);
