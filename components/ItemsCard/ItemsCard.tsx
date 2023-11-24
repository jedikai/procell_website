import { useUpdateItemQuantity } from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import {
  cardItems,
  cardItemsApiResponse,
  cardItemsProps
} from "@/interface/cartItemsprops.interface";
import { CartItemsWrapper } from "@/styles/StyledComponents/CartItemWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import MinusIcon from "@/ui/Icons/MinusIcon";

import PlusIconTwo from "@/ui/Icons/PlusIcontwo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

// function ItemsList({
//   id,
//   product_id,
//   product_image_url,
//   name_short,
//   product_uom_qty,
//   price_reduce_taxexcl
// }: cardItemsApiResponse) {
function ItemsList({ item }: any) {
  const { id,
    product_id,
    product_image_url,
    name_short,
    product_uom_qty,
    price_reduce_taxexcl } = item ?? {}
  const [ItemCount, setItemCount] = useState(0);
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();
  const handleDecrement = () => {
    if (ItemCount !== 1) {
      setItemCount((prev: number) => prev - 1);
      updateItemQuantityHandler(ItemCount - 1);
    }
  };
  const handleIncrement = () => {
    setItemCount(ItemCount + 1);
    updateItemQuantityHandler(ItemCount + 1);
  };
  const updateItemQuantityHandler = (quantity: string | number) => {
    const formData: FormData = new FormData();
    formData.append("product_variant_id", `${product_id[0]}`);
    formData.append("line_id", `${id}`);
    formData.append("set_qty", `${quantity}`);
    updateItemQuantity(formData);
  };
  useEffect(() => {
    if (!!product_uom_qty) {
      setItemCount(product_uom_qty);
    }
  }, [product_uom_qty]);
  return (
    <Box className="items_list_item">
      <Box className="img_wrapper">
        <img src={product_image_url} alt="product" width={50} height={64} />
      </Box>
      <Typography variant="body1">{name_short}</Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        className="item_count_wrapper"
      >
        <Button onClick={handleDecrement}>
          <MinusIcon />
        </Button>
        <Box className="input_wrap">
          <InputFieldCommon value={ItemCount} />
        </Box>
        <Button onClick={handleIncrement}>
          <PlusIconTwo />
        </Button>
      </Stack>
    </Box>
  );
}
const ItemsCard = ({ itemsList }: cardItemsProps) => {
  return (
    <CartItemsWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="card_header"
      >
        <Typography variant="body1">Items</Typography>
      </Stack>
      {itemsList && itemsList?.length > 0 ? (
        itemsList?.map((item: any, index) => <ItemsList item={item} key={index + 1}/>)
      ) : (
        <Typography variant="body1">
          There is no item s in your cart.
        </Typography>
      )}
    </CartItemsWrapper>
  );
};

export default memo(ItemsCard);
