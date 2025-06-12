import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}

const News = () => {
  const newsCards: NewsCard[] = [
    {
      id: '1',
      title: 'Product',
      subtitle: 'May 2025',
      description: 'Introducing Modular Outputs in the Operalytix API',
      image: '/news/Operalityx - Site Design 9062025 (11).png'
    },
    {
      id: '2',
      title: 'API',
      description: 'Start building intelligent workflows with one call',
      image: '/news/Operalityx - Site Design 9062025 (13).png'
    },
    {
      id: '3',
      title: 'Quickstart',
      description: 'Get up and running with our API in minutes →',
      image: '/news/Operalityx - Site Design 9062025 (16).png'
    },
    {
      id: '4',
      title: 'Guides',
      description: 'Explore and experiment with the Operalytix system',
      image: '/news/Operalityx - Site Design 9062025 (11).png'
    }
  ];



  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="relative">
            <h2 className="text-5xl font-bold text-gray-900 mb-2">News</h2>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg h-64 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

              {/* Card Content */}
              <div className="relative w-full h-full p-6 flex flex-col justify-between z-10">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                  {card.subtitle && (
                    <p className="text-sm text-white/80 mb-2">• {card.subtitle}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
