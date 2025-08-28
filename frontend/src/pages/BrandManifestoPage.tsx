import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const BrandManifestoPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Brand Manifesto
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            We believe AI should <span className="font-semibold text-gray-900">empower, not exploit</span>. Our mission is to build intelligent systems that respect your privacy and amplify your potential.
                        </p>
                    </div>
                </section>

                {/* Core Belief */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                            AI Without Compromise
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                            We reject the false choice between powerful AI and data privacy. 
                            You shouldn't have to sacrifice control over your information to access cutting-edge technology.
                        </p>
                        
                        <div className="bg-gray-900 p-8 rounded-lg max-w-2xl mx-auto">
                            <p className="text-xl font-medium text-white italic">
                                "Your data is yours. Your AI should be too."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Principles */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">What We Stand For</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                These principles guide every decision we make, every line of code we write, and every solution we deliver.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy by Design</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Privacy isn't an afterthought—it's the foundation. Every system we build prioritizes your data sovereignty from day one.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparent Technology</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    No black boxes. We believe you have the right to understand how your AI systems work and make decisions.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Control</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Your infrastructure, your rules. On-premises deployment means you maintain complete control over your AI operations.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">4</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Innovation</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We build solutions that solve real problems, not impressive demos. Every feature serves your business goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">The Future We're Building</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    We envision a world where businesses of all sizes can harness the power of AI without compromising their values or security.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Democratized AI</h3>
                                            <p className="text-gray-600">Advanced AI capabilities accessible to businesses of every size, not just tech giants.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sovereign Computing</h3>
                                            <p className="text-gray-600">Organizations maintaining complete control over their data and computational resources.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical Innovation</h3>
                                            <p className="text-gray-600">AI development guided by human values and respect for individual privacy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Promise</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    We promise to never compromise on your privacy, never lock you into proprietary systems, 
                                    and never prioritize our convenience over your security.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    When you choose Operalytix, you're choosing a partner who believes your success and security go hand in hand.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How We're Different */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Why We're Different</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                            In a world of data harvesting and vendor lock-in, we chose a different path.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">We Don't Harvest Data</h3>
                                <p className="text-gray-600 mb-4">
                                    While others build business models around your data, we build value through exceptional service and technology.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">We Don't Create Dependencies</h3>
                                <p className="text-gray-600 mb-4">
                                    Our solutions are designed to empower your independence, not create vendor lock-in.
                                </p>
                            </div>

                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">We Don't Compromise Security</h3>
                                <p className="text-gray-600 mb-4">
                                    Security isn't a feature you pay extra for—it's the foundation of everything we build.
                                </p>
                            </div>
                            
                            <div className="text-left p-6 bg-white border border-gray-200 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">We Don't Over-Promise</h3>
                                <p className="text-gray-600 mb-4">
                                    We deliver practical solutions that work today, not science fiction that might work tomorrow.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Our Mission */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Join Our Mission</h2>
                        
                        <div className="bg-gray-50 p-8 rounded-lg mb-12">
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Every organization that chooses privacy-first AI makes the entire ecosystem stronger. 
                                Together, we're proving that powerful technology and personal privacy aren't mutually exclusive.
                            </p>
                            <p className="text-lg font-medium text-gray-900">
                                The future of AI is local, secure, and in your control.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left mb-12">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Businesses</h3>
                                <p className="text-gray-600 text-sm">
                                    Implement AI that enhances your operations while protecting your competitive advantage.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Developers</h3>
                                <p className="text-gray-600 text-sm">
                                    Build with tools and platforms that respect user privacy and developer autonomy.
                                </p>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Everyone</h3>
                                <p className="text-gray-600 text-sm">
                                    Support a technology future where innovation serves humanity, not the other way around.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Ready to take control of your AI future?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Discover how our privacy-first approach can transform your business without compromising your values.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/solutions"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Explore Our Solutions
                            </Link>
                            <Link
                                to="/about"
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default BrandManifestoPage; 