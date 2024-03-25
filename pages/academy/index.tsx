/* eslint-disable react/no-array-index-key */
import AcademyEachComponent from "@/components/AcademyEachComponent/AcademyEachComponent";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { useAcademyInfo } from "@/hooks/react-qurey/query-hooks/academyQuery.hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { TrainingAcademyWrapper } from "@/styles/StyledComponents/TrainingAcademyWrapper";
import Container from "@mui/material/Container";
import { useEffect } from "react";

export default function Index() {
  const { userAcademyAccessbility } = useAppSelector(
    (s) => s.userProfileImgSlice
  );
  const { data: academyInfo, isLoading, refetch } = useAcademyInfo(false);
  console.log("academyInfo", academyInfo);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Academy"
        innerHeaderTitle="Academy"
        innerHeaderMainPage="Home"
      />
      <TrainingAcademyWrapper className="cmn_gap">
        {!isLoading && !!academyInfo ? (
          <Container fixed>
            {/* <Box className="training_academy_inner">
            {resourceData.map((data, index) => (
              <ResourceCard {...data} key={index} />
            ))}
          </Box> */}
            <AcademyEachComponent
              title="Practitioner Academy"
              compeltePercent={academyInfo?.practitioner_academy_progress ?? 0}
              numberOfResources={
                academyInfo?.practitioner_academy_resources_count ?? 0
              }
            />
            {!!userAcademyAccessbility &&
              userAcademyAccessbility != "false" && (
                <AcademyEachComponent
                  title="Rep Academy"
                  compeltePercent={academyInfo?.rep_academy_progress ?? 0}
                  numberOfResources={
                    academyInfo?.rep_academy_resources_count ?? 0
                  }
                />
              )}
          </Container>
        ) : (
          <ButtonLoaderSecondary />
        )}
      </TrainingAcademyWrapper>
    </Wrapper>
  );
}
