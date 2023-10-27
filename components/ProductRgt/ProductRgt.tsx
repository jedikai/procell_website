/* eslint-disable mui-path-imports/mui-path-imports */

import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { productProps } from "@/interface/productDetails.interfaces";
import { ProductRgtWrap } from "@/styles/StyledComponents/ProductRgtWrap";
import { List, ListItem } from "@mui/material";
import { social_links2 } from "@/json/mock/footeritem.mock";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Link from "next/link";
import MinusIcon from "@/ui/Icons/MinusIcon";
import { primaryColors } from "@/themes/_muiPalette";
import PlusIconTwo from "@/ui/Icons/PlusIcontwo";
import parse from "html-react-parser";
import { useAddItem } from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";

export default function ProductRgt(props: productProps) {
  const { heading, price, para, id } = props;
  const { toastSuccess, toastError } = useNotiStack();
  const [num, setNum] = useState(1);
  const { mutate: addItemCart } = useAddItem();
  const incr = () => {
    setNum(num + 1);
  };
  const decr = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      setNum(0);
    }
  };
  const renderDesc = useMemo(
    () =>
      typeof window !== "undefined" ? (
        <Typography variant="body1">{parse(`${para}`)}</Typography>
      ) : (
        <></>
      ),
    []
  );
  const addToCart = () => {
    const formData: FormData = new FormData();
    formData.append("product_variant_id", `${id}`);
    formData.append("add_qty", `${num}`);
    formData.append("force_create", "true");
    addItemCart(formData, {
      onSuccess: (data: any) => {
        toastSuccess(data?.data?.message ?? "Your item has been added.");
      },
      onError: (data: any) => {
        console.log(data, "error");

        toastError(data?.response?.data?.message ?? "Something went wrong.");
      }
    });
  };
  return (
    <ProductRgtWrap>
      <Box className="pro_rgt_outr">
        <Typography variant="h2">{heading}</Typography>
        <Box className="price">
          <Typography variant="body1">$ {price}</Typography>
        </Box>
        <Box className="product_para">
          {renderDesc}
          {/* <Typography variant="body1">{parse(para)}</Typography> */}
        </Box>
        <Box className="social_sec">
          <Box className="social_lft">
            <Typography variant="body1">30-day Money-back</Typography>
            <Typography variant="body1">
              Guarantee Shipping: 2-3 Business Days
            </Typography>
          </Box>
          <Box className="social_rgt">
            <List disablePadding>
              {social_links2.map((data) => (
                <ListItem disablePadding>
                  {" "}
                  <Link href={data.path}>{data.logo}</Link>{" "}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box className="qnty_outr">
          <Typography variant="h4">Quantity:</Typography>

          <Box className="quantity-wrap">
            <Box className="quantity_field">
              <Button onClick={decr}>
                <MinusIcon IconColor={primaryColors.minusgray} IconWidth="11" />
              </Button>
              <Box className="form_control">
                <TextField type="number" value={num} />
              </Box>

              <Button onClick={incr}>
                <PlusIconTwo
                  IconColor={primaryColors.minusgray}
                  IconWidth="11"
                  IconHeight="11"
                />
              </Button>
            </Box>
            <CustomButtonPrimary
              type="button"
              variant="contained"
              color="primary"
              className="cart_btn"
              onClick={addToCart}
            >
              <Typography>Add to cart</Typography>
            </CustomButtonPrimary>
          </Box>
        </Box>
      </Box>
    </ProductRgtWrap>
  );
}
