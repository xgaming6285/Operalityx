import { Document, DocumentUpload } from "../types/document";
import * as pdfjsLib from "pdfjs-dist";

// Set worker path for pdfjs - use local worker file to avoid CORS issues
pdfjsLib.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.mjs";

// Mock data for development - replace with API calls in production
const mockDocuments: Document[] = [
  {
    id: "1",
    title: "MediCore Success Story",
    subtitle: "AI-Powered Diagnostics",
    description:
      "MediCore uses Operalytix to reduce diagnosis time through AI pattern detection.",
    type: "story",
    contentType: "html",
    thumbnail: "/stories/Operalityx - Site Design 9062025 (21).png",
    content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #1a365d; margin-bottom: 20px; font-size: 2.5em;">MediCore Success Story</h1>
        <h2 style="color: #2d3748; margin-bottom: 30px; font-size: 1.5em;">Revolutionizing Healthcare with AI-Powered Diagnostics</h2>
        
        <p style="margin-bottom: 20px; font-size: 1.1em;">MediCore, a leading healthcare provider, has successfully integrated Operalytix's advanced AI platform to transform their diagnostic processes. This partnership has resulted in unprecedented improvements in patient care and operational efficiency.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">The Challenge</h3>
        <p style="margin-bottom: 20px;">Healthcare professionals at MediCore were facing increasing pressure to provide faster, more accurate diagnoses while managing growing patient volumes. Traditional diagnostic methods were proving insufficient for the complex patterns emerging in modern healthcare data.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">The Solution</h3>
        <p style="margin-bottom: 20px;">By implementing Operalytix's AI pattern detection system, MediCore was able to:</p>
        <ul style="margin-bottom: 20px; padding-left: 30px;">
          <li style="margin-bottom: 10px;">Reduce average diagnosis time by 65%</li>
          <li style="margin-bottom: 10px;">Improve diagnostic accuracy by 40%</li>
          <li style="margin-bottom: 10px;">Process 3x more patient data simultaneously</li>
          <li style="margin-bottom: 10px;">Identify rare conditions 80% faster</li>
        </ul>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">Results</h3>
        <p style="margin-bottom: 20px;">The implementation of Operalytix has transformed MediCore's operations, enabling them to serve more patients with higher quality care while reducing operational costs by 30%.</p>
        
        <blockquote style="border-left: 4px solid #4299e1; padding-left: 20px; margin: 30px 0; font-style: italic; color: #4a5568;">
          "Operalytix has revolutionized our diagnostic capabilities. We can now provide our patients with faster, more accurate diagnoses, which directly translates to better health outcomes." - Dr. Sarah Johnson, Chief Medical Officer
        </blockquote>
      </div>
    `,
    metadata: {
      author: "Operalytix Team",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      wordCount: 245,
    },
  },
  {
    id: "2",
    title: "Research Acceleration",
    subtitle: "Adaptive Automation Tools",
    description:
      "Accelerating research breakthroughs with adaptive automation tools.",
    type: "story",
    contentType: "html",
    thumbnail: "/stories/Operalityx - Site Design 9062025 (20).png",
    content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #1a365d; margin-bottom: 20px; font-size: 2.5em;">Research Acceleration Initiative</h1>
        <h2 style="color: #2d3748; margin-bottom: 30px; font-size: 1.5em;">Adaptive Automation Tools Transforming Scientific Discovery</h2>
        
        <p style="margin-bottom: 20px; font-size: 1.1em;">Leading research institutions worldwide are leveraging Operalytix's adaptive automation tools to accelerate scientific breakthroughs and streamline complex research workflows.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">The Research Challenge</h3>
        <p style="margin-bottom: 20px;">Modern scientific research generates vast amounts of data that require sophisticated analysis. Traditional methods often create bottlenecks that slow down the pace of discovery and limit researchers' ability to identify meaningful patterns.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">Adaptive Automation Solution</h3>
        <p style="margin-bottom: 20px;">Operalytix's adaptive automation platform provides:</p>
        <ul style="margin-bottom: 20px; padding-left: 30px;">
          <li style="margin-bottom: 10px;">Intelligent data processing pipelines</li>
          <li style="margin-bottom: 10px;">Automated hypothesis generation</li>
          <li style="margin-bottom: 10px;">Real-time experimental optimization</li>
          <li style="margin-bottom: 10px;">Cross-domain pattern recognition</li>
        </ul>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">Impact on Discovery</h3>
        <p style="margin-bottom: 20px;">Research teams using Operalytix have reported a 300% increase in the speed of data analysis and a 150% improvement in the identification of significant research findings.</p>
      </div>
    `,
    metadata: {
      author: "Research Team",
      createdAt: "2024-01-10T14:30:00Z",
      updatedAt: "2024-01-10T14:30:00Z",
      wordCount: 185,
    },
  },
  {
    id: "news-1",
    title: "Modular Outputs Launch",
    subtitle: "May 2025",
    description: "Introducing Modular Outputs in the Operalytix API",
    type: "news",
    contentType: "html",
    thumbnail: "/news/news-1.png",
    content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #1a365d; margin-bottom: 20px; font-size: 2.5em;">Introducing Modular Outputs</h1>
        <h2 style="color: #2d3748; margin-bottom: 30px; font-size: 1.5em;">Enhanced Flexibility in the Operalytix API</h2>
        
        <p style="margin-bottom: 20px; font-size: 1.1em; color: #4a5568;"><strong>Release Date: May 2025</strong></p>
        
        <p style="margin-bottom: 20px; font-size: 1.1em;">We're excited to announce the launch of Modular Outputs, a powerful new feature that gives developers unprecedented control over how data is processed and returned through the Operalytix API.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">What's New</h3>
        <ul style="margin-bottom: 20px; padding-left: 30px;">
          <li style="margin-bottom: 10px;"><strong>Customizable Output Formats:</strong> Choose from JSON, XML, CSV, or custom schemas</li>
          <li style="margin-bottom: 10px;"><strong>Selective Data Extraction:</strong> Specify exactly which data points you need</li>
          <li style="margin-bottom: 10px;"><strong>Real-time Processing:</strong> Stream outputs as they're generated</li>
          <li style="margin-bottom: 10px;"><strong>Integration Templates:</strong> Pre-built modules for popular platforms</li>
        </ul>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">Getting Started</h3>
        <p style="margin-bottom: 20px;">Modular Outputs are available to all API subscribers starting today. Check out our updated documentation and migration guide to learn how to implement these features in your existing workflows.</p>
        
        <div style="background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 20px; margin: 30px 0;">
          <p style="margin: 0; color: #2a4d69;"><strong>Pro Tip:</strong> Use the new output preview feature to test your configurations before deploying to production.</p>
        </div>
      </div>
    `,
    metadata: {
      author: "Product Team",
      createdAt: "2024-01-20T09:00:00Z",
      updatedAt: "2024-01-20T09:00:00Z",
      wordCount: 156,
    },
  },
  {
    id: "news-2",
    title: "API Quickstart",
    description: "Start building intelligent workflows with one call",
    type: "news",
    contentType: "html",
    thumbnail: "/news/news-2.webp",
    content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #1a365d; margin-bottom: 20px; font-size: 2.5em;">API Quickstart Guide</h1>
        <h2 style="color: #2d3748; margin-bottom: 30px; font-size: 1.5em;">Build Intelligent Workflows in Minutes</h2>
        
        <p style="margin-bottom: 20px; font-size: 1.1em;">Get up and running with the Operalytix API in just a few simple steps. Our streamlined quickstart process gets you from zero to production-ready workflows faster than ever.</p>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">Quick Setup</h3>
        <ol style="margin-bottom: 20px; padding-left: 30px;">
          <li style="margin-bottom: 10px;">Sign up for your API key at operalytix.com/api</li>
          <li style="margin-bottom: 10px;">Install our SDK: <code style="background-color: #f7fafc; padding: 2px 6px; border-radius: 3px;">npm install @operalytix/sdk</code></li>
          <li style="margin-bottom: 10px;">Make your first API call</li>
          <li style="margin-bottom: 10px;">Scale your implementation</li>
        </ol>
        
        <h3 style="color: #2d3748; margin-top: 30px; margin-bottom: 15px;">One-Call Intelligence</h3>
        <p style="margin-bottom: 20px;">With a single API call, you can:</p>
        <ul style="margin-bottom: 20px; padding-left: 30px;">
          <li style="margin-bottom: 10px;">Process complex data patterns</li>
          <li style="margin-bottom: 10px;">Generate intelligent insights</li>
          <li style="margin-bottom: 10px;">Automate decision workflows</li>
          <li style="margin-bottom: 10px;">Scale across multiple domains</li>
        </ul>
        
        <div style="background-color: #f0fff4; border-left: 4px solid #38a169; padding: 20px; margin: 30px 0;">
          <p style="margin: 0; color: #276749;"><strong>Ready to start?</strong> Visit our interactive playground to test the API without writing any code.</p>
        </div>
      </div>
    `,
    metadata: {
      author: "Developer Relations",
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
      wordCount: 142,
    },
  },
];

export class DocumentService {
  // Get all documents by type
  static async getDocuments(type?: "story" | "news"): Promise<Document[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (type) {
      return mockDocuments.filter((doc) => doc.type === type);
    }
    return mockDocuments;
  }

  // Get a single document by ID
  static async getDocument(id: string): Promise<Document | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockDocuments.find((doc) => doc.id === id) || null;
  }

  // Upload and convert document
  static async uploadDocument(upload: DocumentUpload): Promise<Document> {
    const file = upload.file;
    // Generate a more unique ID to prevent duplicates
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Determine content type based on file extension
    const extension = file.name.split(".").pop()?.toLowerCase();
    let contentType: Document["contentType"] = "html";

    switch (extension) {
      case "docx":
      case "doc":
        contentType = "word";
        break;
      case "pdf":
        contentType = "pdf";
        break;
      case "html":
      case "htm":
        contentType = "html";
        break;
      case "md":
        contentType = "markdown";
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        contentType = "image";
        break;
    }

    // Convert file content to HTML or appropriate format
    const content = await this.convertFileToHTML(file, contentType);

    const newDocument: Document = {
      id,
      title: upload.title,
      subtitle: upload.subtitle,
      description: upload.description,
      type: upload.type,
      contentType,
      originalFileName: file.name,
      content,
      metadata: {
        author: "Admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fileSize: file.size,
        wordCount: this.countWords(content),
      },
    };

    // In a real app, this would be sent to the backend
    mockDocuments.push(newDocument);

    return newDocument;
  }

  // Convert various file types to HTML for display
  private static async convertFileToHTML(
    file: File,
    contentType: Document["contentType"]
  ): Promise<string> {
    switch (contentType) {
      case "pdf":
        return this.handlePDFFile(file);
      case "image":
        return this.convertImageToHTML(file);
      case "markdown":
        return this.convertMarkdownToHTML(file);
      case "html":
        return this.convertHTMLFile(file);
      case "word":
      default:
        return this.createPlaceholderContent(file, contentType);
    }
  }

  // Handle PDF files by creating a blob URL for native display
  private static async handlePDFFile(file: File): Promise<string> {
    try {
      // Create a blob URL for the PDF file
      const blobUrl = URL.createObjectURL(file);

      // Return a simple container that will hold the PDF blob URL
      // The actual PDF rendering will be handled in the DocumentViewer component
      return blobUrl;
    } catch (error) {
      console.error("Error handling PDF file:", error);
      return this.createPlaceholderContent(file, "pdf");
    }
  }

  // Convert image files to HTML
  private static async convertImageToHTML(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(
          `<div style="text-align: center; padding: 20px;"><img src="${result}" alt="${file.name}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" /></div>`
        );
      };
      reader.readAsDataURL(file);
    });
  }

  // Convert markdown files to HTML
  private static async convertMarkdownToHTML(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Basic markdown to HTML conversion (in production, use a proper markdown parser)
        const htmlContent = result
          .replace(/^# (.*$)/gim, "<h1>$1</h1>")
          .replace(/^## (.*$)/gim, "<h2>$1</h2>")
          .replace(/^### (.*$)/gim, "<h3>$1</h3>")
          .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
          .replace(/\*(.*)\*/gim, "<em>$1</em>")
          .replace(/\n/gim, "<br/>");
        resolve(
          `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">${htmlContent}</div>`
        );
      };
      reader.readAsText(file);
    });
  }

  // Convert HTML files
  private static async convertHTMLFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.readAsText(file);
    });
  }

  // Create placeholder content for unsupported formats
  private static async createPlaceholderContent(
    file: File,
    contentType: Document["contentType"]
  ): Promise<string> {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="color: #1a365d; margin-bottom: 20px;">${file.name}</h1>
        <p style="margin-bottom: 20px; font-size: 1.1em;">This document has been imported from ${
          file.name
        }.</p>
        <p style="margin-bottom: 20px;">In a production environment, this would show the actual converted content from the ${contentType.toUpperCase()} file.</p>
        <div style="background-color: #f7fafc; border: 1px dashed #cbd5e0; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #4a5568;">Document content would appear here after conversion</p>
          <p style="margin: 10px 0 0 0; color: #718096; font-size: 0.9em;">File: ${
            file.name
          } (${(file.size / 1024).toFixed(1)} KB)</p>
        </div>
      </div>
    `;
  }

  // Count words in content (remove HTML tags for accurate count)
  private static countWords(content: string): number {
    const textContent = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return textContent ? textContent.split(" ").length : 0;
  }

  // Delete document
  static async deleteDocument(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = mockDocuments.findIndex((doc) => doc.id === id);
    if (index > -1) {
      mockDocuments.splice(index, 1);
      return true;
    }
    return false;
  }
}
