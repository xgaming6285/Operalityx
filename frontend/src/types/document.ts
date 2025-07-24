export interface Document {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: "story" | "news";
  contentType: "word" | "pdf" | "html" | "markdown" | "image";
  originalFileName?: string;
  thumbnail?: string;
  content: string; // HTML content or base64 for images
  metadata: {
    author?: string;
    createdAt: string;
    updatedAt: string;
    fileSize?: number;
    wordCount?: number;
  };
}



export interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
  fullscreen?: boolean;
}
