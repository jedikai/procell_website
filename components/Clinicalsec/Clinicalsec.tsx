/* eslint-disable mui-path-imports/mui-path-imports */
import { ClinicalWrapper } from "@/styles/StyledComponents/ClinicalWrapper";
import React, { memo } from "react";
import Container from "@mui/material/Container";
import { clinicalProps } from "@/interface/clinical.interfaces";
import { Box, Typography } from "@mui/material";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

export default memo(function Clinicalsec({
  title,
  adminName,
  paragraph,
  companyName,
  clinical_study_url
}: clinicalProps) {
  return (
    <ClinicalWrapper>
      <Container fixed>
        <Box className="clinic_outr">
          <Typography variant="h3">{title ?? ""}</Typography>
          <Typography variant="h4">by {companyName ?? ""}</Typography>
          <Typography variant="body1">{paragraph ?? ""}</Typography>
          <Typography variant="h6">{adminName ?? ""}</Typography>
          <CustomButtonPrimary
            type="button"
            variant="contained"
            color="primary"
          >
            <Typography
              variant="caption"
              onClick={() => window.open(clinical_study_url ?? "", "_blank")}
            >
              View whitepaper
            </Typography>
          </CustomButtonPrimary>
        </Box>
      </Container>
    </ClinicalWrapper>
  );
});
