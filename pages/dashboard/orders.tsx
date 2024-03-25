/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import {
  useOrderListSearch,
  useSalesList
} from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDebounce } from "@/hooks/useDebounce";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import { OrderCardWrap } from "@/styles/StyledComponents/OrderCardWrap";
import { OrdersWrapper } from "@/styles/StyledComponents/OrdersWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Index() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const { userCreationDate } = useAppSelector((s) => s.userProfileImgSlice);
  const [value, setValue] = useState<any>("");
  const [yearList, setYearList] = useState<any>([]);
  const [expanded, setExpanded] = useState<string>("");
  const handleChanges = (data: string) => {
    if (expanded === data) {
      setExpanded("");
    } else {
      setExpanded(data);
    }
  };
  const [type, setType] = useState("date");
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState<any>([]);
  const [showEle, setShowEle] = useState(false);
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [userGivenSearchData, setUserGivenSearchData] = useState("");
  const [selectedId, setSelectedId] = useState<any>("");
  const debouncedData = useDebounce(userGivenSearchData, 300);

  const onSalesListSuccess = (response: any) => {
    console.log("show me", response);
    const { orders_data } = response ?? {};
    setOrderList([...orderList, ...orders_data]);
    setShowEle(true);
  };
  const { data, isLoading, refetch } = useSalesList(
    page,
    type,
    onSalesListSuccess
  );
  const { mutate: orderListSearch, isLoading: searchOrderListLoader } =
    useOrderListSearch();

  function generateYearArray(startDate: any) {
    const startYear = new Date(startDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearArray = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearArray.push(year);
    }

    return yearArray;
  }

  const getUserGivenDate = (e: any) => {
    setPage(1);
    setShowEle(false);
    setOrderList([]);
    setValue(e.target.value);
  };
  const getUserGivenSearchData = (e: any) => {
    setPage(1);
    setShowEle(false);
    setOrderList([]);
    setUserGivenSearchData(e.target.value);
  };

  // const handleChanges =
  //   (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //     setExpanded(newExpanded ? panel : false);
  //   };

  // const toggleAcordion =
  //   (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //     setExpanded(newExpanded ? panel : false);
  //     console.log("clicked");
  //   };

  // console.log(expanded, "expanded");

  const fetchList = (isInview: boolean) => {
    console.log("isInview", isInview);

    // if (isInview && !isLoading) {
    if (isInview && !searchOrderListLoader) {
      // if (data?.page_count > page) {
      if (totalPage > page) {
        console.log("came here 3");
        setPage(page + 1);
      }
    }
    setShowEle(false);
  };

  const showAccordian = (item: any) => {
    if (item) {
      if (
        !!item?.invoices &&
        item?.invoices?.length > 0 &&
        item?.invoices[0]?.payments?.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const downloadInvoicePdf = async (id: any, name: any) => {
    setInvoiceLoader(true);
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
      .get(`/web/portal/invoices/${id}/download`)
      .then((response: any) => {
        setInvoiceLoader(false);
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
        setInvoiceLoader(false);
        setSelectedId("");
        console.error("An error occurred:", error);
      });
  };
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
    // if (value == new Date().getFullYear() && !debouncedData) {
    //   refetch();
    // } else {
    //   setOrderList([]);
    if (!!value || !!debouncedData) {
      const formData: FormData = new FormData();
      formData.append("data", `${debouncedData}`);
      formData.append("year", `${value}`);
      formData.append("page", `${page}`);
      orderListSearch(formData, {
        onSuccess: (response: any) => {
          console.log("responseyfyfyf", response?.data?.data?.orders_data);
          console.log("showEle222", orderList);
          setTotalPage(response?.data?.data?.page_count ?? 0);
          const filteredData =
            !!response &&
            !!response?.data?.data?.orders_data &&
            response?.data?.data?.orders_data?.length > 0
              ? response?.data?.data?.orders_data
              : [];
          setOrderList([...orderList, ...filteredData]);
          if (filteredData?.length > 9) {
            setShowEle(true);
          }
        }
      });
    }
    // }
  }, [page, value, debouncedData]);

  useEffect(() => {
    console.log("came here");

    if (inView) {
      console.log("came here 2");
      fetchList(inView);
    }
  }, [inView]);

  useEffect(() => {
    if (userCreationDate) {
      const getYearList = generateYearArray(userCreationDate);
      setYearList(
        !!getYearList && getYearList?.length > 0 ? getYearList.reverse() : []
      );
      setValue(new Date().getFullYear());
    }
  }, [userCreationDate]);

  console.log("showEle", !isLoading && showEle, !isLoading, showEle);
  function formatDateString(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${month}/${day}/${year}`;
  }
  console.log("yearList back", yearList);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <OrdersWrapper>
            <Box className="purchesorderSection">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="quotationHeader"
              >
                <Typography variant="h4">Orders</Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="quotationshort"
                >
                  <Typography variant="body1">Filter by Year</Typography>
                  <Box className="orderDataSelect">
                    <CustomSelect
                      onChange={getUserGivenDate}
                      IconComponent={(props) => {
                        return (
                          <IconButton {...props}>
                            <DropDownIcon IconWidth="18px" IconHeight="15px" />
                          </IconButton>
                        );
                      }}
                      value={value}
                    >
                      {/* <MenuItem value="" sx={{ display: "none" }}>
                  Featured
                </MenuItem> */}
                      {yearList.map((_d: any) => (
                        <MenuItem key={_d} value={_d} className="menu_item">
                          {_d == new Date().getFullYear() ? "This Year" : _d}
                        </MenuItem>
                      ))}
                      {/* <MenuItem key="date" value="date" className="menu_item">
                        2023
                      </MenuItem> */}
                    </CustomSelect>
                  </Box>
                </Stack>
                <Box className="seacrh_box">
                  <SearchComponent
                    noseacrhText
                    placeHolderText="Search Orders"
                    getSearchValue={getUserGivenSearchData}
                  />
                </Box>
              </Stack>
            </Box>
            <Box className="accordionSecionWrapper">
              {!!orderList && orderList?.length > 0 ? (
                orderList?.map((item: any, index: number) => (
                  <>
                    <Accordion
                      expanded={
                        showAccordian(item) && expanded === `panel${index + 1}`
                      }
                    >
                      <AccordionSummary
                        expandIcon={
                          showAccordian(item) ? (
                            <IconButton
                              className="acr_btn"
                              onClick={() => handleChanges(`panel${index + 1}`)}
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          ) : (
                            <></>
                          )
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Box className="acr_head">
                          <OrderCardWrap direction="row" flexWrap="wrap">
                            <Box className="left_block">
                              {!!item?.product_images &&
                              item.product_images?.length == 1 ? (
                                <figure>
                                  <img
                                    src={
                                      !!item.product_images &&
                                      item.product_images?.length > 0
                                        ? !!item.product_images &&
                                          item?.product_images?.length > 0 &&
                                          !!item.product_images[0]
                                          ? item.product_images[0]
                                          : ""
                                        : ""
                                    }
                                    alt="product image"
                                  />
                                </figure>
                              ) : (
                                <AvatarGroup max={3}>
                                  {!!item.order_lines &&
                                    item.product_images?.length > 0 &&
                                    item.product_images?.map(
                                      (img: any, indx: number) => (
                                        <Avatar
                                          alt="Remy Sharp"
                                          src={img}
                                          key={indx + 1}
                                        />
                                      )
                                    )}
                                </AvatarGroup>
                              )}

                              <Box className="product_details">
                                {!!item?.name && (
                                  <Typography variant="h5">
                                    {item?.name}
                                    {!!item?.invoices[0] &&
                                    item?.invoices[0]?.name
                                      ? `/${item?.invoices[0]?.name}`
                                      : ""}
                                  </Typography>
                                )}
                                {!!item?.amount_total && (
                                  <Typography variant="body1" className="price">
                                    {/* ${item?.amount_total} */}$
                                    {!!item?.amount_total &&
                                    typeof item?.amount_total == "string"
                                      ? parseFloat(item?.amount_total).toFixed(
                                          2
                                        )
                                      : item?.amount_total.toFixed(2)}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            <Box className="rgt_block">
                              <Typography className="order_id">
                                Order ID:{" "}
                                {!!item?.name && (
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {item?.name ?? ""}
                                  </Typography>
                                )}
                              </Typography>
                              {!!item?.delivery[0]?.delivered_date && (
                                <Typography className="order_id">
                                  Order Placed:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {formatDateString(
                                      item?.delivery[0]?.delivered_date
                                    )}
                                  </Typography>
                                </Typography>
                              )}
                              {!!item?.delivery[0]?.delivered_date && (
                                <Typography className="order_id">
                                  Delivered On:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {formatDateString(
                                      item?.delivery[0]?.delivered_date
                                    )}
                                  </Typography>
                                </Typography>
                              )}

                              {!!item?.delivery[0]?.carrier_tracking_ref && (
                                <Typography className="order_id">
                                  UPS Tracking:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    <Link
                                      href={
                                        item?.delivery[0]?.carrier_tracking_url
                                          ? item?.delivery[0]
                                              ?.carrier_tracking_url
                                          : "javascript:void(0)"
                                      }
                                    >
                                      {item?.delivery[0]?.carrier_tracking_ref}
                                    </Link>
                                  </Typography>
                                </Typography>
                              )}
                            </Box>
                            <Box className="btm_block">
                              <List disablePadding>
                                <ListItem disablePadding>
                                  {orderLoader && item?.id == selectedId ? (
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
                                        downloadOrderPdf(item?.id, item?.name);
                                      }}
                                    />
                                  )}
                                </ListItem>
                                {!!item?.invoices &&
                                  item?.invoices?.length > 0 && (
                                    <ListItem disablePadding>
                                      {invoiceLoader &&
                                      item?.invoices[0]?.id == selectedId ? (
                                        <Chip
                                          icon={
                                            <CircularProgress
                                              size={20}
                                              thickness={4}
                                            />
                                          }
                                          label="Downloading Invoice"
                                          className="invoice_chip"
                                        />
                                      ) : (
                                        <Chip
                                          icon={<DownloadIcon />}
                                          label="Download Invoice"
                                          className="invoice_chip"
                                          onClick={() => {
                                            downloadInvoicePdf(
                                              item?.invoices[0]?.id,
                                              item?.invoices[0]?.name
                                            );
                                          }}
                                        />
                                      )}
                                    </ListItem>
                                  )}
                                {!!item?.invoices[0]?.payment_state && (
                                  <ListItem disablePadding>
                                    <Chip
                                      label={
                                        item?.invoices[0]?.payment_state ==
                                        "not_paid"
                                          ? "Not Paid"
                                          : item?.invoices[0]?.payment_state
                                      }
                                      className="deliver_chip"
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Box>
                          </OrderCardWrap>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="acr_body">
                          <TableContainer className="acc_table">
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      Amount
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      Create date
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className="valid_until"
                                  >
                                    <Typography variant="body1">
                                      Payment method
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item?.invoices[0]?.payments?.map(
                                  (row: any) => (
                                    <TableRow
                                      key={row?.id}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0
                                        }
                                      }}
                                    >
                                      <TableCell align="center" scope="row">
                                        {!!row?.amount && (
                                          <Typography variant="body1">
                                            {/* ${row?.amount} */}$
                                            {!!row?.amount &&
                                            typeof row?.amount == "string"
                                              ? parseFloat(row?.amount).toFixed(
                                                  2
                                                )
                                              : row?.amount.toFixed(2)}
                                          </Typography>
                                        )}
                                      </TableCell>
                                      <TableCell align="center">
                                        {!!row?.date && (
                                          <Typography variant="body1">
                                            {/* {formatDateString(row?.create_date)} */}
                                            {/* {formatDateString(row?.date)} */}
                                            {row?.date}
                                          </Typography>
                                        )}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        className="valid_until"
                                      >
                                        {!!row?.payment_method && (
                                          <Typography variant="body1">
                                            {row?.payment_method}
                                          </Typography>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    {/* <CommonAccordion
                     
                      key={index + 1}
                      indexNumber={index}
                      onChange={() => null}
                      expandIcon={
                        <ExpandMoreIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log("Clicked");
                            toggleAcordion(`panel${index + 1}`);
                          }}
                        />
                      }
                     
                      handleClick={toggleAcordion}
                     
                      expand={expanded}
                      accordianHead={
                        <Box className="acr_head">
                          <OrderCardWrap direction="row" flexWrap="wrap">
                            <Box className="left_block">
                              {!!item?.product_images &&
                              item.product_images?.length == 1 ? (
                                <figure>
                                  <img
                                    src={
                                      !!item.product_images &&
                                      item.product_images?.length > 0
                                        ? !!item.product_images &&
                                          item?.product_images?.length > 0 &&
                                          !!item.product_images[0]
                                          ? item.product_images[0]
                                          : ""
                                        : ""
                                    }
                                    alt="product image"
                                  />
                                </figure>
                              ) : (
                                <AvatarGroup max={3}>
                                  {!!item.order_lines &&
                                    item.product_images?.length > 0 &&
                                    item.product_images?.map(
                                      (img: any, indx: number) => (
                                        <Avatar
                                          alt="Remy Sharp"
                                          src={img}
                                          key={indx + 1}
                                        />
                                      )
                                    )}
                                </AvatarGroup>
                              )}

                              <Box className="product_details">
                                {!!item?.name && (
                                  <Typography variant="h5">
                                    {item?.name}
                                    {!!item?.invoices[0] &&
                                    item?.invoices[0]?.name
                                      ? `/${item?.invoices[0]?.name}`
                                      : ""}
                                  </Typography>
                                )}
                                {!!item?.amount_total && (
                                  <Typography variant="body1" className="price">
                                   $
                                    {!!item?.amount_total &&
                                    typeof item?.amount_total == "string"
                                      ? parseFloat(item?.amount_total).toFixed(
                                          2
                                        )
                                      : item?.amount_total.toFixed(2)}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            <Box className="rgt_block">
                              <Typography className="order_id">
                                Order ID:{" "}
                                {!!item?.name && (
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {item?.name ?? ""}
                                  </Typography>
                                )}
                              </Typography>
                              {!!item?.delivery[0]?.delivered_date && (
                                <Typography className="order_id">
                                  Order Placed:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {formatDateString(
                                      item?.delivery[0]?.delivered_date
                                    )}
                                  </Typography>
                                </Typography>
                              )}
                              {!!item?.delivery[0]?.delivered_date && (
                                <Typography className="order_id">
                                  Delivered On:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    {formatDateString(
                                      item?.delivery[0]?.delivered_date
                                    )}
                                  </Typography>
                                </Typography>
                              )}

                              {!!item?.delivery[0]?.carrier_tracking_ref && (
                                <Typography className="order_id">
                                  UPS Tracking:
                                  <Typography
                                    variant="caption"
                                    className="order_idText"
                                  >
                                    <Link
                                      href={
                                        item?.delivery[0]?.carrier_tracking_url
                                          ? item?.delivery[0]
                                              ?.carrier_tracking_url
                                          : "javascript:void(0)"
                                      }
                                    >
                                      {item?.delivery[0]?.carrier_tracking_ref}
                                    </Link>
                                  </Typography>
                                </Typography>
                              )}
                            </Box>
                            <Box className="btm_block">
                              <List disablePadding>
                                <ListItem disablePadding>
                                  {orderLoader && item?.id == selectedId ? (
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
                                        downloadOrderPdf(item?.id, item?.name);
                                      }}
                                    />
                                  )}
                                </ListItem>
                                {!!item?.invoices &&
                                  item?.invoices?.length > 0 && (
                                    <ListItem disablePadding>
                                      {invoiceLoader &&
                                      item?.invoices[0]?.id == selectedId ? (
                                        <Chip
                                          icon={
                                            <CircularProgress
                                              size={20}
                                              thickness={4}
                                            />
                                          }
                                          label="Downloading Invoice"
                                          className="invoice_chip"
                                        />
                                      ) : (
                                        <Chip
                                          icon={<DownloadIcon />}
                                          label="Download invoice"
                                          className="invoice_chip"
                                          onClick={() => {
                                            downloadInvoicePdf(
                                              item?.invoices[0]?.id,
                                              item?.invoices[0]?.name
                                            );
                                          }}
                                        />
                                      )}
                                    </ListItem>
                                  )}
                                {!!item?.invoices[0]?.payment_state && (
                                  <ListItem disablePadding>
                                    <Chip
                                      label={item?.invoices[0]?.payment_state}
                                      className="deliver_chip"
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Box>
                          </OrderCardWrap>
                        </Box>
                      }
                    >
                      <AccordionDetails className="acr_body">
                     
                        <TableContainer className="acc_table">
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  <Typography variant="body1">
                                    Amount
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography variant="body1">
                                    Create date
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="valid_until"
                                >
                                  <Typography variant="body1">
                                    Payment method
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            
                              {[1, 2, 3, 4]?.map((row: any) => (
                                <TableRow
                                  key={row?.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0
                                    }
                                  }}
                                >
                                  <TableCell align="center" scope="row">
                                    <Typography variant="body1">
                                     $4000
                                      
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      
                                    24-11-11
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className="valid_until"
                                  >
                                    <Typography variant="body1">
                                     Manual
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        
                      </AccordionDetails>
                    </CommonAccordion> */}
                  </>
                ))
              ) : // ) : !isLoading ? (
              !searchOrderListLoader ? (
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  There is no invoices & bills
                </Typography>
              ) : (
                <></>
              )}
              {/* {!isLoading && showEle ? ( */}
              {!searchOrderListLoader && showEle ? (
                <div ref={ref} style={{ marginBottom: "30px" }} />
              ) : (
                <div style={{ marginTop: "10px" }}>
                  {/* {isLoading ? <ButtonLoaderSecondary /> : <></>} */}
                  {searchOrderListLoader ? <ButtonLoaderSecondary /> : <></>}
                </div>
              )}
            </Box>
          </OrdersWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
