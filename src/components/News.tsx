import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'product' | 'api' | 'quickstart' | 'guides';
  image?: string;
  codeSnippet?: string;
}

const News = () => {
  const newsCards: NewsCard[] = [
    {
      id: '1',
      title: 'Product',
      subtitle: 'May 2025',
      description: 'Introducing Modular Outputs in the Operalytix API',
      type: 'product',
      image: '/news/Operalityx - Site Design 9062025 (16).png'
    },
    {
      id: '2',
      title: 'API',
      description: 'Start building intelligent workflows with one call',
      type: 'api',
      codeSnippet: `("api.operalytix.com")
request("GET", "/data")
nse`
    },
    {
      id: '3',
      title: 'Quickstart',
      description: 'Get up and running with our API in minutes →',
      type: 'quickstart',
      image: '/news/Operalityx - Site Design 9062025 (13).png'
    },
    {
      id: '4',
      title: 'Guides',
      description: 'Explore and experiment with the Operalytix system',
      type: 'guides',
      image: '/news/Operalityx - Site Design 9062025 (11).png'
    }
  ];

  const getCardBackground = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-gradient-to-br from-emerald-100 to-teal-100';
      case 'api':
        return 'bg-white border border-gray-200';
      case 'quickstart':
        return 'bg-gradient-to-br from-gray-100 to-gray-200';
      case 'guides':
        return 'bg-gradient-to-br from-emerald-600 to-green-700 text-white';
      default:
        return 'bg-white';
    }
  };

  const getCardContent = (card: NewsCard) => {
    if (card.type === 'product') {
      return (
        <div className="relative h-full">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-6 gap-2 h-full p-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded aspect-square ${
                    i % 7 === 0 || i % 11 === 0
                      ? 'bg-yellow-200'
                      : i % 3 === 0
                      ? 'bg-teal-300'
                      : 'bg-emerald-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
              {card.subtitle && (
                <p className="text-sm text-gray-600 mb-4">• {card.subtitle}</p>
              )}
            </div>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      );
    }

    if (card.type === 'api') {
      return (
        <div className="p-6 h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
            {card.codeSnippet && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm">
                <div className="text-green-600">{card.codeSnippet.split('\n')[0]}</div>
                <div className="text-blue-600">{card.codeSnippet.split('\n')[1]}</div>
                <div className="text-gray-600">{card.codeSnippet.split('\n')[2]}</div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-700 font-medium">
            {card.description}
          </p>
        </div>
      );
    }

    if (card.type === 'quickstart') {
      return (
        <div className="p-6 h-full flex flex-col justify-between relative">
          {/* Circular design */}
          <div className="absolute right-4 top-4 w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-40" />
          <div className="absolute right-6 top-6 w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 opacity-60" />
          <div className="absolute right-8 top-8 w-8 h-8 rounded-full bg-white opacity-80" />
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4 relative z-10">{card.title}</h3>
          <p className="text-sm text-gray-700 relative z-10">
            {card.description}
          </p>
        </div>
      );
    }

    // Guides card
    return (
      <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
        {/* Large arrow icon */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <ArrowRight className="w-16 h-16 text-white opacity-30" strokeWidth={1} />
        </div>
        
        <h3 className="text-lg font-semibold mb-4 relative z-10">{card.title}</h3>
        <p className="text-sm opacity-90 relative z-10">
          {card.description}
        </p>
      </div>
    );
  };

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">News</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-lg h-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] ${getCardBackground(card.type)}`}
            >
              {getCardContent(card)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
