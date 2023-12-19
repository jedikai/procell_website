/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/self-closing-comp */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import { useOrderConfirm } from "@/hooks/react-qurey/query-hooks/paymentQuery.hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import assest from "@/json/assest";
import { confirmproductList } from "@/json/mock/orderConfirm.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { OrderconfirmWrapper } from "@/styles/StyledComponents/OrderconfirmWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import { Backdrop, Box, List, ListItem, Typography } from "@mui/material";
import Container from "@mui/system/Container/Container";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const { userName }: any = useAppSelector(
    (state) => state.userProfileImgSlice
  );
  const [enable, setEnable] = useState(false);
  const [orderItemList, setOrderItemList] = useState([]);
  const [orderPrices, setOrderPrices] = useState({
    name: "",
    amount_total: "",
    amount_tax: "",
    amount_untaxed: "",
    amount_delivery: ""
  });
  const { data, isLoading } = useOrderConfirm(
    (response: any) => {
      console.log("response", response);
      const {
        id,
        name,
        amount_total,
        amount_tax,
        amount_untaxed,
        amount_delivery,
        order_line
      }: any = response && response?.length > 0 ? response[0] : {};
      setOrderItemList(order_line && order_line?.length > 0 ? order_line : []);
      setOrderPrices({
        name: `${name}`,
        amount_total: `${amount_total}`,
        amount_tax: `${amount_tax}`,
        amount_untaxed: `${amount_untaxed}`,
        amount_delivery: `${amount_delivery}`
      });
      setEnable(false);
    },
    (error: any) => {
      let redirectionLink = error?.response?.data?.data?.redirect ?? "";
      router.push(redirectionLink);
    },
    enable
  );
  useEffect(() => {
    setEnable(true);
  }, []);

  return (
    <Wrapper>
      <Container fixed>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          // onClick={handleClose}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SpinnerLoaderIcon width={150} height={150} fill="#56cfff" />
            {/* <h1 style={{ color: 'white' }}>Please wait we are proccesing your request.</h1> */}
          </div>
        </Backdrop>
        <OrderconfirmWrapper>
          <Box className="confirmstatus">
            <Box className="icon_wrap">
              <Image
                src={assest.success_modal_img}
                alt="success"
                width={123}
                height={127}
              />
            </Box>
            <Typography variant="h4">Order confirmed</Typography>
          </Box>
          <Box className="userdetails">
            <Image
              className="pinkWingGradinetbox"
              src={assest.pinkWindGradinet}
              alt={"pinkgradient"}
              width={504}
              height={589}
            />
            {!!userName && (
              <Typography variant="body1" className=" userName">
                {userName ?? ""},
              </Typography>
            )}
            <Typography variant="body1" className="description">
              Lorem ipsum dolor sit amet consectetur. Tristique lectus magna
              morbi adipiscing. Ultrices in fringilla sapien iaculis mattis. Sed
              nisl donec turpis blandit praesent. Adipiscing eget nibh arcu
              dignissim in eu nec. At eleifend leo erat integer quis ultricies.
              Platea cum ut sed id dis malesuada. Bibendum lobortis netus
              sollicitudin nullam morbi nec eleifend. Dignissim ornare eget
              tortor lectus varius ultricies habitasse in ipsum. Erat cras.
            </Typography>
            {orderPrices?.name && (
              <Box className="orderdetailsStatusWrap">
                <Typography variant="body1">
                  Order ID:
                  <Typography variant="caption">
                    {orderPrices?.name ?? ""}
                  </Typography>
                </Typography>
              </Box>
            )}
          </Box>
          <Box className="confirmProductDetials">
            <Image
              className="pinkWingGradinet"
              src={assest.pinkWindGradinet}
              alt={"pinkgradient"}
              width={504}
              height={589}
            />
            <Box className="productSectionListWrap">
              {orderItemList && orderItemList?.length > 0 ? (
                orderItemList?.map((item: any, index: number) => (
                  <Box className="confirmproductWrapper" key={index + 1}>
                    <figure>
                      <img
                        src={item?.product_image_url ?? ""}
                        alt={"productimg"}
                        width={58}
                        height={76}
                      />
                    </figure>
                    <Box className="ProductDetailWrap">
                      <Typography variant="body1" className="productname">
                        {item?.name_short ?? ""}
                      </Typography>
                      <Typography variant="body1" className="productprice">
                        ${item?.price_reduce_taxexcl ?? ""}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <ButtonLoaderSecondary />
              )}
            </Box>
            {!isLoading && (
              <List disablePadding className="orderTotalvalue">
                {orderPrices?.amount_untaxed && (
                  <ListItem disablePadding className="orderPriceWrap">
                    <Typography variant="body1" className="product_Price">
                      subtotal
                    </Typography>
                    <Typography
                      variant="body1"
                      className="product_priceSection"
                    >
                      ${orderPrices?.amount_untaxed}
                    </Typography>
                  </ListItem>
                )}
                {orderPrices?.amount_tax && (
                  <ListItem disablePadding className="orderPriceWrap">
                    <Typography variant="body1" className="product_Price">
                      shipping
                    </Typography>
                    <Typography
                      variant="body1"
                      className="product_priceSection"
                    >
                      ${orderPrices?.amount_tax}
                    </Typography>
                  </ListItem>
                )}
                {orderPrices?.amount_total && (
                  <ListItem disablePadding className="orderPriceWrap">
                    <Typography variant="body1" className="product_Price">
                      Total ( tax incl.)
                    </Typography>
                    <Typography
                      variant="body1"
                      className="product_priceSection"
                    >
                      ${orderPrices?.amount_total}
                    </Typography>
                  </ListItem>
                )}
              </List>
            )}
          </Box>
          <Box className="confirmProductbutton">
            <CustomButtonPrimary
              type="button"
              variant="contained"
              color="primary"
              href="/product/shop/"
            >
              <Typography>Continue shopping</Typography>
            </CustomButtonPrimary>
          </Box>
        </OrderconfirmWrapper>
      </Container>
    </Wrapper>
  );
}

export default Index;
