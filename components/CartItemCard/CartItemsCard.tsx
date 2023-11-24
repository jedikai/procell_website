import {
  useDeleteItem,
  useUpdateItemQuantity
} from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import { CART_LIST, CART_LIST_WITH_AUTHORIZATION } from "@/hooks/react-qurey/query-keys/cartQuery.keys";
import { CartItemprops } from "@/interface/cartitem.interfaces";
import { CardItemCardWrapper } from "@/styles/StyledComponents/CartItemCardWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import MinusIcon from "@/ui/Icons/MinusIcon";
import PlusIconTwo from "@/ui/Icons/PlusIcontwo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "react-query";

const CartItemsCard = ({
  image,
  name,
  price,
  quantity = 1,
  line_id,
  product_id
}: CartItemprops) => {
  const queryClient = useQueryClient();
  const [itemCount, setitemCount] = useState(quantity ?? 1);
  const { mutate: deleteItemFromCart } = useDeleteItem();
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();
  const handleDecrement = () => {
    if (itemCount !== 1) {
      setitemCount((prev) => prev - 1);
      updateItemQuantityHandler(itemCount - 1);
    }
  };
  const handleIncrement = () => {
    setitemCount(itemCount + 1);
    updateItemQuantityHandler(itemCount + 1);
  };
  const deleteItem = () => {
    const formData: FormData = new FormData();
    formData.append("product_variant_id", `${product_id}`);
    formData.append("line_id", `${line_id}`);
    formData.append("set_qty", "0");
    deleteItemFromCart(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(CART_LIST);
        queryClient.invalidateQueries(CART_LIST_WITH_AUTHORIZATION);
      },
      onError: (data: any) => {
        console.log("error", data);
      }
    });
  };
  const updateItemQuantityHandler = (quantity: string | number) => {
    const formData: FormData = new FormData();
    formData.append("product_variant_id", `${product_id}`);
    formData.append("line_id", `${line_id}`);
    formData.append("set_qty", `${quantity}`);
    updateItemQuantity(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(CART_LIST);
        queryClient.invalidateQueries(CART_LIST_WITH_AUTHORIZATION);
      },
      onError: (data: any) => {
        console.log("error", data);
      }
    });
  };
  return (
    <CardItemCardWrapper>
      <Box className="cart_item">
        <Box className="img_wrapper">
          <img src={image} alt={name} width={50} height={64} />
        </Box>
        <Typography variant="h4">{name}</Typography>

        <Box className="rgt_sec">
          <Stack
            direction="row"
            justifyContent="flex-start"
            className="item_count_wrapper"
          >
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
          </Stack>
          <Typography variant="body1" className="price">
            $ {price}
          </Typography>

          <Box className="delete_item">
            <Button onClick={deleteItem}>
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </CardItemCardWrapper>
  );
};

export default CartItemsCard;
