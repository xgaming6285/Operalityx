import React, { useEffect, useState } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Download,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { DocumentViewerProps } from "../types/document";

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document: doc,
  onClose,
  fullscreen = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showMetadata, setShowMetadata] = useState(false);
  const [isCleanView, setIsCleanView] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCleanView) {
          setIsCleanView(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      // Add 'H' key to toggle clean view for PDFs
      if (e.key === "h" || e.key === "H") {
        if (doc.contentType === "pdf") {
          setIsCleanView(!isCleanView);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, isCleanView, onClose, doc.contentType]);

  // Show help tooltip when entering clean view
  useEffect(() => {
    if (isCleanView) {
      setShowHelpTooltip(true);
      const timer = setTimeout(() => {
        setShowHelpTooltip(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isCleanView]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleCleanView = () => {
    setIsCleanView(!isCleanView);
  };

  const downloadDocument = () => {
    if (doc.contentType === "pdf") {
      // For PDFs, download the blob URL directly
      const a = document.createElement("a");
      a.href = doc.content; // This is the blob URL for PDFs
      a.download = doc.originalFileName || `${doc.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // For other content types, create a download link for the document content
      const blob = new Blob([doc.content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isFullscreen || isCleanView
          ? "bg-white"
          : "bg-black bg-opacity-50 flex items-center justify-center p-4"
      }`}
    >
      {/* Viewer Container */}
      <div
        className={`relative bg-white ${
          isFullscreen || isCleanView
            ? "w-full h-full"
            : "w-full max-w-6xl h-full max-h-[90vh] rounded-lg shadow-2xl"
        } flex flex-col overflow-hidden`}
      >
        {/* Header Bar - Hide completely in clean view */}
        {!isCleanView && (
          <div
            className={`absolute top-0 left-0 right-0 z-10 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 p-3 transition-all duration-300 ${
              isFullscreen ? "opacity-0 hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {doc.title}
                  </h3>
                  {doc.subtitle && (
                    <p className="text-xs text-gray-500">{doc.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Clean view toggle for PDFs */}
                {doc.contentType === "pdf" && (
                  <button
                    onClick={toggleCleanView}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    title="Toggle clean view (H)"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                )}

                {/* Metadata toggle */}
                <button
                  onClick={() => setShowMetadata(!showMetadata)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title="Show document info"
                >
                  <FileText className="w-4 h-4 text-gray-600" />
                </button>

                {/* Download button */}
                <button
                  onClick={downloadDocument}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title="Download document"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                </button>

                {/* Fullscreen toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title="Close viewer"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Metadata Panel */}
            {showMetadata && (
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {doc.metadata.author && (
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{doc.metadata.author}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(doc.metadata.createdAt)}</span>
                  </div>
                  {doc.metadata.wordCount && (
                    <div>
                      <span>{doc.metadata.wordCount} words</span>
                    </div>
                  )}
                  {doc.originalFileName && (
                    <div>
                      <span>Source: {doc.originalFileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Document Content - Renders exactly as the original without any viewer borders */}
        <div
          className={`flex-1 overflow-auto ${
            !isFullscreen && !isCleanView ? "pt-16" : "pt-0"
          } bg-white`}
          style={{
            // Remove all default browser styling that might interfere
            margin: 0,
            padding: 0,
            border: "none",
            outline: "none",
          }}
        >
          {/* Content Frame */}
          <div
            className="w-full h-full"
            style={{
              // Ensure the content renders exactly as designed
              backgroundColor: "white",
              minHeight: "100%",
            }}
          >
            {doc.contentType === "pdf" ? (
              // For PDFs, render using iframe/embed for native PDF display
              <iframe
                src={doc.content}
                className="w-full h-full"
                style={{
                  border: "none",
                  minHeight: isCleanView ? "100vh" : "100vh",
                  width: "100%",
                  height: "100%",
                }}
                title={doc.title}
              />
            ) : doc.contentType === "image" ? (
              // For images, render without any container styling
              <div
                dangerouslySetInnerHTML={{ __html: doc.content }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            ) : (
              // For other content types, render the HTML directly
              <div
                dangerouslySetInnerHTML={{ __html: doc.content }}
                style={{
                  // Critical: No borders, margins, or styling that would interfere
                  width: "100%",
                  minHeight: "100%",
                  backgroundColor: "white",
                }}
              />
            )}
          </div>
        </div>

        {/* Help tooltip for clean view */}
        {isCleanView && showHelpTooltip && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm animate-fade-in">
            <div className="text-center">
              <p>Clean View Mode</p>
              <p className="text-xs mt-1">Press H to toggle • ESC to exit</p>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close (only when not fullscreen and not clean view) */}
      {!isFullscreen && !isCleanView && (
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      )}
    </div>
  );
};

export default DocumentViewer;
