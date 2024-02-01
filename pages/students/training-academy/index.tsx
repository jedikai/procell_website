/* eslint-disable react/no-array-index-key */
import AcademyEachComponent from "@/components/AcademyEachComponent/AcademyEachComponent";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { TrainingAcademyWrapper } from "@/styles/StyledComponents/TrainingAcademyWrapper";
import Container from "@mui/material/Container";

export default function Index() {
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Training acadamy"
        innerHeaderTitle="Training academy"
        innerHeaderMainPage="Home"
        innnerHeaderMainurl="Home"
      />
      <TrainingAcademyWrapper className="cmn_gap">
        <Container fixed>
          {/* <Box className="training_academy_inner">
            {resourceData.map((data, index) => (
              <ResourceCard {...data} key={index} />
            ))}
          </Box> */}
          <AcademyEachComponent
            title="Rep Academy"
            compeltePercent={25}
            numberOfResources={21}
          />
          <AcademyEachComponent
            title="Practitioner Academy"
            compeltePercent={50}
            numberOfResources={15}
          />
        </Container>
      </TrainingAcademyWrapper>
    </Wrapper>
  );
}
