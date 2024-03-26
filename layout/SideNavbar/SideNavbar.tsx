/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */

import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import {
  useProfileDetails,
  useUpdateProfile
} from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
import { useLogout } from "@/hooks/react-qurey/query-hooks/logoutQuery.hooks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import {
  getUserCreationDate,
  refreshProfileImg,
  updatedProfileImg
} from "@/reduxtoolkit/slices/userProfle.slice";
import { SideBarWrapper } from "@/styles/StyledComponents/SideBarWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CertificateIcon from "@/ui/Icons/CertificateIcon";
import EditIcon from "@/ui/Icons/EditIcon";
import LogoutIcon from "@/ui/Icons/LogoutIcon";
import MailBoxIcon from "@/ui/Icons/MailBoxIcon";
import PaymentIcon from "@/ui/Icons/PaymentIcon";
import ProfileIcon from "@/ui/Icons/ProfileIcon";
import SaleIcon from "@/ui/Icons/SaleIcon";
import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import UpdateProfileIcon from "@/ui/Icons/UpdateProfileIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Close from "@mui/icons-material/Close";
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React, { memo, useEffect } from "react";
import { useQueryClient } from "react-query";

export default memo(function SideNavbar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { refresh, image } = useAppSelector((s) => s.userProfileImgSlice);
  const { toastSuccess, toastError } = useNotiStack();
  const sidebarRoutes = [
    {
      name: "Profile",
      icon: (
        <ProfileIcon
          IconColor={
            router?.pathname === "/dashboard/profile"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/profile"
    },
    {
      name: "Certificates",
      icon: (
        <CertificateIcon
          IconColor={
            router?.pathname === "/dashboard/certificates"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/certificates"
    },
    {
      name: "Orders",
      icon: (
        <SaleIcon
          IconColor={
            router?.pathname === "/dashboard/orders"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/orders"
    },
    // {
    //   name: "Sales orders",
    //   icon: (
    //     <SaleIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/sale-order"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/sale-order"
    // },

    // {
    //   name: "Purchase order",
    //   icon: (
    //     <PurchaseIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/purchase-order"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/purchase-order"
    // },
    // {
    //   name: "Tickets",
    //   icon: (
    //     <TicketIcon
    //       IconColor={router?.pathname === "#" ? primaryColors.white : null}
    //     />
    //   ),
    //   pathLink: "#"
    // },
    // {
    //   name: "Invoices & Bills",
    //   icon: (
    //     <BillIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/invoice"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/invoice"
    // },
    {
      name: "Edit Security Settings",
      icon: (
        <EditIcon
          IconColor={
            router?.pathname === "/dashboard/edit-security"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/edit-security"
    },
    {
      name: "Manage Communications",
      icon: (
        <MailBoxIcon
          IconColor={
            router?.pathname === "/dashboard/manage-communications"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/manage-communications"
    },
    // {
    //   name: "Quotations",
    //   icon: (
    //     <QuotationIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/quotation"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/quotation"
    // },

    {
      name: "Manage Payment Methods",
      icon: (
        <PaymentIcon
          IconColor={
            router?.pathname === "/dashboard/payment-methods"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/payment-methods"
    },

    //For Students

    {
      name: "My Profile",
      icon: (
        <ProfileIcon
          IconColor={
            router?.pathname === "/dashboard/profile"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/profile"
    },

    {
      name: "My Clients",
      icon: (
        <ProfileIcon
          IconColor={
            router?.pathname === "/dashboard/my-clients"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/my-clients"
    },

    // {
    //   name: "My Orders",
    //   icon: (
    //     <OrderIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/my-orders"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/my-orders"
    // },

    // {
    //   name: "Certificates",
    //   icon: (
    //     <CertificateIcon
    //       IconColor={
    //         router?.pathname === "/dashboard/student-certfictes"
    //           ? primaryColors.white
    //           : null
    //       }
    //     />
    //   ),
    //   pathLink: "/dashboard/student-certfictes"
    // },
    {
      name: "Manage Addresses",
      icon: (
        <CertificateIcon
          IconColor={
            router?.pathname === "/dashboard/manage-address"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/manage-address"
    },
    {
      name: "Contact your Rep",
      icon: (
        <CertificateIcon
          IconColor={
            router?.pathname === "/dashboard/contact-rep"
              ? primaryColors.white
              : null
          }
        />
      ),
      pathLink: "/dashboard/contact-rep"
    }
  ];
  const practitionerSidebar = sidebarRoutes?.filter(
    (_i: any) => _i?.name != "My Profile"
  );
  const userSidebar = sidebarRoutes?.filter(
    (_i: any) =>
      !(
        _i?.name == "Certificates" ||
        _i?.name == "Profile" ||
        _i?.name == "Contact your Rep" ||
        _i?.name == "My Clients"
      )
  );
  const initialSidebar = sidebarRoutes?.filter(
    (_i: any) =>
      !(
        _i?.name == "Certificates" ||
        _i?.name == "Profile" ||
        _i?.name == "Contact your Rep" ||
        _i?.name == "My Clients" ||
        _i?.name == "My Profile"
      )
  );

  const subNavOne = [
    {
      name: "Manage Addresses",
      pathLink: "/dashboard/manage-address"
    },
    {
      name: "Get Help",
      pathLink: "/dashboard/get-help"
    },
    {
      name: "Manage Communication",
      pathLink: "/dashboard/manage-communications"
    },
    {
      name: "Contact a Rep",
      pathLink: "/dashboard/contact-rep"
    },
    {
      name: "Contact CEO",
      pathLink: "/dashboard/contact-ceo"
    }
  ];
  const handleClose = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.remove("showSidebar");
    document.body.classList.remove("home");
  };
  const [openmod, setopenmod] = React.useState(false);
  const [renderedSec, setRenderedSec] = React.useState(false);
  const [backDropLoader, setBackDropLoader] = React.useState(true);
  const [sideNavBarMenu, setSideNavBarMenu] = React.useState<any>([]);
  const [sideMenuList, setSideMenuList] = React.useState<any>(initialSidebar);
  const [userDetails, setUserDetails] = React.useState<any>({
    short_name: null,
    joining_date: null,
    dp: null
  });
  const [logoutLoader, setLogoutLoader] = React.useState(false);

  const onProfileDetailsSuccess = (response: any) => {
    console.log("first", response);

    const {
      id,
      image_1920_url,
      create_date,
      first_name,
      last_name,
      phone,
      email,
      street,
      street2,
      city,
      zip,
      state_id,
      country_id,
      partner_type
    } = response[0] ?? {};
    console.log("partner_type", partner_type);
    if (partner_type == "practitioner") {
      // const filterRoutes = sidebarRoutes?.filter(
      //   (_i: any) => _i?.name != "My Profile"
      // );
      setSideMenuList(practitionerSidebar);
    } else {
      // const filterRoutes = sidebarRoutes?.filter(
      //   (_i: any) =>
      //     !(
      //       _i?.name == "Certificates" ||
      //       _i?.name == "Profile" ||
      //       _i?.name == "Contact your Rep" ||
      //       _i?.name == "My Clients"
      //     )
      // );
      setSideMenuList(userSidebar);
    }

    setUserDetails({
      short_name: first_name[0] + last_name[0],
      joining_date: new Date(create_date).toLocaleString("en-US", {
        month: "short",
        year: "numeric"
      }),
      dp: image_1920_url
    });
    console.log("sidebarnav", response[0]);
    dispatch(updatedProfileImg(image_1920_url));
    dispatch(getUserCreationDate(`${create_date}`));
    setBackDropLoader(false);
  };
  const onProfileDetailsError = (response: any) => {
    console.log("error", response);
    toastError("Your profile is not authorized, please log in.");
    // router.push("/login");
    setBackDropLoader(false);
  };

  const {
    data: userProfileDetailsData,
    isLoading,
    refetch
  } = useProfileDetails(onProfileDetailsSuccess, onProfileDetailsError);
  const { mutate: updateProfile, isLoading: updateLoader } = useUpdateProfile();
  const { mutate: logout } = useLogout();
  const handleLogin = () => {
    setLogoutLoader(true);
    if (typeof window !== "undefined") {
      // localStorage.removeItem("userName");
      // router.push("/auth/login");

      // if (typeof window !== "undefined") {
      localStorage.removeItem("userDetails");
      destroyCookie(null, "userDetails", { path: "/" });
      // router.push("/auth/login");
      destroyCookie(null, "userDetails", { path: "/" });
      // destroyCookie(null, "session_id", { path: "/" });
      logout(
        {},
        {
          onSuccess: () => {
            localStorage.removeItem("userDetails");
            destroyCookie(null, "userDetails", { path: "/" });
            destroyCookie(null, "session_id", { path: "/" });
            destroyCookie(null, "access_token", { path: "/" });
            router.push("/login");
            setLogoutLoader(false);
          },
          onError: () => {}
        }
      );

      // }
    }
  };
  const handellogout = () => {
    setopenmod(true);
  };
  const close = () => {
    setopenmod(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const userDetailsCookie = getCookie("userDetails");
      // if (!!userDetailsCookie) {
      //   setUserDetails(
      //     userDetailsCookie ? JSON.parse(userDetailsCookie) : null
      //   );
      if (!getCookie("userDetails")) {
        if (!localStorage.getItem("userDetails")) {
          router.push("/login");
        } else {
          const getUserDetails = JSON.parse(
            localStorage.getItem("userDetails") ?? ""
          );
          setCookieClient("access_token", getUserDetails?.cred);
        }
      } else {
        try {
          const getUserDetails = JSON.parse(getCookie("userDetails") ?? "");
          setCookieClient("access_token", getUserDetails?.cred);
        } catch (error) {
          console.error("Error parsing user details:", error);
          router.push("/login");
        }
      }
      if (!getCookie("access_token")) {
        setSideMenuList([]);
      }
      setRenderedSec(!renderedSec);
      refetch();
      // }
    }
  }, []);
  // const timestamp = userDetails ? userDetails?.joined : "";
  // const date = new Date(timestamp);
  // const formattedDate = date.toLocaleString("en-US", {
  //   month: "short",
  //   year: "numeric"
  // });
  const updateProfilePic = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const {
      id,
      image_1920_url,
      create_date,
      first_name,
      last_name,
      phone,
      email,
      street,
      street2,
      city,
      zip,
      state_id,
      country_id
    } = userProfileDetailsData[0] ?? {};
    const formData: FormData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("phone", `${phone}`);
    formData.append("email", email);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("country_id", `${country_id[0]}`);
    formData.append("state_id", `${state_id[0]}`);
    if (zip) {
      formData.append("zip", zip);
    }
    formData.append("image_1920", fileObj);
    updateProfile(formData, {
      onSuccess: (response: any) => {
        refetch();
        dispatch(refreshProfileImg(!refresh));
        // setRefresh(!refresh);
        // queryClient.invalidateQueries(GET_PROFILE_DETAILS);
        toastSuccess(response?.data?.message);
      },
      onError: (response: any) => {
        toastError(response?.response?.data?.message ?? "Somehing went wrong.");
      }
    });
  };

  console.log("getUserDetails side navbar", sideMenuList);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropLoader}
        // onClick={handleClose}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SpinnerLoaderIcon width={150} height={150} fill="#56cfff" />
        </div>
      </Backdrop>
      <SideBarWrapper id="sidebar">
        <IconButton className="close_btn" onClick={handleClose}>
          <Close />
        </IconButton>
        <Box className="sidebar_inner">
          <Box className="sidebar_upper">
            {renderedSec && (
              <>
                {userDetails?.dp && (
                  <i className="avatr_img">
                    <img
                      src={userDetails?.dp ?? assest?.avatr_img}
                      alt="avatr image"
                      width={250}
                      height={250}
                      // key={refresh ? "render" : "no-render"}
                    />
                  </i>
                )}

                {userDetails && userDetails?.short_name && (
                  <Typography variant="h4">
                    {userDetails?.short_name}
                  </Typography>
                )}
                {userDetails?.joining_date && (
                  <Typography>Joined {userDetails?.joining_date}</Typography>
                )}
              </>
            )}

            <Box className="upload_linkWrap">
              {!updateLoader ? (
                <Button type="button" className="upload_link">
                  <UpdateProfileIcon />
                  Upload Profile Picture
                </Button>
              ) : (
                <ButtonLoaderSecondary />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => updateProfilePic(e)}
              />
            </Box>
          </Box>
          <Box className="sidebar_btm">
            <List disablePadding>
              {sideMenuList?.map((route: any) => (
                <ListItem disablePadding key={route?.name}>
                  <Link
                    href={route?.pathLink}
                    className={
                      router?.pathname === route?.pathLink
                        ? "active"
                        : "nav_link"
                    }
                  >
                    <Typography variant="caption">{route?.icon}</Typography>
                    {route?.name}
                  </Link>
                </ListItem>
              ))}
              {/* <ListItem disablePadding>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography variant="caption">
                    <MoreIcon />
                  </Typography>
                  More
                </AccordionSummary>
                <AccordionDetails>
                  <List className="sub_nav">
                    {subNavOne.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <ListItem disablePadding key={index}>
                        <Link
                          href={item.pathLink}
                          className={
                            router?.pathname === item.pathLink ? "active" : ""
                          }
                        >
                          {item.name}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem> */}
              <ListItem>
                <Button className="logoutbtn" onClick={handellogout}>
                  <LogoutIcon
                    IconColor={
                      router?.pathname === "/dashboard/Profile"
                        ? primaryColors.white
                        : null
                    }
                  />
                  <Typography variant="caption">Logout</Typography>
                </Button>
              </ListItem>
            </List>
          </Box>
        </Box>
        <MuiModalWrapper crossDelete open={openmod} onClose={close} title="">
          <Box className="loginModal new_secmdl">
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
                {logoutLoader ? (
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    className="deletebtn"
                  >
                    <ButtonLoader />
                  </CustomButtonPrimary>
                ) : (
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    className="deletebtn"
                    onClick={handleLogin}
                  >
                    <Typography variant="body1">Yes</Typography>
                  </CustomButtonPrimary>
                )}
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
      </SideBarWrapper>
    </>
  );
});
