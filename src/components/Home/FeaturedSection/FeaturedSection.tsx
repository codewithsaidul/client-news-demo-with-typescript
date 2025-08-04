import Heading from "@/components/SectionHeading/Heading";
import NoDataFound from "@/components/Shared/NoDataFound";
import "@/models/users.models";
import { Featured } from "@/types/client/news.types";
import FeatureSideNews from "./FeatureSideNews";
import MainFeaturedNews from "./MainFeaturedNews";

const FeaturedSection = async ({ featuredNews, children }: Featured) => {
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
              {children}
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
