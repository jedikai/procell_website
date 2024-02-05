import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import {
  useMarkAsCompletePractitioner,
  useMarkAsCompleteRep,
  usePractitionerAcademyContentById,
  useRepAcademyContentById
} from "@/hooks/react-qurey/query-hooks/academyQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { MicroChannelWrapper } from "@/styles/StyledComponents/MicroChannelWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";

const ContentDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useNotiStack();
  const [play, setPlay] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const videoRef = useRef<any>(null);
  const pdfRef = useRef<any>(null);

  const {
    data: repContentData,
    isLoading: repLoader,
    refetch: fetchRep
  } = useRepAcademyContentById(router?.query?.id, false, () =>
    setPageLoader(false)
  );
  const {
    data: practitionerContentData,
    isLoading: practitionerLoader,
    refetch: fetchPractitioner
  } = usePractitionerAcademyContentById(router?.query?.id, false, () =>
    setPageLoader(false)
  );
  const { mutate: markAsCompletePractitioner, isLoading: cmpltPracLoader } =
    useMarkAsCompletePractitioner();
  const { mutate: markAsCompleteRep, isLoading: cmpltRepLoader } =
    useMarkAsCompleteRep();

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlay(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlay(false);
    }
  };

  const {
    id,
    name,
    is_completed,
    content_type,
    text_content,
    video_content,
    pdf_content_url,
    question_ids,
    downloadable_content_links
  } = useMemo(() => {
    if (!!repContentData && Object.keys(repContentData)?.length > 0) {
      return repContentData;
    } else if (
      !!practitionerContentData &&
      Object.keys(practitionerContentData)?.length > 0
    ) {
      return practitionerContentData;
    } else {
      return {};
    }
  }, [practitionerContentData, repContentData]);

  const markAsCompleteHandler = () => {
    if (loader) {
      return false;
    }
    setLoader(true);
    const formData: FormData = new FormData();
    formData.append("content_id", `${id}`);
    const { slug } = router?.query;
    if (slug == "practitioner-academy") {
      markAsCompletePractitioner(formData, {
        onSuccess: (data: any) => {
          setLoader(false);
          // queryClient.invalidateQueries(DELIVERY_ADDRESS_LIST);
          toastSuccess(data?.data?.message ?? "Address deleted successfully.");
          router.push(`/academy/${router?.query?.slug}`);
        },
        onError: (data: any) => {
          setLoader(false);
          toastError(data?.data?.message ?? "Something went wrong.");
        }
      });
    } else if (slug == "rep-academy") {
      markAsCompleteRep(formData, {
        onSuccess: (data: any) => {
          setLoader(false);
          toastSuccess(data?.data?.message ?? "Address deleted successfully.");
          router.push(`/academy/${router?.query?.slug}`);
        },
        onError: (data: any) => {
          setLoader(false);
          toastError(data?.data?.message ?? "Something went wrong.");
        }
      });
    }
  };
  useEffect(() => {
    setPageLoader(true);
    const { slug } = router?.query;
    if (!!slug) {
      if (slug == "practitioner-academy") {
        // setAcademyType("Practitioner acadamy");
        fetchPractitioner();
      } else if (slug == "rep-academy") {
        // setAcademyType("Rep acadamy");
        fetchRep();
      } else {
        router.push("/academy");
      }
    }
  }, [router]);
  console.log(
    "router=====================================================>",
    video_content
  );
  const videoLinkChecker = useMemo(() => {
    if (
      !!video_content &&
      typeof video_content == "string" &&
      video_content?.includes("www.youtube.com")
    ) {
      const videoIdMatch = video_content.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );

      // Check if a match is found
      const videoId = videoIdMatch ? videoIdMatch[1] : "";

      // Construct the embed URL
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return video_content;
    }
  }, [video_content]);
  return (
    <Wrapper>
      {pageLoader ? (
        <ButtonLoaderSecondary />
      ) : (
        <>
          <InnerHeader
            bannerImage={assest.innerHeaderbackground}
            innerHeaderRediractedPage={name ?? ""}
            innerHeaderTitle={name ?? ""}
            innerHeaderMainPage={
              router?.query?.slug == "practitioner-academy"
                ? "Practitioner Academy"
                : "Rep Academy"
            }
            innnerHeaderMainurl="training-academy"
          />
          <MicroChannelWrapper className="cmn_gap">
            <Container fixed>
              <Box className="channel_wrapper">
                {!!video_content && (
                  <Box className="video_sec">
                    <Box className="video_sec_inner">
                      {/* <video
                        width="auto"
                        height="auto"
                        loop
                        muted
                        playsInline
                        poster={assest.videoposter}
                        ref={videoRef as any}
                      >
                        <source
                          src={"https://www.youtube.com/embed/imZQKFcbGPk"}
                          type="video/mp4"
                        />
                      </video> */}

                      {/* {play ? (
                        <Button
                          type="button"
                          className="play_btn pause_btn"
                          onClick={() => pauseVideo()}
                        >
                          <Image
                            src={assest?.pause_btn_black}
                            alt="play btn"
                            width={48}
                            height={48}
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="play_btn"
                          onClick={() => playVideo()}
                        >
                          <Image
                            src={assest?.play_btn_black}
                            alt="play btn"
                            width={48}
                            height={48}
                          />
                        </Button>
                      )} */}
                      {!!videoLinkChecker && (
                        <iframe
                          width="100%"
                          height="100%"
                          src={videoLinkChecker}
                          title="YouTube Video"
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      )}
                    </Box>
                  </Box>
                )}
                {!!pdf_content_url && (
                  <PdfViewer
                    pdfUrl={
                      // "https://niimblr-development-content.s3.eu-west-1.amazonaws.com/8211c0c3-e600-4391-b40f-c6965000db30.pdf"
                      pdf_content_url
                    }
                  />
                )}
                <Box className="channel_content">
                  <Typography
                    dangerouslySetInnerHTML={{ __html: text_content }}
                  />
                </Box>
                {!is_completed && (
                  <Box className="btn_otr">
                    <CustomButtonPrimary
                      variant="contained"
                      color="primary"
                      onClick={markAsCompleteHandler}
                    >
                      {loader ? (
                        <ButtonLoader />
                      ) : (
                        <Typography>Mark as complete</Typography>
                      )}
                    </CustomButtonPrimary>
                  </Box>
                )}
              </Box>
            </Container>
          </MicroChannelWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ContentDetails;
