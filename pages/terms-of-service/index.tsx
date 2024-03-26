import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { PrivacyWrapper } from "@/styles/StyledComponents/PrivacyWrapper";
import { Container } from "@mui/system";

function index() {
    return (
        <Wrapper>
            <InnerHeader
                innerHeaderTitle="Terms of service"
                innerHeaderRediractedPage="Terms of service"
                bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Home" />
            <PrivacyWrapper className="cmn_gap">
                <Container fixed>

                </Container>
            </PrivacyWrapper>
        </Wrapper>
    );
}

export default index;
