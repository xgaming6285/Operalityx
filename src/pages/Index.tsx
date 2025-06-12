import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Research from "@/components/Research";
import Community from "@/components/Community";
import Stories from "@/components/Stories";
import News from "@/components/News";
import Footer from "@/components/Footer";
import Solutions from "@/components/Solutions";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <HeroCarousel />
                <Solutions />
                <Research />
                <Community />
                <Stories />
                <News />
                <Footer />
            </main>
        </div>
    );
};

export default Index;