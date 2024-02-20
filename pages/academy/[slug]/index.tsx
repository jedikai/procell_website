import React, { useEffect, useMemo, useState } from "react";
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import LinearProgressBar from "@/components/LinearProgress/LinearProgress";
import PractionerSec from "@/components/PractionerSec/PractionerSec";

import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { useRouter } from "next/router";
import {
  usePractitionerAcademyContent,
  useRepAcademyContent
} from "@/hooks/react-qurey/query-hooks/academyQuery.hooks";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";

const Index = () => {
  const { push, query } = useRouter();
  const [academyType, setAcademyType] = useState("");
  const [loader, setLoader] = useState(false);
  const {
    data: practitionerAcademyData,
    isLoading: practitionerAcademyLoader,
    refetch: fetchPractitionerAcademyContent
  } = usePractitionerAcademyContent(false, () => {
    setLoader(true);
  });
  const {
    data: repAcademyData,
    isLoading: repAcademyLoader,
    refetch: fetchRepAcademyContent
  } = useRepAcademyContent(false, () => {
    setLoader(true);
  });

  const { practitioner_academy_progress, module_data: academyContentData } =
    useMemo(() => {
      if (!!repAcademyData && repAcademyData?.length > 0) {
        return repAcademyData[0];
      } else if (
        !!practitionerAcademyData &&
        practitionerAcademyData?.length > 0
      ) {
        return practitionerAcademyData[0];
      } else {
        return [];
      }
    }, [practitionerAcademyData, repAcademyData]);

  useEffect(() => {
    if (!!query?.slug) {
      if (query?.slug == "practitioner-academy") {
        setAcademyType("Practitioner Acadamy");
        fetchPractitionerAcademyContent();
      } else if (query?.slug == "rep-academy") {
        setAcademyType("Rep Acadamy");
        fetchRepAcademyContent();
      } else {
        push("/academy");
      }
    }
  }, [query]);

  console.log("academyContentData", practitionerAcademyData);
  return (
    <Wrapper>
      {loader ? (
        <>
          <InnerHeader
            innerHeaderTitle={academyType}
            innerHeaderRediractedPage={academyType}
            bannerImage={assest.innerHeaderbackground}
            innerHeaderMainPage="Academy"
            innnerHeaderMainurl={'/academy'}
          />
          <LinearProgressBar completed={practitioner_academy_progress ?? 0} />
          <PractionerSec academyContentData={academyContentData} />
        </>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <ButtonLoaderSecondary />
        </div>
      )}
    </Wrapper>
  );
};

export default Index;
