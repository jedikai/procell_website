import { ourproductSlider } from "@/interface/ourproductSlider.interfaces";
import { ProductSliderWrapper } from "@/styles/StyledComponents/ProductSliderWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";

function OurProductSlider({
  OurProductsliderImg,
  productSlidertext,
  productSliderPrice,
  link
}: ourproductSlider) {
  const router = useRouter();
  const redirectToDetails = useMemo(() => {
    return `/product/product-details/${link}`;
  }, [link]);

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
      </Box>
    </ProductSliderWrapper>
  );
}

export default OurProductSlider;
