import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import {
  useInvoiceDownload,
  useInvoiceList
} from "@/hooks/react-qurey/query-hooks/dashboardQuery.hooks";
// import { invoiceList } from "@/json/mock/invoice.mock";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import {
  InvoiceCardWrap,
  InvoiceWrapper
} from "@/styles/StyledComponents/InvoiceWrapper";
import DownloadIcon from "@/ui/Icons/DownloadIcon";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import { removeDuplicates } from "common/functions/removeDublicate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function InvoiceCard({ ...props }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const downloadPdf = async (id: string) => {
    setLoading(true);
    const sessionId = sessionStorage.getItem("session_id") || "";
    const pdfDownloadInstance = axios.create({
      baseURL: process.env.NEXT_APP_BASE_URL,
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf"
      },
      params: { session_id: sessionId }
    });
    await pdfDownloadInstance
      .get(`/web/download/invoice_pdf/${id}`)
      .then((response: any) => {
        setLoading(false);
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${props?.sale_order}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("An error occurred:", error);
      });
  };
  console.log("product_images", props?.product_images);

  return (
    <InvoiceCardWrap direction="row" flexWrap="wrap">
      <Box className="left_block">
        {!!props?.product_images && props?.product_images?.length == 1 ? (
          <figure>
            <img
              src={
                !!props?.product_images && props?.product_images?.length > 0
                  ? props?.product_images[0]
                  : ""
              }
              alt="product image"
              width={67}
              height={90}
            />
          </figure>
        ) : (
          <AvatarGroup max={3}>
            {!!props?.product_images &&
              props?.product_images?.length > 0 &&
              props?.product_images?.map((_img: any, indx: number) => (
                <Avatar alt="Remy Sharp" src={_img} key={indx + 1} />
              ))}
          </AvatarGroup>
        )}
        {/* <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src={assest.prd1} />
          <Avatar alt="Travis Howard" src={assest.prd2} />
          <Avatar alt="Cindy Baker" src={assest.prd3} />
          <Avatar alt="Travis Howard" src={assest.prd2} />
          <Avatar alt="Cindy Baker" src={assest.prd3} />
        </AvatarGroup> */}

        <Box className="product_details">
          <Typography variant="h5">{props?.name}</Typography>
          <Typography>${props?.amount_paid}</Typography>
        </Box>
      </Box>
      <Box className="rgt_block">
        <Typography className="order_id">
          Order ID:{" "}
          <Typography variant="caption" className="order_idText">
            {props?.sale_order}
          </Typography>
        </Typography>
        <List disablePadding>
          <ListItem disablePadding>
            {loading ? (
              <Chip
                icon={<CircularProgress size={20} thickness={4} />}
                label="Downloading invoice"
                className="invoice_chip"
              />
            ) : (
              <Chip
                icon={<DownloadIcon />}
                label="Download invoice"
                className="invoice_chip"
                onClick={() => {
                  downloadPdf(props?.id);
                }}
              />
            )}
          </ListItem>
          <ListItem disablePadding>
            <Chip label={props?.invoice_state} className="deliver_chip" />
          </ListItem>
        </List>
      </Box>
    </InvoiceCardWrap>
  );
}

export default function Index() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });
  const [invoiceList, setInvoiceList] = useState<any>([]);
  const [invoicePDF, setInvoicePDF] = useState<any>([]);
  const [type, setType] = useState("date");
  const [page, setPage] = useState(1);
  const onSuccessInvoiceList = (response: any) => {
    setInvoiceList(
      removeDuplicates([
        ...invoiceList,
        ...(response && response?.invoice_data ? response?.invoice_data : [])
      ])
    );
  };
  const { data, isLoading } = useInvoiceList(page, "", onSuccessInvoiceList);
  const { data: pdf } = useInvoiceDownload(297187);
  const fetchList = (isInview: boolean) => {
    console.log("isInview", isInview);

    if (isInview && !isLoading) {
      if (data?.page_count > page) {
        setPage(page + 1);
      }
    }
  };

  const base64ArrayBuffer = (arrayBuffer: ArrayBuffer): string => {
    let binary: string = "";
    const bytes: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i: number = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  const downloadPdf = async (id: string) => {
    const sessionId = sessionStorage.getItem("session_id") || "";
    const pdfDownloadInstance = axios.create({
      baseURL: process.env.NEXT_APP_BASE_URL,
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf"
      },
      params: { session_id: sessionId }
    });
    await pdfDownloadInstance
      .get(`/web/download/invoice_pdf/${id}`)
      .then((response: any) => {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "invoice.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error: any) => {
        console.error("An error occurred:", error);
      });
  };

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);
  console.log("useInvoiceList", invoiceList);
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box FixedHeightContainer">
          <div className="Content">
            <InvoiceWrapper>
              {invoiceList && invoiceList?.length > 0 ? (
                invoiceList?.map((item: any) => (
                  <InvoiceCard {...item} key={item?.orderId} />
                ))
              ) : !isLoading ? (
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  There is no invoices & bills
                </Typography>
              ) : (
                <></>
              )}
            </InvoiceWrapper>
            {!isLoading ? (
              <div ref={ref} />
            ) : (
              <div style={{ marginTop: "10px" }}>
                <ButtonLoaderSecondary />
              </div>
            )}
          </div>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
