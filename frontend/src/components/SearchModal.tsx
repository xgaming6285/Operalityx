import { ArrowRight, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleMeta } from "@/services/articleService";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ArticleMeta[];
  openDocument: (article: ArticleMeta, e: React.MouseEvent) => void;
}

const SearchModal = ({
  isOpen,
  onClose,
  articles,
  openDocument
}: SearchModalProps) => {
  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = [
    'All',
    'News',
    'Solutions', 
    'Stories',
    'Community',
    'AI & Machine Learning',
    'Cloud & Infrastructure',
    'Emerging Technologies',
    'Business & Innovation'
  ];

  // Enhanced search function that searches across multiple fields
  const searchArticles = (articles: ArticleMeta[], query: string, category: string) => {
    let filteredArticles = articles;

    // First apply category filter
    if (category !== 'All') {
      if (['News', 'Solutions', 'Stories', 'Community'].includes(category)) {
        // Filter by article type
        const typeMap: { [key: string]: string } = {
          'News': 'news',
          'Solutions': 'solution',
          'Stories': 'story',
          'Community': 'community'
        };
        filteredArticles = articles.filter(article => 
          article.type === typeMap[category]
        );
      } else {
        // Filter by topic keywords
        const categoryKeywords = {
          'AI & Machine Learning': [
            'ai', 'artificial intelligence', 'machine learning', 'neural networks', 
            'deep learning', 'automation', 'robotics', 'autonomous'
          ],
          'Cloud & Infrastructure': [
            'cloud', 'computing', 'infrastructure', 'edge computing', '5g', 
            'network', 'connectivity', 'distributed', 'processing'
          ],
          'Emerging Technologies': [
            'blockchain', 'quantum', 'iot', 'internet of things', 'augmented reality', 
            'virtual reality', 'vr', 'ar', 'digital twin', 'space technology'
          ],
          'Business & Innovation': [
            'innovation', 'market', 'business', 'digital transformation', 
            'fintech', 'enterprise', 'industry', 'disruption', 'trends'
          ]
        };

        const keywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
        
        filteredArticles = articles.filter(article => {
          const searchText = [
            article.title || '',
            article.subtitle || '',
            article.description || '',
            article.author || ''
          ].join(' ').toLowerCase();

          return keywords.some(keyword => 
            searchText.includes(keyword.toLowerCase())
          );
        });
      }
    }

    // Then apply text search if query exists
    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(' ').filter(term => term.length > 0);
      
      filteredArticles = filteredArticles.filter(article => {
        const searchText = [
          article.title || '',
          article.subtitle || '',
          article.description || '',
          article.author || '',
          article.type || ''
        ].join(' ').toLowerCase();

        // Article matches if it contains all search terms
        return searchTerms.every(term => 
          searchText.includes(term)
        );
      });
    }

    return filteredArticles;
  };

  // Filter articles based on search query and category
  const filteredArticles = searchArticles(articles, searchQuery, selectedFilter);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow modal to appear first
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      // Reset search when modal closes
      setSearchQuery('');
      setSelectedFilter('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getArticleTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      'news': 'News',
      'solution': 'Solution',
      'story': 'Story',
      'community': 'Community'
    };
    return typeLabels[type] || type;
  };

  const getArticleTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      'news': 'bg-blue-100 text-blue-800',
      'solution': 'bg-green-100 text-green-800',
      'story': 'bg-purple-100 text-purple-800',
      'community': 'bg-orange-100 text-orange-800'
    };
    return typeColors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content - Full screen on mobile, inset on larger screens */}
      <div className="fixed inset-0 sm:inset-[3%] md:inset-[5%] z-50 bg-white sm:rounded-2xl shadow-2xl border-0 sm:border border-gray-200 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 max-h-screen">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">Search Articles</h3>
            <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Section */}
        <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          {/* Search Input */}
          <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, description, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
              autoFocus
            />
          </div>

          {/* Filter Categories - Horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === category
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="h-full overflow-auto p-4 sm:p-6 md:p-8 pb-20 sm:pb-8">
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg">
                {searchQuery.trim() 
                  ? `No articles found for "${searchQuery}"` 
                  : selectedFilter === 'All' 
                    ? 'Start typing to search articles' 
                    : `No articles found for "${selectedFilter}"`
                }
              </p>
              <p className="text-gray-400 text-sm mt-2 max-w-md">
                {searchQuery.trim()
                  ? 'Try different keywords or remove some filters'
                  : 'Search across all articles by title, description, author, and more'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  onClick={(e) => openDocument(article, e)}
                  className={`rounded-lg h-56 sm:h-64 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                    showContent 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: showContent ? `${index * 50}ms` : '0ms',
                    transform: showContent ? 'translateY(0)' : 'translateY(32px)',
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={article.thumbnail || '/images/logo-icon.png'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                  {/* Article Type Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getArticleTypeColor(article.type)}`}>
                      {getArticleTypeLabel(article.type)}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="relative w-full h-full p-3 sm:p-4 flex flex-col justify-between z-10">
                    {/* Title and Subtitle */}
                    <div className={`transition-all duration-500 ${
                      showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 50 + 200}ms` }}>
                      <h3 className="text-sm sm:text-base font-semibold text-white mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.subtitle && (
                        <p className="text-xs text-white/80 mb-2 line-clamp-1">
                          • {article.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Description and Author */}
                    <div className={`transition-all duration-500 ${
                      showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 50 + 300}ms` }}>
                      <p className="text-xs text-white font-medium leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2">
                        {article.description}
                      </p>
                      {article.author && (
                        <p className="text-xs text-white/60 mb-1">
                          By {article.author}
                        </p>
                      )}
                      <div className="text-xs text-white/60 flex items-center gap-1">
                        Click to read more 
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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

export default SearchModal; 