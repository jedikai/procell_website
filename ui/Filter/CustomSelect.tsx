/* eslint-disable react/destructuring-assignment */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Select, { SelectProps } from "@mui/material/Select";

const CustomSelectWrapper = styled(Select)`
  &.MuiOutlinedInput-root {
    background-color: ${primaryColors.white};
    padding: 10px 15px;
    width: 100%;
    /* border: 1px solid ${primaryColors.borderprimary}; */
    min-width: 165px;
    border-radius: 5px;
    min-height: 46px;
    border: 1px solid ${primaryColors.borderlight};

    .MuiSelect-select {
      padding: 0;
      /* padding-right: 40px; */
      color: ${primaryColors.black};
      font-size: 16px;
      text-align: left;
      color: ${primaryColors.liteshadowGray};
      font-weight: 400;
      line-height: 1.3;
      letter-spacing: 0.4px;
    }
    .MuiSvgIcon-root {
      display: none;
    }
    fieldset {
      display: none;
    }
    .MuiSelect-icon {
      padding: 0;
      line-height: 0;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
    }
  }
  .menu_item {
    &.MuiMenuItem-root {
      color: ${primaryColors.black};
    }
  }
`;
interface CustomSelectProps extends SelectProps {
  children: React.ReactNode;
}
const CustomSelect = (props: CustomSelectProps) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto"
        // backgroundColor:"#000"
      }
    }
  };

  return (
    <CustomSelectWrapper
      // input={<OutlinedInput />}
      IconComponent={props?.IconComponent}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
      // className={props.className}
      {...props}
      displayEmpty
    >
      {/* {dataset.map((name) => (
        <MenuItem key={name} value={name} className="menu_item">
          {name}
        </MenuItem>
      ))} */}
      {props.children}
    </CustomSelectWrapper>
  );
};

export default CustomSelect;
