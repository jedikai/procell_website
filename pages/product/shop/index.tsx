import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import OurProductsSec from "@/components/OurProductsSec/OurProductsSec";
import { useProductList } from "@/hooks/react-qurey/query-hooks/productQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function index() {
  const oldList = useRef<any>([]);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [showEle, setShowEle] = useState(false);
  const [productList, setProductList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const onSuccessProductList = (data: any) => {
    // setProductList([...data?.products_info]);
    const lastPage = data?.page_count ?? 0;
    if (page > lastPage) {
      return false;
    }
    const newListData = data?.products_info ?? [];
    const newCategoriesListData = data?.category ?? [];
    setProductList([...productList, ...newListData]);
    setCategoriesList([...newCategoriesListData]);
    setShowEle(true);
  };
  const onErrorProductList = () => {};
  const { data, isLoading } = useProductList(
    page,
    sort,
    category,
    onSuccessProductList,
    onErrorProductList
  );
  const fetchList = (isInview: boolean) => {
    console.log("isInview", isInview, data?.page_count, page);

    if (isInview && !isLoading) {
      if (data?.page_count >= page) {
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
      setShowEle(false);
      if (page !== 1) {
        setPage(1);
      }
      const { type, value } = data ?? {};
      const filteredList = [];
      if (type == "sort") {
        if (value == "Name (A-Z)") {
          setSort("order=name+asc");
        } else if (value == "Price - Low to High") {
          setSort("order=list_price+asc");
        } else if (value == "Price - High to Low") {
          setSort("order=list_price+desc");
        } else {
          setSort("");
        }
      } else if (value != "") {
        setSort(`search=${value}`);
      } else {
        setSort(``);
      }
      setProductList([]);
      setCategoriesList([]);
    },
    [sort, page, showEle]
  );
  const selectedCategory = useCallback(
    (_cat: any) => {
      if (_cat) {
        setCategory(`category=${_cat}`);
        setProductList([]);
        // setCategoriesList([]);
      }
    },
    [category]
  );
  console.log(data, "productList");

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Shop"
        innerHeaderRediractedPage="Shop"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      {!isLoading ? (
        <>
          <OurProductsSec
            productList={productList}
            filterList={filterList}
            categoriesList={categoriesList}
            selectedCategory={selectedCategory}
            category={category}
          />
          {showEle && <div ref={ref} />}
        </>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <ButtonLoaderSecondary />
        </div>
      )}
      <>
        {/* {!isLoading && data?.products_info?.length > 0 && <div ref={ref}></div>} */}
      </>
    </Wrapper>
  );
}
