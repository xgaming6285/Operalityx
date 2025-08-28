import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyOverviewModal from './CompanyOverviewModal';
import ChatBox from './ChatBox';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [showOverviewModal, setShowOverviewModal] = useState(false);

    const cards = [
        {
            id: 1,
            type: 'chat',
        },
        {
            id: 2,
            image: '/images/second.webp',
            title: 'Transform Your',
            subtitle: 'Business Operations',
            description: 'Harness the power of Artificial Intelligence to automate complex tasks, gain unprecedented insights from your data, and build a more agile, resilient operation.'
        },
        {
            id: 3,
            image: '/images/third.jpg',
            title: 'Automate the Mundane',
            subtitle: 'Accelerate the Meaningful',
            description: 'Harness the power of Artificial Intelligence to automate complex tasks, gain unprecedented insights from your data, and build a more agile, resilient operation.'
        },
        {
            id: 4,
            image: '/images/fourth.jpg',
            title: 'Your Partner in Intelligent',
            subtitle: 'Transformation',
            description: 'Leverage our cutting-edge solutions to optimize your workflow and drive unprecedented growth.'
        },
        {
            id: 5,
            image: '/images/first.webp',
            title: "Unlock Your Business's",
            subtitle: 'True Potential.',
            description: 'Operalytx delivers intelligent automation that streamlines your processes, eliminates redundancies, and frees your team to focus on what matters most.'
        }
    ];

    // Calculate card width based on screen size and update on resize
    const calculateCardWidth = () => {
        if (typeof window !== 'undefined') {
            // For mobile: card width + gap = viewport width - container padding
            // Card width: calc(100vw - 3rem), gap: 0.5rem on each side = 1rem total
            // Total per slide: calc(100vw - 2rem) 
            return window.innerWidth < 768 ? window.innerWidth - 32 : window.innerWidth - 230;
        }
        return 0;
    };

    // Initialize card width and set up resize listener
    useEffect(() => {
        const updateCardWidth = () => {
            setCardWidth(calculateCardWidth());
        };

        // Set initial width
        updateCardWidth();

        // Add resize listener
        window.addEventListener('resize', updateCardWidth);
        
        // Cleanup
        return () => window.removeEventListener('resize', updateCardWidth);
    }, []);


    // Navigate to specific slide
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Navigate to chat box (first slide)
    const goToChatBox = () => {
        setCurrentSlide(0);
    };



    // Handle drag end to snap to nearest slide
    const handleDragEnd = (_: any, info: any) => {
        const dragDistance = info.offset.x;
        const velocity = info.velocity.x;
        
        // Use a combination of distance and velocity for better detection
        const distanceThreshold = 80; // Fixed threshold in pixels
        const velocityThreshold = 500; // Velocity threshold for fast swipes
        
        const shouldGoLeft = (dragDistance < -distanceThreshold || velocity < -velocityThreshold) && currentSlide < cards.length - 1;
        const shouldGoRight = (dragDistance > distanceThreshold || velocity > velocityThreshold) && currentSlide > 0;
        
        if (shouldGoRight) {
            // Dragged right or fast swipe right, go to previous slide
            setCurrentSlide(currentSlide - 1);
        } else if (shouldGoLeft) {
            // Dragged left or fast swipe left, go to next slide
            setCurrentSlide(currentSlide + 1);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="relative w-full overflow-hidden px-4 sm:px-0">
                <motion.div 
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ right: 0, left: -(cards.length - 1) * cardWidth }}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    onDragEnd={handleDragEnd}
                    animate={{ 
                        x: -currentSlide * cardWidth
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 40,
                        mass: 0.8
                    }}
                >
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative min-w-[calc(100vw-3rem)] sm:min-w-[calc(100vw-14.375rem)] h-[600px] sm:h-[700px] lg:h-[810px] rounded-2xl sm:rounded-3xl overflow-hidden mx-2 sm:mx-6 flex-shrink-0 ${
                                card.type === 'chat' 
                                    ? 'bg-white border-2 border-gray-200 shadow-2xl' 
                                    : ''
                            }`}
                            style={card.type !== 'chat' ? {
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            } : {}}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                                {card.type === 'chat' ? (
                                    <ChatBox />
                                ) : (
                                    <>
                                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 leading-tight ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                            {card.title}
                                            <br />
                                            {card.subtitle}
                                        </h1>
                                        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto mb-6 sm:mb-8 mt-4 sm:mt-8 px-4 ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                            {card.description}
                                        </p>
                                        
                                        <motion.div 
                                            className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8 w-full max-w-md sm:max-w-none sm:justify-center"
                                            drag={false}
                                            onPointerDown={(e) => e.stopPropagation()}
                                        >
                                            <button 
                                                onClick={goToChatBox}
                                                onPointerDown={(e) => e.stopPropagation()}
                                               className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border bg-white border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-base sm:text-lg text-black no-underline text-center"
                                            >
                                                Get Started
                                            </button>
                                            <button 
                                                onClick={() => setShowOverviewModal(true)}
                                                onPointerDown={(e) => e.stopPropagation()}
                                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border bg-white border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-base sm:text-lg text-black no-underline text-center"
                                            >
                                                Read More
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 pb-6">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 transform scale-50 md:scale-100 ${
                            index === currentSlide ? 'bg-black' : 'bg-black/50 hover:bg-black/70'
                        }`}
                    />
                ))}
            </div>

            {/* Company Overview Modal */}
            <CompanyOverviewModal 
                isOpen={showOverviewModal} 
                onClose={() => setShowOverviewModal(false)}
            />
        </div>
    );
};

export default HeroCarousel; 