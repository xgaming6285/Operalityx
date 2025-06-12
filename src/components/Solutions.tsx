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
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Solutions
                    </h2>
                    
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
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            style={{
                                backgroundImage: `url(${solution.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
                            
                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
                                {/* Category */}
                                <div className="flex-shrink-0">
                                    <span className="inline-block px-3 py-1 bg-white/25 backdrop-blur-sm rounded-full text-sm font-medium">
                                        {solution.category}
                                    </span>
                                </div>
                                
                                {/* Title */}
                                <div className="flex-grow flex items-end">
                                    <h3 className="text-lg md:text-xl font-bold leading-tight">
                                        {solution.title}
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions; 