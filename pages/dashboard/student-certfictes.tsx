/* eslint-disable react/no-array-index-key */
import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import { useCertificateList } from "@/hooks/react-qurey/query-hooks/certificateQuery.hooks";
import { student_certificate_data } from "@/json/mock/student_certificate.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { StudentCertificateWrap } from "@/styles/StyledComponents/StudentCertificateWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Index() {
  const [image, setImage] = useState(0);
  const [pdf, setPdf] = useState<any>(null);
  const { data: certificateList, isLoading, refetch } = useCertificateList();
  useEffect(() => {
    refetch();
  }, []);
  console.log("useCertificateList", certificateList);

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
                    {!!!!certificateList[image]?.url && (
                      <img
                        src={`${certificateList[image]?.url}`}
                        alt=""
                        width={532}
                        height={376}
                      />
                    )}
                  </Box>
                  <List className="thumbs" disablePadding>
                    {certificateList.map((_img: any, index: number) => (
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
                            src={_img?.url}
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
                <></>
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
