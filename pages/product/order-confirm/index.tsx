/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable react/self-closing-comp */
import assest from "@/json/assest";
import { confirmproductList } from "@/json/mock/orderConfirm.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { OrderconfirmWrapper } from "@/styles/StyledComponents/OrderconfirmWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, List, ListItem, Typography } from "@mui/material";
import Container from "@mui/system/Container/Container";
import Image from "next/image";

import React from "react";

function index() {
  return (
    <Wrapper>
      <Container fixed>
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
            <Image className="pinkWingGradinetbox" src={assest.pinkWindGradinet} alt={"pinkgradient"} width={504} height={589} />
            <Typography variant="body1" className=" userName">
              Hello Alison,
            </Typography>
            <Typography variant="body1" className="description">
              Lorem ipsum dolor sit amet consectetur. Tristique lectus magna
              morbi adipiscing. Ultrices in fringilla sapien iaculis mattis. Sed
              nisl donec turpis blandit praesent. Adipiscing eget nibh arcu
              dignissim in eu nec. At eleifend leo erat integer quis ultricies.
              Platea cum ut sed id dis malesuada. Bibendum lobortis netus
              sollicitudin nullam morbi nec eleifend. Dignissim ornare eget
              tortor lectus varius ultricies habitasse in ipsum. Erat cras.
            </Typography>
            <Box className="orderdetailsStatusWrap">
              <Typography variant="body1">
                Order ID:
                <Typography variant="caption">#4512211100</Typography>
              </Typography>
              <Typography variant="body1">
                Order ID:
                <Typography variant="caption">#4512211100</Typography>
              </Typography>
            </Box>
          </Box>
          <Box className="confirmProductDetials">
            <Image className="pinkWingGradinet" src={assest.pinkWindGradinet} alt={"pinkgradient"} width={504} height={589} />
            <Box className="productSectionListWrap">

              {
                confirmproductList.map((item: any, index: number) => (
                  <Box className="confirmproductWrapper" key={index + 1}>
                    <figure>
                      <Image src={item.productimg} alt={"productimg"} width={58} height={76} />
                    </figure>
                    <Box className="ProductDetailWrap">
                      <Typography variant="body1" className="productname">{item.productName}</Typography>
                      <Typography variant="body1" className="productprice">{item.price}</Typography>
                    </Box>
                  </Box>
                ))
              }
            </Box>
            <List disablePadding className="orderTotalvalue">
              <ListItem disablePadding className="orderPriceWrap">
                <Typography variant="body1" className="product_Price">subtotal</Typography>
                <Typography variant="body1" className="product_priceSection">$3,000.00</Typography>

              </ListItem>
              <ListItem disablePadding className="orderPriceWrap">
                <Typography variant="body1" className="product_Price">shipping</Typography>
                <Typography variant="body1" className="product_priceSection">$20.00</Typography>

              </ListItem>
              <ListItem disablePadding className="orderPriceWrap">
                <Typography variant="body1" className="product_Price">Total ( tax incl.)</Typography>
                <Typography variant="body1" className="product_priceSection">$3020.00</Typography>

              </ListItem>
            </List>
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

export default index;
