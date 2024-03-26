/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/self-closing-comp */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import { useOrderConfirm } from "@/hooks/react-qurey/query-hooks/paymentQuery.hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { OrderconfirmWrapper } from "@/styles/StyledComponents/OrderconfirmWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FaliureIcon from "@/ui/Icons/FaliureIcon";
import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import {
  Alert,
  AlertColor,
  Backdrop,
  Box,
  List,
  ListItem,
  Typography
} from "@mui/material";
import Container from "@mui/system/Container/Container";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const { userName }: any = useAppSelector(
    (state) => state.userProfileImgSlice
  );
  const [enable, setEnable] = useState(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
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
        order_line,
        message_color
      }: any =
        response && response?.data && response?.data?.length > 0
          ? response?.data[0]
          : {};
      setOrderItemList(order_line && order_line?.length > 0 ? order_line : []);
      setOrderPrices({
        name: `${name}`,
        amount_total: `${amount_total}`,
        amount_tax: `${amount_tax}`,
        amount_untaxed: `${amount_untaxed}`,
        amount_delivery: `${amount_delivery}`
      });
      setEnable(false);
      setSeverity(message_color ?? "");
    },
    (error: any) => {
      const redirectionLink = error?.response?.data?.data?.redirect ?? "";
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
          </div>
        </Backdrop>
        <OrderconfirmWrapper>
          <Box className="confirmstatus">
            {severity == "success" && (
              <Box className="icon_wrap">
                <Image
                  src={assest.success_modal_img}
                  alt="success"
                  width={123}
                  height={127}
                />
              </Box>
            )}
            {severity == "error" && (
              <Box className="icon_wrap">
                <i className="error_icon">
                  <FaliureIcon IconColor="#e76767" />
                </i>
              </Box>
            )}
            <Typography variant="h4">
              Order {severity == "success" ? "confirmed" : "failed"}
            </Typography>
          </Box>
          {severity != "error" && (
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
                Your online payment has been authorized. Thank you for your
                order.
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
          )}
          <Box className="confirmProductDetials">
            {data && data?.message && !!severity && (
              <Alert
                // variant="filled"
                severity={severity}
                style={{ marginBottom: "10px" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data?.html_message ?? "" }}
                />
              </Alert>
            )}
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
                {orderPrices?.amount_delivery && (
                  <ListItem disablePadding className="orderPriceWrap">
                    <Typography variant="body1" className="product_Price">
                      shipping
                    </Typography>
                    <Typography
                      variant="body1"
                      className="product_priceSection"
                    >
                      ${orderPrices?.amount_delivery}
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
