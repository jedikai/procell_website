/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
import assest from "@/json/assest";
import { LoginWrapperStyle } from "@/styles/StyledComponents/LoginWrapperStyle";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface LoginWrapperProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}
const LoginWrapper = ({ title, children }: LoginWrapperProps) => {
  return (
    <LoginWrapperStyle>
      <Container fixed>
        <Box className="form_box_wrapper">
          <Box className="form_box">
            {" "}
            <PerfectScrollbar className="perfect_scroll">{children}</PerfectScrollbar>
          </Box>

          <Typography variant="h3" className="card_header">
            {title}
          </Typography>
        </Box>

        <Image
          src={assest.LoginProduct}
          alt="product"
          width={830}
          height={998}
          className="product_image"
        />
      </Container>
    </LoginWrapperStyle>
  );
};

export default LoginWrapper;
