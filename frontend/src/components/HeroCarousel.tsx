import { useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBox from './ChatBox';

const HeroCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={carouselRef}
                    className="flex gap-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ right: 0, left: -(cards.length - 1) * getCardWidth() }}
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
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8 w-full max-w-md sm:max-w-none">
                                        <button className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-0 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors text-base sm:text-lg">
                                            Get Started
                                        </button>
                                        <a href="#research" className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-1 border bg-white border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-base sm:text-lg text-black no-underline text-center">
                                            Read More
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex justify-center gap-2">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="w-2 h-2 rounded-full bg-black/50 first:bg-black"
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel; 