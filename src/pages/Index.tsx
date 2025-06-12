import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Community from "@/components/Community";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroCarousel />
            <Research />
            <Community />
        </div>
    );
};

export default Index;