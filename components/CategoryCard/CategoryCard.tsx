import { CategoryCardProps } from "@/interface/categoryCard.interface";
import { CategoryCardWrapper } from "@/styles/StyledComponents/CategoryCardWrapper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export default memo(function CategoryCard({
  id,
  public_name,
  imgHeight,
  public_image_url,
  imgWidth,
  selectedCategory,
  category
}: any) {
  return (
    <CategoryCardWrapper className="category_card">
      <div
        className={`cat_inner_main ${
          category?.includes(id) ? "active_card" : ""
        }`}
        onClick={() => selectedCategory(id)}
      >
        {!!public_image_url && (
          <Box className="category_image">
            <img
              src={public_image_url}
              width={imgWidth}
              height={imgHeight}
              alt=""
            />
          </Box>
        )}
        {!!public_name && (
          <Typography variant="body1" className="category_name">
            {public_name}
          </Typography>
        )}
      </div>
    </CategoryCardWrapper>
  );
});
