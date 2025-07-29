import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const CookiePage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Cookie Policy
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            How we use cookies to enhance your experience while respecting your privacy.
                        </p>
                        <p className="text-sm text-gray-500 mt-6">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </section>

                {/* Cookie Promise */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Our Cookie Approach
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                            We use cookies sparingly and transparently. Just like our AI solutions, we believe in giving you 
                            control over your data and digital experience.
                        </p>
                    </div>
                </section>

                {/* What Are Cookies */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">What Are Cookies?</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Cookies are small text files stored on your device to help websites function properly and provide better user experiences.
                                </p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                                        <p className="text-gray-600">Required for basic website functionality like security and user authentication.</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                                        <p className="text-gray-600">Help us understand how you use our platform to improve performance.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Preference Cookies</h3>
                                        <p className="text-gray-600">Remember your settings and preferences for a personalized experience.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Tracking Cookies</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We don't use cookies for advertising, tracking across sites, or building user profiles for marketing.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Your privacy is as important to us as the security of our AI solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Types of Cookies We Use */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Cookies We Use</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                            We keep our cookie usage minimal and focused on providing you with the best possible experience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
                                <p className="text-gray-600 mb-3">Keep you logged in securely while using our platform.</p>
                                <div className="text-sm text-gray-500">
                                    <p><strong>Duration:</strong> Session or as selected</p>
                                    <p><strong>Required:</strong> Yes</p>
                                </div>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security</h3>
                                <p className="text-gray-600 mb-3">Protect against fraud and ensure platform security.</p>
                                <div className="text-sm text-gray-500">
                                    <p><strong>Duration:</strong> Session</p>
                                    <p><strong>Required:</strong> Yes</p>
                                </div>
                            </div>

                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h3>
                                <p className="text-gray-600 mb-3">Remember your settings like theme, language, and dashboard layout.</p>
                                <div className="text-sm text-gray-500">
                                    <p><strong>Duration:</strong> 1 year</p>
                                    <p><strong>Required:</strong> No</p>
                                </div>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h3>
                                <p className="text-gray-600 mb-3">Help us improve our platform performance and user experience.</p>
                                <div className="text-sm text-gray-500">
                                    <p><strong>Duration:</strong> 2 years</p>
                                    <p><strong>Required:</strong> No</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cookie Management */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Cookie Control</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    You have full control over which cookies we use. Essential cookies are required for the platform to function, 
                                    but you can opt out of others.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">Manage preferences anytime</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">Clear cookies from your browser</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600 text-sm">Contact us for assistance</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Browser Settings</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Most browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Firefox:</strong> Preferences → Privacy & Security</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Safari:</strong> Preferences → Privacy → Cookies</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-600"><strong>Edge:</strong> Settings → Cookies and Site Permissions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Third-Party Cookies */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Third-Party Services</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                            We use minimal third-party services, and when we do, we ensure they align with our privacy standards.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Privacy-focused analytics to understand platform usage without personal identification.
                                </p>
                                <p className="text-xs text-gray-500">Optional - Can be disabled</p>
                            </div>
                            
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">CDN Services</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Content delivery networks to ensure fast, reliable access to our platform worldwide.
                                </p>
                                <p className="text-xs text-gray-500">Required for performance</p>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Services</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Protection against attacks and fraud to keep your data and our platform secure.
                                </p>
                                <p className="text-xs text-gray-500">Required for security</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact & Updates */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Stay In Control</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left mb-12">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We'll notify you if we make significant changes to our cookie practices. 
                                    You'll always have control over your preferences.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookie Consent</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We ask for your consent before using non-essential cookies and make it easy to 
                                    change your mind at any time.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Cookies?</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We're here to help you understand and control your cookie preferences. 
                                Contact us if you need assistance managing your settings or have questions about our practices.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Experience transparent AI solutions
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Just like our cookie policy, our AI platform is built on transparency and user control.
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

export default CookiePage; 