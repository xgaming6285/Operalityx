import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Solutions from "@/components/Solutions";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/news";
import ScrollChatModal from "@/components/ScrollChatModal";

const Index = () => {

  return (
    <Layout>
      <HeroCarousel />
      <Research />
      <Solutions />
      <Community />
      <Stories />
      <News />
      
      {/* Always visible AI Chat Modal */}
      <ScrollChatModal 
        isVisible={true} 
        onClose={() => {}} 
      />
    </Layout>
  );
};

export default Index;
