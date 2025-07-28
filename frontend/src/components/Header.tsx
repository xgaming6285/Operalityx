import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: "Research", href: "/research" },
        { name: "Solutions", href: "/solutions" },
        { name: "Community", href: "/community" },
        { name: "Stories", href: "/stories" },
        { name: "News", href: "/news" },
    ];

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm"
                : "bg-white mt-4"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="w-48 sm:w-56 md:w-68 h-24 sm:h-28 md:h-36 relative">
                            <img
                                src="/images/logo.png"
                                alt="Operalytix Logo"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === item.href
                                        ? "text-gray-900 border-b-2 border-gray-900"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Search Button and Mobile Menu Button */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100 transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden hover:bg-gray-100 transition-colors"
                            onClick={handleMobileMenuToggle}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
                        <nav className="px-4 py-6">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className={`block py-3 text-lg font-medium transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                                        location.pathname === item.href
                                            ? "text-gray-900 font-bold"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;