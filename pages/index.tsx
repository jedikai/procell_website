import BannerSec from "@/components/BannerSec/BannerSec";
import HealingSec from "@/components/HealingSec/HealingSec";
import OurProduct from "@/components/OurProduct/OurProduct";
import ReviewSlider from "@/components/ReviewSlider/ReviewSlider";
import SkinAgeSec from "@/components/SkinAgeSec/SkinAgeSec";
import StorySec from "@/components/StorySec/StorySec";
import Weoffers from "@/components/WeOffers/Weoffers";

import TreatmentSec from "@/components/TreatmentSec/TreatmentSec";
import TreatmentSecUpper from "@/components/TreatmentSecUpper/TreatmentSecUpper";
import assest from "@/json/assest";
import { cardList } from "@/json/mock/cardlist.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface TrustPilotWindow extends Window {
  Trustpilot: {
    loadFromElement: (element: HTMLElement, isAsync: boolean) => void;
  };
}

export default function Home() {
  const [trustPilotScript, setTrustPilotScript] = useState<any>(null);
  const trustBoxRef = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTrustPilotScript(
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
      );
      // if ((window as any)?.Trustpilot) {
      //   (window as any)?.Trustpilot.loadFromElement(trustBoxRef.current!, true);
      // }
    }
  }, []);
  console.log("trustPilotScript", trustPilotScript);

  return (
    <>
      <Head>
        {trustPilotScript}
        {/* <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script> */}
      </Head>
      {/* <Script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      /> */}
      <Wrapper>
        <BannerSec />
        <Weoffers
          weoffergirl_img={assest.weoffersGirlimg}
          weoffergirl_imgWidth={782}
          weoffergirl_imgHeight={817}
          offerTitel="We offers"
          offerText="Cutting-edge biotechnology to induce a breathtaking transformation to the appearance of the skin that can last a lifetime."
          weofferProducttitle="Lorem ipsum dolor sit amet conse ctetur."
          weofferProductdetails="Lorem ipsum dolor sit amet consectetur. Purus neque sit fames ac orci egestas?"
          WeofferProductImg={assest.weoffersproductimg}
        />
        <OurProduct
          producttitle="products"
          producttitletop="Our"
          ourProductimg={assest.ourProductLadyImg}
        />
        <TreatmentSecUpper />
        <TreatmentSec />
        <SkinAgeSec title="Why Does" subTitle="Skin Age?" />
        <HealingSec />

        <>{trustPilotScript && <ReviewSlider />}</>
        <StorySec
          cardList={cardList}
          image={assest?.story_img}
          title="Our Story"
        >
          <Typography variant="body1">
            <Typography variant="caption"> Dr. Mitchell Schwartz</Typography>{" "}
            founded Procell Therapies in 2013 with a bold vision. During his 30+
            years as a practicing dermatologist he had observed the limitations
            and damage caused by other anti-aging systems. Dr. Schwartz realized
            that with some engineering and ingenuity he could provide better
            results in a safe and non-invasive way.
          </Typography>
          <Typography variant="body1">
            Thanks to our roots in dermatology practice, we know what it takes
            to successfully adopt a new treatment technology. That’s why Procell
            Therapies provides trainings, marketing materials, and a lifetime
            guarantee for all of our products.
          </Typography>
        </StorySec>
      </Wrapper>
    </>
  );
}
