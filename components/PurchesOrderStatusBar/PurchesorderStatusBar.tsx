import { statusdetailsList } from "@/json/mock/statusdetailsList.mock";
import { PurchesorderStatusBarWrapper } from "@/styles/StyledComponents/PurchesorderStatusBarWrapper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

function PurchesorderStatusBar() {
  return (
    <PurchesorderStatusBarWrapper>
      <Box className="statusTree">
        <List disablePadding>
          {statusdetailsList.map((item: any, index: number) => (
            <ListItem
              disablePadding
              className={item?.status === "completed" ? "active" : ""}
              key={index + 1}
            >
              <Box className="statusTreeBox">
                <Typography variant="body1" className="orderStautsdetails">
                  {item.ordercurrentstatus}
                </Typography>
                <Typography variant="body1" className="orderDate">
                  {item.orderstatusdate}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </PurchesorderStatusBarWrapper>
  );
}

export default PurchesorderStatusBar;
