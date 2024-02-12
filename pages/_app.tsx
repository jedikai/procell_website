import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { getCookie } from "@/lib/functions/storage.lib";
import { checkLoggedInServer } from "@/reduxtoolkit/slices/userSlice";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { userData } from "@/types/common.type";
import ToastifyProvider from "@/ui/toastify/ToastifyProvider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";
import nookies from "nookies";
import React, { useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {};
  }
}

const queryClient = new QueryClient();

export interface CustomAppProps extends AppProps {
  user?: userData | null;
  hasToken?: boolean;

  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
export default function CustomApp({
  Component,
  pageProps,
  hasToken,
  user,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();

  store.dispatch(checkLoggedInServer({ hasToken, user }));
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn =
      !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
    console.log("APP_isUserLoggedIn", isUserLoggedIn);
    if (!isUserLoggedIn) {
      let isSessionIdAvailable = !!sessionStorage.getItem("session_id");
      if (!isSessionIdAvailable) {
        axiosInstance.get(endpoints.app.create_session_id).then((response) => {
          const { session_id }: any = response ? response?.data?.data : {};
          console.log("onSuccessGetSessionId", session_id);
          sessionStorage.setItem("session_id", session_id);
        });
      }
    }
  }, []);
  useEffect(() => {
    if (window != undefined) {
      const origin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : "";
      const currentPage = localStorage.getItem("current_page") ?? "";
      if (router.asPath != currentPage) {
        const formData: FormData = new FormData();
        formData.append(
          "track",
          router.pathname.includes("product-details") ? `product` : "page"
        );
        formData.append(
          "page_name",
          router.pathname.includes("product-details")
            ? "product-details"
            : `${router.pathname.split("/").at(-1)}`
        );
        formData.append("page_url", `${router.asPath}`);
        formData.append("base_url", `${origin}`);
        axiosInstance
          .post(endpoints.app.track_user, formData)
          .then((response: any) => {
            localStorage.setItem("current_page", router.asPath);
          });
      }
    }
  }, [router]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <MuiThemeProvider>
              <CssBaseline />
              <ToastifyProvider>
                <>
                  <EventListeners />
                  <Component {...pageProps} />
                </>
              </ToastifyProvider>
            </MuiThemeProvider>
          </CacheProvider>
        </Hydrate>

        {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
      </QueryClientProvider>
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });
  // const { data } = await client.query({
  //   query: CURRENT_USER_QUERY,
  // });
  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };
  const cookies = nookies.get(context.ctx);

  let hasToken = false;
  let user = null;

  if (cookies?.token?.length) {
    hasToken = true;
  }

  if (cookies?.user?.length) {
    user = JSON.parse(cookies?.user);
  }

  return { ...appProps, hasToken, user };
};
