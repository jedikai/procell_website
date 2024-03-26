import { useShipmentRate } from "@/hooks/react-qurey/query-hooks/checkoutQuery.hooks";
import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import ButtonLoaderSecondary from "../ButtonLoader/ButtonLoaderSecondary";

const VendorSection = ({ radio_item, props }: any) => {
  console.log("VendorSection", radio_item);

  const [deliveryShipmentRate, setDeliveryShipmentRate] = useState<number>(0);
  const [deliveryShipmentStauts, setDeliveryShipmentStatus] = useState({
    status: false,
    msg: "something went wrong"
  });
  const { mutate: shipmentRate, isLoading } = useShipmentRate();
  const getDeliveryCharge = () => {
    const id = radio_item?.value;
    const formData: FormData = new FormData();
    formData.append("carrier_id", `${id}`);
    shipmentRate(formData, {
      onSuccess: (response: any) => {
        const rate = response ? response?.data?.data?.new_amount_delivery : 0;
        const status = response ? response?.data?.data?.status : false;
        const msg = response
          ? response?.data?.data?.error_message
          : "something went wrong";
        setDeliveryShipmentRate(rate);
        setDeliveryShipmentStatus({
          status,
          msg
        });
      }
    });
  };
  return (
    <>
      <Box className="delivery_option" key={radio_item?.title}>
        <FormControlLabel
          value={radio_item?.value}
          control={
            <Radio
              disableRipple
              icon={<RadioUncheckedIcon />}
              checkedIcon={<RadioCheckedIcon />}
              {...props}
            />
          }
          label={radio_item?.label}
        />
        <Stack spacing={2} className="full-width">
          <Typography variant="h5">{radio_item?.title}</Typography>
          <Typography variant="body1">{radio_item?.content}</Typography>
          {!deliveryShipmentStauts?.status && (
            <Typography variant="body1" color="red">
              {deliveryShipmentStauts?.msg}
            </Typography>
          )}
        </Stack>
        {!!deliveryShipmentRate ? (
          <Typography variant="h5" className="full-width text-end">
            {deliveryShipmentRate}
          </Typography>
        ) : (
          <ButtonLoaderSecondary />
        )}
      </Box>
    </>
  );
};

export default VendorSection;
