/* eslint-disable react/no-array-index-key */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useRecourcesPrac,
  useRecourcesRep
} from "@/hooks/react-qurey/query-hooks/recourcesQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack, { StackProps } from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

export const ButtonBlockWrapper = styled(Button)`
  min-width: 100%;
  border-radius: 10px !important;
  padding: 29px 44px;
  span {
    color: ${primaryColors?.black};
    font-size: 19px;
    font-weight: 500;
    line-height: 1;
    text-transform: capitalize;
  }
  &:hover {
    border: 1px solid #30a6e2;
    background: linear-gradient(
      143deg,
      #2fa6e2 1.31%,
      #50419c 113.15%
    ) !important;
    span {
      color: ${primaryColors?.white};
    }
  }
`;

export const ResourecesWrapper = styled(Box)``;

export const ButtonWrapper = styled(Box)`
  margin-bottom: 120px;
`;

export const WhatsNewWrapper = styled(Box)`
  h2 {
    color: ${primaryColors?.black};
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    text-transform: lowercase;
    margin-bottom: 40px;
  }
`;

export const WhatsNewBlockWrapper = styled(Stack)`
  padding: 15px 15px;
  border-radius: 10px;
  border: 1px solid ${primaryColors?.inputBorder};
  background: ${primaryColors?.white};
  figure {
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    flex-basis: 140px;
    @media (max-width: 899px) {
      width: 100%;
      flex-basis: 100%;
      margin: 0 0 30px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .whats_new_content {
    flex-basis: calc(100% - 140px);
    padding-left: 15px;
    @media (max-width: 899px) {
      width: 100%;
      flex-basis: 100%;
      padding-left: 0;
    }
    h3 {
      color: ${primaryColors?.text_purple};
      font-family: Roboto;
      font-size: 18px;
      font-weight: 600;
      text-transform: capitalize;
      margin-bottom: 15px;
    }
  }
`;

interface btnProps extends ButtonProps {
  innerText: string;
}

export const ButtonBlock = ({ innerText, ...props }: any) => {
  const router = useRouter();
  return (
    <ButtonBlockWrapper
      variant="outlined"
      color="info"
      className="gradient_btn"
      {...props}
      onClick={() =>
        router.push(
          `/resources/${innerText?.id ?? ""}${
            router?.query?.type ? `?type=${router?.query?.type}` : ""
          }`
        )
      }
    >
      <Typography variant="caption">{innerText?.name ?? ""}</Typography>
    </ButtonBlockWrapper>
  );
};

interface whatsNewProps extends StackProps {
  image: string;
  title: string;
  description: string;
}

export const WhatsNewBlock: React.FC<whatsNewProps & BoxProps> = ({
  image,
  title,
  description,
  ...props
}) => {
  return (
    <WhatsNewBlockWrapper
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      {...props}
    >
      <figure>
        <Image src={image} alt="image" width={130} height={150} />
      </figure>
      <Box className="whats_new_content">
        <Typography variant="h3">{title}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </WhatsNewBlockWrapper>
  );
};

export default function Index() {
  const btnList = [
    "Product photos",
    "Posters",
    "Patient consent form",
    "Clinical studies",
    "Logo",
    "Before & after photos",
    "News",
    "Testimonials",
    "About procell"
  ];

  type IwhatsNewListType = {
    image: string;
    title: string;
    description: string;
  };

  const whatnewBlockList: IwhatsNewListType[] = [
    {
      image: assest?.resource1,
      title: "Tailor to different skin type",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non tempor ipsum aliquet in pellentesque. Sagittis eget pretium mi tellus porttitor arcu nulla nunc integer. Tristique scelerisque dui pharetra consequat mattis. Neque et ornare tortor neque bibendum. Odio aliquet turpis mattis nisl nunc. Ut sem pulvinar ac aliquam. Sed tellus vel nisl neque."
    },
    {
      image: assest?.resource2,
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet consectetur. Non tempor ipsum aliquet in pellentesque. Sagittis eget pretium mi tellus porttitor arcu nulla nunc integer. Tristique scelerisque dui pharetra consequat mattis. Neque et ornare tortor neque bibendum. Odio aliquet turpis mattis nisl nunc. Ut sem pulvinar ac aliquam. Sed tellus vel nisl neque."
    }
  ];

  const router = useRouter();

  const [loader, setLoader] = useState(true);

  const {
    data: pracRecources,
    isLoading: pracRecourcesLoader,
    refetch: resourcesPrac
  } = useRecourcesPrac(false, () => setLoader(false));
  const {
    data: repRecources,
    isLoading: repRecourcesLoader,
    refetch: resourcesRep
  } = useRecourcesRep(false, () => setLoader(false));

  const recourceData = useMemo(() => {
    if (!!repRecources && repRecources?.length > 0) {
      return repRecources;
    } else if (!!pracRecources && pracRecources?.length > 0) {
      return pracRecources;
    } else {
      return [];
    }
  }, [pracRecources, repRecources]);

  useEffect(() => {
    setLoader(true);
    const { type } = router?.query ?? {};
    if (type == "practitioner-academy") {
      resourcesPrac();
    } else if (type == "rep-academy") {
      resourcesRep();
    } else {
      router.push("/academy");
      setLoader(false);
    }
  }, [router]);
  console.log("useRecourcesPrac", repRecources, pracRecources);
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="resources"
        innerHeaderRediractedPage="Resources"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage={
          router?.query?.type == "practitioner-academy"
            ? "Practitioner Academy"
            : "Rep Academy"
        }
        innnerHeaderMainurl={'/academy'}
      />
      <ResourecesWrapper className="cmn_gap">
        <Container fixed>
          <ButtonWrapper>
            {loader ? (
              <ButtonLoaderSecondary />
            ) : (
              <>
                {!!recourceData && recourceData?.length > 0 ? (
                  <Grid container spacing={3}>
                    {recourceData?.map((data: any, index: number) => (
                      <Grid item md={4} xs={12} key={index}>
                        <ButtonBlock innerText={data} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1" className="text">
                    There is no resources.
                  </Typography>
                )}
              </>
            )}
          </ButtonWrapper>
          {/* <WhatsNewWrapper>
            <Typography variant="h2">What’s new?</Typography>
            <Grid container rowSpacing={3}>
              {whatnewBlockList?.map((data, index) => (
                <Grid item xs={12} key={index}>
                  <WhatsNewBlock {...data} />
                </Grid>
              ))}
            </Grid>
          </WhatsNewWrapper> */}
        </Container>
      </ResourecesWrapper>
    </Wrapper>
  );
}
