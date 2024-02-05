import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import CommonAccordion from "@/components/CommonAccordion/CommonAccordion";
import { useMyOrderListList } from "@/hooks/react-qurey/query-hooks/myOrdersQuery.hooks";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { MyOrdersWrapper } from "@/styles/StyledComponents/MyOrderWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import CopyIcon from "@/ui/Icons/copyIcon";
import { SelectChangeEvent } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MyOrders() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("?sortby=name");
  const [showEle, setShowEle] = useState(false);
  const [value, setValue] = React.useState("name");
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [productList, setProductList] = useState<any>([]);

  const {
    data: myOrderList,
    isLoading: myOrderLoader,
    refetch
  } = useMyOrderListList(page, sort, (response: any) => {
    const lastPage = response?.page_count ?? 0;
    if (page > lastPage) {
      return false;
    }
    const newListData = response?.orders_data ?? [];
    setProductList([...productList, ...newListData]);
    setShowEle(true);
  });

  // const handleChange = (event: any) => {
  //   setValue(event.target.value);
  // };

  const handleChanges =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const fetchList = (isInview: boolean) => {
    if (isInview && !myOrderLoader) {
      if (myOrderList?.page_count >= page) {
        setPage(page + 1);
      }
    }
  };
  const filterList = useCallback(
    (data: any) => {
      setShowEle(false);
      if (page !== 1) {
        setPage(1);
      }
      const { type, value } = data ?? {};
      if (type == "sort") {
        if (value == "name") {
          setSort("?sortby=name");
        } else if (value == "date") {
          setSort("?sortby=date");
        }
      } else if (value != "") {
        // setSort(`search=${value}`);
      } else {
        setSort(``);
      }
      setProductList([]);
    },
    [sort, page, showEle]
  );
  const handleSortadta = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
    filterList({ type: "sort", value: event.target.value });
  };

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);
  useEffect(() => {
    refetch();
  }, []);
  console.log("myOrderList", page, inView, myOrderList?.page_count);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <MyOrdersWrapper>
            <Box className="purchesorderSection">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="quotationHeader"
              >
                <Typography variant="h4">My orders</Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="quotationshort"
                >
                  <Typography variant="body1">Sort by</Typography>
                  <Box className="orderDataSelect">
                    {/* <CustomSelect
                      IconComponent={(props) => {
                        return (
                          <IconButton {...props}>
                            <DropDownIcon />
                          </IconButton>
                        );
                      }}
                      value={value}
                      onChange={handleChange}
                    >
                      <MenuItem value="" sx={{ display: "none" }}>
                        Order Date
                      </MenuItem>
                      orderDataSelect
                      {quationselectlList.map((item) => (
                        <MenuItem
                          key={item?.name}
                          value={item?.name}
                          className="menu_item"
                        >
                          {item?.name}
                        </MenuItem>
                      ))}
                    </CustomSelect> */}
                    <CustomSelect
                      IconComponent={(props) => {
                        return (
                          <IconButton {...props}>
                            <DropDownIcon IconWidth="18px" IconHeight="15px" />
                          </IconButton>
                        );
                      }}
                      value={value}
                      onChange={handleSortadta}
                    >
                      {/* <MenuItem value="" sx={{ display: "none" }}>
                  Featured
                </MenuItem> */}
                      <MenuItem
                        key={"name"}
                        value={"name"}
                        className="menu_item"
                      >
                        Name
                      </MenuItem>
                      <MenuItem
                        key={"date"}
                        value={"date"}
                        className="menu_item"
                      >
                        {"Date"}
                      </MenuItem>
                    </CustomSelect>
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <Box className="accordionSecionWrapper">
              {!!productList && productList?.length > 0 ? (
                productList?.map((data: any, index: number) => (
                  <CommonAccordion
                    // eslint-disable-next-line react/no-array-index-key
                    key={index + 1}
                    indexNumber={index}
                    handleClick={handleChanges}
                    expand={expanded}
                    accordianHead={
                      <Box className="acr_head">
                        {!!data?.order_lines[0]?.product_image && (
                          <Box className="productimgBoxsection">
                            <figure>
                              <img
                                src={data?.order_lines[0]?.product_image}
                                alt="productimg"
                                width={49}
                                height={70}
                              />
                            </figure>
                          </Box>
                        )}
                        <Box className="productDetails">
                          <Typography variant="h5">{data.name}</Typography>
                          {/* <Box className="orderstausSection">
                          {data.productStatus === "Cancel order" ? (
                            <Link href="/">{data?.productStatus}</Link>
                          ) : (
                            <Typography
                              variant="body1"
                              className={
                                // eslint-disable-next-line no-nested-ternary
                                data.productStatus === "Delivered"
                                  ? "delivered"
                                  : data.productStatus === "Cancelled"
                                  ? "cancelled"
                                  : ""
                              }
                            >
                              {data?.productStatus}
                            </Typography>
                          )}
                        </Box> */}
                        </Box>
                        {!!data?.amount_total && (
                          <Typography className="ProductPrice" variant="body1">
                            $ {data?.amount_total ?? 0}
                          </Typography>
                        )}
                        <Typography variant="body1" className="orderdetails">
                          Order details
                        </Typography>
                      </Box>
                    }
                  >
                    <AccordionDetails className="acr_body">
                      {!!data?.name && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          className="orderidCopy_btn"
                        >
                          <Typography variant="body1">
                            Order ID: #
                            <Typography variant="caption">
                              {data?.name}
                            </Typography>
                          </Typography>
                          <Button>
                            <Typography variant="caption">
                              <CopyIcon />
                            </Typography>
                          </Button>
                        </Stack>
                      )}
                      {!!data && data?.order_lines?.length > 0 && (
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          className="products"
                        >
                          {data?.order_lines.map((item: any, index: number) => (
                            <Box className="product_col" key={index}>
                              <Stack
                                className="pr_single"
                                direction="row"
                                flexWrap="wrap"
                                alignItems="center"
                              >
                                {!!item?.product_image && (
                                  <figure>
                                    <img
                                      src={item?.product_image}
                                      alt=""
                                      width={50}
                                      height={75}
                                    />
                                  </figure>
                                )}
                                <Box className="pr_right">
                                  {!!item?.product_name && (
                                    <Typography
                                      variant="body1"
                                      className="pr_text"
                                    >
                                      {item?.product_name}
                                    </Typography>
                                  )}
                                  {!!item?.price && (
                                    <Typography
                                      variant="body1"
                                      className="pr_price"
                                    >
                                      $ {item?.price}
                                    </Typography>
                                  )}
                                </Box>
                              </Stack>
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </AccordionDetails>
                  </CommonAccordion>
                ))
              ) : !myOrderLoader ? (
                <Typography variant="body1" className="no_pr_text">
                  There is no product
                </Typography>
              ) : (
                <></>
              )}
              {!myOrderLoader ? (
                <div ref={ref} style={{ marginBottom: "50px" }} />
              ) : (
                <ButtonLoaderSecondary />
              )}
            </Box>
          </MyOrdersWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
