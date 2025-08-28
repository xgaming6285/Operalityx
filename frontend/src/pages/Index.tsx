import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Solutions from "@/components/Solutions";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/news";
import ScrollChatModal from "@/components/ScrollChatModal";
import ChatBubble from "@/components/ChatBubble";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useState } from "react";

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isChatHovering, setIsChatHovering] = useState(false);

  const { state } = useScrollTrigger({
    hideDelay: 1500,
    isActive: isChatActive,
    isHovering: isChatHovering,
  });

  return (
    <Layout>
      <HeroCarousel />
      <Research />
      <Solutions />
      <Community />
      <Stories />
      <News />

      {/* Scroll-triggered AI Chat */}
      <ScrollChatModal
        uiState={state}
        onClose={() => {}}
        onActiveChange={setIsChatActive}
        onHoverChange={setIsChatHovering}
        logo={
          <img
            src="/images/smaller-logo-hd.png"
            alt="Operalytix"
            className="w-8 h-8 object-contain"
          />
        }
      />

      {/* Chat Bubble */}
      <ChatBubble />
    </Layout>
  );
};

export default Index;
