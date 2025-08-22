import { ArrowRight } from "lucide-react";

interface ExploreAllButtonProps {
  onClick: () => void;
  totalCount: number;
  displayedCount: number;
  label?: string;
  className?: string;
  layout?: "centered" | "inline"; // inline for header, centered for mobile
  size?: "md" | "sm"; // compact for header
}

const ExploreAllButton = ({
  onClick,
  totalCount,
  displayedCount,
  label = "Explore All News",
  className = "",
  layout = "centered",
  size = "md",
}: ExploreAllButtonProps) => {
  if (totalCount <= displayedCount) return null;

  const padding = size === "sm" ? "px-4 py-2.5" : "px-8 py-4";
  const textSize = size === "sm" ? "text-sm" : "text-base";
  const iconWrap = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  const Button = (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2.5 ${padding} bg-white border border-gray-200/80 rounded-2xl text-gray-900 font-medium ${textSize} hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-50/30 to-gray-50/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <span className="relative z-10 flex items-center gap-2.5">
        <span className="font-medium tracking-tight">{label}</span>
        <span className={`flex items-center justify-center ${iconWrap} bg-gray-100 rounded-full group-hover:bg-gray-200 transition-all duration-300`}>
          <ArrowRight className={`${iconSize} text-gray-600 group-hover:text-gray-800 group-hover:translate-x-0.5 transition-all duration-300`} />
        </span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse" />
    </button>
  );

  if (layout === "inline") return Button;

  return (
    <div className="flex justify-center mt-10">
      {Button}
    </div>
  );
};

export default ExploreAllButton;
