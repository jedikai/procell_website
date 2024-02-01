import {
  useAddItem,
  useUpdateItemQuantity
} from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import { CART_LIST, CART_LIST_WITH_AUTHORIZATION } from "@/hooks/react-qurey/query-keys/cartQuery.keys";
import useNotiStack from "@/hooks/useNotistack";
import { ourproductSlider } from "@/interface/ourproductSlider.interfaces";
import { ProductSliderWrapper } from "@/styles/StyledComponents/ProductSliderWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import MinusIcon from "@/ui/Icons/MinusIcon";
import PlusIconTwo from "@/ui/Icons/PlusIcontwo";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQueryClient } from "react-query";

function OurProductSlider({
  OurProductsliderImg,
  productSlidertext,
  productSliderPrice,
  link,
  product_variant_id
}: ourproductSlider) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const [itemCount, setitemCount] = useState(0);
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();
  const { mutate: addItemCart, isLoading } = useAddItem();
  const redirectToDetails = useMemo(() => {
    return `/product/product-details/${link}`;
  }, [link]);
  // const handleDecrement = () => {
  //   if (itemCount !== 1) {
  //     setitemCount((prev) => prev - 1);
  //     updateItemQuantityHandler(itemCount - 1);
  //   } else {
  //     setitemCount((prev) => prev - 1);
  //   }
  // };
  // const handleIncrement = () => {
  //   setitemCount(itemCount + 1);
  //   updateItemQuantityHandler(itemCount + 1);
  // };

  const addToCartHandler = () => {
    const formData: FormData = new FormData();
    formData.append("product_variant_id", `${product_variant_id}`);
    formData.append("add_qty", `1`);
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

  return (
    <ProductSliderWrapper>
      <Box className="productSliderbox">
        <div
          onClick={() => router.push(`/product/product-details/${link}`)}
          style={{ cursor: "pointer" }}
        >
          <figure>
            <img src={OurProductsliderImg} alt="img" width={231} height={305} />
          </figure>
        </div>
        <Box className="slidertitletext">
          <div
            onClick={() => router.push(`/product/product-details/${link}`)}
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h4">{productSlidertext}</Typography>
          </div>

          <Typography variant="body1">$ {productSliderPrice}</Typography>
        </Box>
        {!!product_variant_id && <Button variant="text" onClick={addToCartHandler}>
          Add to Cart
        </Button>}
        {/* {itemCount ? (
          <Box className="quantity_field">
            <Button onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <Box className="input_wrap">
              {" "}
              <InputFieldCommon value={itemCount} />
            </Box>
            <Button onClick={handleIncrement}>
              <PlusIconTwo />
            </Button>
          </Box>
        ) : (
          <Button variant="text" onClick={handleIncrement}>
            Add to Cart
          </Button>
        )} */}
      </Box>
    </ProductSliderWrapper>
  );
}

export default OurProductSlider;
