/* eslint-disable import/order */
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductLeft from "../ProductLeft/ProductLeft";
import ProductRgt from "../ProductRgt/ProductRgt";
import { productDetails } from "@/json/mock/product.mock";
import { ProductWrap } from "@/styles/StyledComponents/ProductWrap";

export default function ProductComponent({ productDetails }: any) {
  console.log("productDetails", productDetails);
  const {
    website_description,
    id,
    list_price,
    name,
    product_images,
    product_variant_id
  } = productDetails ?? {};
  return (
    <ProductWrap>
      <Container fixed>
        <Box className="product_wrap">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 2, lg: 4.2 }}
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <ProductLeft image={product_images ?? ""} />
            </Grid>
            <Grid item md={6} xs={12}>
              <ProductRgt
                id={product_variant_id ? product_variant_id[0] : ""}
                heading={name ?? ""}
                para={website_description ?? ""}
                price={list_price ?? ""}
                image={product_images ?? ""}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ProductWrap>
  );
}
