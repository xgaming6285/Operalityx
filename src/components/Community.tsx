import { ChevronLeft, ChevronRight } from "lucide-react";

const Community = () => {
    const communityCards = [
        {
            title: "Operalytix for Developers",
            description: "Explore intelligent systems for companies of every kind",
            bgGradient: "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800",
            textColor: "text-white"
        },
        {
            title: "Operalytix Community",
            description: "Empower your entire operation with modular AI control",
            bgGradient: "bg-gradient-to-br from-orange-300 via-amber-200 to-orange-100",
            textColor: "text-gray-800"
        },
        {
            title: "Operalytix Contributors",
            description: "A smart automation layer for every role on your team",
            bgGradient: "bg-gradient-to-br from-emerald-400 via-teal-300 to-cyan-200",
            textColor: "text-gray-800"
        },
        {
            title: "Operalytix API Community",
            description: "Integrate adaptive tools, processes, and workflows",
            bgGradient: "bg-gradient-to-br from-orange-500 via-red-400 to-pink-400",
            textColor: "text-white"
        }
    ];

    return (
        <section id="community" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-black">For business</h2>
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-black"></div>
                        <div className="absolute -bottom-2 left-20 w-8 h-1 bg-gray-300"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Community Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {communityCards.map((card, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        >
                            <div className={`
                                relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300
                                ${card.bgGradient}
                            `}>
                                {/* Background pattern overlay for visual interest */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        {/* Subtle geometric pattern */}
                                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <defs>
                                                <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                    <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                                                </pattern>
                                            </defs>
                                            <rect width="100" height="100" fill={`url(#pattern-${index})`}/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                                    {/* Title */}
                                    <div>
                                        <h3 className={`text-xl font-semibold leading-tight ${card.textColor}`}>
                                            {card.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-auto">
                                        <p className={`text-sm leading-relaxed ${card.textColor} opacity-90`}>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Community; 