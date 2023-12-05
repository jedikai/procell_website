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
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomRadio from "@/ui/CustomRadio/CustomRadio";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import React, { useCallback, useRef, useState } from "react";

const Checkout = () => {
  const getIdRef = useRef(null);
  const [cartList, setCartList] = useState([]);
  const [isSelectVendorEnable, setIsSelectVendorEnable] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    totalAmount: 0,
    deliveryCharge: 0,
    itemsTotal: 0
  });
  const [amount, setAmount] = useState(0);
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
    setShowPaymentSection(true);
    const id = e.target.value;
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
    (data: boolean) => setIsSelectVendorEnable(data),
    [isSelectVendorEnable]
  );
  // const getSelectedDeliveryMedhods = (id: number | string) => {
  //   const formData: FormData = new FormData();
  //   formData.append("product_variant_id", `${id}`);
  // };
  // console.log("response", amount, cartList);
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
                    <CustomRadio
                      radioList={deliveryMethodList}
                      customlabel
                      onChange={getSelectedDeliveryMedhods}
                    />
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
              {showPaymentSection && (
                <PaymentCardDetailsCard
                  subtotal={checkoutDetails?.itemsTotal}
                  shipping={checkoutDetails?.deliveryCharge}
                  totalAmount={checkoutDetails?.totalAmount}
                  loader={updateLoader}
                />
              )}
            </Grid>
          </Grid>
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
