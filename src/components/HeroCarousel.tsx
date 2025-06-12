import { useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBox from './ChatBox';

const HeroCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const cards = [
        {
            id: 1,
            image: '/images/first.webp',
            title: "Unlock Your Business's",
            subtitle: 'True Potential.',
            description: 'Operalytx delivers intelligent automation that streamlines your processes, eliminates redundancies, and frees your team to focus on what matters most.'
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
            type: 'chat',
            title: 'Chat with Our',
            subtitle: 'AI Assistant',
            description: 'Ask questions, get insights, and explore how our AI can transform your business.'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={carouselRef}
                    className="flex gap-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ right: 0, left: -(cards.length - 1) * (window.innerWidth - 48) }}
                >
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative min-w-[calc(100vw-230px)] h-[810px] rounded-3xl overflow-hidden mx-6 ${
                                card.type === 'chat' 
                                    ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-black' 
                                    : ''
                            }`}
                            style={card.type !== 'chat' ? {
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            } : {}}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <h1 className={`text-6xl lg:text-7xl mb-8 ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                    {card.title}
                                    <br />
                                    {card.subtitle}
                                </h1>
                                <p className={`text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto mb-8 mt-8 ${card.id === 2 ? 'text-black' : 'text-white'}`}>
                                    {card.description}
                                </p>
                                
                                {card.type === 'chat' ? (
                                    <ChatBox />
                                ) : (
                                    <div className="flex gap-8 mt-8">
                                        <button className="px-4 py-0 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors text-lg">
                                            Get Started
                                        </button>
                                        <a href="#research" className="px-4 py-1 border bg-white border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-lg text-black no-underline">
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