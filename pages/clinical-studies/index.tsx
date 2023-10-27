/* eslint-disable mui-path-imports/mui-path-imports */
import Clinicalsec from "@/components/Clinicalsec/Clinicalsec";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { useClinicalStudyList } from "@/hooks/react-qurey/query-hooks/clinicalStudyQuery.hooks";
import assest from "@/json/assest";
import { clinicalData } from "@/json/mock/clinical.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { Box } from "@mui/material";
import Image from "next/image";

function index() {
  const { data: clinicalStudyList } = useClinicalStudyList();
  console.log("useClinicalStudyList", clinicalStudyList);
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Clinical studies"
        innerHeaderRediractedPage="Clinical studies"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <Box className="cmn_gap eclispe_effct">
        {clinicalStudyList?.map((data: any) => (
          <Clinicalsec
            title={data?.name}
            companyName={data?.author}
            paragraph={data?.description}
            adminName={data?.publisher}
            clinical_study_url={data?.clinical_study_url}
          />
        ))}
        <Image
          src={assest.eclipse1}
          alt=""
          width={380}
          height={450}
          className="pic1"
        />
        <Image
          src={assest.eclipse2}
          alt=""
          width={380}
          height={450}
          className="pic2"
        />
      </Box>
    </Wrapper>
  );
}
export default index;
