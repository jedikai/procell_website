import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import {
  useRecourcesPracById,
  useRecourcesRepById
} from "@/hooks/react-qurey/query-hooks/recourcesQuery.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { getCookie } from "@/lib/functions/storage.lib";
import { ResourceWrapper } from "@/styles/StyledComponents/ResourcdePhotosWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import DefaultFileIcon from "@/ui/Icons/DefaultFileIcon";
import DownloasdIcon from "@/ui/Icons/DownloasdIcon";
import ExcelIcon from "@/ui/Icons/ExcelIcon";
import JPGIcon from "@/ui/Icons/JPGIcon";
import MP4Icon from "@/ui/Icons/MP4Icon";
import PNGIcon from "@/ui/Icons/PNGIcon";
import PdfIcon from "@/ui/Icons/PdfIcon";
import PhotoShopIcon from "@/ui/Icons/PhotoShopIcon";
import PowerPointIcon from "@/ui/Icons/PowerPointIcon";
import WordDocIcon from "@/ui/Icons/WordDocIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const ResorceDetails = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>("");

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

  const fileTypeExtensionHandler = (mimeType: any) => {
    const mimeToIconMap: { [key: string]: any } = {
      "image/jpeg": "jpeg",
      "image/png": "png",
      "application/pdf": "pdf",
      "application/postscript": "ps",
      "video/mp4": "mp4",
      "application/vnd.ms-excel": "xlsx",
      "application/msword": "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/vnd.ms-powerpoint": "pptx",
      "image/vnd.adobe.photoshop": "psd",
      "application/octet-stream": "mp4"
    };

    const extension = mimeToIconMap[mimeType.toLowerCase()];
    return extension ? extension : "pdf";
  };
  const downloadFile = async (
    id: any,
    name: string,
    url: string,
    content_type: string
  ) => {
    setSelectedId(id);
    setLoading(true);
    // const sessionId = sessionStorage.getItem("session_id") || "";
    const sessionId = getCookie("access_token") || "";
    const fileDownloadInstance = axios.create({
      baseURL: process.env.NEXT_APP_BASE_URL,
      responseType: "blob",
      headers: {
        "Content-Type": content_type
      },
      params: { session_id: sessionId }
    });
    await fileDownloadInstance
      .get(`${url}/${id}`)
      .then((response: any) => {
        setSelectedId("");
        setLoading(false);
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.${fileTypeExtensionHandler(content_type)}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("An error occurred:", error);
      });
  };
  const fileTypeIconHandler = (mimeType: any) => {
    const mimeToIconMap: { [key: string]: any } = {
      "image/jpeg": <JPGIcon IconWidth="60%" IconHeight="60%" />,
      "image/png": <PNGIcon IconWidth="60%" IconHeight="60%" />,
      "application/pdf": <PdfIcon IconWidth="60%" IconHeight="60%" />,
      "application/postscript": (
        <DefaultFileIcon IconWidth="60%" IconHeight="60%" />
      ),
      "video/mp4": <MP4Icon IconWidth="60%" IconHeight="60%" />,
      "application/vnd.ms-excel": (
        <ExcelIcon IconWidth="60%" IconHeight="60%" />
      ),
      "application/msword": <WordDocIcon IconWidth="60%" IconHeight="60%" />,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        <WordDocIcon IconWidth="60%" IconHeight="60%" />,
      "application/vnd.ms-powerpoint": (
        <PowerPointIcon IconWidth="60%" IconHeight="60%" />
      ),
      "image/vnd.adobe.photoshop": (
        <PhotoShopIcon IconWidth="60%" IconHeight="60%" />
      )
    };

    const icon = mimeToIconMap[mimeType.toLowerCase()];
    return icon ? icon : <DefaultFileIcon IconWidth="60%" IconHeight="60%" />; // Return default icon if MIME type is not found
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
          innnerHeaderMainurl={`/resources?type=${router?.query?.type}`}
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
                          <Grid
                            item
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            key={index + 1}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              flexWrap="wrap"
                              className="photo_wrap"
                            >
                              {!!data?.file_url && (
                                <figure>
                                  {/* <Image
                                    src={
                                      fileTypeIconHandler(data?.mimetype) ?? ""
                                    }
                                    alt=""
                                    width={70}
                                    height={107}
                                  /> */}
                                  {fileTypeIconHandler(data?.mimetype)}
                                </figure>
                              )}
                              <Box className="right">
                                {!!data?.name && (
                                  <Typography variant="body1" className="name">
                                    {data.name}
                                  </Typography>
                                )}
                                {loading && selectedId == data.id ? (
                                  <CustomButtonPrimary
                                    className="downloads_btn"
                                    variant="contained"
                                    color="primary"
                                  >
                                    <ButtonLoader />
                                  </CustomButtonPrimary>
                                ) : (
                                  <CustomButtonPrimary
                                    className="downloads_btn"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<DownloasdIcon />}
                                    onClick={() =>
                                      downloadFile(
                                        data?.id,
                                        data?.name,
                                        data?.file_url,
                                        data?.mimetype
                                      )
                                    }
                                  >
                                    <Typography variant="body1">
                                      Download
                                    </Typography>
                                  </CustomButtonPrimary>
                                )}
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