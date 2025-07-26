interface NewsCardProps {
  card: any;
  onClick: (card: any, e: React.MouseEvent) => void;
  className?: string;
}

const NewsCard = ({ card, onClick, className = "" }: NewsCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(card, e);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden group ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={card.thumbnail || '/news/news-1.png'}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

      {/* Card Content */}
      <div className="relative w-full h-full p-4 sm:p-6 flex flex-col justify-between z-10">
        {/* Title and Subtitle */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-xs sm:text-sm text-white/80 mb-2">
              • {card.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
            {card.description}
          </p>
          <div className="mt-2 text-xs text-white/60">
            Click to read more →
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;