/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/no-unstable-nested-components */

import { animationURL } from "@/components/AnimationUrl/AnimationUrl";
import CartItemsCard from "@/components/CartItemCard/CartItemsCard";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import PaymentBillDetails from "@/components/PaymentBillDetails/PaymentBillDetails";
import PaymentCardDetailsCard from "@/components/PaymentCardDetails/PaymentCardDetailsCard";
import { useCartList } from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { CartWrapper } from "@/styles/StyledComponents/CartWrapper";
import ArrowLeftIcon from "@/ui/Icons/ArrowLeftIcon";
import { Grid, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, Container, Stack } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
// import animation from "./animation.json";
// const MyLottieAnimation = React.lazy(() => import("@/components/ReactLottiePlayer/ReactLottiePlayer"));

const Cart = () => {
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [cartList, setCartList] = useState([]);
  const onSuccessCartList = (response: any) => {
    console.log("response", response);

    setCartList(
      response && response?.length > 0 && response[0]
        ? response[0].order_line
        : []
    );
    setAmount(
      response && response?.length > 0 && response[0]
        ? response[0].order_line?.reduce(
            (accumulator: any, currentValue: any) =>
              accumulator + currentValue?.price_reduce_taxexcl,
            0
          )
        : 0
    );
  };
  const onErrorCartList = () => {};
  const { data: cardListData, isLoading: cartListloader } = useCartList(
    onSuccessCartList,
    onErrorCartList
  );

  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };
  console.log("cartList", cartList);
  // const [url,setUrl] = useState("")
  // const animationURL =
  //   "https://lottie.host/df01b107-9ab3-44c4-b5e1-863aa2981e99/ePRGrl6wcx.json";

  // console.log(animationURL, "animationURL");
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Shopping cart"
        innerHeaderRediractedPage="Cart"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Shop"
        innnerHeaderMainurl="shop"
      />
      <CartWrapper className="cmn_gap">
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item lg={7.5} xs={12}>
              <Box className="cart_left">
                <Box className="cart_filter">
                  <Link href="/#">
                    <ArrowLeftIcon /> Continue shopping
                  </Link>

                  {/* <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="sort_by"
                  >
                    <Typography variant="body1">Sort by</Typography>
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
                        Price
                      </MenuItem>

                      {CartSortingOptions.map((item) => (
                        <MenuItem key={item} value={item} className="menu_item">
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Stack> */}
                </Box>
                {cartList && cartList?.length > 0 && (
                  <Box className="cart_banner">
                    <Typography variant="body1">
                      You have {cartList?.length} items in your cart
                    </Typography>
                  </Box>
                )}

                <Stack className="cart_items">
                  {!cartListloader && cartList && cartList?.length > 0 ? (
                    cartList.map((item: any) => (
                      <CartItemsCard
                        image={item?.product_image_url ?? ""}
                        name={item?.name_short ?? ""}
                        price={item?.price_reduce_taxexcl ?? ""}
                        quantity={item?.product_uom_qty ?? ""}
                        line_id={item?.id ?? ""}
                        product_id={item?.product_id ? item?.product_id[0] : ""}
                      />
                    ))
                  ) : (
                    <Box className="cart_banner">
                      <Box className="animation">
                        {/* <MyLottieAnimation play /> */}
                        <Lottie
                          loop
                          animationData={animationURL}
                          play
                          style={{ width: "50%", height: "100%" }}
                        />
                      </Box>
                      <Typography variant="body1" className="no_found">
                        You have no items in cart.
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Grid>
            <Grid item lg={4.5} xs={12}>
              <Box className="cart_right">
                {/* <PaymentCardDetailsCard subtotal={3000.0} shipping={20.0} /> */}
                <PaymentBillDetails subtotal={amount} shipping={0} totalAmount={amount}/>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </CartWrapper>
    </Wrapper>
  );
};

export default Cart;
