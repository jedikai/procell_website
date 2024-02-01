import React, { memo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.entry";
import { Box, CircularProgress } from "@mui/material";
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }: any) => {
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setLoading(false);
  }
  return (
    <>
      <div
        style={{
          margin: "auto",
          width: "100%",
          padding: "0px 10px 0px 10px",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "620px",
          textAlign: "center"
        }}
      >
        <Document
          // options={{ workerSrc: "/pdf.worker.js" }}
          file={pdfUrl ?? ""}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {loading ? (
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page loading={false} scale={1.2} pageNumber={page} />
                ))}
            </>
          )}
        </Document>
      </div>
    </>
  );
};

export default memo(PdfViewer);
