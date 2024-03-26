/* eslint-disable no-undef */
import Seo from "@/components/Seo/Seo";
import useOnlineStatus from "@/hooks/useDetectOnline";
import { WrapperStyle } from "@/styles/StyledComponents/WrapperStyle";
import { primaryColors } from "@/themes/_muiPalette";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface wrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = (props: wrapperProps) => {
  const { children } = props;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  // const routerText = router.pathname.split("");
  const routerText = router?.asPath.split("");

  routerText.shift();
  const favText = routerText.join("").toString().toUpperCase();
  const projectName = "Procell";

  useOnlineStatus();

  return (
    <WrapperStyle>
      <Seo
        title={
          router.pathname === "/"
            ? `${projectName}`
            : `${projectName} || ${favText}`
        }
        canonical=""
        description=""
        url=""
        image=""
      />
      <Header />

      <Box className="body_content">{children}</Box>

      <Footer />

      <Backdrop
        sx={{
          color: `${primaryColors?.white}`,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </WrapperStyle>
  );
};

export default Wrapper;
