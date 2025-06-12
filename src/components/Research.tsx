import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const Research = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320, // Width of one card plus gap
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320, // Width of one card plus gap
                behavior: 'smooth'
            });
        }
    };
    const researchCards = [
        {
            title: "System Architecture",
            date: "May 2025",
            description: "Automated reasoning for complex enterprise workflows",
            bgColor: "bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50",
            icon: (
                <div className="flex flex-col items-center relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md mb-2 -mt-3">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-sm -mt-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 w-20 h-20 border-2 border-dotted border-orange-400 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            )
        },
        {
            title: "AI Research",
            date: "May 2025",
            description: "Multi-agent orchestration with dynamic task alignment",
            bgColor: "bg-gradient-to-br from-orange-500 via-red-500 to-red-600"
        },
        {
            title: "Product Launch",
            date: "May 2025",
            description: "Introducing FlowStack: modular pipelines for adaptive automation",
            bgColor: "bg-gradient-to-br from-blue-600 via-purple-600 to-violet-700",
            hasStarburst: true
        },
        {
            title: "Efficiency & Scaling",
            date: "May 2025",
            description: "Redefining latency optimization for low-power intelligence",
            bgColor: "bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700"
        }
    ];

    return (
        <section id="research" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-black">Research</h2>
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-black"></div>
                        <div className="absolute -bottom-2 left-20 w-8 h-1 bg-gray-300"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={scrollLeft}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button 
                            onClick={scrollRight}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Research Cards - Horizontal Layout */}
                <div 
                    ref={scrollContainerRef}
                    className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {researchCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-none w-80 h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 ${card.bgColor}`}></div>
                            
                            {/* Starburst Effect for Product Launch Card */}
                            {card.hasStarburst && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        {/* Radial rays */}
                                        {[...Array(16)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-0.5 bg-gradient-to-t from-transparent via-white/40 to-transparent"
                                                style={{
                                                    height: '70%',
                                                    left: '50%',
                                                    top: '50%',
                                                    transformOrigin: 'bottom center',
                                                    transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
                                                }}
                                            />
                                        ))}
                                        {/* Central bright point */}
                                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-90"></div>
                                        {/* Inner glow effect */}
                                        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30 blur-sm"></div>
                                        {/* Outer glow effect */}
                                        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-10 blur-2xl"></div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Content */}
                            <div className="relative h-full p-6 flex flex-col text-white z-10">
                                {/* Top Section */}
                                <div className="mb-4">
                                    <div className="text-sm font-medium opacity-90">
                                        {card.title} • {card.date}
                                    </div>
                                </div>

                                {/* Icon Section (for System Architecture card) */}
                                {index === 0 && (
                                    <div className="flex-1 flex items-center justify-center">
                                        {card.icon}
                                    </div>
                                )}

                                {/* Center content for other cards */}
                                {index !== 0 && (
                                    <div className="flex-1"></div>
                                )}

                                {/* Bottom Section */}
                                <div className="mt-auto">
                                    <h3 className="text-lg font-semibold leading-tight">
                                        {card.description}
                                    </h3>
                                </div>
                            </div>

                            {/* Subtle overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research; 