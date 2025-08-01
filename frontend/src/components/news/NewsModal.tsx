import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [showContent, setShowContent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = [
    'All',
    'AI & Machine Learning',
    'Cloud & Infrastructure', 
    'Emerging Technologies',
    'Business & Innovation',
    'Security & Privacy',
    'Healthcare & Biotech',
    'Sustainability & Energy'
  ];

  // Enhanced filtering function that searches across multiple fields
  const filterArticlesByCategory = (articles: any[], category: string) => {
    if (category === 'All') return articles;

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
      ],
      'Security & Privacy': [
        'security', 'cybersecurity', 'privacy', 'protection', 'secure', 'cyber'
      ],
      'Healthcare & Biotech': [
        'healthcare', 'medical', 'biotechnology', 'biotech', 'life sciences', 
        'treatment', 'patient'
      ],
      'Sustainability & Energy': [
        'sustainable', 'sustainability', 'energy', 'green', 'renewable', 
        'environment', 'eco'
      ]
    };

    const keywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
    
    return articles.filter(article => {
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
  };

  // Filter news cards based on selected category
  const filteredNewsCards = filterArticlesByCategory(newsCards, selectedFilter);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow modal to appear first
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-[5%] z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">All News</h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredNewsCards.length} {filteredNewsCards.length === 1 ? 'article' : 'articles'}
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

        {/* Filter Section */}
        <div className="px-6 sm:px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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

        {/* Modal Body */}
        <div className="h-full overflow-auto p-6 sm:p-8">
          {filteredNewsCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {selectedFilter === 'All' ? 'No news available' : `No articles found for "${selectedFilter}"`}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {selectedFilter === 'All' 
                  ? 'News articles will appear here when available' 
                  : 'Try selecting a different category or choose "All" to see all articles'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNewsCards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={(e) => openDocument(card, e)}
                  className={`rounded-lg h-64 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                    showContent 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: showContent ? `${index * 100}ms` : '0ms',
                    transform: showContent ? 'translateY(0)' : 'translateY(32px)',
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={card.thumbnail || '/news/news-1.png'}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                  {/* Shimmer effect on card appearance */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                    showContent ? 'translate-x-full opacity-0' : '-translate-x-full opacity-100'
                  }`} style={{ transitionDelay: `${index * 100 + 200}ms` }} />

                  {/* Card Content */}
                  <div className="relative w-full h-full p-4 flex flex-col justify-between z-10">
                    {/* Title and Subtitle */}
                    <div className={`transition-all duration-500 ${
                      showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 100 + 300}ms` }}>
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
                    <div className={`transition-all duration-500 ${
                      showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 100 + 400}ms` }}>
                      <p className="text-xs text-white font-medium leading-relaxed line-clamp-3">
                        {card.description}
                      </p>
                      <div className="mt-2 text-xs text-white/60 flex items-center gap-1">
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

export default NewsModal;