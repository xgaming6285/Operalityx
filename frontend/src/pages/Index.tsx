import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Solutions from "@/components/Solutions";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/news";
import ScrollChatModal from "@/components/ScrollChatModal";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useState } from "react";

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);

  const { isVisible } = useScrollTrigger({ 
    hideDelay: 3000, // Hide after 3 seconds of no scrolling
    isActive: isChatActive // Don't hide when chat is active
  });

  return (
    <Layout>
      <HeroCarousel />
      <Research />
      <Solutions />
      <Community />
      <Stories />
      <News />
      
      {/* Scroll-triggered AI Chat Modal */}
      <ScrollChatModal 
        isVisible={isVisible} 
        onClose={() => {}} 
        onActiveChange={setIsChatActive}
      />
    </Layout>
  );
};

export default Index;
