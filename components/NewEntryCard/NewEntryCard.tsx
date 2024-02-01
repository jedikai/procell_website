import { newEntryCardProps } from '@/interface/newEntryCard.interface';
import { NewEntryCardWrapper } from '@/styles/StyledComponents/NewEntryCardWrapper';
import AddIcon from '@/ui/Icons/AddIcon';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NewEntryCard({ text, onClick }: newEntryCardProps) {
    return (
        <NewEntryCardWrapper direction='column' justifyContent='center' alignContent='center' className='new_entry_card'>
            <Button onClick={onClick}>
                <i className='ico'>
                    <AddIcon />
                </i>
                <Typography variant='body1' className='text'>
                    {text}
                </Typography>
            </Button>

        </NewEntryCardWrapper>
    )
}
