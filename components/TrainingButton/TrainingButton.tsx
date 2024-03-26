/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";

const ButtonWrapper = styled(Button)`
  padding: 6px 30px;
  border-radius: 6px;
  background: rgba(84, 55, 149, 0.08);
  p {
    color: ${primaryColors.text_purple};
    font-size: 13px;
    font-weight: 600;
    line-height: 1.7;
    text-transform: capitalize;
    margin: 0;
  }
  &:hover {
    opacity: 0.8;
  }
`;

interface CustomButtonProps extends ButtonProps {
  content: string;
}
export default function TrainingButton({
  content,
  ...props
}: CustomButtonProps) {
  return (
    <ButtonWrapper {...props}>
      <Typography variant="body1">{content}</Typography>
    </ButtonWrapper>
  );
}
