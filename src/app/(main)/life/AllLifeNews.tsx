"use client";

import ArticaleCard from "@/components/CommonPageLayout/ArticaleCard";
import HeroSection from "@/components/CommonPageLayout/HeroSection";
import HightlightCard from "@/components/CommonPageLayout/HightlightCard";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import NoDataFound from "@/components/Shared/NoDataFound";
import PaginationPage from "@/components/Shared/PaginationPage";
import { useGetAllNewsQuery } from "@/features/news/allNews/allNewsAPI";
import { useState } from "react";

const AllLifeNews = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllNewsQuery({
    page: page,
    newsType: "life",
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 my-10 px-6">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!data) {
    return <NoDataFound />;
  }

  const { data: lifeNews, pagination } = data;



  return (
    <div>
      {lifeNews.length > 0 ? (
        <div className="px-4 container mx-auto mt-20">
          <HeroSection news={lifeNews[0]} />
          <HightlightCard allNews={lifeNews} />
          <ArticaleCard allNews={lifeNews} />

          {pagination?.totalPages < 1 && (
            <div className="mt-7">
              <PaginationPage
                page={page}
                setPage={setPage}
                totalPages={pagination?.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default AllLifeNews;
