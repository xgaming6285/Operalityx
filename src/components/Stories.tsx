import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const Stories = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 320 : 400;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 320 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const stories = [
        {
            id: 1,
            title: "Story",
            image: "/stories/Operalityx - Site Design 9062025 (21).png",
            subtitle: "MediCore uses Operalytix to reduce diagnosis time through AI pattern detection."
        },
        {
            id: 2,
            title: "Story", 
            image: "/stories/Operalityx - Site Design 9062025 (20).png",
            subtitle: "Accelerating research breakthroughs with adaptive automation tools."
        },
        {
            id: 3,
            title: "Story",
            image: "/stories/Operalityx - Site Design 9062025 (19).png", 
            subtitle: "The Ministry of Health integrates Operalytix for enhanced patient care."
        },
        {
            id: 4,
            title: "Story",
            image: "/stories/Operalityx - Site Design 9062025 (19).png", 
            subtitle: "The Ministry of Health integrates Operalytix for enhanced patient care."
        }
    ];

    return (
        <section id="stories" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Stories</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-16 sm:w-20 h-1 bg-gray-900 rounded-full"></div>
                            <div className="w-8 sm:w-12 h-1 bg-gray-300 rounded-full"></div>
                            <div className="w-6 sm:w-8 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
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

                {/* Stories Cards */}
                <div 
                    ref={scrollContainerRef}
                    className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="flex-none w-80 sm:w-96 h-[450px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group relative snap-start"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img 
                                    src={story.image} 
                                    alt={story.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                            {/* Story Content */}
                            <div className="relative w-full h-full p-6 sm:p-8 flex flex-col justify-between z-10">
                                {/* Title */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{story.title}</h3>
                                </div>

                                {/* Bottom Text */}
                                <div>
                                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                                        {story.subtitle}
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

export default Stories; 