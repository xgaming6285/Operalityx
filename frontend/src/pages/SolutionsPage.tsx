import Layout from "@/components/Layout";
import Solutions from "@/components/Solutions";
import { motion } from "framer-motion";
import { Cog, Zap, TrendingUp, Shield, CheckCircle, BarChart } from "lucide-react";

const SolutionsPage = () => {
  const features = [
    {
      icon: Cog,
      title: "Intelligent Automation",
      description: "Streamline complex workflows with AI-powered automation that adapts to your business needs."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Process data and make decisions at lightning speed with our optimized AI infrastructure."
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Solutions that grow with your business, from startup to enterprise scale."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security and compliance with industry standards and regulations."
    }
  ];

  const benefits = [
    "Reduce operational costs by up to 40%",
    "Increase productivity by 3x",
    "24/7 automated operations",
    "Seamless integration with existing systems",
    "Real-time analytics and insights",
    "Scalable cloud infrastructure"
  ];

  const useCases = [
    {
      title: "Financial Services",
      description: "Automate risk assessment, fraud detection, and customer onboarding processes.",
      icon: BarChart
    },
    {
      title: "Healthcare",
      description: "Streamline patient data processing, appointment scheduling, and treatment planning.",
      icon: Shield
    },
    {
      title: "Manufacturing",
      description: "Optimize supply chain management, quality control, and predictive maintenance.",
      icon: Cog
    },
    {
      title: "Retail & E-commerce",
      description: "Enhance customer experience with personalized recommendations and inventory optimization.",
      icon: TrendingUp
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 leading-tight tracking-tight">
              Transform Your Business with
              <span className="block text-gray-300">
                Intelligent Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Unlock unprecedented efficiency and growth with our AI-powered solutions designed 
              to revolutionize how your business operates and scales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Why Choose Our Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Built on cutting-edge AI technology, our solutions deliver measurable results 
              that transform your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-4 bg-gray-900 rounded-lg mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
                Measurable Results That Drive Growth
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                Our clients experience transformative improvements across all key business metrics. 
                Join hundreds of companies that have revolutionized their operations.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-gray-700 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-black mb-2">40%</div>
                    <div className="text-gray-600 font-medium">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-black mb-2">3x</div>
                    <div className="text-gray-600 font-medium">Productivity Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-black mb-2">24/7</div>
                    <div className="text-gray-600 font-medium">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-black mb-2">99%</div>
                    <div className="text-gray-600 font-medium">Accuracy</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Solutions Across Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Our versatile AI solutions adapt to your industry's unique challenges and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-lg bg-gray-900 mb-6">
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{useCase.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Solutions Section */}
      <Solutions />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            Join thousands of companies that have already revolutionized their operations with our AI solutions.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsPage; 