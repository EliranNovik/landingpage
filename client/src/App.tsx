import { useState } from "react";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { OfficeContactButtons } from "@/components/OfficeContactButtons";
import { ProcessSection } from "@/components/ProcessSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TeamSection } from "@/components/TeamSection";
import { VideosSection } from "@/components/VideosSection";
import { ServicesSection } from "@/components/ServicesSection";
// import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";

function App() {
  const [heroLogoInView, setHeroLogoInView] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );

  return (
    <div className="min-h-screen">
      <Header showLogo={!heroLogoInView} />
      <HeroSection onHeroLogoInViewChange={setHeroLogoInView} />
      <OfficeContactButtons />
      <main className="page-beige pb-24 md:pb-0" style={{ backgroundColor: "#f7f0e6" }}>
        <div className="bg-accent">
          <ServicesSection onDarkBackground />
          <ProcessSection onDarkBackground />
          {/* <WhyChooseUsSection onDarkBackground /> */}
        </div>
        <CTASection />
        <TeamSection />
        <VideosSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
