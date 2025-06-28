import BillionairesSection from "@/components/Home/BillionairesSection/BillionairesSection";
import EntrepreneursSection from "@/components/Home/EntrepreneursSection/EntrepreneursSection";
import FeaturedSection from "@/components/Home/FeaturedSection/FeaturedSection";
import Hero from "@/components/Home/HeroBanner/Hero";
import InnovationSection from "@/components/Home/InnovationSection/InnovationSection";
import InvestingSection from "@/components/Home/InvestingSection/InvestingSection";
import LeadershipSection from "@/components/Home/LeadershipSection/LeadershipSection";
import LifeSection from "@/components/Home/LifeSection/LifeSection";
import MagazineSection from "@/components/Home/MagazineSection/MagazineSection";

const HomePage = () => {
  return (
    <main>
      <Hero />

      <div className="px-4 md:px-8 mt-32 relative">
        <div className="mt-20">
          <FeaturedSection />
          <LifeSection />
          <MagazineSection />
          <EntrepreneursSection />
          <InnovationSection />
          <BillionairesSection />
          <InvestingSection />
          <LeadershipSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
