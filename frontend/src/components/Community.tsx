import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDragScroll } from "../hooks/useDragScroll";
import { useArticles } from "../hooks/useArticles";
import DocumentViewer from "./DocumentViewer";

const Community = () => {
    const {
        scrollLeft,
        scrollRight,
        getDragProps,
        preventClickAfterDrag
    } = useDragScroll();

    const {
        articles: communityCards,
        loading: isLoading,
        showArticleViewer,
        currentDocument: selectedDocument,
        openArticle,
        closeArticleViewer
    } = useArticles({ type: "community" });

    const openDocument = (article: any, e: React.MouseEvent) => {
        if (preventClickAfterDrag(e)) return;
        openArticle(article);
    };

    return (
        <section id="community" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="w-full pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-6">
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Community</h2>
                        <div className="flex items-center space-x-2 mt-2">
                            <div className="w-16 sm:w-20 h-1 bg-black rounded-full"></div>
                            <div className="w-8 sm:w-12 h-1 bg-gray-300 rounded-full"></div>
                            <div className="w-6 sm:w-8 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    {/* Navigation arrows */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={scrollLeft}
                            className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group touch-manipulation"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group touch-manipulation"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Community Cards - Horizontal Scroll */}
                <div 
                    {...getDragProps()}
                    className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
                >
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex-none w-80 sm:w-96 h-72 sm:h-80 rounded-2xl bg-gray-200 animate-pulse"
                            />
                        ))
                    ) : communityCards.length === 0 ? (
                        <div className="flex-none w-full text-center py-20">
                            <p className="text-gray-500 text-lg">No community articles available</p>
                            <p className="text-gray-400 text-sm mt-2">Community articles will appear here when available</p>
                        </div>
                    ) : (
                        communityCards.map((card, index) => (
                            <div
                                key={card.id}
                                onClick={(e) => openDocument(card, e)}
                                className="flex-none w-80 sm:w-96 group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                            >
                                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                    {/* Business Image Background */}
                                    <div className="absolute inset-0">
                                        <img 
                                            src={card.thumbnail || '/business/business-1.png'} 
                                            alt={card.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Enhanced gradient overlay for better text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>

                                    {/* Content */}
                                    <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between z-10">
                                        {/* Title */}
                                        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                                            <h3 className="text-lg sm:text-xl font-semibold leading-tight text-white drop-shadow-sm">
                                                {card.title}
                                            </h3>
                                            {card.subtitle && (
                                                <p className="text-sm text-white/80 mt-1">
                                                    {card.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="mt-auto transform transition-all duration-300 group-hover:translate-y-0 translate-y-1">
                                            <p className="text-xs sm:text-sm leading-relaxed text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm">
                                                {card.description}
                                            </p>
                                            <div className="mt-2 text-xs text-white/60">
                                                Click to read more →
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle hover glow effect */}
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default Community; 