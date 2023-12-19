import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import CheckoutAddress from "@/components/CheckoutAddress/CheckoutAddress";
import DeliveryMethodList from "@/components/DeliveryMethod/DeliveryMethodList";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import ItemsCard from "@/components/ItemsCard/ItemsCard";
import PaymentCardDetailsCard from "@/components/PaymentCardDetails/PaymentCardDetailsCard";
import { useCartList } from "@/hooks/react-qurey/query-hooks/cartQuery.hooks";
import {
  useDeliveryMethodsList,
  useShipmentRate,
  useUpdateDeleveryMode
} from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { CheckoutWrapper } from "@/styles/StyledComponents/CheckoutWrapper";
import { CheckOutAddressWrap } from "@/styles/StyledComponents/ChekOutAddressWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomRadio from "@/ui/CustomRadio/CustomRadio";
import DeliveryVendorRaioHandler from "@/ui/CustomRadio/DeliveryVendorRaioHandler";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Checkout = () => {
  const getIdRef = useRef(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [cartList, setCartList] = useState([]);
  const [isSelectVendorEnable, setIsSelectVendorEnable] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    totalAmount: 0,
    deliveryCharge: 0,
    itemsTotal: 0
  });
  const [scrollCount, setScrollCount] = useState<number>(0);
  const [amount, setAmount] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [selectedShippingId, setSelectedShippingId] = useState<any>(null);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);
  const [deliveryShipmentRate, setDeliveryShipmentRate] = useState<
    number | null
  >(null);
  const onSuccessCartList = (response: any) => {
    setCartList(
      response && response?.length > 0 && response[0]
        ? response[0].order_line
        : []
    );
    // setAmount(
    //   response && response?.length > 0 && response[0]
    //     ? response[0].order_line?.reduce(
    //         (accumulator: any, currentValue: any) =>
    //           accumulator + currentValue?.price_reduce_taxexcl,
    //         0
    //       )
    //     : 0
    // );
  };
  const onErrorCartList = () => {};
  const { data: cardListData, isLoading: cartListloader } = useCartList(
    onSuccessCartList,
    onErrorCartList
  );
  const onSuccessDeliveryMedhodsList = (response: any) => {
    const modifiedList = response
      ? response?.map((_item: any) => {
          return {
            value: _item?.id,
            label: "",
            title: _item?.name,
            content: `${_item?.website_description}`
          };
        })
      : [];
    setDeliveryMethodList(modifiedList);
  };
  const onErrorDeliveryMedhodsList = () => {};
  const {
    data: deliveryMedhodsListData,
    isLoading: deliveryMedhodsListloader
  } = useDeliveryMethodsList(
    onSuccessDeliveryMedhodsList,
    onErrorDeliveryMedhodsList
  );
  const { mutate: shipmentRate, isLoading } = useShipmentRate();
  const { mutate: updateDeliveryMode, isLoading: updateLoader } =
    useUpdateDeleveryMode();
  const getSelectedDeliveryMedhods = (e: any) => {
    const id = e.target.value;
    setSelectedVendor(id);
    getIdRef.current = id;
    const formData: FormData = new FormData();
    formData.append("carrier_id", `${id}`);
    // shipmentRate(formData, {
    //   onSuccess: (response: any) => {
    //     const rate = response ? response?.data?.data?.new_amount_delivery : 0;
    //     setDeliveryShipmentRate(rate);
    //   }
    // });
    updateDeliveryMode(formData, {
      onSuccess: (response: any) => {
        setShowPaymentSection(true);
        if (response) {
          const { new_amount_total, new_amount_delivery, new_amount_untaxed } =
            response?.data?.data ?? {};
          setCheckoutDetails({
            totalAmount: new_amount_total,
            deliveryCharge: new_amount_delivery,
            itemsTotal: new_amount_untaxed
          });
          if (targetRef.current) {
            targetRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center"
            });
          }
        }

        console.log("updatedDeliveryMode", response?.data?.data);
      }
    });
  };
  const updateBilling = useCallback(() => {
    const formData: FormData = new FormData();
    formData.append("carrier_id", `${getIdRef.current}`);
    updateDeliveryMode(formData, {
      onSuccess: (response: any) => {
        if (response) {
          const { new_amount_total, new_amount_delivery, new_amount_untaxed } =
            response?.data?.data ?? {};
          setCheckoutDetails({
            totalAmount: new_amount_total,
            deliveryCharge: new_amount_delivery,
            itemsTotal: new_amount_untaxed
          });
        }

        console.log("updatedDeliveryMode", response?.data?.data);
      }
    });
  }, [checkoutDetails]);
  const vendorSelectionHandler = useCallback(
    (data: any) => {
      const { status, id } = data ?? {};
      setIsSelectVendorEnable(status);
      setSelectedShippingId(id);
    },
    [isSelectVendorEnable]
  );
  useEffect(() => {
    setSelectedVendor(0);
  }, [selectedShippingId]);
  // const getSelectedDeliveryMedhods = (id: number | string) => {
  //   const formData: FormData = new FormData();
  //   formData.append("product_variant_id", `${id}`);
  // };
  console.log("selectedVendor", selectedVendor);

  const handleScroll = () => {
    setScrollCount(window.scrollY);
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollCount]);

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Checkout"
        innerHeaderRediractedPage="Checkout"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Cart"
        innnerHeaderMainurl="cart"
      />

      <CheckoutWrapper className="cmn_gap">
        <Container fixed>
          <CheckOutAddressWrap>
            <Box
              className="billing_adress"
              style={{
                paddingBottom: "0px",
                borderBottom: "0px",
                marginBottom: "0px"
              }}
            >
              <Typography variant="h4" className="form_header">
                Billing address
              </Typography>
            </Box>
          </CheckOutAddressWrap>
          <Grid container spacing={3}>
            <Grid item lg={7.5} xs={12}>
              {/* <---------------------------------------- ADDRESS SECTION ------------------------------------------> */}
              <CheckoutAddress
                vendorSelectionHandler={vendorSelectionHandler}
              />
              {/* <---------------------------------------- CHOOSE METHOD SECTION ------------------------------------------> */}
              {isSelectVendorEnable && (
                <>
                  <Typography variant="h4" className="form_header">
                    Choose a delivery method
                  </Typography>
                  <Box className="delivery_options_wrap">
                    {/* <DeliveryMethodList
                  radioList={deliveryMethodList}
                  customlabel
                  onChange={getSelectedDeliveryMedhods}
                /> */}
                    {!deliveryMedhodsListloader ? (
                      <DeliveryVendorRaioHandler
                        radioList={deliveryMethodList}
                        customlabel
                        onChange={getSelectedDeliveryMedhods}
                        RadioGroupValue={selectedVendor}
                      />
                    ) : (
                      <ButtonLoaderSecondary />
                    )}
                  </Box>
                </>
              )}
            </Grid>
            <Grid item lg={4.5} xs={12}>
              {!isLoading && cartList && (
                <ItemsCard
                  itemsList={cartList ?? []}
                  updateBilling={updateBilling}
                />
              )}
              <div ref={targetRef}></div>
              {showPaymentSection && (
                <PaymentCardDetailsCard
                  subtotal={checkoutDetails?.itemsTotal}
                  shipping={checkoutDetails?.deliveryCharge}
                  totalAmount={checkoutDetails?.totalAmount}
                  loader={updateLoader}
                  showPaymentSection={showPaymentSection}
                />
              )}
            </Grid>
          </Grid>
          {scrollCount >= 480 && (
            <button
              className="scroll_back_to_top_btn"
              onClick={handleScrollToTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height={30}
                width={30}
                fill="white"
              >
                <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
              </svg>
            </button>
          )}
        </Container>
      </CheckoutWrapper>
      {/* <-------------------------------- modal ---------------------------------> */}
      {/* <MuiModalWrapper open={openmod} onClose={handleClose} title="">
        <Box className="checkout_modal">
          <Box className="billing_adress">
            <Typography variant="h4" className="form_header">
              Billing address
            </Typography>
            <Grid container spacing={2} className="billing_adress_grid">
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="First name" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Last name" style3 />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Email" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Phone number" style3 />
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street and number"
                  style3
                  multiline
                  rows={4}
                  maxRows={4}
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <InputFieldCommon
                  placeholder="Street 2"
                  style3
                  rows={4}
                  maxRows={4}
                  multiline
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="City" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="ZIP code" style3 />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="Country" style3 />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <InputFieldCommon placeholder="State/Province" style3 />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox />}
              label="Ship to the same address"
            />
          </Box>
        </Box>
      </MuiModalWrapper> */}
    </Wrapper>
  );
};

export default Checkout;
