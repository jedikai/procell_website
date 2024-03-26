import CommonAccordion from "@/components/CommonAccordion/CommonAccordion";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { useFAQList } from "@/hooks/react-qurey/query-hooks/faqQuary.hooks";
import assest from "@/json/assest";
import { faqData } from "@/json/mock/faqData.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { FaqWrapper } from "@/styles/StyledComponents/FaqWrapper";

import AccordionDetails from "@mui/material/AccordionDetails";

import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import React from "react";

function Index() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { data: faqList, isLoading } = useFAQList();
  console.log("useFAQList", faqList);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Frequently asked questions"
        innerHeaderRediractedPage="FAQ"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <FaqWrapper className="cmn_gap eclispe_effct">
        <Container fixed>
          {!isLoading && faqList && faqList?.length > 0 && (
            <Box className="accordion_sec">
              {faqList?.map((data: any, index: number) => (
                <CommonAccordion
                  key={index + 1}
                  indexNumber={index}
                  handleClick={handleChange}
                  expand={expanded}
                  accordianHead={
                    <Typography variant="body1">{data?.question}</Typography>
                  }
                >
                  <AccordionDetails className="acr_para">
                    <Typography variant="body1"> {data?.anwswer}</Typography>
                  </AccordionDetails>
                </CommonAccordion>
              ))}
            </Box>
          )}
        </Container>
        <Image
          src={assest.eclipse3}
          alt=""
          width={380}
          height={450}
          className="pic3"
        />
        <Image
          src={assest.eclipse4}
          alt=""
          width={380}
          height={450}
          className="pic4"
        />
      </FaqWrapper>
    </Wrapper>
  );
}

export default Index;
