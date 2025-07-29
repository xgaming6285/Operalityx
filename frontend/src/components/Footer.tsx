import { Github, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
                    {/* Our Services */}
                    <div className="text-center xs:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Our Services</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Overview</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Use Cases</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Process Automations</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Self-hosted Solutions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Consultations</a></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div className="text-center xs:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Research</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Image Generation</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Sales AI</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Cybersecurity</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">API Access</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="text-center xs:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Company</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">About us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Brand Manifesto</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="text-center xs:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Legal</h3>
                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Terms of use</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Privacy policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base block py-1 hover:underline">Cookie policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-col lg:flex-row items-center justify-between pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200 gap-4 sm:gap-6">
                    {/* Center Logo - First on mobile */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28">
                            <img
                                src="/images/logo-icon.png"
                                alt="Operalytix Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Social Media Icons - Second on mobile */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 order-2 lg:order-3">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Youtube className="w-5 h-5 sm:w-6 sm:h-6" aria-label="YouTube" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" aria-label="LinkedIn" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <Github className="w-5 h-5 sm:w-6 sm:h-6" aria-label="GitHub" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 hover:bg-gray-100 rounded-full touch-manipulation">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Additional platform">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v2.44a4.83 4.83 0 0 1-3.77 4.25A4.83 4.83 0 0 1 6.2 2.44V2H4.12v.44a4.83 4.83 0 0 1-3.77 4.25A4.83 4.83 0 0 1 4.12 11v8.56a4.83 4.83 0 0 1 3.77 4.25V24h2.08v-.19a4.83 4.83 0 0 1 3.77-4.25A4.83 4.83 0 0 1 17.51 24v-.19h2.08V23.8a4.83 4.83 0 0 1 3.77-4.25A4.83 4.83 0 0 1 19.59 15V6.69z"/>
                            </svg>
                        </a>
                    </div>

                    {/* Copyright - Last on mobile */}
                    <div className="text-gray-500 text-xs sm:text-sm text-center order-3 lg:order-1">
                        Operalytix © 2025
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 