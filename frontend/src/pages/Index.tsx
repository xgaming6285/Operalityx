import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/News";
import Footer from "@/components/Footer";
import Solutions from "@/components/Solutions";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open admin panel with Ctrl+Shift+A (or Cmd+Shift+A on Mac)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "A"
      ) {
        event.preventDefault();
        setShowAdminPanel(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <HeroCarousel />
        <Research />
        <Solutions />
        <Community />
        <Stories />
        <News />
        <Footer />
      </main>

      {/* Admin Panel - Only accessible via keyboard shortcut */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      {/* Hidden admin access hint for developers */}
      <div className="hidden">
        Admin Panel: Press Ctrl+Shift+A (or Cmd+Shift+A on Mac) to access
        document management
      </div>
    </div>
  );
};

export default Index;
