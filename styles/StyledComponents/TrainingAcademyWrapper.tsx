import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const TrainingAcademyWrapper = styled(Box)`
    .training_academy_inner{
        .resource_card{
            &:not(:last-child){
                margin: 0 0 25px;
            }
        }
    }
    
`