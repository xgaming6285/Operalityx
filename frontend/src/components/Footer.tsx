import { Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
                    {/* Our Services */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Our Services</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Overview</Link></li>
                            <li><Link to="/use-cases" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Use Cases</Link></li>
                            <li><Link to="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Process Automations</Link></li>
                            <li><Link to="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Self-hosted Solutions</Link></li>
                            <li><Link to="/support" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Consultations</Link></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Research</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><Link to="/research" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Image Generation</Link></li>
                            <li><Link to="/research" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Sales AI</Link></li>
                            <li><Link to="/research" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Cybersecurity</Link></li>
                            <li><Link to="/research" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">API Access</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Company</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">About us</Link></li>
                            <li><Link to="/news" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">News</Link></li>
                            <li><Link to="/manifesto" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Brand Manifesto</Link></li>
                            <li><Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Careers</Link></li>
                            <li><Link to="/support" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Legal</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Terms of use</Link></li>
                            <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Privacy policy</Link></li>
                            <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1">Cookie policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200 gap-4 sm:gap-6">
                    {/* Mobile: Logo First */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                            <img
                                src="/images/logo-icon.png"
                                alt="Operalytix Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 order-2 lg:order-3">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                    </div>

                    {/* Copyright - Mobile: Last */}
                    <div className="text-gray-500 text-sm text-center order-3 lg:order-1">
                        Operalytix © 2025
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 