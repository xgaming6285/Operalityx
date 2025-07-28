import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Solutions from "@/components/Solutions";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/news";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <Research />
      <Solutions />
      <Community />
      <Stories />
      <News />
    </Layout>
  );
};

export default Index;
