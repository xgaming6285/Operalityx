import Layout from '../components/Layout';

const AboutPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Building reliable AI systems you can trust
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Operalityx creates secure, locally-hosted AI solutions for businesses who value privacy and control.
                        </p>
                    </div>
                </section>

                {/* Image + Mission */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <img 
                                src="/about-us/about-us-1.jpg" 
                                alt="Team collaboration" 
                                className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
                            />
                        </div>

                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                We believe AI should be accessible, secure, and under your control. We're building the future of on-premises AI solutions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy First</h3>
                                <p className="text-gray-600">
                                    Your data stays on your infrastructure. Complete privacy, zero compromises.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Proven Results</h3>
                                <p className="text-gray-600">
                                    We deliver practical AI solutions that integrate seamlessly with your workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">The Team</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    We're researchers, engineers, and security experts working together to build reliable AI systems.
                                </p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Research & Development</h3>
                                        <p className="text-gray-600">Advancing AI while maintaining security and reliability.</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Solutions</h3>
                                        <p className="text-gray-600">Building practical systems that solve real business challenges.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <img 
                                    src="/about-us/about-us-2.jpg" 
                                    alt="Innovation workspace" 
                                    className="w-full rounded-lg shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <img 
                                    src="/about-us/about-us-3.jpeg" 
                                    alt="Team values in action" 
                                    className="w-full rounded-lg shadow-sm"
                                />
                            </div>
                            
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">What Drives Us</h2>
                                
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">01</div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Security by Design</h3>
                                            <p className="text-gray-600">Every system we build prioritizes data protection and privacy from the ground up.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">02</div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Innovation</h3>
                                            <p className="text-gray-600">We focus on solutions that deliver real business value, not just impressive demos.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">03</div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Partnership</h3>
                                            <p className="text-gray-600">We work closely with you to understand your needs and build tailored solutions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Section */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img 
                            src="/about-us/about-us-4.jpg" 
                            alt="Future of AI" 
                            className="w-full max-w-3xl mx-auto rounded-lg shadow-sm mb-12"
                        />
                        
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Ready to build the future together?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Let's discuss how our secure AI solutions can transform your business operations.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/solutions"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Explore Solutions
                            </a>
                            <a
                                href="#contact"
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AboutPage; 