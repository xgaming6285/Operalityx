import Layout from "@/components/Layout";
import Community from "@/components/Community";
import { motion } from "framer-motion";
import { Users, MessageCircle, Star, Globe, Calendar, Award, TrendingUp } from "lucide-react";

const CommunityPage = () => {
  const communityStats = [
    { label: "Active Members", value: "10K+", icon: Users },
    { label: "Discussions", value: "2.5K+", icon: MessageCircle },
    { label: "Projects Shared", value: "500+", icon: Star },
    { label: "Countries", value: "50+", icon: Globe }
  ];

  const communityFeatures = [
    {
      title: "Expert Knowledge Sharing",
      description: "Learn from industry experts and experienced practitioners in AI and automation.",
      icon: Award
    },
    {
      title: "Collaborative Projects",
      description: "Work together on open-source projects and innovative AI solutions.",
      icon: Users
    },
    {
      title: "Weekly Events",
      description: "Join webinars, workshops, and networking events every week.",
      icon: Calendar
    },
    {
      title: "Career Growth",
      description: "Access job opportunities, mentorship programs, and skill development resources.",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Engineer at TechCorp",
      content: "The Operalytix community has been instrumental in my career growth. The knowledge sharing and collaborative spirit here is unmatched."
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist",
      content: "I've learned more from this community in 6 months than I did in years of solo work. The projects and discussions are incredibly valuable."
    },
    {
      name: "Emily Johnson",
      role: "ML Researcher",
      content: "From beginner questions to advanced research discussions, this community welcomes everyone and fosters genuine learning."
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
              Join the Future of
              <span className="block text-gray-300">
                AI Innovation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Connect with thousands of AI enthusiasts, researchers, and practitioners. 
              Share knowledge, collaborate on projects, and grow together in our vibrant community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
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

      {/* Community Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Why Join Our Community?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Be part of a thriving ecosystem where innovation meets collaboration, 
              and where your growth is our collective success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="inline-flex p-3 rounded-lg bg-gray-900 mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Hear from some of our amazing community members about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm font-medium">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-light italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Community Section */}
      <Community />

      {/* Join CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Ready to Connect and Collaborate?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            Join thousands of AI enthusiasts and be part of the conversation that's shaping the future of technology.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityPage; 