import {
  cardItems,
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
import { useState } from "react";

function ItemsList({ image, product_name, itemCount }: cardItems) {
  const [ItemCount, setitemCount] = useState(itemCount);

  const handleDecrement = () => {
    if (ItemCount !== 1) {
      setitemCount((prev) => prev - 1);
    }
  };
  const handleIncrement = () => {
    setitemCount(ItemCount + 1);
  };
  return (
    <Box className="items_list_item">
      <Box className="img_wrapper">
        <Image src={image} alt="product" width={50} height={64} />
      </Box>
      <Typography variant="body1">{product_name}</Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        className="item_count_wrapper"
      >
        <Button onClick={handleDecrement}><MinusIcon/></Button>
        <Box className="input_wrap">
          <InputFieldCommon value={ItemCount} />
        </Box>
        <Button onClick={handleIncrement}><PlusIconTwo/></Button>
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
      {itemsList.map((item) => ItemsList(item))}
    </CartItemsWrapper>
  );
};

export default ItemsCard;
