import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const Research = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };

    const researchCards = [
        {
            title: "AI Research",
            date: "May 2025",
            description: "Multi-agent orchestration with dynamic task alignment",
            image: "/research/Operalityx - Site Design 9062025 (4).png"
        },
        {
            title: "Product Launch",
            date: "May 2025",
            description: "Introducing FlowStack: modular pipelines for adaptive automation",
            image: "/research/Operalityx - Site Design 9062025 (5).png"
        },
        {
            title: "Efficiency & Scaling",
            date: "May 2025",
            description: "Redefining latency optimization for low-power intelligence",
            image: "/research/Operalityx - Site Design 9062025 (4).png"
        },
        {
            title: "Efficiency & Scaling",
            date: "May 2025",
            description: "Redefining latency optimization for low-power intelligence",
            image: "/research/Operalityx - Site Design 9062025 (5).png"
        },
    ];

    return (
        <section id="research" className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <div className="relative">
                        <h2 className="text-5xl font-bold text-gray-900 mb-2">Research</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                            <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={scrollLeft}
                            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <button 
                            onClick={scrollRight}
                            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Research Cards - Horizontal Layout */}
                <div 
                    ref={scrollContainerRef}
                    className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {researchCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-none w-80 h-[450px] rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group relative border border-gray-200"
                        >
                            {/* Research Image as Card */}
                            <div className="relative w-full h-full">
                                <img 
                                    src={card.image} 
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Overlay for hover effect */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                
                                {/* Card info overlay - always visible */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="text-sm font-medium opacity-90 uppercase tracking-wider mb-2">
                                            {card.title} • {card.date}
                                        </div>
                                        <h3 className="text-lg font-bold leading-tight">
                                            {card.description}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Bottom spacing */}
                <div className="mt-8"></div>
            </div>
        </section>
    );
};

export default Research; 