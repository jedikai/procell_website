import ProductComponent from "@/components/ProductComponent/ProductComponent";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import { useProductDetails } from "@/hooks/react-qurey/query-hooks/productQuery.hooks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Wrapper from "@/layout/wrapper/Wrapper";
import { getProductVariantId } from "@/reduxtoolkit/slices/userProfle.slice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function index() {
  const dispatch = useAppDispatch();
  const { query, push } = useRouter();
  const { id }: any = query;
  const onSuccessProductDetails = (response: any) => {
    const { product_variant_id }: any =
      response && response?.length > 0 ? response[0] : {};
    if (product_variant_id) {
      dispatch(getProductVariantId(`${product_variant_id[0]}`));
    }
    console.log("onSuccessProductDetails", product_variant_id[0]);
  };
  const { data: productDetails, isLoading } = useProductDetails(
    id,
    onSuccessProductDetails
  );

  return (
    <Wrapper>
      <>
        {!isLoading && productDetails && productDetails.length > 0 && (
          <>
            <ProductComponent productDetails={productDetails[0]} />

            <RelatedProducts productDetails={productDetails[0]} />
          </>
        )}{" "}
      </>
    </Wrapper>
  );
}
