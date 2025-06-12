import { ChevronLeft, ChevronRight } from "lucide-react";

const Research = () => {
    const researchCards = [
        {
            title: "System Architecture",
            date: "May 2025",
            description: "Automated reasoning for complex enterprise workflows",
            bgColor: "bg-gradient-to-br from-orange-100 via-red-50 to-orange-50",
            icon: (
                <div className="flex flex-col space-y-1 items-center relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md -mt-2">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-sm -mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute left-6 top-6 w-20 h-20 border-2 border-dotted border-orange-400 rounded-full opacity-60"></div>
                </div>
            )
        },
        {
            title: "AI Research",
            date: "May 2025",
            description: "Multi-agent orchestration with dynamic task alignment",
            bgColor: "bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500"
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
            bgColor: "bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-600"
        }
    ];

    return (
        <section id="research" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Research</h2>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Research Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {researchCards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 ${card.bgColor}`}></div>
                            
                            {/* Starburst Effect for Product Launch Card */}
                            {card.hasStarburst && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        {/* Radial rays */}
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 bg-gradient-to-t from-transparent via-white/30 to-transparent"
                                                style={{
                                                    height: '60%',
                                                    left: '50%',
                                                    top: '50%',
                                                    transformOrigin: 'bottom center',
                                                    transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                                                }}
                                            />
                                        ))}
                                        {/* Central bright point */}
                                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
                                        {/* Glow effect */}
                                        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20 blur-xl"></div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Content */}
                            <div className="relative h-full p-6 flex flex-col justify-between text-white z-10">
                                {/* Top Section */}
                                <div>
                                    <div className="text-sm font-medium opacity-90 mb-2">
                                        {card.title} • {card.date}
                                    </div>
                                </div>

                                {/* Icon Section (for System Architecture card) */}
                                {index === 0 && (
                                    <div className="flex-1 flex items-center justify-center relative">
                                        {card.icon}
                                    </div>
                                )}

                                {/* Bottom Section */}
                                <div className="mt-auto">
                                    <h3 className="text-xl font-bold mb-3 leading-tight drop-shadow-md">
                                        {card.description}
                                    </h3>
                                </div>
                            </div>

                            {/* Enhanced Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research; 