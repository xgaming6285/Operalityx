import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-turquoise-900 via-turquoise-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main content container */}
                <div className="relative">
                    {/* Gradient circles background - Simplified for mobile */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
                            {/* Mobile: Show fewer circles for better performance */}
                            {/* Circle 1 (Outermost) */}
                            <div className="absolute inset-0 rounded-full border-2 border-teal-light bg-gradient-to-br from-teal-light to-teal-medium/90 animate-float"></div>

                            {/* Circle 2 */}
                            <div className="absolute inset-6 sm:inset-10 rounded-full border-2 border-teal-light bg-gradient-to-br from-teal-light to-teal-medium/90 animate-float" style={{ animationDelay: '0.2s' }}></div>

                            {/* Circle 3 */}
                            <div className="absolute inset-12 sm:inset-20 rounded-full border-2 border-teal-medium bg-gradient-to-br from-teal-medium to-teal-dark/90 animate-float" style={{ animationDelay: '0.4s' }}></div>

                            {/* Circle 4 */}
                            <div className="absolute inset-18 sm:inset-30 rounded-full border-2 border-teal-medium bg-gradient-to-br from-teal-medium to-teal-dark/90 animate-float" style={{ animationDelay: '0.6s' }}></div>

                            {/* Desktop only circles - Hidden on mobile for performance */}
                            <div className="hidden sm:block">
                                {/* Circle 5 */}
                                <div className="absolute inset-40 rounded-full border-2 border-teal-dark bg-gradient-to-br from-teal-dark to-teal-darker/90 animate-float" style={{ animationDelay: '0.8s' }}></div>

                                {/* Circle 6 */}
                                <div className="absolute inset-[200px] rounded-full border-2 border-teal-dark bg-gradient-to-br from-teal-dark to-teal-darker/90 animate-float" style={{ animationDelay: '1.0s' }}></div>

                                {/* Circle 7 */}
                                <div className="absolute inset-[240px] rounded-full border-2 border-teal-dark bg-gradient-to-br from-teal-dark to-teal-darker/90 animate-float" style={{ animationDelay: '1.2s' }}></div>

                                {/* Circle 8 */}
                                <div className="absolute inset-[280px] rounded-full border-2 border-teal-darker bg-gradient-to-br from-teal-darker to-teal-darker/90 animate-float" style={{ animationDelay: '1.4s' }}></div>

                                {/* Circle 9 */}
                                <div className="absolute inset-[320px] rounded-full border-2 border-teal-darker bg-gradient-to-br from-teal-darker to-teal-darker/90 animate-float" style={{ animationDelay: '1.6s' }}></div>

                                {/* Circle 10 */}
                                <div className="absolute inset-[360px] rounded-full border-2 border-teal-darker bg-gradient-to-br from-teal-darker to-teal-darker/90 animate-float" style={{ animationDelay: '1.8s' }}></div>

                                {/* Circle 11 */}
                                <div className="absolute inset-[400px] rounded-full border-2 border-teal-darker bg-gradient-to-br from-teal-darker to-teal-darker/90 animate-float" style={{ animationDelay: '2.0s' }}></div>

                                {/* Circle 12 (Innermost) */}
                                <div className="absolute inset-[440px] rounded-full border-2 border-teal-darker bg-gradient-to-br from-teal-darker to-teal-darker animate-float" style={{ animationDelay: '2.2s' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 py-12 sm:py-20">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-4 sm:px-0">
                            Unlock Your Business's<br />
                            True Potential.
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                            Operalytix delivers intelligent automation that streamlines your processes, eliminates redundancies, and frees your team to focus on what matters most.
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 px-6 sm:px-8 py-3 text-base sm:text-lg"
                            >
                                Read More
                            </Button>

                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white text-teal-darker hover:bg-white/90 transition-all duration-300 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center space-x-3 mt-8 sm:mt-16">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30"></div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;