import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const TermsPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Terms of Use
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Please read these terms carefully before using our services.
                        </p>
                        <p className="text-sm text-gray-500 mt-6">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Welcome to our platform
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                            By using Operalityx's services, you agree to these terms. We've designed our platform to provide secure, 
                            locally-hosted AI solutions while maintaining the highest standards of privacy and reliability.
                        </p>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Our Services</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    We provide comprehensive AI solutions designed for businesses who value privacy and control over their data.
                                </p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Premises Solutions</h3>
                                        <p className="text-gray-600">Deploy AI models directly on your infrastructure for maximum security.</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Development</h3>
                                        <p className="text-gray-600">Tailored AI solutions built specifically for your business needs.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Research & Innovation</h3>
                                        <p className="text-gray-600">Cutting-edge AI research and development services.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    By accessing or using our services, website, or applications, you agree to be bound by these Terms of Use.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    These terms apply to all users and visitors of our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* User Responsibilities */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">User Responsibilities</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                            We believe in responsible AI use. Here's what we expect from our users to maintain a safe and effective platform.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
                                <p className="text-gray-600 mb-4">
                                    Maintain accurate account information and protect your login credentials. You're responsible for all activities under your account.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lawful Use</h3>
                                <p className="text-gray-600 mb-4">
                                    Use our services only for legal purposes and in compliance with all applicable laws and regulations.
                                </p>
                            </div>

                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Guidelines</h3>
                                <p className="text-gray-600 mb-4">
                                    Do not generate, distribute, or store illegal or harmful content through our AI systems.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Respectful Interaction</h3>
                                <p className="text-gray-600 mb-4">
                                    Maintain respectful interactions and do not impersonate others or engage in disruptive behavior.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Privacy & Security */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy by Design</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Your data privacy is fundamental to our approach. Our on-premises solutions ensure your information stays within your infrastructure.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    We are committed to protecting your personal information and maintaining complete confidentiality.
                                </p>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Data Protection</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    We implement industry-leading security measures to protect your data and ensure the integrity of our AI systems.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600">Local deployment keeps your data on your servers</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600">End-to-end encryption for all data transmission</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600">Regular security audits and compliance checks</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Intellectual Property */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Intellectual Property</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                            Our platform, content, and technology are protected by intellectual property laws. We respect your rights and expect the same in return.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Rights</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    The Operalityx platform, including its features, functionality, and original content, remains our exclusive property. 
                                    Our trademarks and technology cannot be used without written permission.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Content</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You retain ownership of the content you create using our AI services. We respect your intellectual property and 
                                    maintain strict confidentiality of your data and outputs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Reliability */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Service Reliability</h2>
                                
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            We strive to provide continuous access to our services, though we cannot guarantee uninterrupted operation. 
                                            We reserve the right to modify or suspend services when necessary.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Accuracy</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            While our AI systems are highly advanced, generated content may contain inaccuracies or biases. 
                                            Users should verify important information independently.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Limitation of Liability</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    We provide our services "as is" and limit our liability to the maximum extent permitted by law.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Operalityx and its affiliates shall not be liable for indirect, incidental, or consequential damages 
                                    resulting from your use of our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Updates & Contact */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Keeping You Informed</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left mb-12">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Terms Updates</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update these terms periodically. Material changes will be communicated with at least 30 days' notice. 
                                    Continued use of our services constitutes acceptance of updated terms.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Governing Law</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    These terms are governed by the laws of our jurisdiction of establishment. 
                                    Any disputes will be resolved through appropriate legal channels.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions or Concerns?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions about these Terms of Use, please don't hesitate to contact us. 
                                We're here to help clarify any aspects of our terms and ensure you have a positive experience with our platform.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Questions about our terms?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            We're here to help clarify any aspects of our terms of use.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/about"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Learn About Us
                            </Link>
                            <Link
                                to="/contact"
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default TermsPage; 