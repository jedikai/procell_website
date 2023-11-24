/* eslint-disable mui-path-imports/mui-path-imports */
import { animationURL } from "@/components/AnimationUrl/AnimationUrl";
import Clinicalsec from "@/components/Clinicalsec/Clinicalsec";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import { useClinicalStudyList } from "@/hooks/react-qurey/query-hooks/clinicalStudyQuery.hooks";
import assest from "@/json/assest";
import { clinicalData } from "@/json/mock/clinical.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Lottie from "react-lottie-player";

function index() {
  const { data: clinicalStudyList, isLoading } = useClinicalStudyList();
  console.log("useClinicalStudyList", clinicalStudyList);
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Clinical studies"
        innerHeaderRediractedPage="Clinical studies"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      {!isLoading ? <Box className="cmn_gap eclispe_effct">
        {clinicalStudyList && clinicalStudyList?.length > 0 ? clinicalStudyList?.map((data: any, index: number) => (
          <Clinicalsec
            key={index + 1}
            title={data?.name}
            companyName={data?.author}
            paragraph={data?.description}
            adminName={data?.publisher}
            clinical_study_url={data?.clinical_study_url}
          />
        )) : <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            width: "100%"
          }}
        >
          {/* <MyLottieAnimation play /> */}
          <Lottie
            loop
            animationData={animationURL}
            play
            style={{
              width: "50%",
              height: "100%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
          <Typography
            variant="body1"
            className="no_found"
            style={{
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            There is no clinical studies.
          </Typography>
        </div>}
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
      </Box> : <></>}
    </Wrapper>
  );
}
export default index;
