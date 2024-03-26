/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable sort-imports */
/* eslint-disable import/order */
/* eslint-disable mui-path-imports/mui-path-imports */
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
import React, { memo, useEffect, useMemo } from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import OurProductSlider from "../OurProductSlider/OurProductSlider";
import SearchComponent from "../SearchComponent/SearchComponent";

const OurProductsSec = ({
  productList,
  filterList,
  categoriesList,
  selectedCategory,
  category,
  handleuserGivenSearch,
  userGivenSearch
}: any) => {
  const [value, setValue] = React.useState("Featured");
  const [updatedCategoryList, setUpdatedCategoryList] =
    React.useState([]);
  const [shortList, setShortList] = React.useState(searchList);

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
    filterList({ type: "sort", value: event.target.value });
    setShortList(searchList.filter((_i: any) => _i?.name != value));
  };
  console.log("productList===>", productList);

  const getSearchValue = (e: any) => {
    // filterList({ type: "search", value: e.target.value });
    handleuserGivenSearch(e.target.value);
    console.log("searched value", e.target.value);
  };
  const shortListHandler: any = useMemo(
    () => searchList.filter((_i: any) => _i?.name != value),
    [value]
  );
  useEffect(() => {
    setUpdatedCategoryList(categoriesList);
  }, [productList]);
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
                {/* <MenuItem value="" sx={{ display: "none" }}>
                  Featured
                </MenuItem> */}
                {searchList?.map((item: any) => (
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

            <SearchComponent
              value={userGivenSearch}
              getSearchValue={getSearchValue}
            />
          </Box>
        </Box>
        <Box className="product_mdl">
          <CategorySlider
            categorySlider={updatedCategoryList}
            selectedCategory={selectedCategory}
            category={category}
          />
        </Box>
        {!!productList && productList?.length > 0 ? (
          <Box className="product_btm">
            <Grid container spacing={{ lg: 4, md: 2, xs: 2 }}>
              {productList?.map((item: any) => (
                <Grid item xs={12} md={4} sm={6} key={item?.id}>
                  <OurProductSlider
                    key={item?.id}
                    OurProductsliderImg={item?.image_1920_url}
                    productSlidertext={item?.name}
                    productSliderPrice={item?.list_price}
                    link={item.id ?? ""}
                    product_variant_id={
                      item?.product_variant_id &&
                      item?.product_variant_id?.length > 0
                        ? item?.product_variant_id[0]
                        : ""
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1" className="no_pr_text">
            There is no product
          </Typography>
        )}
      </Container>
    </ProductsWrapper>
  );
};

export default memo(OurProductsSec);
