/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable sort-imports */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
import { ourproductList2 } from "@/json/mock/ourproductLits.mock";
import { searchList } from "@/json/mock/quationselectlList.mock";
import { ProductsWrapper } from "@/styles/StyledComponents/ProductsWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";
import OurProductSlider from "../OurProductSlider/OurProductSlider";
import SearchComponent from "../SearchComponent/SearchComponent";

export default memo(function OurProductsSec({ productList, filterList }: any) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
    filterList({ type: "sort", value: event.target.value });
  };
  console.log("value", value);

  const getSearchValue = (e: any) => {
    filterList({ type: "search", value: e.target.value });
    console.log("searched value", e.target.value);
  };
  return (
    <ProductsWrapper className="cmn_gap">
      <Container fixed>
        <Box className="product_hdr">
          <Typography variant="h3">Our Products</Typography>
          <Box className="product_hdr_rgt">
            <Typography variant="h6">Sort by</Typography>
            <Box className="select-box">
              <CustomSelect
                IconComponent={(props) => {
                  return (
                    <IconButton {...props}>
                      <DropDownIcon IconWidth="18px" IconHeight="15px" />
                    </IconButton>
                  );
                }}
                value={value}
                onChange={handleChange}
              >
                <MenuItem value="" sx={{ display: "none" }}>
                  Featured
                </MenuItem>
                orderDataSelect
                {searchList.map((item) => (
                  <MenuItem
                    key={item?.name}
                    value={item?.name}
                    className="menu_item"
                  >
                    {item?.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>

            <SearchComponent getSearchValue={getSearchValue} />
          </Box>
        </Box>
        <Box className="product_btm">
          <Grid container spacing={{ lg: 4, md: 2, xs: 2 }}>
            {productList?.map((item: any) => (
              <Grid item xs={12} md={4} sm={6}>
                <OurProductSlider
                  OurProductsliderImg={item?.image_1920_url}
                  productSlidertext={item?.name}
                  productSliderPrice={item?.list_price}
                  link={item.id ?? ""}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ProductsWrapper>
  );
});
