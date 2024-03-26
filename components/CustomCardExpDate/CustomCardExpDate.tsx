import { CustomCardExpDateWrapper } from "@/styles/StyledComponents/CustomCardExpDateWrapper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { memo } from "react";

const CustomCardExpDate = ({ value, getExpDate = () => {} }: any) => {
  return (
    <CustomCardExpDateWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          views={["month", "year"]}
          format="MM/YY"
          // name="month"
          onChange={(newValue: any) => getExpDate(newValue)}
        />
      </LocalizationProvider>
    </CustomCardExpDateWrapper>
  );
};

export default memo(CustomCardExpDate);
