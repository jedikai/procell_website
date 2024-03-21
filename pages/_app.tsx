import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import EventListeners from "@/components/EventListener/EventListener";
import TrackUser from "@/components/TrackUser/TrackUser";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import { checkLoggedInServer } from "@/reduxtoolkit/slices/userSlice";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { userData } from "@/types/common.type";
import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import ToastifyProvider from "@/ui/toastify/ToastifyProvider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Backdrop } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
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
  // const router = useRouter();

  const [isSessionIdStored, setIsSessionIdStored] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [showTracker, setTracker] = React.useState(false);

  // useEffect(() => {
  //   if (window != undefined) {
  //     setTracker(true);
  //     let getUserDetails: any = {};
  //     if (!!localStorage.getItem("userDetails")) {
  //       getUserDetails = JSON.parse(localStorage.getItem("userDetails") ?? "");
  //     }
  //     if (!!getUserDetails?.cred) {
  //       if (!getCookie("access_token")) {
  //         setCookieClient("access_token", getUserDetails?.cred);
  //       }
  //     }
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!getCookie("access_token")) {
        axiosInstance.get(endpoints.app.create_session_id).then((response) => {
          const { session_id }: any = response ? response?.data?.data : {};
          console.log("onSuccessGetSessionId", session_id);
          setCookieClient("access_token", session_id);
        });
      }
      setRender(true);
    }
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!render}
        // onClick={handleClose}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SpinnerLoaderIcon width={150} height={150} fill="#56cfff" />
        </div>
      </Backdrop>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CacheProvider value={emotionCache}>
              <MuiThemeProvider>
                <CssBaseline />
                <ToastifyProvider>
                  {render ? (
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
                      {/* {chatWidgetScript} */}
                      <EventListeners />
                      {showTracker && <TrackUser />}
                      <Component {...pageProps} />
                    </>
                  ) : (
                    <></>
                  )}
                </ToastifyProvider>
              </MuiThemeProvider>
            </CacheProvider>
          </Hydrate>

          {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
        </QueryClientProvider>
      </Provider>
    </>
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
