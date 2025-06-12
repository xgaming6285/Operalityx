import { ChevronLeft, ChevronRight } from "lucide-react";

const Solutions = () => {
    const solutions = [
        {
            category: "For everyone",
            title: "Your competitive edge from day one.",
            image: "/solutions/solution-1.png",
        },
        {
            category: "For teams",
            title: "Streamline workflows, amplify output.",
            image: "/solutions/solution-2.png",
        },
        {
            category: "For enterprise",
            title: "Scalable intelligence for complex challenges.",
            image: "/solutions/solution-3.png",
        },
        {
            category: "For nonprofits",
            title: "Transforming with AI",
            image: "/solutions/solution-4.png",
        }
    ];

    return (
        <section id="solutions" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                <div className="relative">
                        <h2 className="text-5xl font-bold text-gray-900 mb-2">Solutions</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                            <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    {/* Navigation arrows */}
                    <div className="flex space-x-2">
                        <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                        >
                            {/* Background Image - Full Coverage */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${solution.image})`,
                                }}
                            />

                            {/* Enhanced gradient overlay for better readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />
                            
                            {/* Content Overlay */}
                            <div className="relative h-full flex flex-col justify-between p-8 text-white z-10">
                                {/* Category badge at the top */}
                                <div className="flex-shrink-0">
                                    <span className="inline-block px-5 py-2.5 bg-white/60 backdrop-blur-lg rounded-full text-sm font-bold border border-white shadow-xl text-gray-800">
                                        {solution.category}
                                    </span>
                                </div>
                                
                                {/* Title at the bottom */}
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-2xl">
                                        {solution.title}
                                    </h3>
                                    
                                    {/* Subtle animation line */}
                                    <div className="mt-4 w-0 h-1 bg-white/80 rounded-full transition-all duration-500 group-hover:w-16"></div>
                                </div>
                            </div>
                            
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-3xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions; 