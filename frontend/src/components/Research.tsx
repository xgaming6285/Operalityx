import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useMemo } from "react";
import { useDragScroll } from "../hooks/useDragScroll";
import { useArticles } from "../hooks/useArticles";
import DocumentViewer from "./DocumentViewer";

const Research = () => {
  const { scrollLeft, scrollRight, getDragProps, preventClickAfterDrag } = useDragScroll();

  const {
    articles: researchArticles,
    loading: isLoading,
    showArticleViewer,
    currentDocument: selectedDocument, // derived Document
    openArticle,
    openArticleById,                   // <-- use this for sidebar clicks
    closeArticleViewer,

    // from enhanced hook (optional but nice):
    relatedByType,
    getRelated,
  } = useArticles({ type: "research" });

  const handleCardClick = (article: any, e: React.MouseEvent) => {
    if (preventClickAfterDrag(e)) return;
    openArticle(article);
  };

  const handleDownloadPDF = (article: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (article.pdfFile) {
      const link = document.createElement("a");
      link.href = article.pdfFile;
      link.download = article.pdfFile.split("/").pop() || "research.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderLoadingSkeleton = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex-none w-80 sm:w-96 rounded-2xl sm:rounded-3xl h-[400px] sm:h-[450px] bg-gray-200 animate-pulse"
      />
    ));

  const renderEmptyState = () => (
    <div className="flex-none w-full text-center py-20">
      <p className="text-gray-500 text-lg">No research articles available</p>
      <p className="text-gray-400 text-sm mt-2">Research articles will appear here when available</p>
    </div>
  );

  // Build the sidebar list: prefer same-category (if your ArticleMeta has `category`), else same-type
  const relatedForSidebar = useMemo(() => {
    const sameCategory = getRelated ? getRelated({ byCategory: true, limit: 12 }) : [];
    const base = sameCategory && sameCategory.length ? sameCategory : (relatedByType || []);
    return base.map((a: any) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      thumbnail: a.thumbnail,
      createdAt: a.createdAt,
      description: a.description,
    }));
  }, [getRelated, relatedByType]);

  return (
    <>
      <section id="research" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="w-full pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Research
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-16 sm:w-20 h-1 bg-gray-900 rounded-full" />
                <div className="w-8 sm:w-12 h-1 bg-gray-300 rounded-full" />
                <div className="w-6 sm:w-8 h-1 bg-gray-200 rounded-full" />
              </div>
            </div>
            {/* Navigation arrows */}
            <div className="flex items-center space-x-3">
              <button
                onClick={scrollLeft}
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Research Cards - Horizontal Scroll */}
          <div
            {...getDragProps()}
            className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
          >
            {isLoading ? (
              renderLoadingSkeleton()
            ) : researchArticles.length === 0 ? (
              renderEmptyState()
            ) : (
              researchArticles.map((article: any) => (
                <div
                  key={article.id}
                  className="flex-none w-80 sm:w-96 group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative"
                  onClick={(e) => handleCardClick(article, e)}
                >
                  <div className="relative h-[400px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200">
                    {/* Research Image as Card */}
                    <div className="relative w-full h-full">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay for hover effect */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

                      {/* PDF Download Button */}
                      {article.pdfFile && (
                        <button
                          onClick={(e) => handleDownloadPDF(article, e)}
                          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                          aria-label="Download full research PDF"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                      )}

                      {/* Card info overlay - always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          <div className="text-xs sm:text-sm font-medium opacity-90 uppercase tracking-wider mb-2">
                            Research •{" "}
                            {new Date(article.createdAt || "").toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold leading-tight mb-2">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm opacity-90 line-clamp-2">
                            {article.description}
                          </p>
                          {article.pdfFile && (
                            <div className="mt-3 text-xs opacity-75">
                              Click to read summary • Download for full research
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Document Viewer Modal with sidebar */}
      {showArticleViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={closeArticleViewer}
          fullscreen
          relatedArticles={relatedForSidebar}
          onSelectArticle={(a) => openArticleById(String(a.id))} // <-- FIX: open by id
        />
      )}
    </>
  );
};

export default Research;
