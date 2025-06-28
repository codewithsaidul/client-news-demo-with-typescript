import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";

const BillionairesSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/allNews?page=1&newsType=news&category=billionaires&priority=none`,
    { next: { tags: ["news-list"] } }
  );

  const data = await res.json();

  const billionairesNews = data?.data;

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
