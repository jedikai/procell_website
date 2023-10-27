import ProductComponent from "@/components/ProductComponent/ProductComponent";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import { useProductDetails } from "@/hooks/react-qurey/query-hooks/productQuery.hooks";
import Wrapper from "@/layout/wrapper/Wrapper";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const { query, push } = useRouter();
  const { id }: any = query;
  const { data: productDetails, isLoading } = useProductDetails(id);
  // console.log("productDetails", productDetails);
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
