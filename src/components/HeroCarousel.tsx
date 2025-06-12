import { useRef } from 'react';
import { motion } from 'framer-motion';

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
            description: 'Leverage our cutting-edge solutions to optimize your workflow and drive unprecedented growth.'
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
                            className="relative min-w-[calc(100vw-140px)] h-[810px] rounded-2xl overflow-hidden mx-6"
                            style={{
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <h1 className="text-6xl lg:text-7xl font-bold mb-4">
                                    {card.title}
                                    <br />
                                    {card.subtitle}
                                </h1>
                                <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto mb-8">
                                    {card.description}
                                </p>
                                <div className="flex gap-4 mt-8">
                                    <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors text-lg">
                                        Get Started
                                    </button>
                                    <button className="px-8 py-4 border border-white rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">
                                        Read More
                                    </button>
                                </div>
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