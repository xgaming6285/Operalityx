import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChatBox from './ChatBox';

const HeroCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragDisabled, setIsDragDisabled] = useState(false);

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

    const getCardWidth = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 ? window.innerWidth - 32 : window.innerWidth - 230;
        }
        return 0;
    };

    // Track the current slide based on carousel transform position
    const updateCurrentSlide = () => {
        if (carouselRef.current) {
            const transform = carouselRef.current.style.transform;
            const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
            
            if (match) {
                const translateX = parseFloat(match[1]);
                const cardWidth = getCardWidth();
                const slideIndex = Math.round(Math.abs(translateX) / cardWidth);
                const clampedIndex = Math.max(0, Math.min(slideIndex, cards.length - 1));
                
                if (clampedIndex !== currentSlide) {
                    setCurrentSlide(clampedIndex);
                }
            }
        }
    };

    // Handle drag updates to track position
    const handleDrag = () => {
        // Use requestAnimationFrame to ensure we get the updated transform
        requestAnimationFrame(() => {
            updateCurrentSlide();
        });
    };

    // Handle drag end to snap to nearest slide and update indicator
    const handleDragEnd = () => {
        // Small delay to allow Framer Motion to finish any momentum scrolling
        setTimeout(() => {
            updateCurrentSlide();
        }, 100);
    };

    // Handle dot click to navigate to specific slide
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        if (carouselRef.current) {
            const cardWidth = getCardWidth();
            const targetX = -index * cardWidth;
            
            // Use Framer Motion's animate method for smooth transition
            const motionDiv = carouselRef.current as any;
            if (motionDiv.style) {
                motionDiv.style.transform = `translateX(${targetX}px)`;
                motionDiv.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                // Remove transition after animation
                setTimeout(() => {
                    if (motionDiv.style) {
                        motionDiv.style.transition = '';
                    }
                }, 500);
            }
        }
    };

    // Navigate to chat box (first card)
    const goToChatBox = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        // Use requestAnimationFrame to ensure this runs after any drag events
        requestAnimationFrame(() => {
            setCurrentSlide(0);
            goToSlide(0); // Chat box is the first card (index 0)
        });
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={carouselRef}
                    className="flex gap-0 cursor-grab active:cursor-grabbing"
                    drag={isDragDisabled ? false : "x"}
                    dragConstraints={{ right: 0, left: -(cards.length - 1) * getCardWidth() }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.1}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                >
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative min-w-[calc(100vw-2rem)] sm:min-w-[calc(100vw-14.375rem)] h-[600px] sm:h-[700px] lg:h-[810px] rounded-2xl sm:rounded-3xl overflow-hidden mx-4 sm:mx-6 ${
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
                                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 leading-tight ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                    {card.title}
                                    <br />
                                    {card.subtitle}
                                </h1>
                                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto mb-6 sm:mb-8 mt-4 sm:mt-8 px-4 ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                    {card.description}
                                </p>
                                
                                {card.type === 'chat' ? (
                                    <ChatBox />
                                ) : (
                                    <motion.div 
                                        className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8 w-full max-w-md sm:max-w-none sm:justify-center"
                                        drag={false}
                                        dragListener={false}
                                    >
                                        <button 
                                            onClick={goToChatBox}
                                            onMouseEnter={() => setIsDragDisabled(true)}
                                            onMouseLeave={() => setIsDragDisabled(false)}
                                            onPointerDown={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setIsDragDisabled(true);
                                            }}
                                            onPointerUp={() => setIsDragDisabled(false)}
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            onTouchStart={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setIsDragDisabled(true);
                                            }}
                                            onTouchEnd={() => setIsDragDisabled(false)}
                                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors text-base sm:text-lg pointer-events-auto relative z-10"
                                            style={{ touchAction: 'manipulation' }}
                                        >
                                            Get Started
                                        </button>
                                        <a href="#research" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border bg-white border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-base sm:text-lg text-black no-underline text-center relative z-10">
                                            Read More
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex justify-center gap-2">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                            index === currentSlide ? 'bg-black' : 'bg-black/50 hover:bg-black/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel; 