/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable mui-path-imports/mui-path-imports */
import { cardTypeProps } from "@/interface/cardType.interfaces";
import { CardTypewrapper } from "@/styles/StyledComponents/CardTypewrapper";
import Checkicon from "@/ui/Icons/Checkicon";
import { Box, Checkbox } from "@mui/material";
import Image from "next/image";
import React from "react";

function CardType({
  cardimg,
  cardImgWidth,
  cardImgHeight,
  isSelected,
  click = (data:string) => {}
}: cardTypeProps) {
  return (
    <CardTypewrapper>
      <Box className="cardtypeCheckbox" onClick={()=>click(cardimg)}>
        <Checkbox className="check" disableRipple checked={isSelected} />
        <Box className="cardtypeCheckboxWrap">
          <Image
            className="cardtypeimg"
            src={cardimg}
            alt={"cardtype"}
            width={cardImgWidth}
            height={cardImgHeight}
          />
          <figure className="checkicon">
            <Checkicon />
          </figure>
        </Box>
      </Box>
    </CardTypewrapper>
  );
}

export default CardType;
