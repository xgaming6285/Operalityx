import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Document } from "../types/document";
import { DocumentService } from "../services/documentService";
import DocumentViewer from "./DocumentViewer";

const News = () => {
  const [newsCards, setNewsCards] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const documents = await DocumentService.getDocuments("news");
      setNewsCards(documents);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <section id="news" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden sm:flex items-center space-x-3">
            <button className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <button className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 touch-manipulation">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg h-56 sm:h-64 bg-gray-200 animate-pulse"
              />
            ))
          ) : newsCards.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">No news available</p>
              <p className="text-gray-400 text-sm mt-2">News articles will appear here once uploaded</p>
            </div>
          ) : (
            newsCards.map((card) => (
              <div
                key={card.id}
                onClick={() => openDocument(card)}
                className="rounded-lg h-56 sm:h-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group"
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
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </section>
  );
};

export default News;
