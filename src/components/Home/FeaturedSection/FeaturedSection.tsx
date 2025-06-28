import Heading from "@/components/SectionHeading/Heading";
import "@/models/users.models";
import EditorsPick from "./EditorsPick";
import FeatureSideNews from "./FeatureSideNews";
import MainFeaturedNews from "./MainFeaturedNews";
import NoDataFound from "@/components/Shared/NoDataFound";

const FeaturedSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/allNews?priority=isFeatured`,
    { next: { tags: ["news-list"] } }
  );
  const data = await res.json();

  const featuredNews = data.data;

  return (
    <section className="mb-20">
      {featuredNews.length > 0 ? (
        <div>
          {/* ================= Featured Heading ====================== */}
          <Heading title="Featured" link="news" />

          {/* ====================== Feature Container =========================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-20">
            <div className="lg:col-span-7">
              <MainFeaturedNews featuredNews={featuredNews} />
            </div>

            <div className="lg:col-span-5 h-screen w-full">
              <FeatureSideNews featuredNews={featuredNews.slice(3, 5)} />
              <EditorsPick />
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </section>
  );
};

export default FeaturedSection;
