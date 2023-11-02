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
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function InvoiceCard({ ...props }: any) {
  const router = useRouter();

  return (
    <InvoiceCardWrap direction="row" flexWrap="wrap">
      <Box className="left_block">
        <figure>
          <img
            src={props?.image_1920_url}
            alt="product image"
            width={67}
            height={90}
          />
        </figure>
        <Box className="product_details">
          <Typography variant="h5">{props?.name}</Typography>
          <Typography>${props?.amount_residual}</Typography>
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
            <Chip
              icon={<DownloadIcon />}
              label="Download invoice"
              className="invoice_chip"
              onClick={() => {
                // router.push(props?.pdf_download_url);
                // const link = document.createElement("a");
                // // link.href = "https://picsum.photos/id/1/200/300";
                // link.href = props?.pdf_download_url ?? "";
                // link.download = `${props?.name ?? "Document"}.pdf`; // specify the filename
                // // document.body.appendChild(link);
                // link.target = "_blank";
                // link.click();
                // // document.body.removeChild(link);
              }}
            />
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
    setInvoiceList([
      ...invoiceList,
      ...(response ? response?.invoice_data : [])
    ]);
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
  const downloadPdf = async () => {
    const responseData = pdf?.data ?? "";
    const encoder: TextEncoder = new TextEncoder();
    const data: Uint8Array = encoder.encode(responseData);
    // const blob= new Blob([data])
    // try {
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   if (link.download !== undefined) { // feature detection
    //     link.setAttribute('href', url);
    //     // link.setAttribute('download', fileName);
    //     // link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // } catch (e) {
    //   console.error('BlobToSaveAs error', e);
    // }
    // Convert the binary data to base64
    const base64: string = base64ArrayBuffer(data);
    console.log(pdf?.data, "objectURL");
    // const linkSource = `data:application/pdf;base64,${base64}`;
    const linkSource = `data:application/pdf;base64,${''}`;
    const downloadLink = document.createElement("a");
    const fileName = "Document-test.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    
    // const link = document.createElement("a");
    // const blob = new Blob([pdf?.data], { type: "application/pdf" });
    // let objectURL = URL.createObjectURL(blob);
    // link.href = pdf?.data
    // link.download = "download"
    // link.target = "_blank";
    // link.click();
    
  };

  useEffect(() => {
    if (inView) {
      fetchList(inView);
    }
  }, [inView]);
  console.log("useInvoiceList", pdf?.data);
  return (
    <Wrapper>
      <DashboardWrapper>
        <Box className="cmn_box">
          <Chip
            icon={<DownloadIcon />}
            label="Download invoice"
            className="invoice_chip"
            onClick={() => {
              downloadPdf();
              // // router.push(props?.pdf_download_url);
              // const link = document.createElement("a");
              // link.href = pdf ? window.URL.createObjectURL(pdf?.data) : "";
              // // link.href = props?.pdf_download_url;
              // link.download = "document.pdf"; // specify the filename
              // // document.body.appendChild(link);
              // link.target = "_blank";
              // link.click();
              // // alert("came here");
              // // document.body.removeChild(link);
            }}
          />
          <InvoiceWrapper>
            {invoiceList?.map((item: any) => (
              <InvoiceCard {...item} key={item?.orderId} />
            ))}
          </InvoiceWrapper>
          <>{!isLoading && <div ref={ref}></div>}</>
        </Box>
      </DashboardWrapper>
    </Wrapper>
  );
}
