import { ArrowRight, X } from "lucide-react";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsCards: any[];
  openDocument: (article: any, e: React.MouseEvent) => void;
}

const NewsModal = ({
  isOpen,
  onClose,
  newsCards,
  openDocument
}: NewsModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-[5%] z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">All News</h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {newsCards.length} {newsCards.length === 1 ? 'article' : 'articles'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="h-full overflow-auto p-6 sm:p-8">
          {newsCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No news available</p>
              <p className="text-gray-400 text-sm mt-2">News articles will appear here when available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsCards.map((card) => (
                <div
                  key={card.id}
                  onClick={(e) => openDocument(card, e)}
                  className="rounded-lg h-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group"
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
                  <div className="relative w-full h-full p-4 flex flex-col justify-between z-10">
                    {/* Title and Subtitle */}
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <p className="text-xs text-white/80 mb-2 line-clamp-1">
                          • {card.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-xs text-white font-medium leading-relaxed line-clamp-3">
                        {card.description}
                      </p>
                      <div className="mt-2 text-xs text-white/60">
                        Click to read more →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsModal;