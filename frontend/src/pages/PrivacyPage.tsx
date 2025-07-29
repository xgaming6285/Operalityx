import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const PrivacyPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Your privacy is fundamental to how we build and operate our AI solutions.
                        </p>
                        <p className="text-sm text-gray-500 mt-6">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </section>

                {/* Privacy Promise */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Our Privacy Promise
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                            We believe your data should stay yours. Our on-premises AI solutions are designed to keep your information 
                            secure and under your complete control.
                        </p>
                    </div>
                </section>

                {/* Data Collection */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">What We Collect</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    We collect only what's necessary to provide our AI services and improve your experience.
                                </p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
                                        <p className="text-gray-600">Basic details like name, email, and company information for service delivery.</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data</h3>
                                        <p className="text-gray-600">How you interact with our platform to improve performance and user experience.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
                                        <p className="text-gray-600">System logs and performance metrics for security and optimization.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your AI Data Stays Private</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Any data processed through our on-premises AI solutions remains entirely on your infrastructure.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    We never access, store, or analyze your AI model inputs or outputs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How We Use Data */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">How We Use Your Information</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                            We use your data responsibly and only for purposes that benefit your experience with our platform.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Delivery</h3>
                                <p className="text-gray-600 mb-4">
                                    Providing AI solutions, technical support, and maintaining platform functionality.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Communication</h3>
                                <p className="text-gray-600 mb-4">
                                    Sending updates about services, security alerts, and responding to inquiries.
                                </p>
                            </div>

                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Improvement</h3>
                                <p className="text-gray-600 mb-4">
                                    Analyzing usage patterns to enhance security, performance, and user experience.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security & Compliance</h3>
                                <p className="text-gray-600 mb-4">
                                    Protecting against threats and ensuring compliance with applicable regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Protection */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security First</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    We implement enterprise-grade security measures to protect your information at every level.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">End-to-end encryption</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">Regular security audits</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">Access controls & monitoring</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Your Data Rights</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    You have complete control over your personal information and how it's used.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Access:</strong> Request copies of your personal data</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Correction:</strong> Update or correct inaccurate information</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Deletion:</strong> Request removal of your personal data</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Portability:</strong> Transfer your data to another service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Sharing */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Data Sharing</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                            We don't sell your data. We only share information when necessary for service delivery or legal compliance.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Providers</h3>
                                <p className="text-gray-600 text-sm">
                                    Trusted partners who help deliver our services under strict confidentiality agreements.
                                </p>
                            </div>
                            
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                                <p className="text-gray-600 text-sm">
                                    When required by law, court orders, or to protect our rights and safety.
                                </p>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Transfers</h3>
                                <p className="text-gray-600 text-sm">
                                    In the event of a merger or acquisition, with advance notice to affected users.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact & Updates */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Stay Informed</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left mb-12">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We'll notify you of any significant changes to this privacy policy via email or platform notifications.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We keep your data only as long as necessary to provide services or meet legal obligations.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Privacy?</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We're committed to transparency about our privacy practices. 
                                Contact us anytime with questions or to exercise your data rights.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Ready to experience secure AI?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Discover how our privacy-first approach can transform your business operations.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/solutions"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Explore Solutions
                            </Link>
                            <Link
                                to="/contact"
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PrivacyPage; 