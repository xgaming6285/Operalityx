import Layout from "@/components/Layout";
import Research from "@/components/Research";
import { motion } from "framer-motion";
import { Brain, Zap, Target, Users, ChevronRight, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResearchPage = () => {
  const stats = [
    { label: "Research Projects", value: "50+", icon: Brain },
    { label: "Publications", value: "25+", icon: ExternalLink },
    { label: "AI Models Developed", value: "15+", icon: Zap },
    { label: "Research Partners", value: "10+", icon: Users }
  ];

  const researchAreas = [
    {
      title: "Multi-Agent Systems",
      description: "Developing sophisticated AI systems that can collaborate and coordinate to solve complex problems autonomously.",
      icon: Users
    },
    {
      title: "Adaptive Automation",
      description: "Creating intelligent systems that learn and adapt to changing environments and requirements in real-time.",
      icon: Brain
    },
    {
      title: "Low-Power Intelligence",
      description: "Pioneering efficient AI algorithms that deliver high performance while minimizing computational overhead.",
      icon: Zap
    },
    {
      title: "Dynamic Task Alignment",
      description: "Researching methods for AI systems to understand and align with evolving business objectives automatically.",
      icon: Target
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 leading-tight tracking-tight">
              Pioneering the Future of
              <span className="block text-gray-300">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Our research division pushes the boundaries of AI, developing breakthrough technologies 
              that transform how businesses operate and scale in the modern world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                <Download className="mr-2 h-5 w-5" />
                Research Papers
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-medium">
                <ExternalLink className="mr-2 h-5 w-5" />
                Publications
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-gray-700" />
                <div className="text-3xl font-semibold text-black mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Our Research Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              We're advancing the state of AI across multiple domains, from theoretical foundations 
              to practical applications that solve real-world challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="inline-flex p-3 rounded-lg bg-gray-900 mb-6">
                  <area.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-light">
                  {area.description}
                </p>
                <Button variant="ghost" className="group/btn p-0 h-auto text-black hover:text-gray-600 font-medium">
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Research Section */}
      <Research />

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Join Our Research Community
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            Collaborate with leading researchers and contribute to the future of AI. 
            Explore partnership opportunities and research initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 font-medium">
              Research Partnerships
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 font-medium">
              Contact Research Team
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchPage; 