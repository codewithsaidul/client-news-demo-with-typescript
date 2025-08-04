import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";
import { HomeNewsProps } from "@/types/client/news.types";

const EntrepreneursSection = async ( { allNews: entrepreneursNews}: HomeNewsProps) => {

  return (
    <div className="mt-20">
      {entrepreneursNews.length > 4 && (
        <div>
          {/* ========================= Section Heading ====================== */}
          <Heading title="Entrepreneurs" link="/category/entrepreneurs" />
          {/* ========================= Section Heading ====================== */}

          <div className="relative min-h-screen grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 relative xl:order-2">
              {/* Left Column Content */}
              <div>
                <BreakingBanner news={entrepreneursNews[0]} />
                <TopNewsSection allNews={entrepreneursNews} />
              </div>
            </div>
            <div className="xl:col-span-4 xl:order-1">
              <div className="sticky top-28">
                {/* Right Column Content */}
                <NewsSection allNews={entrepreneursNews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntrepreneursSection;
