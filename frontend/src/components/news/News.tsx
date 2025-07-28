import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useArticles } from "../../hooks/useArticles";
import { useDragScroll } from "../../hooks/useDragScroll";
import DocumentViewer from "../DocumentViewer";
import NewsModal from "./NewsModal";
import NewsCard from "./NewsCard";
import ExploreAllButton from "./ExploreAllButton";

const DISPLAYED_CARDS_LIMIT = 10;

const News = () => {
  const {
    articles: allNewsCards,
    loading: isLoading,
    showArticleViewer,
    currentDocument: selectedDocument,
    openArticle,
    closeArticleViewer
  } = useArticles({ type: "news" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Limit to displayed cards for the main display
  const displayedNewsCards = allNewsCards.slice(0, DISPLAYED_CARDS_LIMIT);

  const {
    scrollLeft: scrollLeftBtn,
    scrollRight: scrollRightBtn,
    getDragProps,
    preventClickAfterDrag
  } = useDragScroll();

  const handleCardClick = (article: any, e: React.MouseEvent) => {
    if (preventClickAfterDrag(e)) return;
    openArticle(article);
  };

  const handleExploreAll = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderLoadingSkeleton = () => (
    Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex-none w-80 sm:w-96 rounded-lg h-56 sm:h-64 bg-gray-200 animate-pulse snap-start"
      />
    ))
  );

  const renderEmptyState = () => (
    <div className="flex-none w-full text-center py-20">
      <p className="text-gray-500 text-lg">No news available</p>
      <p className="text-gray-400 text-sm mt-2">News articles will appear here when available</p>
    </div>
  );

  return (
    <section id="news" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="w-full pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              News
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-16 sm:w-20 h-1 bg-gray-900 rounded-full"></div>
              <div className="w-8 sm:w-12 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-6 sm:w-8 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Navigation arrows - Hidden on mobile, shown on tablet and up */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeftBtn}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <button
              onClick={scrollRightBtn}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* News Cards - Horizontal Scroll */}
        <div
          {...getDragProps()}
          className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
        >
          {isLoading ? (
            renderLoadingSkeleton()
          ) : displayedNewsCards.length === 0 ? (
            renderEmptyState()
          ) : (
            displayedNewsCards.map((card) => (
              <NewsCard
                key={card.id}
                card={card}
                onClick={handleCardClick}
                className="flex-none w-80 sm:w-96 h-56 sm:h-64"
              />
            ))
          )}
        </div>

        {/* Explore All News Button */}
        <ExploreAllButton
          onClick={handleExploreAll}
          totalCount={allNewsCards.length}
          displayedCount={DISPLAYED_CARDS_LIMIT}
          label="Explore All News"
        />
      </div>

      {/* News Modal */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newsCards={allNewsCards}
        openDocument={handleCardClick}
      />

      {/* Document Viewer */}
      {showArticleViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={closeArticleViewer}
        />
      )}
    </section>
  );
};

export default News;
