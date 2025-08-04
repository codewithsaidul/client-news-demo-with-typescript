import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";
import { HomeNewsProps } from "@/types/client/news.types";

const LifeSection = async ({ allNews: lifeNews }: HomeNewsProps) => {
  return (
    <div className="max-[450px]:mt-60 max-[600px]:mt-60 mt-56">
      {lifeNews.length > 4 && (
        <div>
          {/* ========================= Section Heading ====================== */}
          <Heading title="Life" link="/life" />
          {/* ========================= Section Heading ====================== */}

          <div className="relative min-h-screen grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 relative xl:order-2">
              {/* Left Column Content */}
              <div>
                <BreakingBanner news={lifeNews[0]} />
                <TopNewsSection allNews={lifeNews} />
              </div>
            </div>
            <div className="xl:col-span-4 xl:order-1">
              <div className="sticky top-28">
                {/* Right Column Content */}
                <NewsSection allNews={lifeNews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeSection;
