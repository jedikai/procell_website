/* eslint-disable mui-path-imports/mui-path-imports */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import WorkshopCard from "@/components/WorkshopCard/WorkshopCard";
import { useWorkshopList } from "@/hooks/react-qurey/query-hooks/workShopQuery.hooks";
import assest from "@/json/assest";
import { workshopData } from "@/json/mock/workshopData.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { WorkshopWrapper } from "@/styles/StyledComponents/WorkshopWrapper";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function Index() {
  const { data: workshopList, isLoading } = useWorkshopList();

  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Workshop"
        innerHeaderRediractedPage="Workshop"
        bannerImage={assest.innerHeaderbackground}
        innerHeaderMainPage="Home"
      />
      <WorkshopWrapper>
        <Box
          className="work_outr cmn_gap"
          sx={{ backgroundImage: `url(${assest.workshopBackground})` }}
        >
          <Container fixed>
            <Box className="sec_title">
              <Typography variant="h4">
                If you are a licensed practitioner, you are welcome to join us
                for a FREE live presentation of Procell Microchanneling!
              </Typography>
            </Box>
            {!isLoading && workshopList && workshopList?.length > 0 ? (
              <Box className="workshp_body">
                {workshopList?.map((data: any) => (
                  <WorkshopCard {...data} key={data?.title} />
                ))}
              </Box>
            ) : (
              <Box className="workshp_body"></Box>
            )}
          </Container>
        </Box>
      </WorkshopWrapper>
    </Wrapper>
  );
}
