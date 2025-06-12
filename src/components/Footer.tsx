import { Github, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Our Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Services</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Overview</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Use Cases</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Process Automations</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Self-hosted Solutions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Consultations</a></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Research</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Image Generation</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Sales AI</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Cybersecurity</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">API Access</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">About us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Brand Manifesto</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms of use</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Cookie policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-gray-200">
                    {/* Copyright */}
                    <div className="text-gray-500 text-sm mb-6 lg:mb-0">
                        Operalytix © 2025
                    </div>

                    {/* Center Logo */}
                    <div className="flex justify-center mb-6 lg:mb-0">
                        <div className="w-12 h-12">
                            <svg
                                viewBox="0 0 40 40"
                                className="w-full h-full text-gray-600"
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
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Youtube className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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