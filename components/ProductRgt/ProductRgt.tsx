/* eslint-disable mui-path-imports/mui-path-imports */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useAddItem } from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import {
  CART_LIST,
  CART_LIST_WITH_AUTHORIZATION
} from "@/hooks/react-qurey/query-keys/cartQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import { productProps } from "@/interface/productDetails.interfaces";
import { ProductRgtWrap } from "@/styles/StyledComponents/ProductRgtWrap";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MinusIcon from "@/ui/Icons/MinusIcon";
import PlusIconTwo from "@/ui/Icons/PlusIcontwo";
import { List, ListItem } from "@mui/material";
import parse from "html-react-parser";
import { useQueryClient } from "react-query";

import FacebookIcon from "@/ui/Icons/FacebookIcon";
import Mail2Icon from "@/ui/Icons/Mail2Icon";
import PinrestIcon from "@/ui/Icons/PinrestIcon";
import TwitterIcon from "@/ui/Icons/TwitterIcon";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton
} from "react-share";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

export default function ProductRgt(props: productProps) {
  const queryClient = useQueryClient();
  const { heading, price, para, id, image }: any = props;
  const { toastSuccess, toastError } = useNotiStack();
  const [num, setNum] = useState(1);
  const [pageUrl, setPageUrl] = useState("");
  const [cartList, setCartList] = useState<any>([]);
  const { mutate: addItemCart, isLoading } = useAddItem();
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
        console.log(data, "onSuccess");
        queryClient.invalidateQueries(CART_LIST);
        queryClient.invalidateQueries(CART_LIST_WITH_AUTHORIZATION);
        toastSuccess(data?.data?.message ?? "Your item has been added.");
      },
      onError: (data: any) => {
        console.log(data, "error");

        toastError(data?.response?.data?.message ?? "Something went wrong.");
      }
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);
  // console.log("pathname", window.location.href);

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
              <ListItem disablePadding>
                <TwitterShareButton
                  url={pageUrl}
                  // title={title}
                  // className="shareBtn col-md-1 col-sm-1 col-xs-1"
                >
                  <TwitterIcon IconWidth="18" IconHeight="18" />
                </TwitterShareButton>
              </ListItem>
              <ListItem disablePadding>
                <FacebookShareButton
                  url={pageUrl}
                  // title={title}
                  // className="shareBtn col-md-1 col-sm-1 col-xs-1"
                >
                  <FacebookIcon IconWidth="21" IconHeight="21" />
                </FacebookShareButton>
              </ListItem>
              <ListItem disablePadding>
                <PinterestShareButton
                  media={image}
                  url={pageUrl}
                  // title={title}
                  // className="shareBtn col-md-1 col-sm-1 col-xs-1"
                >
                  <PinrestIcon />
                </PinterestShareButton>
              </ListItem>
              <ListItem disablePadding>
                <EmailShareButton
                  url={pageUrl}
                  // title={title}
                  // className="shareBtn col-md-1 col-sm-1 col-xs-1"
                >
                  <Mail2Icon />
                </EmailShareButton>
              </ListItem>
              {/* {social_links2.map((data) => (
                <ListItem disablePadding>
                  {" "}
                  <Link href={data.path}>{data.logo}</Link>{" "}
                </ListItem>
              ))} */}
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
            {!isLoading ? (
              <CustomButtonPrimary
                type="button"
                variant="contained"
                color="primary"
                className="cart_btn"
                onClick={addToCart}
              >
                <Typography>Add to cart</Typography>
              </CustomButtonPrimary>
            ) : (
              <CustomButtonPrimary
                type="button"
                variant="contained"
                color="primary"
                className="cart_btn"
              >
                <ButtonLoader />
              </CustomButtonPrimary>
            )}
          </Box>
        </Box>
      </Box>
    </ProductRgtWrap>
  );
}
