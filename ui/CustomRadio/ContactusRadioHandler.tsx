import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import RadioCheckedIcon from "../Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "../Icons/RadioUncheckedIcon";
import { ChangeEvent, memo } from "react";

type radioListType = {
  value: string;
  label: string;
  title?: string;
  content?: string;
};

interface CustomRadioProps {
  radioList: radioListType[];
  customlabel?: boolean;
  RadioGroupValue?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default memo(function ContactusRadioHandler({
  radioList,
  customlabel,
  RadioGroupValue,
  ...props
}: CustomRadioProps & RadioProps & RadioGroupProps) {
  return (
    <FormControl className="radio_group">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={RadioGroupValue}
        {...props}
      >
        {customlabel
          ? radioList?.map((radio_item: any) => (
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
              <Stack spacing={2}>
                <Typography variant="h5">{radio_item?.title}</Typography>
                <Typography variant="body1">{radio_item?.content}</Typography>
              </Stack>
            </Box>
          ))
          : radioList?.map((radio_item: any, index: number) => (
            <FormControlLabel
              key={index + 1}
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
})
