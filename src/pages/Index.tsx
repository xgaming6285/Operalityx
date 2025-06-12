import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/News";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroCarousel />
            <Research />
            <Community />
            <Stories />
            <News />
            <Footer />
        </div>
    );
};

export default Index;