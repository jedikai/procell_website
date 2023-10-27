/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import LinearProgressBar from "@/components/LinearProgress/LinearProgress";
import TrainingSec from "@/components/TrainingSec/TrainingSec";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";

export default function index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="training acadamy"
        innerHeaderRediractedPage="Training acadamy"
        bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Home"     />
      <LinearProgressBar />
      <TrainingSec />
    </Wrapper>
  );
}
