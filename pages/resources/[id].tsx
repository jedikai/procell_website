import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useRecourcesPracById,
  useRecourcesRepById
} from "@/hooks/react-qurey/query-hooks/recourcesQuery.hooks";
import assest from "@/json/assest";
import { resourcePhotosData } from "@/json/mock/resourcephotos.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ResourceWrapper } from "@/styles/StyledComponents/ResourcdePhotosWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import DownloasdIcon from "@/ui/Icons/DownloasdIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const ResorceDetails = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  const {
    data: pracRecourcesData,
    isLoading: pracRecourcesDataLoader,
    refetch: resourcesPracCat
  } = useRecourcesPracById(router?.query?.id, false, () => setLoader(false));
  const {
    data: repRecourcesData,
    isLoading: repRecourcesDataLoader,
    refetch: resourcesRepCat
  } = useRecourcesRepById(router?.query?.id, false, () => setLoader(false));

  const { category, resources } = useMemo(() => {
    if (!!repRecourcesData && Object.keys(repRecourcesData || {})?.length > 0) {
      return repRecourcesData;
    } else if (
      !!pracRecourcesData &&
      Object.keys(pracRecourcesData || {})?.length > 0
    ) {
      return pracRecourcesData;
    } else {
      return [];
    }
  }, [pracRecourcesData, repRecourcesData]);

  useEffect(() => {
    setLoader(true);
    const { type } = router?.query ?? {};
    if (type == "practitioner-academy") {
      resourcesPracCat();
    } else if (type == "rep-academy") {
      resourcesRepCat();
    } else {
      router.push("/academy");
      setLoader(false);
    }
  }, [router]);
  const handleDownload = (file: any) => {
    const link = document.createElement("a");
    link.href = file?.file_url ?? "";
    link.download = file?.name || "downloaded_file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log("resources============>", resources, pracRecourcesData);
  return (
    <>
      <Wrapper>
        <InnerHeader
          innerHeaderTitle="resources"
          innerHeaderRediractedPage={category ?? ""}
          bannerImage={assest.innerHeaderbackground}
          innerHeaderMainPage="Resources"
        />
        <ResourceWrapper className="cmn_gap">
          <Box className="resource_main">
            <Container fixed>
              <Box className="resource_inner">
                <Typography variant="h3" className="main_heading">
                  {category ?? ""}
                </Typography>
                {loader ? (
                  <ButtonLoaderSecondary />
                ) : (
                  <Box className="resource_cards">
                    {!!resources && resources?.length > 0 ? (
                      <Grid container spacing={2}>
                        {resources?.map((data: any, index: number) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              flexWrap="wrap"
                              className="photo_wrap"
                            >
                              {!!data?.file_url && (
                                <figure>
                                  <Image
                                    src={data?.file_url ?? ""}
                                    alt=""
                                    width={70}
                                    height={107}
                                  />
                                </figure>
                              )}
                              <Box className="right">
                                {!!data?.name && (
                                  <Typography variant="body1" className="name">
                                    {data.name}
                                  </Typography>
                                )}
                                <CustomButtonPrimary
                                  className="downloads_btn"
                                  variant="contained"
                                  color="primary"
                                  endIcon={<DownloasdIcon />}
                                  onClick={() => handleDownload(data)}
                                >
                                  <Typography variant="body1">
                                    Download
                                  </Typography>
                                </CustomButtonPrimary>
                              </Box>
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography variant="body1" className="main_heading">
                        There is no resource available.
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Container>
          </Box>
        </ResourceWrapper>
      </Wrapper>
    </>
  );
};

export default ResorceDetails;
