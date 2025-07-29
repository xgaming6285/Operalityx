import { Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-8 mb-8 sm:mb-12">
                    {/* Our Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Our Services</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Overview</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Use Cases</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Process Automations</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Self-hosted Solutions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Consultations</a></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Research</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Image Generation</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Sales AI</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Cybersecurity</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">API Access</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Company</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">About us</Link></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Brand Manifesto</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Legal</h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Terms of use</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Privacy policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base">Cookie policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-200 gap-6">
                    {/* Copyright */}
                    <div className="text-gray-500 text-sm order-2 lg:order-1">
                        Operalytix © 2025
                    </div>

                    {/* Center Logo */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                            <img
                                src="/images/logo-icon.png"
                                alt="Operalytix Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center space-x-4 sm:space-x-4 order-3 lg:order-3">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full">
                            <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full">
                            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full">
                            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v2.44a4.83 4.83 0 0 1-3.77 4.25A4.83 4.83 0 0 1 6.2 2.44V2H4.12v.44a4.83 4.83 0 0 1-3.77 4.25A4.83 4.83 0 0 1 4.12 11v8.56a4.83 4.83 0 0 1 3.77 4.25V24h2.08v-.19a4.83 4.83 0 0 1 3.77-4.25A4.83 4.83 0 0 1 17.51 24v-.19h2.08V23.8a4.83 4.83 0 0 1 3.77-4.25A4.83 4.83 0 0 1 19.59 15V6.69z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 