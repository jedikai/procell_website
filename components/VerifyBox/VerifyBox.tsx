import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const VerifyBoxStyled = styled(Box)`
  background: ${primaryColors.white};
  padding: 30px;
  border-radius: 10px;

  box-shadow: 0px 12px 37px -2px rgba(0, 0, 0, 0.1);
  @media (max-width: 599px) {
    padding: 30px 15px;
  }
`;

export default function VerifyBox({ children }: { children: JSX.Element }) {
  return <VerifyBoxStyled>{children}</VerifyBoxStyled>;
}
