import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Trash2,
  Eye,
  Calendar,
  User,
  Settings,
  X,
} from "lucide-react";
import { Document } from "../types/document";
import { DocumentService } from "../services/documentService";
import AdminDocumentUpload from "./AdminDocumentUpload";
import DocumentViewer from "./DocumentViewer";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [selectedType, setSelectedType] = useState<"all" | "story" | "news">(
    "all"
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadDocuments();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(
        documents.filter((doc) => doc.type === selectedType)
      );
    }
  }, [documents, selectedType]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await DocumentService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUploaded = () => {
    // Reload all documents to ensure consistency with the service
    loadDocuments();
    setShowUploadModal(false);
  };

  const handleDeleteDocument = async (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await DocumentService.deleteDocument(id);
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      } catch (error) {
        console.error("Failed to delete document:", error);
        alert("Failed to delete document");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getContentTypeIcon = (contentType: Document["contentType"]) => {
    switch (contentType) {
      case "word":
        return "📄";
      case "pdf":
        return "📕";
      case "html":
        return "🌐";
      case "markdown":
        return "📝";
      case "image":
        return "🖼️";
      default:
        return "📄";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Document Management
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Filter by type */}
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as "all" | "story" | "news")
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Documents</option>
                <option value="story">Stories</option>
                <option value="news">News</option>
              </select>

              <span className="text-sm text-gray-500">
                {filteredDocuments.length} document
                {filteredDocuments.length !== 1 ? "s" : ""}
              </span>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <FileText className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">No documents found</p>
                <p className="text-sm">
                  Upload your first document to get started
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid gap-4">
                  {filteredDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">
                              {getContentTypeIcon(document.contentType)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {document.title}
                              </h3>
                              {document.subtitle && (
                                <p className="text-sm text-gray-600 truncate">
                                  {document.subtitle}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                document.type === "story"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {document.type}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {document.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {document.metadata.author && (
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{document.metadata.author}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {formatDate(document.metadata.createdAt)}
                              </span>
                            </div>
                            {document.metadata.wordCount && (
                              <span>{document.metadata.wordCount} words</span>
                            )}
                            {document.originalFileName && (
                              <span>Source: {document.originalFileName}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setSelectedDocument(document)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            title="Preview document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(document.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <AdminDocumentUpload
          onDocumentUploaded={handleDocumentUploaded}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {/* Document Viewer */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </>
  );
};

export default AdminPanel;
