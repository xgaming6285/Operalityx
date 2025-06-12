
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Research from "@/components/Research";
import Community from "@/components/Community";
import News from "@/components/News";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <Research />
            <Community />
            <News />
        </div>
    );
};

export default Index;