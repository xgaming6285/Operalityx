import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Solutions from "@/components/Solutions";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/news";
import ScrollChatModal from "@/components/ScrollChatModal";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useState, useEffect } from "react";

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);

  const { state } = useScrollTrigger({
    hideDelay: 3000,
    isActive: isChatActive,
    isHovered: isChatHovered,
  });

  // Add keyboard listener to expand chat when user starts typing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only expand if it's a regular character key (not special keys like arrows, ctrl, etc.)
      if (
        event.key.length === 1 && // Single character keys
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        state !== "hidden" && // Don't expand if hidden
        !isChatActive // Don't interfere if already active
      ) {
        setIsChatActive(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, isChatActive]);

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
        onHoverChange={setIsChatHovered}
        logo={
          <img
            src="/images/smaller-logo-hd.png"
            alt="Operalytix"
            className="w-8 h-8 object-contain"
          />
        }
      />
    </Layout>
  );
};

export default Index;
