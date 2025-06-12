import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main content container */}
                <div className="relative">
                    {/* Gradient circles background */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
                            {/* Outermost circle */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-light/30 to-teal-medium/20 animate-float"></div>

                            {/* Second circle */}
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-teal-medium/40 to-teal-dark/30 animate-float" style={{ animationDelay: '1s' }}></div>

                            {/* Third circle */}
                            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-teal-dark/50 to-teal-darker/40 animate-float" style={{ animationDelay: '2s' }}></div>

                            {/* Innermost circle */}
                            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-teal-darker/60 to-teal-darker/80 animate-float" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 py-20">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                            Unlock Your<br />
                            Business's<br />
                            True Potential.
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Operalytix delivers intelligent automation that streamlines your processes, eliminates redundancies, and frees your team to focus on what matters most.
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 px-8 py-3 text-lg"
                            >
                                Read More
                            </Button>

                            <Button
                                size="lg"
                                className="bg-white text-teal-darker hover:bg-white/90 transition-all duration-300 px-8 py-3 text-lg font-semibold"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center space-x-3 mt-16">
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;