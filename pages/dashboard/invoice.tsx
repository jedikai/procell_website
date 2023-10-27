import { InvoiceProps } from "@/interface/invoice.interface";
import { invoiceList } from "@/json/mock/invoice.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  InvoiceCardWrap,
  InvoiceWrapper
} from "@/styles/StyledComponents/InvoiceWrapper";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";

export function InvoiceCard({ ...props }: InvoiceProps) {
  const router = useRouter();
  return (
    <InvoiceCardWrap direction="row" flexWrap="wrap">
      <Box className="left_block">
        <figure>
          <Image src={props?.img} alt="product image" width={67} height={90} />
        </figure>
        <Box className="product_details">
          <Typography variant="h5">{props?.title}</Typography>
          <Typography>{props?.price}</Typography>
        </Box>
      </Box>
      <Box className="rgt_block">
        <Typography className="order_id">
          Order ID: <Typography variant="caption" className="order_idText">{props?.orderId}</Typography>
        </Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <Chip
              icon={<DownloadIcon />}
              label="Download invoice"
              className="invoice_chip"
              onClick={() => router.push(props?.downnloadLink)}
            />
          </ListItem>
          <ListItem disablePadding>
            <Chip label="Delivered" className="deliver_chip" />
          </ListItem>
        </List>
      </Box>
    </InvoiceCardWrap>
  );
}

export default function Index() {
  return (
    <Wrapper>
      <DashboardWrapper>
      <Box className="cmn_box">
        <InvoiceWrapper>
          {invoiceList?.map((item) => (
            <InvoiceCard {...item} key={item?.orderId} />
          ))}
        </InvoiceWrapper>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
