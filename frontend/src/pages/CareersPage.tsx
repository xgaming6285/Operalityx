import Layout from '../components/Layout';
import { useState } from 'react';
import { ChevronRight, MapPin, Clock, Users, Briefcase, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobRole {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    benefits: string[];
}

const CareersPage = () => {
    const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
    const [showAllJobs, setShowAllJobs] = useState(false);

    const jobRoles: JobRole[] = [
        {
            id: '1',
            title: 'Senior AI Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Join our team to build cutting-edge AI systems that prioritize privacy and security. You\'ll work on developing locally-hosted AI solutions that transform how businesses interact with artificial intelligence.',
            requirements: [
                '5+ years experience in machine learning and AI development',
                'Strong background in Python, TensorFlow/PyTorch',
                'Experience with distributed systems and cloud architecture',
                'Knowledge of privacy-preserving machine learning techniques',
                'Strong problem-solving and communication skills'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Professional development budget',
                'Cutting-edge hardware and software tools'
            ]
        },
        {
            id: '2',
            title: 'Product Manager - Enterprise AI',
            department: 'Product',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Lead product strategy for our enterprise AI solutions. Work closely with engineering, sales, and customers to define and deliver products that solve real business challenges.',
            requirements: [
                '4+ years of product management experience',
                'Background in enterprise software or AI/ML products',
                'Strong analytical and strategic thinking skills',
                'Experience working with technical teams',
                'Excellent communication and leadership abilities'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Professional development budget',
                'Travel opportunities to work with clients'
            ]
        },
        {
            id: '3',
            title: 'Security Engineer',
            department: 'Security',
            location: 'Remote',
            type: 'Full-time',
            description: 'Help us build the most secure AI systems in the industry. You\'ll be responsible for designing and implementing security measures that protect our customers\' most sensitive data.',
            requirements: [
                '3+ years experience in cybersecurity',
                'Knowledge of secure software development practices',
                'Experience with encryption and access control systems',
                'Understanding of compliance frameworks (SOC 2, GDPR)',
                'Strong attention to detail and security mindset'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Security certifications support',
                'Conference attendance budget'
            ]
        },
        {
            id: '4',
            title: 'Research Scientist',
            department: 'Research',
            location: 'Remote',
            type: 'Full-time',
            description: 'Push the boundaries of AI research while maintaining our commitment to privacy and security. Contribute to publications and advance the state of the art in locally-hosted AI systems.',
            requirements: [
                'PhD in Computer Science, AI, or related field',
                'Strong publication record in top-tier conferences',
                'Expertise in deep learning and neural networks',
                'Experience with privacy-preserving ML techniques',
                'Passion for practical AI applications'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Research publication support',
                'Conference travel and speaking opportunities',
                'Collaboration with leading academic institutions'
            ]
        },
        {
            id: '5',
            title: 'DevOps Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build and maintain the infrastructure that powers our AI systems. Focus on creating scalable, secure, and reliable deployment pipelines for our on-premises solutions.',
            requirements: [
                '3+ years experience in DevOps and cloud infrastructure',
                'Strong knowledge of Docker, Kubernetes, and CI/CD',
                'Experience with AWS, Azure, or GCP',
                'Familiarity with Infrastructure as Code (Terraform, Ansible)',
                'Understanding of security best practices and compliance'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Professional development budget',
                'Latest DevOps tools and technologies'
            ]
        },
        {
            id: '6',
            title: 'UX/UI Designer',
            department: 'Design',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Design intuitive and accessible interfaces for our AI products. Work closely with engineering and product teams to create user experiences that make complex AI systems simple to use.',
            requirements: [
                '3+ years experience in UX/UI design',
                'Strong portfolio demonstrating B2B software design',
                'Proficiency in Figma, Sketch, or similar design tools',
                'Experience with design systems and accessibility standards',
                'Understanding of user research and usability testing'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Design conference and workshop budget',
                'Creative freedom and collaborative environment'
            ]
        },
        {
            id: '7',
            title: 'Sales Engineer',
            department: 'Sales',
            location: 'Remote / Travel',
            type: 'Full-time',
            description: 'Bridge the gap between our technical solutions and customer needs. Work with enterprise clients to understand their requirements and demonstrate how our AI systems solve their challenges.',
            requirements: [
                '2+ years experience in technical sales or solution engineering',
                'Background in enterprise software or AI/ML technologies',
                'Excellent communication and presentation skills',
                'Ability to understand complex technical concepts',
                'Willingness to travel for client meetings'
            ],
            benefits: [
                'Competitive salary plus commission structure',
                'Comprehensive health, dental, and vision insurance',
                'Travel expense coverage',
                'Sales training and development programs',
                'Direct impact on company growth'
            ]
        },
        {
            id: '8',
            title: 'Data Scientist',
            department: 'Research',
            location: 'Remote',
            type: 'Full-time',
            description: 'Extract insights from complex datasets to improve our AI models and products. Work on cutting-edge problems in privacy-preserving analytics and federated learning.',
            requirements: [
                '3+ years experience in data science and analytics',
                'Strong background in statistics and machine learning',
                'Proficiency in Python, R, and SQL',
                'Experience with big data tools and distributed computing',
                'Knowledge of privacy-preserving techniques preferred'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Conference attendance and research budget',
                'Access to large-scale datasets and computing resources'
            ]
        },
        {
            id: '9',
            title: 'Technical Writer',
            department: 'Product',
            location: 'Remote',
            type: 'Full-time',
            description: 'Create clear, comprehensive documentation for our AI products and APIs. Help developers and enterprises understand and implement our solutions effectively.',
            requirements: [
                '2+ years experience in technical writing',
                'Background in software documentation or API documentation',
                'Strong writing and communication skills',
                'Familiarity with developer tools and workflows',
                'Ability to work with engineering teams'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Professional writing development budget',
                'Collaborative and supportive team environment'
            ]
        },
        {
            id: '10',
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Ensure our enterprise customers achieve maximum value from our AI solutions. Build long-term relationships and drive product adoption and expansion.',
            requirements: [
                '3+ years experience in customer success or account management',
                'Background in B2B SaaS or enterprise software',
                'Strong relationship building and communication skills',
                'Analytical mindset with data-driven approach',
                'Experience with customer success platforms and tools'
            ],
            benefits: [
                'Competitive salary and equity package',
                'Comprehensive health, dental, and vision insurance',
                'Flexible working arrangements',
                'Customer success training and certification',
                'Direct customer impact and growth opportunities'
            ]
        }
    ];

    const openJobModal = (job: JobRole) => {
        setSelectedJob(job);
    };

    const closeJobModal = () => {
        setSelectedJob(null);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                                Build the future of AI with us
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                                Join our mission to create secure, privacy-first AI solutions that empower businesses without compromising their data.
                            </p>
                        </div>
                        
                        <div className="mb-12">
                            <img 
                                src="/careers/careers-1.jpg" 
                                alt="Our collaborative workspace" 
                                className="w-full max-w-5xl mx-auto rounded-lg shadow-sm"
                            />
                        </div>

                        <div className="text-center">
                            <a
                                href="#open-roles"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 inline-flex items-center gap-2"
                            >
                                View Open Roles <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Company Culture */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Why work at Operalytix?</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                We're building the next generation of AI technology while maintaining the highest standards of privacy and security.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Team</h3>
                                <p className="text-gray-600">
                                    Work alongside brilliant minds from diverse backgrounds, all united by a passion for responsible AI development.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaningful Work</h3>
                                <p className="text-gray-600">
                                    Build products that solve real problems while respecting user privacy and maintaining data security.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Work-Life Balance</h3>
                                <p className="text-gray-600">
                                    Flexible remote work options, generous PTO, and a culture that values your well-being and personal growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Open Roles */}
                <section id="open-roles" className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Open Positions</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Join us in shaping the future of secure, privacy-first artificial intelligence.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {(showAllJobs ? jobRoles : jobRoles.slice(0, 6)).map((job) => (
                                <div
                                    key={job.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200 cursor-pointer"
                                    onClick={() => openJobModal(job)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="w-4 h-4" />
                                                    {job.department}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!showAllJobs && jobRoles.length > 6 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowAllJobs(true)}
                                    className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 inline-flex items-center gap-2"
                                >
                                    Show More Positions ({jobRoles.length - 6} more)
                                </button>
                            </div>
                        )}

                        {showAllJobs && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowAllJobs(false)}
                                    className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Show Fewer Positions
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 sm:py-20 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Don't see the perfect role?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute to the future of AI.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="mailto:careers@operalityx.com"
                                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Send Your Resume
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

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" />
                                            {selectedJob.department}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {selectedJob.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {selectedJob.type}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={closeJobModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Role Description</h3>
                                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                                <ul className="space-y-2">
                                    {selectedJob.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                                <ul className="space-y-2">
                                    {selectedJob.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <a
                                    href={`mailto:careers@operalityx.com?subject=Application for ${selectedJob.title}`}
                                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    Apply for this Position
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default CareersPage; 