import { resourceCardProps } from '@/interface/resourcecard.interface';
import { ResourceCardWapper } from '@/styles/StyledComponents/ResourceCardWrapper';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import DownloasdIcon from '@/ui/Icons/DownloasdIcon';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgressBarWithLabel from '../LinearProgressBarWithLabel/LinearProgressBarWithLabel';

export default function ResourceCard({ completed, heading, resourceNo }: resourceCardProps) {
    return (
        <ResourceCardWapper className='resource_card'>
            <Typography variant='body1' className='heading'>
                {heading}
            </Typography>
            <Box className="progress_bar_wrap">
                <LinearProgressBarWithLabel completed={completed} customLabel={`${completed}% completed`} labelAlignment='left' />
            </Box>
            <Stack direction='row' alignItems='center' justifyContent='space-between' className='resorce_btm' flexWrap='wrap'>
                <Box className="left">
                    <Typography variant='body1' className='btm_main_text'>
                        Resources
                    </Typography>
                    <Typography variant='body1' className='btm_sub_text'>
                        {resourceNo} resource items are available
                    </Typography>
                </Box>
                <CustomButtonPrimary className='downloads_btn' variant="contained" color="primary" endIcon={<DownloasdIcon />}>
                    <Typography variant='body1'>Download</Typography>
                </CustomButtonPrimary>
            </Stack>
        </ResourceCardWapper>
    )
}
