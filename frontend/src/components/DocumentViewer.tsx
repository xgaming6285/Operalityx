import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Download,
  FileText,
  Calendar,
  User,
  ExternalLink,
  Search,
  ChevronDown,
} from "lucide-react";
import { DocumentViewerProps } from "../types/document";
import ContactForm from "./ContactForm";

// -----------------------------
// Types
// -----------------------------

type RelatedArticle = {
  id: string | number;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  createdAt?: string;
  description?: string;
};

type Props = DocumentViewerProps & {
  /** Optional: related items to show in the right sidebar */
  relatedArticles?: RelatedArticle[];
  /** Optional: called when a related item is clicked */
  onSelectArticle?: (article: RelatedArticle) => void;
};

const NAV_HEIGHT = 56; // px

// -----------------------------
// Sidebar (new)
// -----------------------------

type SidebarProps = {
  items: RelatedArticle[];
  formatDate: (d?: string) => string;
  onSelect?: (a: RelatedArticle) => void;
};

const RelatedSidebar: React.FC<SidebarProps> = ({ items, formatDate, onSelect }) => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "title">("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((a) =>
      q
        ? `${a.title} ${a.subtitle ?? ""} ${a.description ?? ""}`.toLowerCase().includes(q)
        : true
    );

    return [...list].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      // recent first (fallback to 0)
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [items, query, sortBy]);

  const isNew = (d?: string) => {
    if (!d) return false;
    const created = new Date(d).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - created < sevenDays;
  };

  return (
    <aside className="hidden lg:flex flex-col border-l border-gray-200 bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50 min-h-0">
      {/* Sticky/filter bar */}
      <div className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur border-b border-gray-200">
        <div className="px-5 pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">More articles</div>
              <div className="text-xs text-gray-500">You might also like</div>
            </div>
            <div className="text-[11px] text-gray-500">{filtered.length} results</div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center gap-2 pb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Search related articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none text-xs pl-3 pr-7 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Most recent</option>
                <option value="title">Title (A–Z)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

             {/* List */}
       <div className="flex-1 overflow-auto scrollbar-hide px-4 py-4 space-y-4">
         {filtered.map((a) => (
           <button
             key={a.id}
             onClick={() => onSelect?.(a)}
             className="group w-full text-left"
             aria-label={`Open ${a.title}`}
           >
             <div className="rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
               {/* Thumbnail - larger and more prominent */}
               <div className="relative w-full h-32 overflow-hidden bg-gray-100">
                 {a.thumbnail ? (
                   <img
                     src={a.thumbnail}
                     alt={a.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                     loading="lazy"
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">
                     <FileText className="w-8 h-8" />
                   </div>
                 )}
                 {/* Enhanced gradient overlay */}
                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                 
                 {/* New badge positioned on thumbnail */}
                 {isNew(a.createdAt) && (
                   <div className="absolute top-2 right-2">
                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
                       New
                     </span>
                   </div>
                 )}
               </div>

               {/* Content - more spacious */}
               <div className="p-4">
                 <div className="flex items-start justify-between gap-3 mb-2">
                   <h4 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
                     {a.title}
                   </h4>
                   <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1 group-hover:text-gray-600 transition-colors" />
                 </div>
                 
                 {a.subtitle && (
                   <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">{a.subtitle}</p>
                 )}

                 <div className="flex items-center gap-3 text-xs text-gray-500">
                   {a.createdAt && (
                     <span className="inline-flex items-center gap-1.5">
                       <Calendar className="w-4 h-4" />
                       {formatDate(a.createdAt)}
                     </span>
                   )}
                 </div>
               </div>
             </div>
           </button>
         ))}

        {filtered.length === 0 && (
          <div className="px-3 py-10 text-center text-sm text-gray-500">
            No articles match your search.
          </div>
        )}
      </div>
    </aside>
  );
};

// -----------------------------
// Main viewer
// -----------------------------

const DocumentViewer: React.FC<Props> = ({
  document: doc,
  onClose,
  fullscreen = false,
  relatedArticles = [],
  onSelectArticle,
}) => {
  // Device / layout state
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showMetadata, setShowMetadata] = useState(false);
  const [isCleanView, setIsCleanView] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  // Detect mobile and maintain fullscreen default
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && !fullscreen) {
        setIsFullscreen(true);
      } else if (!mobile && !fullscreen) {
        setIsFullscreen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [fullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCleanView) {
          setIsCleanView(false);
        } else if (isFullscreen && !isMobile) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if ((e.key === "h" || e.key === "H") && doc.contentType === "pdf") {
        setIsCleanView((v) => !v);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, isCleanView, isMobile, onClose, doc.contentType]);

  // Help bubble when entering clean view
  useEffect(() => {
    if (isCleanView) {
      setShowHelpTooltip(true);
      const t = setTimeout(() => setShowHelpTooltip(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isCleanView]);

  const toggleFullscreen = () => {
    if (isMobile && isFullscreen) return; // keep fullscreen on mobile
    setIsFullscreen((v) => !v);
  };

  const toggleCleanView = () => setIsCleanView((v) => !v);

  const downloadDocument = () => {
    if (doc.contentType === "pdf") {
      const a = document.createElement("a");
      a.href = doc.content;
      a.download = doc.originalFileName || `${doc.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasSidebar = useMemo(
    () => Array.isArray(relatedArticles) && relatedArticles.length > 0,
    [relatedArticles]
  );

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isFullscreen || isCleanView
          ? "bg-white"
          : "bg-black/50 flex items-center justify-center p-4"
      }`}
    >
      {/* Outer container */}
      <div
        className={`relative bg-white ${
          isFullscreen || isCleanView
            ? "w-full h-full"
            : "w-full max-w-[1200px] h-full max-h-[92vh] rounded-2xl shadow-2xl"
        } flex flex-col overflow-hidden`}
        style={{
          // smooth corners in non-fullscreen
          ...(isFullscreen || isCleanView ? {} : { backdropFilter: "blur(0.5px)" }),
        }}
      >
        {/* Sticky Nav (always visible) */}
        <div
          className="sticky top-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200"
          style={{ height: NAV_HEIGHT }}
        >
          <div className="h-full px-3 sm:px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 border border-gray-200">
                <FileText className="w-4 h-4 text-gray-700" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-[15px] truncate">
                  {doc.title}
                </h3>
                {doc.subtitle && (
                  <p className="text-[11px] sm:text-xs text-gray-500 truncate">{doc.subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Metadata toggle (desktop) */}
              {!isMobile && (
                <button
                  onClick={() => setShowMetadata((v) => !v)}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title="Show document info"
                >
                  <FileText className="w-4 h-4 text-gray-700" />
                </button>
              )}

              {/* Clean view for PDFs (desktop) */}
              {doc.contentType === "pdf" && !isMobile && (
                <button
                  onClick={toggleCleanView}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title="Toggle clean view (H)"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              )}

              {/* Download */}
              <button
                onClick={downloadDocument}
                className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                title="Download document"
              >
                <Download className="w-4 h-4 text-gray-700" />
              </button>

              {/* Fullscreen toggle (desktop) */}
              {!isMobile && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-700" />
                  )}
                </button>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                title="Close viewer"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Metadata row (desktop only) */}
          {showMetadata && !isMobile && (
            <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600 bg-white/80">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {doc.metadata?.author && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{doc.metadata.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="truncate">{formatDate(doc.metadata?.createdAt)}</span>
                </div>
                {doc.metadata?.wordCount && <div>{doc.metadata.wordCount} words</div>}
                {doc.originalFileName && <div className="truncate">Source: {doc.originalFileName}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Content Area: main + sidebar */}
        <div className="flex-1 min-h-0">
          <div
            className={`grid h-full ${
              hasSidebar ? "lg:grid-cols-[1fr_360px]" : "grid-cols-1"
            }`}
          >
            {/* MAIN */}
            <div className="min-h-0 overflow-auto bg-white scrollbar-hide">
              {/* Padding top = 0 because header is sticky and outside scroll context */}
              <div
                className={`${isCleanView ? "" : "px-4 sm:px-6 lg:px-8"} py-0`}
                style={{ minHeight: `calc(100% - 0px)` }}
              >
                {/* Render content EXACTLY */}
                <div className="w-full h-full">
                  {doc.contentType === "pdf" ? (
                    <iframe
                      src={doc.content}
                      className="w-full"
                      style={{
                        border: "none",
                        width: "100%",
                        // Full-height minus a little breathing space at bottom
                        height: `calc(100vh - ${NAV_HEIGHT + 8}px)`,
                      }}
                      title={doc.title}
                    />
                  ) : doc.contentType === "image" ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: doc.content }}
                      style={{
                        width: "100%",
                        minHeight: `calc(100vh - ${NAV_HEIGHT + 8}px)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                      }}
                    />
                  ) : (
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: doc.content }}
                        style={{
                          width: "100%",
                          minHeight: `calc(100vh - ${NAV_HEIGHT + 8}px)`,
                          backgroundColor: "white",
                        }}
                        className={`${isCleanView ? "" : "prose max-w-none prose-p:leading-7"} `}
                      />
                      {/* Contact form for HTML */}
                      <div className={`${isCleanView ? "hidden" : "px-0 sm:px-2 lg:px-4 py-6 border-t border-gray-200 bg-white"}`}>
                        <ContactForm
                          articleTitle={doc.title}
                          className="max-w-2xl mx-auto"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SIDEBAR (enhanced) */}
            {hasSidebar && (
              <RelatedSidebar items={relatedArticles} formatDate={formatDate} onSelect={onSelectArticle} />
            )}
          </div>
        </div>

        {/* Help tooltip for clean view (still visible, but nav remains) */}
        {isCleanView && showHelpTooltip && (
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-30 bg-black/80 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
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
