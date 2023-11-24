import BlogDeailsMain from "@/components/BlogDeailsMain/BlogDeailsMain";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import MoreBlogs from "@/components/MoreBlogs/MoreBlogs";
import {
  useBlogCount,
  useRelatedBlogList
} from "@/hooks/react-qurey/query-hooks/blogsQuery.hooks";
import { useScienceBlogDetails } from "@/hooks/react-qurey/query-hooks/scienceQuery.hooks";
import assest from "@/json/assest";
import {
  blogContetentsData,
  topDetailsData
} from "@/json/mock/blogDetailsMainData";
import { moreblogList } from "@/json/mock/moreBlogs";
import Wrapper from "@/layout/wrapper/Wrapper";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Index() {
  const { push, query } = useRouter();
  const [blogDetailsData, setBlogDetailsData] = useState({});
  const [blogCountEnable, setBlogCountEnable] = useState(false);
  const [relatedBlogListData, setRelatedBlogListData] = useState([]);
  const { id }: any = query;
  const onSuccessBlogDetails = (response: any) => {
    // console.log("useBlogDetails", response);
    setBlogDetailsData(response[0] ?? {});
    setBlogCountEnable(true);
  };
  const onErrorBlogDetails = (response: any) => {};
  const { data, isLoading } = useScienceBlogDetails(
    id,
    !!id,
    onSuccessBlogDetails,
    onErrorBlogDetails
  );
  const { data: blog_count_data, isLoading: blog_count_loader } = useBlogCount(
    id,
    blogCountEnable
  );
  const onSuccessRelatedBlogList = (response: any) => {
    // console.log("useBlogDetails", response);
    setRelatedBlogListData(response ?? []);
  };
  const onErrorRelatedBlogList = (response: any) => {};
  const { data: related_blog_list, isLoading: related_blog_loader } =
    useRelatedBlogList(
      id,
      !!id,
      onSuccessRelatedBlogList,
      onErrorRelatedBlogList
    );
  console.log("blogCountEnable", blog_count_data);
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="The science"
        innerHeaderRediractedPage="The science"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <BlogDeailsMain
        blogDetailsData={blogDetailsData}
        topDetails={topDetailsData}
        blogContents={blogContetentsData}
      />
      <MoreBlogs
        moreBlogsData={moreblogList}
        relatedBlogListData={relatedBlogListData}
      />
    </Wrapper>
  );
}
