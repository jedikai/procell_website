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
import { QuotationWrapper } from "@/styles/StyledComponents/QuotationWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { removeDuplicates } from "common/functions/removeDublicate";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Index() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const [value, setValue] = React.useState("Order Date");
  const [salesList, setSalesList] = React.useState<any>([]);
  const [type, setType] = React.useState("date");
  const [page, setPage] = React.useState(1);
  const onSalesListSuccess = (response: any) => {
    setSalesList(
      removeDuplicates([
        ...salesList,
        ...(response && response?.orders_data ? response?.orders_data : [])
      ])
    );
  };
  const { data, isLoading } = useSalesList(page, type, onSalesListSuccess);

  const handleChange = (event: SelectChangeEvent | any) => {
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
      }
    }
  };
  function formatDateString(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);

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
                <CommonTable>
                  {salesList && salesList?.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography variant="body1">Sales order</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1">Order date</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1">Total</Typography>
                          </TableCell>
                          {/* <TableCell align="center">
                            <Typography variant="body1">Status</Typography>
                          </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesList &&
                          salesList?.length > 0 &&
                          salesList?.map((row: any) => (
                            <TableRow key={row?.id}>
                              <TableCell align="center" scope="row">
                                <Typography variant="body1">
                                  {row?.name}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body1">
                                  {/* {row?.date_order
                                    ?.replaceAll("-", "/")
                                    ?.replaceAll(" ", " - ").split(' - ')[0]} */}
                                  {formatDateString(row?.date_order)}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  variant="body1"
                                  style={{ color: "#848484" }}
                                >
                                  ${row?.amount_total}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  variant="body1"
                                  style={{ color: "#848484" }}
                                >
                                  {/* {loading ? (
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
                                  ) : ( */}
                                    <Chip
                                      icon={<DownloadIcon />}
                                      label="Download"
                                      className="invoice_chip"
                                      // onClick={() => {
                                      //   downloadPdf(props?.id);
                                      // }}
                                    />
                                  {/* )} */}
                                </Typography>
                              </TableCell>

                              {/* <TableCell align="center">
                                <Typography
                                  variant="body1"
                                  className={
                                    row?.order_status === "Delivered"
                                      ? "delivered"
                                      : ""
                                  }
                                >
                                  {row?.order_status}
                                </Typography>
                              </TableCell> */}
                            </TableRow>
                          ))}
                      </TableBody>
                    </>
                  ) : !isLoading ? (
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      There is no sales order
                    </Typography>
                  ) : (
                    <></>
                  )}
                </CommonTable>
                <>
                  {!isLoading ? (
                    <div ref={ref}></div>
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <ButtonLoaderSecondary />
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
