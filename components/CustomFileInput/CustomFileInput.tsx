/* eslint-disable no-unused-vars */
import { CustomFileInputWrapper } from '@/styles/StyledComponents/CustomFileInputWrapper';
import UploadIcon from '@/ui/Icons/UploadIcon';
import Typography from "@mui/material/Typography";
import { useState } from 'react';


export default function CustomFileInput({ getProofFile }: any) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedName(file?.name ?? undefined);
        getProofFile(file)
        // Additional validation logic
    };
    return (

        <CustomFileInputWrapper >
            <UploadIcon />
            <Typography variant='h3'>{selectedName || "Click box to upload"}</Typography>
            <Typography variant='body1'>Maximum file size 10mb</Typography>
            <input type='file' onChange={handleFileChange} />
        </CustomFileInputWrapper>
    )
}
