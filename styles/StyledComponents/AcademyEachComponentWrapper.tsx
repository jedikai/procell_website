import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const AcademyEachComponentWrapper = styled(Box)`
  padding: 30px 25px;
  border-radius: 10px;
  background: ${primaryColors?.white};
  box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
  &:not(:last-child) {
    margin-bottom: 30px;
  }
  h4 {
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .progress_wrap {
    margin: 20px 0;
  }
  .MuiContainer-root {
    padding: 0;
  }
  .no_label {
    display: none;
  }
  .blue_para {
    color: ${primaryColors?.primary};
    font-size: 15px;
  }
`;
export const EachLinearComponent = styled(Box, {
  shouldForwardProp: (data) => {
    return data !== "isWrong" && data !== "isRight";
  }
})<{
  isWrong?: boolean;
  isRight?: boolean;
}>`
  position: relative;
  border-radius: 10px;
  padding: 25px 20px;
  ${({ isRight }) =>
    isRight && `border: 1px solid ${primaryColors?.color5BB501};`}
  ${({ isWrong }) =>
    isWrong &&
    `
  border: 1px solid rgba(227, 59, 59, 0.50);
  
  `}
  .right_icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: ${({ isRight }) => (isRight ? "block" : "none")};
  }
  .wrong_icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: ${({ isWrong }) => (isWrong ? "block" : "none")};
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    opacity: 0.12;
    background: linear-gradient(
      117deg,
      ${primaryColors?.text_purple} 0.74%,
      ${primaryColors?.primary} 113.65%
    );
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .wrapper {
    position: relative;
    z-index: 2;
  }
  h5 {
    color: ${primaryColors?.text_purple};
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
  }
  p {
    color: ${primaryColors?.mainFontColor};
    font-size: 15px;
    max-width: 80%;
  }
`;
