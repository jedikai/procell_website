import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { ChangeEvent } from "react";
import VendorSection from "./VendorSection";

type radioListType = {
  value: string;
  label: string;
  title?: string;
  content?: string;
};

interface CustomRadioProps {
  radioList: radioListType[];
  customlabel?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function DeliveryMethodList({
  radioList,
  customlabel,
  ...props
}: CustomRadioProps & RadioProps & RadioGroupProps) {
    
  return (
    <FormControl className="radio_group">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        {...props}
      >
        {customlabel
          ? radioList?.map((radio_item) => (
              <VendorSection radio_item={radio_item} props={props} />
            ))
          : radioList?.map((radio_item) => (
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
            ))}
      </RadioGroup>
    </FormControl>
  );
}
