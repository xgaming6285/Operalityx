import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 relative">
                            <svg
                                viewBox="0 0 40 40"
                                className="w-full h-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Atomic symbol representation */}
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="18"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <ellipse
                                    cx="20"
                                    cy="20"
                                    rx="18"
                                    ry="8"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                    transform="rotate(45 20 20)"
                                />
                                <ellipse
                                    cx="20"
                                    cy="20"
                                    rx="18"
                                    ry="8"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                    transform="rotate(-45 20 20)"
                                />
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="3"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">
                            Operalytix
                        </span>
                    </div>

                    {/* Spacer for balance */}
                    <div className="w-10"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;