import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: "Research", href: "#research" },
        { name: "Solutions", href: "#solutions" },
        { name: "Community", href: "#community" },
        { name: "Stories", href: "#stories" },
        { name: "News", href: "#news" },
    ];

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm"
                : "bg-white mt-4"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-6">
                        <div className="w-68 h-36 relative">
                            <img
                                src="/images/logo.png"
                                alt="Operalytix Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                       
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const target = document.querySelector(item.href);
                                    if (target) {
                                        target.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                        // Update URL hash
                                        window.history.pushState(null, '', item.href);
                                    }
                                }}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Search Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 transition-colors"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;