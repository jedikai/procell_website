import CommonAccordion from "@/components/CommonAccordion/CommonAccordion";
import { myorderList } from "@/json/mock/purcheseorderList.mock";
import { quationselectlList } from "@/json/mock/quationselectlList.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { MyOrdersWrapper } from "@/styles/StyledComponents/MyOrderWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import CopyIcon from "@/ui/Icons/copyIcon";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyOrders() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChanges =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
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
              {myorderList?.map((data, index: number) => (
                <CommonAccordion
                  // eslint-disable-next-line react/no-array-index-key
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
                            alt="productimg"
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
                      <Button>
                        <Typography variant="caption">
                          <CopyIcon />
                        </Typography>
                      </Button>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" className="products">
                      {data.orderListArray.map((item, index) => (
                        <Box className="product_col" key={index}>
                          <Stack
                            className="pr_single"
                            direction="row"
                            flexWrap="wrap"
                            alignItems="center"
                          >
                            <figure>
                              <Image
                                src={item.orderImg}
                                alt=""
                                width={50}
                                height={75}
                              />
                            </figure>
                            <Box className="pr_right">
                              <Typography variant="body1" className="pr_text">
                                {item.name}
                              </Typography>
                              <Typography variant="body1" className="pr_price">
                                {item.price}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </CommonAccordion>
              ))}
            </Box>
          </MyOrdersWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
