/* eslint-disable react/no-array-index-key */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import { useCertificateList } from "@/hooks/react-qurey/query-hooks/certificateQuery.hooks";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { StudentCertificateWrap } from "@/styles/StyledComponents/StudentCertificateWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

export default function Index() {
  const [image, setImage] = useState(0);
  const [certificateList, setCertificateList] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<any>("");
  const { data, isLoading, refetch } = useCertificateList((response: any) => {
    const { data, thumbnail_url, thumbnail_datas } = response ?? {};
    setCertificateList(data);
    setThumbnail(!!data && data?.length > 0 ? `data:image/png;base64, ${thumbnail_datas}` : thumbnail_url);
  });

  const getPdfDataToPreview = useMemo(() => {
    if (!!certificateList && !!certificateList[image]?.datas) {
      const bytes = Uint8Array.from(atob(certificateList[image]?.datas), (c) =>
        c.charCodeAt(0)
      );
      return { data: bytes };
    } else {
      return "";
    }
  }, [certificateList, image]);
  useEffect(() => {
    refetch();
  }, []);
  console.log("useCertificateList", certificateList);
  // const bytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <StudentCertificateWrap>
            <Typography variant="h1" className="heading">
              Certificates
            </Typography>
            {!isLoading ? (
              !!certificateList && certificateList?.length > 0 ? (
                <Box className="certificate_holder">
                  <Box className="cert_main_image">
                    {!!certificateList[image]?.datas &&
                      !!getPdfDataToPreview && (
                        // <img
                        //   src={`${certificateList[image]?.url}`}
                        //   alt=""
                        //   width={532}
                        //   height={376}
                        // />

                        <PdfViewer pdfUrl={getPdfDataToPreview} />
                      )}
                  </Box>
                  <List className="thumbs" disablePadding>
                    {certificateList?.length > 1 &&
                      certificateList.map((_img: any, index: number) => (
                        <ListItem
                          disablePadding
                          className="image_box"
                          key={index}
                        >
                          <Button
                            type="button"
                            onClick={() => setImage(index)}
                            className={image === index ? "active" : ""}
                          >
                            <img
                              src={thumbnail ?? ""}
                              // src={`data:image/png;base64, ${thumbnail}`}
                              alt=""
                              width={82}
                              height={58}
                            />
                          </Button>
                        </ListItem>
                      ))}
                  </List>
                </Box>
              ) : (
                <>
                  <Box className="certificate_holder">
                    <Box className="cert_main_image">
                      <img
                        src={thumbnail ?? ''}
                        // src={`data:image/png;base64, ${thumbnail}`}
                        alt=""
                        width={532}
                        height={376}
                      />
                    </Box>
                  </Box>
                </>
              )
            ) : (
              <ButtonLoaderSecondary />
            )}
          </StudentCertificateWrap>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
