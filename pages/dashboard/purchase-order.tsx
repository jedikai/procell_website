/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable mui-path-imports/mui-path-imports */

import CommonAccordion from "@/components/CommonAccordion/CommonAccordion";
import PurchesorderStatusBar from "@/components/PurchesOrderStatusBar/PurchesorderStatusBar";
import { usePurchaseList } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { purcheseorderList } from "@/json/mock/purcheseorderList.mock";
import { quationselectlList } from "@/json/mock/quationselectlList.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { PurchaseOrderWrapper } from "@/styles/StyledComponents/PurchaseOrderWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import CopyIcon from "@/ui/Icons/copyIcon";
import {
  AccordionDetails,
  Box,
  Button,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import React from "react";

function PurchaseOrder() {
  const [value, setValue] = React.useState("");
  const { data } = usePurchaseList();
  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChanges =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const copyOrderId = (orderId: string | number) => {
    navigator.clipboard.writeText(`${orderId}`);
  };
  console.log("data", data);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <PurchaseOrderWrapper>
            <Box className="purchesorderSection">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="quotationHeader"
              >
                <Typography variant="h4">Purchase order</Typography>
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
            </Box>
            <Box className="accordionSecionWrapper">
              {purcheseorderList?.map((data, index: number) => (
                <CommonAccordion
                  key={index + 1}
                  indexNumber={index}
                  handleClick={handleChanges}
                  expand={expanded}
                  accordianHead={
                    <Box className="acr_head">
                      <Box className="productimgBoxsection">
                        <figure>
                          <Image
                            src={data?.productimg}
                            alt={"productimg"}
                            width={49}
                            height={70}
                          />
                        </figure>
                      </Box>
                      <Box className="productDetails">
                        <Typography variant="h5">{data.productname}</Typography>
                        <Box className="orderstausSection">
                          {data.productStatus === "Cancel order" ? (
                            <Link href="/">{data?.productStatus}</Link>
                          ) : (
                            <Typography
                              variant="body1"
                              className={
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
                        </Box>
                      </Box>
                      <Typography className="ProductPrice" variant="body1">
                        {data.productPrice}
                      </Typography>
                      <Typography variant="body1" className="orderdetails">
                        Order details
                      </Typography>
                    </Box>
                  }
                >
                  <AccordionDetails className="acr_body">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="orderidCopy_btn"
                    >
                      <Typography variant="body1">
                        Order ID: #
                        <Typography variant="caption">
                          {data?.orderid}
                        </Typography>
                      </Typography>
                      <Button onClick={() => copyOrderId(data?.orderid ?? "")}>
                        <Typography variant="caption">
                          <CopyIcon />
                        </Typography>
                      </Button>
                    </Stack>
                    <PurchesorderStatusBar />
                  </AccordionDetails>
                </CommonAccordion>
              ))}
            </Box>
          </PurchaseOrderWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default PurchaseOrder;
