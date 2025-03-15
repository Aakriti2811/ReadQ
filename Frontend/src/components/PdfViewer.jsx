// PDFViewerPage.jsx
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";

function PDFViewerPage() {
  const { gridfsId } = useParams(); // Get the GridFS ID from the URL
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Build the file URL from your backend
  const fileUrl = `${process.env.REACT_APP_API_URL}/freereads/file/${gridfsId}`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">PDF Viewer</h1>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 border rounded"
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PDFViewerPage;
