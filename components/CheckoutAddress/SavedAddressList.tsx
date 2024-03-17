import { CartItemsWrapper } from "@/styles/StyledComponents/CartItemWrapper";
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Typography
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import AddressModal from "./AddressModal";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useMarkAsDefaultAddress } from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import { useQueryClient } from "react-query";
import useNotiStack from "@/hooks/useNotistack";
import { DELIVERY_ADDRESS_LIST } from "@/hooks/react-qurey/query-keys/checkoutQuery.keys";

const SavedAddressList = ({
  checkoutAddress,
  type = "billing",
  getSelectedAddressId = () => {}
}: any) => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();

  const [checkList, setCheckList] = useState(
    // checkoutAddress ? checkoutAddress?.map((_i: any) => !!_i?.is_selected) : []
    checkoutAddress
      ? checkoutAddress?.map((_i: any) => !!_i?.default_shipping)
      : []
  );
  const [selectedAddress, setSelectedAddress] = useState({});
  const [openmod, setopenmod] = useState(false);
  const [modalType, setModalType] = useState("");

  const { mutate: markAsDefault, isLoading: markAsDefaultLoader } =
    useMarkAsDefaultAddress();

  const handleClose = useCallback(() => {
    setopenmod(!openmod);
  }, [openmod]);
  console.log("checkoutAddress==", checkoutAddress);
  const checkHandler = (e: any, idx: number, id: number | string) => {
    setCheckList(
      checkList.map((_i: any, index: number) => {
        if (idx == index) {
          return e.target.checked;
        }
        return false;
      })
    );
    getSelectedAddressId(id);
  };
  const selectedAddressHandler = (data: any) => {
    setSelectedAddress(data);
    handleClose();
  };

  const markAsDefaultAddress = (id: any) => {
    if (!!id) {
      const formData: FormData = new FormData();
      formData.append("address_id", `${id}`);
      markAsDefault(formData, {
        onSuccess: (response: any) => {
          queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          toastSuccess(
            response?.data?.message ?? "Address is marked as default."
          );
        },
        onError: (error: any) => {
          console.log("eeeeeeeeeeeeeeeeeror", error);

          toastError(
            error?.response?.data?.message ??
              "Something went wrong, please try again later."
          );
        }
      });
    }
  };

  return (
    <>
      {checkoutAddress?.map((_i: any, idx: number) => (
        <CartItemsWrapper>
          <div className="checkout-address" key={idx + 1}>
            <div className="flex-wrap">
              {type == "shipping" && (
                <FormControlLabel
                className="check_control"
                  onChange={(e) => checkHandler(e, idx, _i?.id)}
                  control={<Checkbox checked={checkList[idx]} />}
                  // control={<Checkbox checked={!!_i?.is_selected} />}
                  label=""
                />
              )}
              {type == "shipping" && (
                <>
                  {!(
                    !!_i?.default_shipping || _i?.default_shipping == "true"
                  ) ? (
                    <Box className="btn_wrap">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => markAsDefaultAddress(_i?.id)}
                      >
                        <Typography variant="body1">Mark as Default</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  ) : (
                    <Chip label="Default" />
                  )}
                </>
              )}
              {/* {type == "shipping" && ( */}
              {!!_i?.allow_edit && (
                <>
                  {/* {checkoutAddress?.length > 1 && ( */}
                  <div className="checkout-actions">
                    {/* {!!checkList[idx] && ( */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 26 26"
                      cursor="pointer"
                      onClick={() => selectedAddressHandler(_i)}
                    >
                      <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
                    </svg>
                    {/* )} */}
                  </div>
                  {/* )} */}
                </>
              )}
            </div>
            {!!_i?.name && <h3>{!!_i?.name ? _i?.name : ""}</h3>}
            {!!_i?.email && (
              <p>
                <b>Email : </b>
                {!!_i?.email ? _i?.email : ""}
              </p>
            )}
            {!!_i?.phone && (
              <p>
                <b>Phone number : </b>
                {_i?.phone}
                {/* {_i?.phone?.split(" ")?.length == 1
                  ? _i?.phone?.split(" ")[0]
                  : _i?.phone?.split(" ")[1]} */}
              </p>
            )}
            {!!_i?.street && (
              <p>
                <b>Street 1 : </b>
                {!!_i?.street ? _i?.street : ""}
              </p>
            )}
            {!!_i?.street2 && (
              <p>
                <b>Street 2 : </b>
                {!!_i?.street2 ? _i?.street2 : ""}
              </p>
            )}
            {!!_i?.city && (
              <p>
                <b>City : </b>
                {!!_i?.city ? _i?.city : ""}
              </p>
            )}
            {!!_i?.zip && (
              <p>
                <b>Zip code : </b>
                {!!_i?.zip ? _i?.zip : ""}
              </p>
            )}
            {!!_i?.country_id && _i?.country_id[1] && (
              <p>
                <b>Country : </b>
                {_i?.country_id[1]}
              </p>
            )}
            {!!_i?.state_id && _i?.state_id[1] && (
              <p>
                <b>State/Province : </b>
                {_i?.state_id[1]}
              </p>
            )}
          </div>
        </CartItemsWrapper>
      ))}
      <AddressModal
        open={openmod}
        handleClose={handleClose}
        type={type == "shipping" ? "Shipping address" : "Billing address"}
        selectedAddress={selectedAddress}
      />
    </>
  );
};

export default memo(SavedAddressList);
