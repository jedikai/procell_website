/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable mui-path-imports/mui-path-imports */

import CommonTable from "@/components/CommonTable/CommonTable";
import { useQuotationList } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { quationselectlList } from "@/json/mock/quationselectlList.mock";
// import { quotationList } from "@/json/mock/quotationlist.mock";
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

function Quotation() {
  const [value, setValue] = React.useState("");
  const [quotationList, setQuotationList] = React.useState([]);
  const [type, setType] = React.useState("");
  const onQuotationListSuccess = (response: any) => {
    setQuotationList(response ? response?.quotations_data : []);
  };
  const { data } = useQuotationList(onQuotationListSuccess);

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };
  console.log("data", quotationList);

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
              <Typography variant="h4">Quotation</Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="quotationshort"
              >
                <Typography variant="body1">Sort by</Typography>
                <Box className="orderDataSelect">
                  <CustomSelect
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
                  </CustomSelect>
                </Box>
              </Stack>
            </Stack>
            <Box className="tableWrapper">
              <CommonTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="body1">Quotation</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">Quotation date</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">Valid until</Typography>
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
                  {quotationList?.map((row: any) => (
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
                          {row?.validity_date}
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
                            row?.state === "Accepted"
                              ? "accepted"
                              : row.status === "Expired"
                              ? "expired"
                              : ""
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

export default Quotation;
