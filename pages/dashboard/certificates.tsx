import CertificateList from '@/components/CertificateList/CertificateList';
import { certificatedata } from '@/json/mock/certificateData.mock';
import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import Wrapper from '@/layout/wrapper/Wrapper';
import { CertificatesWrapper } from '@/styles/StyledComponents/CertificatesWrapper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Index() {
    return (
        <Wrapper>
            <DashboardWrapper>
                <Box className="cmn_box">
                    <CertificatesWrapper>
                        <Typography variant="h1" className='heading'>Certificates</Typography>
                        <Box className="certificate_holder">
                            <CertificateList certificateList={certificatedata} />
                        </Box>
                    </CertificatesWrapper>

                </Box>
            </DashboardWrapper>
        </Wrapper>
    )
}
