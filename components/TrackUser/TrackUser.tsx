import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { memo, useEffect, useMemo } from "react";

const TrackUser = () => {
  const router = useRouter();
  const [loadScript, setLoadScript] = React.useState(false);
  const [trackerIsCalled, setTrackerIsCalled] = React.useState(true);
  const chatWidgetScript = useMemo(() => {
    if (loadScript) {
      return (
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://procelltherapies-staging-11007389.dev.odoo.com/im_livechat/external_lib.css"
            />

            <script
              type="text/javascript"
              src="https://procelltherapies-staging-11007389.dev.odoo.com/im_livechat/external_lib.js"
            ></script>

            <script
              type="text/javascript"
              src="https://procelltherapies-staging-11007389.dev.odoo.com/im_livechat/loader/3"
            ></script>
          </Head>
        </>
      );
    } else {
      return <></>;
    }
  }, [loadScript]);
  useEffect(() => {
    if (window != undefined) {
      const origin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : "";
      const currentPage = localStorage.getItem("current_page") ?? "";
      if (!currentPage) {
        setLoadScript(true);
      }
      if (!trackerIsCalled) {
        console.log("called");

        const formData: FormData = new FormData();
        // formData.append(
        //   "track",
        //   router.pathname.includes("product-details") ? `product` : "page"
        // );
        formData.append(
          "page_name",
          router.pathname.includes("product-details")
            ? "product-details"
            : `${
                !!router.pathname.split("/").at(-1)
                  ? router.pathname.split("/").at(-1)
                  : "Home page"
              }`
        );
        if (router.pathname.includes("product-details")) {
          formData.append(
            "product_tmpl_id",
            `${router.asPath.split("/").at(-2)}`
          );
        }
        formData.append("page_url", `${router.asPath}`);
        // formData.append("base_url", `${origin}`);
        axiosInstance
          .post(endpoints.app.track_user, formData)
          .then((response: any) => {
            localStorage.setItem("current_page", router.asPath);
            setLoadScript(true);
            setTrackerIsCalled(true);
          });
      }
    }
  }, [trackerIsCalled]);
  useEffect(() => {
    const currentPage = localStorage.getItem("current_page") ?? "";
    // if (router.asPath != currentPage) {
    setTrackerIsCalled(false);
    // }
  }, [router]);
  return <></>;
};

export default memo(TrackUser);
