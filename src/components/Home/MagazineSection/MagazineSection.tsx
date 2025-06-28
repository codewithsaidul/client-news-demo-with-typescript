import BreakingBanner from "@/components/HomeSections/BreakingBanner";
import NewsSection from "@/components/HomeSections/NewsSection";
import TopNewsSection from "@/components/HomeSections/TopNewsSection";
import Heading from "@/components/SectionHeading/Heading";

const MagazineSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/allNews?page=1&newsType=magazine&priority=none`,
    { next: { tags: ["news-list"] } }
  );

  const data = await res.json();

  const magazineNews = data?.data;

  return (
    <div className="mt-20">
      {magazineNews.length > 5 && (
        <div>
          {/* ========================= Section Heading ====================== */}
          <Heading title="Magazine" link="/magazine" />
          {/* ========================= Section Heading ====================== */}

          <div className="relative min-h-screen grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 relative order-1">
              {/* Left Column Content */}
              <div>
                <BreakingBanner news={magazineNews[0]} />
                <TopNewsSection allNews={magazineNews} />
              </div>
            </div>
            <div className="xl:col-span-4 order-2">
              <div className="sticky top-28">
                {/* Right Column Content */}
                <NewsSection allNews={magazineNews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagazineSection;
