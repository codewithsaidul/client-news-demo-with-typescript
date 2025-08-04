import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";
import { HomeNewsProps } from "@/types/client/news.types";

const BillionairesSection = async ({ allNews: billionairesNews }: HomeNewsProps) => {


  return (
    <div className="mt-20">
      {billionairesNews.length > 4 && (
        <div>
          {" "}
          {/* ========================= Section Heading ====================== */}
          <Heading title="Billionaires" link="/category/billionaires" />
          {/* ========================= Section Heading ====================== */}
          <div className="relative grid min-h-screen grid-cols-1 gap-10 xl:grid-cols-12">
            <div className="relative xl:col-span-8 xl:order-2">
              {/* Left Column Content */}
              <div>
                <BreakingBanner news={billionairesNews[0]} />
                <TopNewsSection allNews={billionairesNews} />
              </div>
            </div>
            <div className="xl:col-span-4 xl:order-1">
              <div className="sticky top-28">
                {/* Right Column Content */}
                <NewsSection allNews={billionairesNews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillionairesSection;
