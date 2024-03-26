import { certificateCardProps } from '@/interface/certificate.interface';
import { CertificateCardWrapper } from '@/styles/StyledComponents/CertificateCardWrapper';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CertificteIconTwo from '@/ui/Icons/CertificteIconTwo';
import DownloasdIcon from '@/ui/Icons/DownloasdIcon';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function CertificateCard({ heading, date, length }: certificateCardProps) {
    return (
        <CertificateCardWrapper>
            <Stack className='certi_card' direction='row' alignItems='center'>
                <i className='ico'>
                    <CertificteIconTwo />
                </i>
                <Box className="certi_middle">
                    <Chip label="Certificate of completetion" className='certi_chip' />
                    <Typography variant='body1' className='heading'>
                        {heading}
                    </Typography>
                    <Stack direction='row' alignItems='center' className='date_length'>
                        <Typography variant='body1'>
                            Date: <Typography variant='caption' className='bold_txt'>{date}</Typography>
                        </Typography>
                        <Typography variant='body1'>
                            Length: <Typography variant='caption' className='bold_txt'>{length} hrs</Typography>
                        </Typography>
                    </Stack>
                </Box>
                <CustomButtonPrimary className='downloads_btn' variant="contained" color="primary" endIcon={<DownloasdIcon />}>
                    <Typography variant='body1'>Download</Typography>
                </CustomButtonPrimary>
            </Stack>
        </CertificateCardWrapper>
    )
}
