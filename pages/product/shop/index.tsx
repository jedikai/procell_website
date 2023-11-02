import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import OurProductsSec from "@/components/OurProductsSec/OurProductsSec";
import { useProductList } from "@/hooks/react-qurey/query-hooks/productQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InView, useInView } from "react-intersection-observer";

export default function index() {
  const oldList = useRef<any>([]);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [productList, setProductList] = useState<any>([]);
  const onSuccessProductList = (data: any) => {
    // setProductList([...data?.products_info]);
    const lastPage = data?.page_count ?? 0;
    if (page > lastPage) {
      return false;
    }
    const newListData = data?.products_info ?? [];
    // console.log("onSuccessProductList", newListData);
    // const modifiedListData = [...productList, ...newListData];

    // const uniqueObjects = new Set();

    // // Filter the array to remove duplicates
    // const filteredArray = modifiedListData.filter((obj) => {
    //   const objString = JSON.stringify(obj);
    //   const isUnique = !uniqueObjects.has(objString);
    //   if (isUnique) {
    //     uniqueObjects.add(objString);
    //   }
    //   return isUnique;
    // });

    // // Convert the Set back to an array
    // let uniqueArray = Array.from(filteredArray);
    // console.log("uniqueArray", uniqueArray);

    // // oldList.current = Array.from(filteredArray);
    // if (sort == "order=name+asc") {
    //   uniqueArray = uniqueArray.sort((a: any, b: any) =>
    //     a?.name.localeCompare(b?.name)
    //   );
    // } else if (sort == "order=list_price+asc") {
    //   uniqueArray = uniqueArray.sort(
    //     (a: any, b: any) => a?.list_price - b?.list_price
    //   );
    // } else if (sort == "order=list_price+desc") {
    //   uniqueArray = uniqueArray.sort(
    //     (a: any, b: any) => b?.list_price - a?.list_price
    //   );
    // } else if (sort.includes("search")) {
    //   setProductList(newListData);
    //   return false;
    // }
    // setProductList(uniqueArray);
    setProductList([...productList, ...newListData]);
  };
  const onErrorProductList = () => {};
  const { data, isLoading } = useProductList(
    page,
    sort,
    onSuccessProductList,
    onErrorProductList
  );
  const fetchList = (isInview: boolean) => {
    console.log("isInview", isInview);

    if (isInview && !isLoading) {
      if (data?.pager?.page_count >= page) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);

  const filterList = useCallback(
    (data: any) => {
      if (page !== 1) {
        setPage(1);
      }
      const { type, value } = data ?? {};
      let filteredList = [];
      if (type == "sort") {
        if (value == "Name (A-Z)") {
          setSort("order=name+asc");
        } else if (value == "Price - Low to High") {
          setSort("order=list_price+asc");
        } else {
          setSort("order=list_price+desc");
        }
      } else {
        if (value != "") {
          setSort(`search=${value}`);
        } else {
          setSort(``);
        }
      }
      setProductList([]);
    },
    [sort, page]
  );
  console.log(data, "useProductList");

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Shop"
        innerHeaderRediractedPage="Shop"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <OurProductsSec productList={productList} filterList={filterList} />
      <>{!isLoading && <div ref={ref}></div>}</>
    </Wrapper>
  );
}
