import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import DocumentViewer from "./DocumentViewer";
import LoadingSpinner from "./ui/LoadingSpinner";
import "../styles/article.css";
import { useArticles } from "../hooks/useArticles";
import { useDragScroll } from "../hooks/useDragScroll";

const Solutions = () => {
    const {
        articles,
        showArticleViewer,
        loadingArticle,
        openArticle,
        openArticleById,
        closeArticleViewer,
        currentDocument,
        hasArticles,
        relatedByType,
        getRelated
    } = useArticles({ type: "solution" });

    const {
        scrollLeft,
        scrollRight,
        getDragProps,
        preventClickAfterDrag
    } = useDragScroll();

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
        <section id="solutions" className="py-12 sm:py-16 lg:py-20 pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8 bg-gray-50">
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-6">
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Solutions</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-16 sm:w-20 h-1 bg-gray-900 rounded-full"></div>
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
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group touch-manipulation"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Solutions Cards - Horizontal Scroll */}
                <div 
                    {...getDragProps()}
                    className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
                >
                    {articles.map((solution, index) => {
                        // Create categories similar to the original design
                        const categories = [
                            "For everyone",
                            "For teams", 
                            "For enterprise",
                            "For nonprofits",
                            "For startups",
                            "For developers",
                            "For organizations",
                            "For businesses"
                        ];
                        const category = categories[index % categories.length];

                        return (
                            <div
                                key={solution.id}
                                className="flex-none w-80 sm:w-96 group relative h-[350px] sm:h-[400px] lg:h-[450px] cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                                style={{ 
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transformStyle: 'preserve-3d'
                                }}
                                onClick={(e) => {
                                    if (preventClickAfterDrag(e)) return;
                                    openArticle(solution);
                                }}
                            >
                                {/* Background Image - Full Coverage */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${solution.thumbnail})`,
                                        borderRadius: '1rem',
                                    }}
                                />

                                {/* Enhanced gradient overlay for better readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />
                                
                                {/* Content Overlay */}
                                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white z-10">
                                    {/* Category badge at the top */}
                                    <div className="flex-shrink-0">
                                        <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 bg-white/60 backdrop-blur-lg rounded-full text-xs sm:text-sm font-bold border border-white shadow-xl text-gray-800">
                                            {category}
                                        </span>
                                    </div>
                                    
                                    {/* Title at the bottom */}
                                    <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight drop-shadow-2xl">
                                            {solution.title}
                                        </h3>
                                        
                                        {/* Subtle animation line */}
                                        <div className="mt-3 sm:mt-4 w-0 h-1 bg-white/80 rounded-full transition-all duration-500 group-hover:w-12 sm:group-hover:w-16"></div>
                                    </div>
                                </div>
                                
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-300" style={{ borderRadius: '1rem' }} />
                            </div>
                        );
                    })}
                </div>

                {/* No articles message */}
                {!hasArticles && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No solution articles available at the moment.</p>
                    </div>
                )}
            </div>

            {/* Loading indicator */}
            {loadingArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl">
                        <LoadingSpinner size="lg" />
                    </div>
                </div>
            )}

            {/* Article Viewer */}
            {showArticleViewer && currentDocument && (
            <DocumentViewer
                document={currentDocument}
                onClose={closeArticleViewer}
                fullscreen // 👈 force fullscreen on desktop too
                relatedArticles={relatedForSidebar}
                onSelectArticle={(a) => openArticleById(String(a.id))}
            />
            )}
        </section>
    );
};

export default Solutions; 