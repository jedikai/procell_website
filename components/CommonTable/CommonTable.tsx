/* eslint-disable mui-path-imports/mui-path-imports */


import { CommonTableWrapper } from "@/styles/StyledComponents/CommonTableWrapper";
import { Box, Table, TableContainer } from "@mui/material";

interface commontableProps {
  children: JSX.Element | JSX.Element[];
}

function CommonTable({ children }: commontableProps) {
  return (
    <CommonTableWrapper>
   
      <Box className="commontableSection">
        <TableContainer>
          <Table  aria-label="simple table">
            {children}
          </Table>
        </TableContainer>
      </Box>
           
    </CommonTableWrapper>
    
  );
}

export default CommonTable;
