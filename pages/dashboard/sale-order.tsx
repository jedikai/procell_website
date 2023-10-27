/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable mui-path-imports/mui-path-imports */
import CommonTable from "@/components/CommonTable/CommonTable";
import { useSalesList } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { quationselectlList } from "@/json/mock/quationselectlList.mock";

import { salesorderList } from "@/json/mock/salesorderList.mock";
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
import React from "react";

function Index() {
  const [value, setValue] = React.useState("");
  const [salesList, setSalesList] = React.useState([]);
  const [type, setType] = React.useState("");
  const onSalesListSuccess = (response: any) => {
    setSalesList(response ? response?.orders_data : []);
  };
  const { data } = useSalesList(onSalesListSuccess);

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };
  console.log("salesList", salesList);

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
                    Order Date
                  </MenuItem>
                  {quationselectlList.map((item) => (
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
                          {row?.date_order}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {row?.amount_total}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          className={
                            row?.state === "Delivered" ? "delivered" : ""
                          }
                        >
                          {row?.state}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </CommonTable>
            </Box>
          </QuotationWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default Index;
