import React, { useState, useRef } from "react";
import {
  Upload,
  File,
  X,
  Plus,
  Save,
  AlertCircle,
  CheckCircle,
  FileText,
  Image,
  FileCode,
} from "lucide-react";
import { DocumentUpload, Document } from "../types/document";
import { DocumentService } from "../services/documentService";

interface AdminDocumentUploadProps {
  onDocumentUploaded: (document: Document) => void;
  onClose: () => void;
}

const AdminDocumentUpload: React.FC<AdminDocumentUploadProps> = ({
  onDocumentUploaded,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"story" | "news">("story");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFileTypes = [
    { ext: ".docx", type: "Word Document", icon: FileText },
    { ext: ".doc", type: "Word Document", icon: FileText },
    { ext: ".pdf", type: "PDF Document", icon: FileText },
    { ext: ".html", type: "HTML Document", icon: FileCode },
    { ext: ".htm", type: "HTML Document", icon: FileCode },
    { ext: ".md", type: "Markdown", icon: FileCode },
    { ext: ".jpg", type: "Image", icon: Image },
    { ext: ".jpeg", type: "Image", icon: Image },
    { ext: ".png", type: "Image", icon: Image },
    { ext: ".gif", type: "Image", icon: Image },
    { ext: ".webp", type: "Image", icon: Image },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill title from filename if empty
      if (!title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitle(nameWithoutExt);
      }
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (!title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitle(nameWithoutExt);
      }
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = "." + fileName.split(".").pop()?.toLowerCase();
    const fileType = supportedFileTypes.find((type) => type.ext === ext);
    const IconComponent = fileType?.icon || File;
    return <IconComponent className="w-8 h-8 text-blue-500" />;
  };

  const getFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim() || !description.trim()) {
      setErrorMessage("Please fill in all required fields and select a file.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");

    try {
      const upload: DocumentUpload = {
        file: selectedFile,
        type,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
      };

      const newDocument = await DocumentService.uploadDocument(upload);
      setUploadStatus("success");
      onDocumentUploaded(newDocument);

      // Reset form after successful upload
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to upload document"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTitle("");
    setSubtitle("");
    setDescription("");
    setType("story");
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Document Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="story"
                  checked={type === "story"}
                  onChange={(e) => setType(e.target.value as "story" | "news")}
                  className="mr-2"
                />
                <span>Story</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="news"
                  checked={type === "news"}
                  onChange={(e) => setType(e.target.value as "story" | "news")}
                  className="mr-2"
                />
                <span>News</span>
              </label>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document File *
            </label>

            {!selectedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your document here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports: Word, PDF, HTML, Markdown, Images
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.doc,.pdf,.html,.htm,.md,.jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3">
                  {getFileIcon(selectedFile.name)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter document title"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter subtitle (optional)"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a brief description of the document"
            />
          </div>

          {/* Supported File Types */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Supported File Types:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
              {supportedFileTypes.map((fileType, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <fileType.icon className="w-3 h-3" />
                  <span>
                    {fileType.ext} - {fileType.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Messages */}
          {uploadStatus === "success" && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700">
                Document uploaded successfully!
              </span>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={
              !selectedFile ||
              !title.trim() ||
              !description.trim() ||
              isUploading
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Upload Document</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentUpload;
