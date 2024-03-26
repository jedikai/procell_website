import QuatationDetailsMessage from "@/components/QuatationDetailsMessage/QuatationDetailsMessage";
import assest from "@/json/assest";
import { quotationProductList } from "@/json/mock/quotationProductList.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { QuotaionDetailsSetionWrapper } from "@/styles/StyledComponents/QuotaionDetailsSetionWrapper";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import LocationIcon from "@/ui/Icons/LocationIcon";
import PrintIcon from "@/ui/Icons/PrintIcon";
import SendmessageIcon from "@/ui/Icons/SendMessageIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import Image from "next/image";

function Quotationdetails() {
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <QuotaionDetailsSetionWrapper>
            <Box className="quotationsection">
              <Typography variant="h4" className="quationAddressHeading">
                Quotation S064698
              </Typography>
              <Box className="shippingAddressWrapper">
                <Typography variant="h4">
                  Invoice and Shipping Address
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className="orderDetails"
                  flexWrap="wrap"
                  rowGap={1}
                >
                  <Typography variant="h5">Jody Leon</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="orderdateWrapper"
                  >
                    <Typography variant="body1" className="orderDate">
                      Order Date:
                    </Typography>
                    <Typography variant="body1" className="date">
                      06/05/23
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className="orderLocationWrapper"
                  rowGap={1}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="orderlocation"
                  >
                    <LocationIcon />
                    <Typography variant="body1" className="location">
                      509 Olive Way Suite 1315 Seattle WA 98101 United States
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="orderdateWrapper"
                  >
                    <Typography variant="body1" className="orderDate">
                      Expiration Date:
                    </Typography>
                    <Typography variant="body1" className="date">
                      09/10/23
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box className="pricingDetials">
                <Typography variant="h4" className="pricingHeading">
                  Pricing
                </Typography>
                <Box className="quotationDetailPricingtable">
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <Typography variant="body1">Products</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1">Quantity</Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ width: "120px" }}>
                            <Typography variant="body1">Unit Price</Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ width: "120px" }}>
                            <Typography variant="body1">Taxes</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1">Amount</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quotationProductList.map((row) => (
                          <TableRow key={row.productname}>
                            <TableCell align="left" scope="row">
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                className="productPaymentSeciton"
                              >
                                <figure>
                                  <Image
                                    src={row.productimg}
                                    alt="productimg"
                                    width={43}
                                    height={52}
                                  />
                                </figure>
                                <Typography variant="h4">
                                  {row.productname}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1">
                                {row.quantity}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1">
                                {row.unitprice}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1">
                                {row.taxes}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1" className="productPriceamount">
                                {row.amount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box className="quotationProductTotalvaluewrap">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="productAmountsection"
                    >
                      <Typography variant="body1">Untaxed Amount </Typography>
                      <Typography variant="h5">$210.00</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="producttaxAmountsection"
                    >
                      <Typography variant="body1">Tax Exempt</Typography>
                      <Typography variant="h5">$0.00</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="productTotalAmountsection"
                    >
                      <Typography variant="h5">total</Typography>
                      <Typography variant="h4">$210.00</Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Box className="paymentTermsWrapper">
                <Typography variant="h4">payment Terms</Typography>
                <Typography variant="body1">Immediate payment</Typography>
                <Grid container columnSpacing={2.5} rowSpacing={2.5}>
                  <Grid item lg={3} md={6} xs={6}>
                    <Box className="cardDetails">
                      <Image
                        src={assest.visacard}
                        alt="card"
                        width={70}
                        height={20}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={6} xs={6}>
                    <Box className="cardDetails">
                      <Image
                        src={assest.mastercard}
                        alt="card"
                        width={47}
                        height={37}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={6} xs={6}>
                    <Box className="cardDetails">
                      <Image
                        src={assest.AmericanExpress}
                        alt="card"
                        width={84}
                        height={24}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={6} xs={6}>
                    <Box className="cardDetails">
                      <Image
                        src={assest.discovercard}
                        alt="card"
                        width={87}
                        height={16}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="sellspersonDetails">
                <Stack
                  direction="row"
                  alignItems="center"
                  className="orderidsectionWrapper"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  rowGap={1}
                >
                  <Box className="orderidwrap">
                    <Typography variant="h4">$ 210.00</Typography>
                    <Typography variant="body1">
                      Order ID: #121000152415
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="orderidbuttonWrapper"
                  >
                    <Box className="buttonsection">
                      <Button>
                        <DownloadIcon />
                        <Typography variant="body1">Download</Typography>
                      </Button>
                    </Box>
                    <Box className="printButtonseciton">
                      <Button>
                        <PrintIcon />
                        <Typography variant="body1">Print</Typography>
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
                <Box className="sellspersonSectionWrap">
                  <Typography variant="h4">Sales person</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="sellspersonbox"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    rowGap={1}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="sellspersonsection"
                      justifyContent="space-between"
                    >
                      <figure>
                        <Image
                          src={assest.avatr_img}
                          alt="avatar"
                          width={31}
                          height={31}
                        />
                      </figure>
                      <Box className="selsPersonDetails">
                        <Typography variant="body1" className="userName">
                          Chistiana Freiborg
                        </Typography>
                        <Typography variant="body1" className="usercontact">
                          320-250-0353
                        </Typography>
                      </Box>
                    </Stack>
                    <Box className="buttonsection">
                      <Button>
                        <SendmessageIcon />
                        <Typography variant="body1">Send message</Typography>
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </QuotaionDetailsSetionWrapper>
        </Box>
        <QuatationDetailsMessage
          quatationMessageTitle="History"
          quatationMessagetext="There are no comments for now"
        />
      </DashboardWrapper>
    </Wrapper>
  );
}

export default Quotationdetails;
