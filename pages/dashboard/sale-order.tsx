/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable mui-path-imports/mui-path-imports */
import CommonTable from "@/components/CommonTable/CommonTable";
import { useSalesList } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { salesSelectlList } from "@/json/mock/quationselectlList.mock";

import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { QuotationWrapper } from "@/styles/StyledComponents/QuotationWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import {
  Box,
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
    setSalesList([...salesList, ...(response ? response?.orders_data : [])]);
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

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);
  console.log("salesList", page, salesList?.length, data);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
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
            <Box className="tableWrapper">
              {/* <button onClick={() => setPage(page + 1)}>refetch</button> */}
              <CommonTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="body1">Sales order</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">Order date</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">Total</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">Status</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesList?.map((row: any) => (
                    <TableRow key={row?.id}>
                      <TableCell align="center" scope="row">
                        <Typography variant="body1">{row?.name}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1">
                          {row?.date_order
                            ?.replaceAll("-", "/")
                            ?.replaceAll(" ", " - ")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          ${row?.amount_total}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          className={
                            row?.order_status === "Delivered" ? "delivered" : ""
                          }
                        >
                          {row?.order_status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </CommonTable>
              <>{!isLoading && <div ref={ref}></div>}</>
            </Box>
          </QuotationWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default Index;
