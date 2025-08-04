import BillionairesSection from "@/components/Home/BillionairesSection/BillionairesSection";
import EntrepreneursSection from "@/components/Home/EntrepreneursSection/EntrepreneursSection";
import EditorsPick from "@/components/Home/FeaturedSection/EditorsPick";
import FeaturedSection from "@/components/Home/FeaturedSection/FeaturedSection";
import Hero from "@/components/Home/HeroBanner/Hero";
import InnovationSection from "@/components/Home/InnovationSection/InnovationSection";
import InvestingSection from "@/components/Home/InvestingSection/InvestingSection";
import LeadershipSection from "@/components/Home/LeadershipSection/LeadershipSection";
import LifeSection from "@/components/Home/LifeSection/LifeSection";
import MagazineSection from "@/components/Home/MagazineSection/MagazineSection";
import { findNewsFromDb } from "@/utils/fetchHomePageData";

const HomePage = async () => {
  const [
    hero,
    featured,
    editor,
    lifeNews,
    magazineNews,
    entrepreneursNews,
    innovationNews,
    billionairesNews,
    investingNews,
    leadershipNews,
  ] = await Promise.all([
    findNewsFromDb({ page: 1, priority: "isBreaking" }),
    findNewsFromDb({ page: 1, priority: "isFeatured" }),
    findNewsFromDb({ page: 1, priority: "isEditorsPick" }),
    findNewsFromDb({ page: 1, newsType: "life", priority: "none" }),
    findNewsFromDb({ page: 1, newsType: "magazine", priority: "none" }),
    findNewsFromDb({
      page: 1,
      newsType: "news",
      category: "entrepreneurs",
      priority: "none",
    }),
    findNewsFromDb({
      page: 1,
      newsType: "news",
      category: "innovation",
      priority: "none",
    }),
    findNewsFromDb({
      page: 1,
      newsType: "news",
      category: "billionaires",
      priority: "none",
    }),
    findNewsFromDb({
      page: 1,
      newsType: "news",
      category: "investing",
      priority: "none",
    }),
    findNewsFromDb({
      page: 1,
      newsType: "news",
      category: "leadership",
      priority: "none",
    }),
  ]);

  if (!hero && !featured && !lifeNews) {
    return <div>Data nai</div>
  }

  return (
    <main>
      <Hero hero={hero} />

      <div className="px-4 md:px-8 mt-32 relative">
        <div className="mt-20">
          <FeaturedSection featuredNews={featured}>
            <EditorsPick featuredNews={editor} />
          </FeaturedSection>
          <LifeSection allNews={lifeNews} />
          <MagazineSection allNews={magazineNews} />
          <EntrepreneursSection allNews={entrepreneursNews} />
          <InnovationSection allNews={innovationNews} />
          <BillionairesSection allNews={billionairesNews} />
          <InvestingSection allNews={investingNews} />
          <LeadershipSection allNews={leadershipNews} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
