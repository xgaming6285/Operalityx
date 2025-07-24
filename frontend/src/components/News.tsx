import { ArrowLeft, ArrowRight } from "lucide-react";
import { useArticles } from "../hooks/useArticles";
import { useDragScroll } from "../hooks/useDragScroll";
import DocumentViewer from "./DocumentViewer";

const News = () => {
  const {
    articles: newsCards,
    loading: isLoading,
    showArticleViewer,
    currentDocument: selectedDocument,
    openArticle,
    closeArticleViewer
  } = useArticles({ type: "news" });

  const {
    scrollLeft: scrollLeftBtn,
    scrollRight: scrollRightBtn,
    getDragProps,
    preventClickAfterDrag
  } = useDragScroll();

  const openDocument = (article: any, e: React.MouseEvent) => {
    if (preventClickAfterDrag(e)) return;
    openArticle(article);
  };

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
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <button
              onClick={scrollRightBtn}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* News Cards - Horizontal Scroll */}
        <div 
          {...getDragProps()}
          className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
        >
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex-none w-80 sm:w-96 rounded-lg h-56 sm:h-64 bg-gray-200 animate-pulse snap-start"
              />
            ))
          ) : newsCards.length === 0 ? (
            <div className="flex-none w-full text-center py-20">
              <p className="text-gray-500 text-lg">No news available</p>
              <p className="text-gray-400 text-sm mt-2">News articles will appear here when available</p>
            </div>
          ) : (
            newsCards.map((card) => (
              <div
                key={card.id}
                onClick={(e) => openDocument(card, e)}
                className="flex-none w-80 sm:w-96 rounded-lg h-56 sm:h-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.thumbnail || '/news/news-1.png'}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                {/* Card Content */}
                <div className="relative w-full h-full p-4 sm:p-6 flex flex-col justify-between z-10">
                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-xs sm:text-sm text-white/80 mb-2">
                        • {card.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                      {card.description}
                    </p>
                    <div className="mt-2 text-xs text-white/60">
                      Click to read more →
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
