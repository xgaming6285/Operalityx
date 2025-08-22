import { ChevronLeft, ChevronRight } from "lucide-react";
import { useArticles } from "../hooks/useArticles";
import { useDragScroll } from "../hooks/useDragScroll";
import DocumentViewer from "./DocumentViewer";

const Stories = () => {
  const {
    articles: stories,
    loading: isLoading,
    showArticleViewer,
    currentDocument: selectedDocument,
    openArticle,
    closeArticleViewer
  } = useArticles({ type: "story" });

  const {
    scrollLeft,
    scrollRight,
    getDragProps,
    preventClickAfterDrag
  } = useDragScroll();

  const openDocument = (article: any, e: React.MouseEvent) => {
    if (preventClickAfterDrag(e)) return;
    openArticle(article);
  };

  return (
    <section id="stories" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="w-full pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Stories
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-16 sm:w-20 h-1 bg-gray-900 rounded-full"></div>
              <div className="w-8 sm:w-12 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-6 sm:w-8 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
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

        {/* Stories Cards */}
        <div
          {...getDragProps()}
          className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
        >
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex-none w-80 sm:w-96 h-[450px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-200 animate-pulse snap-start"
              />
            ))
          ) : stories.length === 0 ? (
            <div className="flex-none w-full text-center py-20">
              <p className="text-gray-500 text-lg">No stories available</p>
              <p className="text-gray-400 text-sm mt-2">
                Stories will appear here when available
              </p>
            </div>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                onClick={(e) => openDocument(story, e)}
                className="flex-none w-80 sm:w-96 h-[450px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group relative"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={
                      story.thumbnail ||
                      "/stories/Operalityx - Site Design 9062025 (21).png"
                    }
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                {/* Story Content */}
                <div className="relative w-full h-full p-6 sm:p-8 flex flex-col justify-between z-10">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                      {story.title}
                    </h3>
                    {story.subtitle && (
                      <p className="text-white text-sm sm:text-base opacity-90 mb-2">
                        {story.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Bottom Text */}
                  <div>
                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                      {story.description}
                    </p>
                    <div className="mt-4 text-xs text-white/70">
                      Click to read full story →
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
                  </div>

            {/* Article Viewer */}
            {showArticleViewer && selectedDocument && (
            <DocumentViewer
                document={selectedDocument}
                onClose={closeArticleViewer}
                fullscreen // 👈 force fullscreen on desktop too
            />
            )}
        </section>
    );
};

export default Stories;
