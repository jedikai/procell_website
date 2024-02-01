/* eslint-disable import/no-named-as-default-member */
/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import LinearProgressBar from "@/components/LinearProgress/LinearProgress";
import PractionerSec from "@/components/PractionerSec/PractionerSec";

import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";

export default function Index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Practitioner acadamy"
        innerHeaderRediractedPage="Practitioner acadamy"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <LinearProgressBar completed={25} />
      <PractionerSec />
    </Wrapper>
  );
}
