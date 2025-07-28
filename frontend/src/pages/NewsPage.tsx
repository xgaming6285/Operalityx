import Layout from "@/components/Layout";
import News from "@/components/news";
import NewsModal from "@/components/news/NewsModal";
import DocumentViewer from "@/components/DocumentViewer";
import { motion } from "framer-motion";
import { Newspaper, Clock, TrendingUp, Globe, Bell, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useArticles } from "@/hooks/useArticles";

const NewsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    articles: allNewsCards,
    showArticleViewer,
    currentDocument,
    openArticle,
    closeArticleViewer
  } = useArticles({ type: "news" });

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-signup');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToNewsCards = () => {
    const newsSection = document.getElementById('news-cards');
    if (newsSection) {
      newsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const openNewsModal = () => {
    setIsModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (article: any) => {
    openArticle(article);
    closeNewsModal();
  };

  const newsStats = [
    { label: "Daily Articles", value: "15+", icon: Newspaper },
    { label: "Global Coverage", value: "24/7", icon: Clock },
    { label: "Industry Reports", value: "200+", icon: TrendingUp },
    { label: "Expert Sources", value: "50+", icon: Globe }
  ];

  const newsCategories = [
    {
      title: "AI Breakthroughs",
      description: "Latest developments in artificial intelligence research and applications.",
      icon: TrendingUp,
      count: "42 articles"
    },
    {
      title: "Industry Analysis",
      description: "Deep-dive analysis of market trends and business implications.",
      icon: Globe,
      count: "38 articles"
    },
    {
      title: "Company Updates",
      description: "Latest news about Operalytix developments and product releases.",
      icon: Bell,
      count: "25 articles"
    },
    {
      title: "Technology Trends",
      description: "Emerging technologies and their impact on various industries.",
      icon: Newspaper,
      count: "56 articles"
    }
  ];

  const breakingNews = [
    {
      title: "Revolutionary AI Model Achieves Human-Level Performance in Complex Reasoning",
      time: "2 hours ago",
      category: "AI Breakthroughs"
    },
    {
      title: "Major Tech Giants Announce $10B Investment in AI Infrastructure",
      time: "5 hours ago",
      category: "Industry Analysis"
    },
    {
      title: "New Regulations for AI in Healthcare Expected This Quarter",
      time: "8 hours ago",
      category: "Policy & Regulation"
    }
  ];

  const trendingTopics = [
    "Machine Learning",
    "Automation",
    "Neural Networks",
    "Data Science",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
    "Ethics in AI"
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
              Stay Ahead with
              <span className="block text-gray-300">
                AI News & Insights
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Get the latest updates on artificial intelligence, industry trends, and breakthrough innovations 
              that are shaping the future of technology and business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium"
                onClick={scrollToNewsCards}
              >
                <Newspaper className="mr-2 h-5 w-5" />
                Read Latest News
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-medium"
                onClick={scrollToNewsletter}
              >
                <Mail className="mr-2 h-5 w-5" />
                Subscribe to Newsletter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breaking News */}
      <section className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="font-semibold text-sm text-gray-900">LATEST:</span>
            <span className="text-sm text-gray-700 font-medium">
              {breakingNews[0].title}
            </span>
          </div>
        </div>
      </section>

      {/* News Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {newsStats.map((stat, index) => (
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

      {/* News Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              News Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Explore news organized by topics that matter most to your business and interests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {newsCategories.map((category, index) => (
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

      {/* Trending Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Trending Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover what's capturing attention in the AI and technology world right now.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-100 border border-gray-200 rounded-lg px-6 py-3 hover:shadow-md transition-all duration-300 cursor-pointer hover:bg-gray-200"
              >
                <span className="text-gray-700 font-medium"># {topic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter-signup" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              Never Miss Important Updates
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
              Subscribe to our newsletter and get the latest AI news, insights, and exclusive content 
              delivered directly to your inbox.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto border border-gray-200">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 font-medium"
                  />
                </div>
                <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 font-medium">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-gray-500 text-sm mt-4 font-medium">
                Join 10,000+ professionals getting weekly AI insights
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main News Section */}
      <div id="news-cards">
        <News />
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Stay Informed, Stay Ahead
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            Access premium content, exclusive interviews, and in-depth analysis 
            from leading AI experts and industry insiders.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 font-medium"
              onClick={openNewsModal}
            >
              <Search className="mr-2 h-5 w-5" />
              Explore All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* News Modal */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={closeNewsModal}
        newsCards={allNewsCards}
        openDocument={handleCardClick}
      />

      {/* Document Viewer */}
      {showArticleViewer && currentDocument && (
        <DocumentViewer
          document={currentDocument}
          onClose={closeArticleViewer}
        />
      )}
    </Layout>
  );
};

export default NewsPage; 