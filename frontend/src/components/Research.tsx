import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDragScroll } from "../hooks/useDragScroll";

const Research = () => {
    const {
        scrollLeft,
        scrollRight,
        getDragProps
    } = useDragScroll();
    const researchCards = [
        {
            title: "AI Research",
            date: "May 2025",
            description: "Multi-agent orchestration with dynamic task alignment",
            image: "/research/research-1.png"
        },
        {
            title: "Product Launch",
            date: "May 2025",
            description: "Introducing FlowStack: modular pipelines for adaptive automation",
            image: "/research/research-2.png"
        },
        {
            title: "Efficiency & Scaling",
            date: "May 2025",
            description: "Redefining latency optimization for low-power intelligence",
            image: "/research/research-3.png"
        },
        {
            title: "Efficiency & Scaling",
            date: "May 2025",
            description: "Redefining latency optimization for low-power intelligence",
            image: "/research/research-4.png"
        },
    ];

    return (
        <section id="research" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="w-full pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 lg:pr-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Research</h2>
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

                {/* Research Cards - Horizontal Scroll */}
                <div 
                    {...getDragProps()}
                    className={`flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide ${getDragProps().className}`}
                >
                    {researchCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-none w-80 sm:w-96 group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative"
                        >
                            <div className="relative h-[400px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200">
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
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                            <div className="text-xs sm:text-sm font-medium opacity-90 uppercase tracking-wider mb-2">
                                                {card.title} • {card.date}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold leading-tight">
                                                {card.description}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research; 