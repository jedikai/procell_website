/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable mui-path-imports/mui-path-imports */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

import { DrawerWrapper } from "@/styles/StyledComponents/DrawerWrapper";
import { HeaderWrap } from "@/styles/StyledComponents/HeaderWrapper";
import { MenuWrapperStyle } from "@/styles/StyledComponents/MenuWrapperStyle";
import { primaryColors } from "@/themes/_muiPalette";
import LogoutIcon from "@/ui/Icons/LogoutIcon";
import ProfileIcon from "@/ui/Icons/ProfileIcon";
import CartIcon from "@/ui/Icons/cartIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Badge, Button, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Close from "@mui/icons-material/Close";
import { useLogout } from "@/hooks/react-qurey/query-hooks/logoutQuery.hooks";
import { getCookie } from "@/lib/functions/storage.lib";
import { destroyCookie } from "nookies";
import { useProfileDetails } from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  useCartList,
  useCartListWithAuthCred
} from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getAuthorizationNetCred,
  getUserName
} from "@/reduxtoolkit/slices/userProfle.slice";

// const CustomButton = dynamic(() => import("@/ui/Buttons/CustomButton"));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default React.memo(function Header(props: Props) {
  const navItems = [
    {
      name: "Clinical studies",
      route: "/clinical-studies"
    },
    {
      name: "The science",
      route: "/science"
    },
    {
      name: "Shop",
      route: "/product/shop"
    },
    {
      name: "Contact us",
      route: "/contact"
    },
    {
      name: "Workshops",
      route: "/workshop"
    },
    {
      name: "FAQ",
      route: "/faq"
    },
    {
      name: "Results",
      route: "/results"
    },
    // {
    //   name: "Get Treated",
    //   route: "/get-treated"
    // },
  ];

  const dispatch = useAppDispatch();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cardListData, setCardListData] = React.useState<any>([]);
  const [authenticUser, setAuthenticUser] = React.useState(false);
  const [sessionId, setSessionId] = React.useState("");
  // const { userData, isLoggedIn } = useAppSelector((state) => state.userSlice);
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const { refresh, image } = useAppSelector((s) => s.userProfileImgSlice);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const onSuccessProfileDetails = (response: any) => {
    const { first_name, last_name }: { first_name: string; last_name: string } =
      response && response?.length > 0 ? response[0] : {};
    dispatch(getUserName(`${first_name??''} ${last_name??''}`));
  };
  const { data, isLoading, refetch, isFetched } = useProfileDetails(
    onSuccessProfileDetails,
    () => {},
    true
  );
  // const { data: cardListData, isLoading: cartListloader } = useCartList(
  //   () => { },
  //   () => { }
  // );
  const onAuthorizationCredSuccess = (response: any) => {
    const { data, providers_data }: any = response ?? {};
    // console.log('onAuthorizationCredSuccess', data, providers_data);

    setCardListData(data);
    const authorizationCred: { login_id: string; client_key: string } = {
      login_id: providers_data ? providers_data[0]?.login_id : "",
      client_key: providers_data ? providers_data[0]?.client_key : ""
    };
    dispatch(getAuthorizationNetCred(authorizationCred));
  };
  const { data: authorizationData, isLoading: authorizationloader } =
    useCartListWithAuthCred(onAuthorizationCredSuccess, () => {});
  const { mutate: logout } = useLogout();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   router.push("/login");
  // };

  const handleSidebarShow = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.add("showSidebar");
    document.body.classList.add("home");
  };
  const [openmod, setopenmod] = React.useState(false);
  const handleLogin = () => {
    if (typeof window !== "undefined") {
      setAuthenticUser(false);
      // localStorage.removeItem("userDetails");
      destroyCookie(null, "userDetails", { path: "/" });
      // router.push("/auth/login");
      destroyCookie(null, "userDetails", { path: "/" });
      logout(
        {
          body: {},
          options: {
            headers: {
              Authorization: `Bearer ${sessionId}`
              // Cookie: `frontend_lang=en_US; session_id=${sessionId}`
            }
          }
        },
        {
          onSuccess: () => {
            setAuthenticUser(false);
            // localStorage.removeItem("userDetails");
            destroyCookie(null, "userDetails", { path: "/" });
            router.push("/auth/login");
          },
          onError: () => {}
        }
      );
    }
  };
  const handleLogout = () => {
    setopenmod(true);
  };
  const close = () => {
    setopenmod(false);
  };

  const [user, setUser] = React.useState("");
  React.useMemo(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("userName");
      if (userName) {
        setUser(userName);
      }
    }
  }, [user]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isUserLoggedIn =
        !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
      if (isUserLoggedIn) {
        let getUserDetails: any = {};
        if (!!localStorage.getItem("userDetails")) {
          getUserDetails = JSON.parse(
            localStorage.getItem("userDetails") ?? ""
          );
        } else {
          if (getCookie("userDetails")) {
            try {
              getUserDetails = JSON.parse(getCookie("userDetails") ?? "");
            } catch (error) {
              console.error("Error parsing user details:", error);
            }
          }
          // getUserDetails = JSON.parse(getCookie("userDetails") ?? "");
        }
        // if (getUserDetails && getUserDetails?.cred)
        if (sessionStorage.getItem("session_id")) {
          setAuthenticUser(true);
          setSessionId(getUserDetails?.cred ?? "");
        }
        console.log("getUserDetails", typeof getUserDetails, getUserDetails);

        //  getUserDetails=JSON.parse()
      }
    }
  }, []);

  const userNameString = user; //replace with your string.
  const maxLength = 8; // maximum number of characters to extract

  //trim the string to the maximum length
  // eslint-disable-next-line unused-imports/no-unused-vars
  const trimmedString = userNameString?.substr(0, maxLength);
  const [opencros, setopencros] = React.useState(true);
  const onClose = () => {
    setopencros(!opencros);
  };
  const drawer = (
    <DrawerWrapper>
      <Box
        className="headerDrawer"
        onClick={handleDrawerToggle}
        sx={{ textAlign: "center" }}
      >
        <Link href="/" className="headerLogo">
          <Image src={assest.logo_img} width={250} height={38} alt="Logo" />
        </Link>
        <Divider />
        <List>
          {navItems.map((item: any, index: number) => (
            <ListItem key={index + 1} disablePadding>
              <Link
                href={item?.route}
                key={item.name}
                className={router.pathname === item.route ? "draweractive" : ""}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
        {/* <CustomButtonPrimary
          sx={{ display: { xs: "block",md: "none" } }}
          type="button"
          variant="contained"
          color="primary"
        >
          <Typography>Login</Typography>
        </CustomButtonPrimary> */}
        <Box className="DrawerCloseBtn">
          <IconButton onClick={onClose} autoFocus>
            <Close />
          </IconButton>
        </Box>
      </Box>
    </DrawerWrapper>
  );

  const cartItemsNumber = React.useMemo(() => {
    if (cardListData) {
      return cardListData && cardListData?.length > 0 && cardListData[0]
        ? cardListData[0]?.order_line?.length
        : 0;
    }
  }, [cardListData]);
  // console.log("header ========>", authorizationData);

  return (
    <HeaderWrap sx={{ display: "flex" }} className="main_head">
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        className="headerContainer"
      >
        <Container fixed>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none", sm: "block" } }}
              className="menu_btn"
            >
              <Image src={assest.Menu_icon} alt="menu" height={24} width={24} />
            </IconButton>
            <Link href="/" className="headerLogo">
              <Image src={assest.logo_img} width={122} height={46} alt="Logo" />
            </Link>
            <Box
              sx={{ display: { xs: "none", md: "block" } }}
              className="navbar"
            >
              {user && (
                <Link
                  href="/training-academy"
                  className={
                    router.pathname === "/training-academy" ? "active" : ""
                  }
                >
                  Training acadamy
                </Link>
              )}
              {navItems.map((item: any, index: number) => (
                <Link
                  href={item?.route}
                  key={index + 1}
                  className={router.pathname === item.route ? "active" : ""}
                >
                  {item?.name}
                </Link>
              ))}
            </Box>
            <Box className="hdr_rgt">
              {router.pathname.includes("dashboard") && (
                <IconButton className="menu_btn" onClick={handleSidebarShow}>
                  <Image
                    src={assest.dashboard_icon}
                    alt="dashboard"
                    width={24}
                    height={24}
                  />
                </IconButton>
              )}
              <Box className="cart_icon">
                <Link href="/product/cart">
                  <Badge
                    color="primary"
                    // variant="dot"
                    badgeContent={cartItemsNumber}
                    // invisible={!!cartItemsNumber}
                  >
                    <CartIcon IconHeight="24" IconWidth="24" />
                  </Badge>
                </Link>
              </Box>
              <Box className="login_part">
                {authenticUser ? (
                  <>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="user_btn"
                    >
                      {data && data?.length > 0 && data[0]?.image_1920_url && (
                        // {!!image && (
                        <img
                          src={
                            data ? data[0]?.image_1920_url : assest?.avatr_img
                            // !!image ? image : assest?.avatr_img
                          }
                          alt="image"
                          width={36}
                          height={36}
                          key={refresh ? "render" : "no-render"}
                        />
                      )}
                      {/* <Typography
                        variant="caption"
                        sx={{ display: { xs: "none" } }}
                      >
                        {trimmedString}
                      </Typography> */}
                    </Button>
                    <MenuWrapperStyle
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button"
                      }}
                      className="user_menu"
                    >
                      <MenuItem
                        onClick={() => router.push("/dashboard/profile")}
                      >
                        <ProfileIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </MenuWrapperStyle>
                  </>
                ) : (
                  <CustomButtonPrimary
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/auth/login")}
                    className="login_btn"
                  >
                    <Box
                      sx={{
                        display: { md: "none", sx: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight: "0"
                      }}
                    >
                      <ProfileIcon IconColor={primaryColors.white} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ display: { md: "block", xs: "none" } }}
                    >
                      Login
                    </Typography>
                  </CustomButtonPrimary>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
      <MuiModalWrapper open={openmod} onClose={close} title="">
        <Box className="loginModal">
          <Box className="modalimgWrap">
            <Image
              src={assest.logoutGradient}
              alt={"logout"}
              width={28}
              height={28}
            />
          </Box>

          <Typography variant="h3">
            Are you sure you want to logout from your account?
          </Typography>

          <List disablePadding className="btn_wrapper">
            <ListItem disablePadding>
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                className="deletebtn"
                onClick={handleLogin}
              >
                <Typography variant="body1">Yes</Typography>
              </CustomButtonPrimary>
            </ListItem>
            <ListItem disablePadding>
              <CustomButtonPrimary
                variant="outlined"
                color="info"
                className="gradient_btn"
                onClick={close}
              >
                <Typography variant="body1">No</Typography>
              </CustomButtonPrimary>
            </ListItem>
          </List>
        </Box>
      </MuiModalWrapper>
    </HeaderWrap>
  );
});
