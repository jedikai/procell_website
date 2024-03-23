/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable mui-path-imports/mui-path-imports */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import CommonTable from "@/components/CommonTable/CommonTable";
import { useSalesList } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { salesSelectlList } from "@/json/mock/quationselectlList.mock";

import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import { InvoiceCardWrap } from "@/styles/StyledComponents/InvoiceWrapper";
import { QuotationWrapper } from "@/styles/StyledComponents/QuotationWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import CalendarIconFill from "@/ui/Icons/CalendarIconFill";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  MenuItem,
  SelectChangeEvent,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import axios from "axios";
import { removeDuplicates } from "common/functions/removeDublicate";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Index() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const router = useRouter();
  const [value, setValue] = React.useState("Order Date");
  const [salesList, setSalesList] = React.useState<any>([]);
  const [type, setType] = React.useState("date");
  const [page, setPage] = React.useState(1);
  const [showEle, setShowEle] = React.useState(false);
  const [selectedId, setSelectedId] =  React.useState<any>("");
  const [orderLoader, setOrderLoader] =  React.useState(false);
  const onSalesListSuccess = (response: any) => {
    console.log("response", response, page);

    setSalesList(
      removeDuplicates([
        ...salesList,
        ...(response && response?.orders_data ? response?.orders_data : [])
      ])
    );
    if (response?.orders_data?.length > 0) {
      setShowEle(true);
    }
  };
  const { data, isLoading } = useSalesList(page, type, onSalesListSuccess);

  const handleChange = (event: SelectChangeEvent | any) => {
    setShowEle(false);
    console.log(event.target, "SelectChangeEvent");
    if (event.target.value == "Order Date") {
      setType("date");
    } else if (event.target.value == "Order Name") {
      setType("name");
    } else {
      setType("stage");
    }
    setPage(1);
    setSalesList([]);
    setValue(event.target.value);
  };

  const fetchList = (isInview: boolean) => {
    console.log("isInview", isInview);

    if (isInview && !isLoading) {
      if (data?.page_count > page) {
        setPage(page + 1);
        console.log("called inc");
      }
    }
    setShowEle(false);
  };
  function formatDateString(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${month}/${day}/${year}`;
  }

  const downloadOrderPdf = async (id: any, name: any) => {
    setOrderLoader(true);
    setSelectedId(id);
    // const sessionId = sessionStorage.getItem("session_id") || "";
    const sessionId = getCookie("access_token") || "";
    const pdfDownloadInstance = axios.create({
      baseURL: process.env.NEXT_APP_BASE_URL,
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf"
      },
      params: { session_id: sessionId }
    });
    await pdfDownloadInstance
      .get(`/web/portal/orders/${id}/download`)
      .then((response: any) => {
        setOrderLoader(false);
        setSelectedId("");
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error: any) => {
        setOrderLoader(false);
        setSelectedId("");
        console.error("An error occurred:", error);
      });
  };

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);
  // useEffect(() => {
  //   setPage(1);
  //   console.log("called");
  // }, [router]);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box FixedHeightContainer">
          <div className="Content">
            <QuotationWrapper>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="quotationHeader"
              >
                <Typography variant="h4">Sales order</Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  className="quotationshort"
                >
                  <Typography variant="body1">Sort by</Typography>
                  <CustomSelect
                    value={value}
                    onChange={handleChange}
                    IconComponent={(props) => {
                      return (
                        <IconButton {...props}>
                          <DropDownIcon />
                        </IconButton>
                      );
                    }}
                  >
                    <MenuItem value="" sx={{ display: "none" }}>
                      {value}
                    </MenuItem>
                    {salesSelectlList?.map((item) => (
                      <MenuItem
                        key={item?.name}
                        value={item?.name}
                        className="menu_item"
                      >
                        {item?.name}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Stack>
              </Stack>
              <Box
                className="tableWrapper"
                style={!isLoading ? {} : { paddingBottom: "14px" }}
              >
                {/* <button onClick={() => setPage(page + 1)}>refetch</button> */}
                {/* <CommonTable> */}
                {salesList && salesList?.length > 0 ? (
                  <>
                    {salesList &&
                      salesList?.length > 0 &&
                      salesList?.map((row: any) => (
                        <InvoiceCardWrap direction="row" flexWrap="wrap">
                          <Box className="left_block">
                            {!!row?.product_images &&
                            row?.product_images?.length == 1 ? (
                              <figure>
                                <img
                                  src={
                                    !!row?.product_images &&
                                    row?.product_images?.length > 0
                                      ? row?.product_images[0]
                                      : ""
                                  }
                                  alt="product image"
                                  width={67}
                                  height={90}
                                />
                              </figure>
                            ) : (
                              <AvatarGroup max={3}>
                                {!!row?.product_images &&
                                  row?.product_images?.length > 0 &&
                                  row?.product_images?.map(
                                    (_img: any, indx: number) => (
                                      <Avatar
                                        alt="Remy Sharp"
                                        src={_img}
                                        key={indx + 1}
                                      />
                                    )
                                  )}
                              </AvatarGroup>
                            )}
                            {/* <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src={assest.prd1} />
          <Avatar alt="Travis Howard" src={assest.prd2} />
          <Avatar alt="Cindy Baker" src={assest.prd3} />
          <Avatar alt="Travis Howard" src={assest.prd2} />
          <Avatar alt="Cindy Baker" src={assest.prd3} />
        </AvatarGroup> */}

                            <Box className="product_details">
                              <Typography variant="h5">{row?.name}</Typography>
                              <Typography variant="body1" className="price">
                                ${(row?.amount_total).toFixed(2)}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="rgt_block">
                            <Typography className="order_id">
                              Order ID:{" "}
                              <Typography
                                variant="caption"
                                className="order_idText"
                              >
                                {row?.name}
                              </Typography>
                            </Typography>
                            <Typography variant="body1" className="date">
                              <i className="ico">
                                <CalendarIconFill
                                  IconWidth="13"
                                  IconHeight="13"
                                />
                              </i>

                              {formatDateString(row?.date_order)}
                            </Typography>
                            <List disablePadding>
                              <ListItem disablePadding>
                                {/* {false ? (
                                  <Chip
                                    icon={
                                      <CircularProgress
                                        size={20}
                                        thickness={4}
                                      />
                                    }
                                    label="Downloading invoice"
                                    className="invoice_chip"
                                  />
                                ) : (
                                  <Chip
                                    icon={<DownloadIcon />}
                                    label="Download invoice"
                                    className="invoice_chip"
                                    onClick={() => {
                                      downloadPdf(props?.id);
                                    }}
                                  />
                                )} */}
                                {orderLoader && row?.id == selectedId ? (
                                  <Chip
                                    icon={
                                      <CircularProgress
                                        size={20}
                                        thickness={4}
                                      />
                                    }
                                    label="Download So"
                                    className="invoice_chip"
                                  />
                                ) : (
                                  <Chip
                                    icon={<DownloadIcon />}
                                    label="Download So"
                                    className="invoice_chip"
                                    onClick={() => {
                                      downloadOrderPdf(row?.id, row?.name);
                                    }}
                                  />
                                )}
                              </ListItem>
                              <ListItem disablePadding>
                                <Chip
                                  label={row?.delivery_status}
                                  className="deliver_chip"
                                />
                              </ListItem>
                            </List>
                          </Box>
                        </InvoiceCardWrap>
                      ))}
                  </>
                ) : !isLoading ? (
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    There is no sales order
                  </Typography>
                ) : (
                  <></>
                )}
                {/* </CommonTable> */}
                <>
                  {!isLoading && showEle ? (
                    <div ref={ref}></div>
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      {isLoading ? <ButtonLoaderSecondary /> : <></>}
                    </div>
                  )}
                </>
              </Box>
            </QuotationWrapper>
          </div>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default Index;
