import Layout from "@/components/Layout";
import Stories from "@/components/Stories";
import FeaturedStory from "@/components/FeaturedStory";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Users, Rocket, Quote, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const StoriesPage = () => {
  const impactStats = [
    { label: "Success Stories", value: "250+", icon: Award },
    { label: "Lives Transformed", value: "10K+", icon: Users },
    { label: "Industries", value: "15+", icon: Rocket },
    { label: "Innovation Awards", value: "25+", icon: Lightbulb }
  ];

  const storyCategories = [
    {
      title: "Transformation Stories",
      description: "Discover how businesses completely revolutionized their operations with AI.",
      icon: Rocket,
      count: "85 stories"
    },
    {
      title: "Innovation Journeys",
      description: "Follow the creative process behind groundbreaking AI solutions.",
      icon: Lightbulb,
      count: "67 stories"
    },
    {
      title: "People & Culture",
      description: "Human stories behind the technology and the teams that make it happen.",
      icon: Users,
      count: "98 stories"
    },
    {
      title: "Learning Experiences",
      description: "Lessons learned, challenges overcome, and insights gained along the way.",
      icon: BookOpen,
      count: "156 stories"
    }
  ];



  const inspiringQuotes = [
    {
      quote: "AI didn't just solve our problems; it opened doors to possibilities we never imagined.",
      author: "David Kim",
      role: "CTO, InnovateCorp"
    },
    {
      quote: "The transformation wasn't just technical – it changed how our entire team thinks about work.",
      author: "Sarah Mitchell",
      role: "Operations Director, FlowTech"
    },
    {
      quote: "What used to take us weeks now happens in hours. It's like having superpowers.",
      author: "Ahmed Hassan",
      role: "Founder, DataFlow Solutions"
    }
  ];

  const scrollToStories = () => {
    const storiesSection = document.getElementById('stories');
    if (storiesSection) {
      storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              Real Stories of
              <span className="block text-gray-300">
                AI Transformation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Discover inspiring journeys of businesses and individuals who embraced AI to solve real challenges, 
              drive innovation, and create meaningful impact in their industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium"
                onClick={scrollToStories}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Read Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
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

      {/* Featured Story */}
      <FeaturedStory />

      {/* Story Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Explore Story Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Find the stories that resonate with your journey and inspire your next breakthrough.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {storyCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="inline-flex p-3 rounded-lg bg-gray-900 mb-6">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-black">
                    {category.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {category.count}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiring Quotes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Words That Inspire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Powerful insights from leaders who've experienced the transformative power of AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {inspiringQuotes.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 border border-gray-200"
              >
                <Quote className="h-8 w-8 text-gray-400 mb-6" />
                <p className="text-gray-700 leading-relaxed text-lg italic mb-6 font-light">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-black">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Stories Section */}
      <Stories />

    </Layout>
  );
};

export default StoriesPage; 