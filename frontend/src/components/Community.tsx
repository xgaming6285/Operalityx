import { ChevronLeft, ChevronRight } from "lucide-react";

const Community = () => {
    const communityCards = [
        {
            title: "Operalytix for Business",
            description: "Explore intelligent systems for companies of every kind",
            image: "/business/business-1.png",
            textColor: "text-white"
        },
        {
            title: "Operalytix Enterprise",
            description: "Empower your entire operation with modular AI control",
            image: "/business/business-2.png",
            textColor: "text-gray-800"
        },
        {
            title: "Operalytix Team",
            description: "A smart automation layer for every role on your team",
            image: "/business/business-3.png",
            textColor: "text-gray-800"
        },
        {
            title: "Operalytix API Community",
            description: "Integrate adaptive tools, processes, and workflows",
            image: "/business/business-4.png",
            textColor: "text-white"
        }
    ];

    return (
        <section id="community" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    {/* Navigation arrows - Hidden on mobile, shown on tablet and up */}
                    <div className="hidden sm:flex items-center space-x-3">
                        <button className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group touch-manipulation">
                            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                        <button className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group touch-manipulation">
                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Community Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {communityCards.map((card, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                        >
                            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                {/* Business Image Background */}
                                <div className="absolute inset-0">
                                    <img 
                                        src={card.image} 
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
                                        <h3 className={`text-lg sm:text-xl font-semibold leading-tight ${card.textColor} drop-shadow-sm`}>
                                            {card.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-auto transform transition-all duration-300 group-hover:translate-y-0 translate-y-1">
                                        <p className={`text-xs sm:text-sm leading-relaxed ${card.textColor} opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm`}>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Subtle hover glow effect */}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Community; 