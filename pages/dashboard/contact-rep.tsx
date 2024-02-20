import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import ContactRepCard from "@/components/ContactRepCard/ContactRepCard";
import { useContactRep } from "@/hooks/react-qurey/query-hooks/contactRepQuery.hooks";
import assest from "@/json/assest";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import { ContactRepWrapper } from "@/styles/StyledComponents/ContactRepWrapper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Index() {
  const { data, isLoading } = useContactRep();
  console.log("show me data", data);

  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <ContactRepWrapper>
            <Typography variant="h4" className="main_heading">
              Contact your rep
            </Typography>
            <Box className="cnt_card_wrap">
              {!isLoading ? (
                <ContactRepCard
                  emailUrl={
                    !!data?.login && data?.user_bio != "false"
                      ? data?.login
                      : ""
                  }
                  phoneUrl={
                    !!data?.phone && data?.phone != "false"
                      ? data?.phone
                      : ""
                  }
                  desg={
                    !!data?.user_bio && data?.user_bio != "false"
                      ? data?.user_bio
                      : "N/A"
                  }
                  email={
                    !!data?.login && data?.login != "false"
                      ? data?.login
                      : "N/A"
                  }
                  imgUrl={
                    !!data?.avatar_128 && data?.user_bio != "false"
                      ? data?.avatar_128
                      : assest.avatarIcon
                  }
                  phone={
                    !!data?.phone && data?.phone != "false"
                      ? data?.phone
                      : "N/A"
                  }
                  title={
                    !!data?.name && data?.name != "false" ? data?.name : "N/A"
                  }
                />
              ) : (
                <ButtonLoaderSecondary />
              )}
            </Box>
          </ContactRepWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
