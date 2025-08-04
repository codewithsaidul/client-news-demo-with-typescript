import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";
import { HomeNewsProps } from "@/types/client/news.types";

const InvestingSection = async ( { allNews: investingNews }: HomeNewsProps) => {


  return (
    <div className="mt-20">
      {investingNews.length > 4 && (
        <div>
          {" "}
          {/* ========================= Section Heading ====================== */}
          <Heading title="Investing" link="/category/investing" />
          {/* ========================= Section Heading ====================== */}
          <div className="relative min-h-screen grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 relative order-1">
              {/* Left Column Content */}
              <div>
                <BreakingBanner news={investingNews[0]} />
                <TopNewsSection allNews={investingNews} />
              </div>
            </div>
            <div className="xl:col-span-4 order-2">
              <div className="sticky top-28">
                {/* Right Column Content */}
                <NewsSection allNews={investingNews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestingSection;
