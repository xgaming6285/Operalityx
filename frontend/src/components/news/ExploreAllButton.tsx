import { ArrowRight } from "lucide-react";

interface ExploreAllButtonProps {
  onClick: () => void;
  totalCount: number;
  displayedCount: number;
  label?: string;
  className?: string;
}

const ExploreAllButton = ({
  onClick,
  totalCount,
  displayedCount,
  label = "Explore All News",
  className = ""
}: ExploreAllButtonProps) => {
  if (totalCount <= displayedCount) return null;

  return (
    <div className={`flex justify-center mt-16 ${className}`}>
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-white border border-gray-200/80 rounded-2xl text-gray-900 font-medium text-base hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-50/30 to-gray-50/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Main content */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="font-medium tracking-tight">{label}</span>

          {/* Enhanced arrow with background */}
          <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-800 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse" />
      </button>
    </div>
  );
};

export default ExploreAllButton;